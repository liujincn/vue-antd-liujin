<template>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
        <a-form :form="form" @submit="handleSubmit">

            <a-form-item label="游戏世界" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-select
                        placeholder="请选择服务器"
                        v-decorator="['serverId',{rules: [{ required: true, message: '请选择服务器' }]}]"
                >
                    <a-select-option v-for="(item,index) in options" :key="index">{{item.name}}</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item label="运营渠道" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-select
                        placeholder="请选择运营渠道"
                        v-decorator="['channels',{rules: [{ required: true, message: '请选择运营渠道' }]}]"
                        allowClear
                        mode="multiple"
                >
                    <a-select-option v-for="(item,index) in channelData" :key="index">{{item.name}}</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item label="系统类型" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-select
                        placeholder="请选择系统类型"
                        v-decorator="['opSystems',{rules: [{ required: true, message: '请选择系统类型' }]}]"
                        allowClear
                        mode="multiple"
                >
                    <a-select-option v-for="(item,index) in systems" :key="index">{{item.name}}</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item label="收件人类型：" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-select placeholder="请选择收件人类型" v-model="receiversType">
                    <a-select-option value="0">所有角色</a-select-option>
                    <a-select-option value="1">指定角色ID</a-select-option>
                    <a-select-option value="2">排除角色ID</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item label="指定收件人：" v-show="receiversType === '1'" :label-col="{ span: 2 }"
                         :wrapper-col="{ span: 22 }">
                <a-textarea v-model="queryData.receivers"
                            @change="handleReceivers"
                            :autoSize="{ minRows: 2, maxRows: 6 }"
                            placeholder="请输入收件人，多个收件人之间用【英文逗号】分开！填写完成后点击【批量增加】进行校验！"
                >
                </a-textarea>

                <div>
                    <a-button type="primary" @click="checkRoleTxts">批量增加</a-button>
                    <a-button type="link" @click="clearRoleTxts">清空</a-button>
                    <span class="tipsTxt">Tips：多个收件人之间用【英文逗号】分开！填写完成后点击【批量增加】进行校验！</span>
                    <p :class="receiversTipsClass" style=" margin: 0">{{receiversTips}}</p>
                </div>

            </a-form-item>

            <a-form-item label="排除收件人：" v-show="receiversType === '2'" :label-col="{ span: 2 }"
                         :wrapper-col="{ span: 22 }">
                <a-textarea v-model="queryData.excludes"
                            @change="handleExcludes"
                            :autoSize="{ minRows: 2, maxRows: 6 }"
                            placeholder="请输入收件人，多个收件人之间用【英文逗号】分开！填写完成后点击【批量增加】进行校验！"
                >
                </a-textarea>

                <div>
                    <a-button type="primary" @click="checkExcludeRoleTxts">批量增加</a-button>
                    <a-button type="link" @click="clearExcludeRoleTxts">清空</a-button>
                    <span class="tipsTxt">Tips：多个排除收件人之间用【英文逗号】分开！填写完成后点击【批量增加】进行校验！</span>
                    <p :class="excludesTipsClass" style=" margin: 0">{{excludesTips}}</p>
                </div>

            </a-form-item>

            <a-form-item label="附加金钱：" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item :label-col="{ span: 8}" :wrapper-col="{ span: 16 }" label="金币：">
                            <a-input @change="addMoney" :maxLength="9" v-model="money" placeholder="请输入金币数额" allowClear></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" label="钻石：">
                            <a-input @change="addGold" :maxLength="9" v-model="gold" placeholder="请输入钻石数额" allowClear></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form-item>

            <a-form-item label="道具：" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-row :gutter="24">

                    <a-col :span="6">
                        <a-form-item :label-col="{ span: 8}" :wrapper-col="{ span: 16 }" label="物品ID：">
                            <a-tooltip>
                                <template slot='title'>系统只模糊搜索前20条物品</template>
                                <a-auto-complete v-model="goodsId" @select="handleSelectGoodsId" placeholder="请输入物品ID">
                                    <template slot="dataSource">
                                        <a-select-option v-for="item in goodItems" :key="item.id">{{item.id}}</a-select-option>
                                    </template>
                                </a-auto-complete>
                            </a-tooltip>
                        </a-form-item>
                    </a-col>

                    <a-col :span="6">
                        <a-form-item :label-col="{ span: 8}" :wrapper-col="{ span: 16 }" label="物品名称：">
                            <a-tooltip>
                                <template slot='title'>系统只模糊搜索前20条物品</template>
                                <a-auto-complete v-model="goodsName" @select="handleSelectGoodsName" placeholder="请输入物品名称">
                                    <template slot="dataSource">
                                        <a-select-option v-for="item in goodItems" :key="item.name">{{item.name}}</a-select-option>
                                    </template>
                                </a-auto-complete>
                            </a-tooltip>
                        </a-form-item>
                    </a-col>

                    <a-col :span="6">
                        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" label="数量：">
                            <a-input :maxLength="9" v-model="goodsNum" placeholder="请输入数量"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-button type="primary" @click="addGoodsTag">增加</a-button>
                        <a-button type="danger" @click="clearGoodsTags" style="margin-left:20px;">清空</a-button>
                    </a-col>
                </a-row>
                <div class="red-tips">
                    {{goodsTips}}
                </div>
                <div>
                    <a-tag
                            v-for="(item,index) in goodsList"
                            :key="index"
                            color="blue"
                            closable
                            @close="handleGoodsTagClose(item)">
                        {{item.name}}（ID:{{item.id}}）*{{item.num}}
                    </a-tag>
                </div>
            </a-form-item>
            <a-form-item label="指定时间：" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item :label-col="{ span: 8}" :wrapper-col="{ span: 16 }" label="此时间：">
                            <a-date-picker
                                    style="width:230px"
                                    :disabledDate="pickerOptionsStart"
                                    v-model="queryData.roleCreateAfter"
                                    placeholder="选择日期">
                            </a-date-picker>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">后创建的角色才能收到邮件</a-col>
                </a-row>

                <a-row :gutter="24">

                    <a-col :span="6">
                        <a-form-item :label-col="{ span: 8}" :wrapper-col="{ span: 16 }" label="此时间：">
                            <a-date-picker style="width:230px"
                                    :disabledDate="pickerOptionsEnd"
                                           v-model="queryData.roleCreateBefore"
                                    placeholder="选择日期">
                            </a-date-picker>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">前创建的角色才能收到邮件</a-col>
                </a-row>
                <div class="red-tips">Tips：两个时间可以选填。注：填写了两个时间，第一个时间必须小于第二个时间才可发送</div>
            </a-form-item>

            <a-form-item label="保留天数：" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-input v-model="queryData.keepDays" :maxLength="5"  placeholder="请输入保留天数"></a-input>
            </a-form-item>
            <a-form-item label="充值金额：" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-input v-model="queryData.rechargeNum" :maxLength="5"  placeholder="请输入充值金融"></a-input>
            </a-form-item>

            <a-form-item label="定时发送：" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">

                <a-switch @change="changeTaskType" checkedChildren="开" unCheckedChildren="关" v-model="isTiming"></a-switch>
                <div v-if="isTiming===true">
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="定时起始时间：" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-date-picker style="width:230px"
                                    :disabledDate="sendStart"
                                           format="YYYY-MM-DD"
                                           v-model="queryData.sendStartDate"
                                    placeholder="选择日期">
                            </a-date-picker>

                        </a-form-item>

                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="定时结束时间：" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-date-picker
                                    style="width:230px"
                                    format="YYYY-MM-DD"
                                    :disabledDate="sendEnd"
                                    v-model="queryData.sendEndDate"
                                    placeholder="选择日期">
                            </a-date-picker>

                        </a-form-item>

                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="定时发送时间：" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-time-picker
                                    style="width:230px"
                                    v-model="times"
                                    :defaultOpenValue="moment('00:00:00', 'HH:mm:ss')"
                                    placeholder="选择时间">
                            </a-time-picker>

                        </a-form-item>

                    </a-col>
                    <a-col :span="6">
                        <a-button @click="addTimesTag" type="primary">添加</a-button>
                        <a-button @click="clearTimesTags" type="danger" style="margin-left: 20px">清空</a-button>
                    </a-col>
                </a-row>
                    <div class="red-tips">
                        {{timesTips}}
                    </div>
                    <div>
                        <a-tag
                                v-for="(tag,index) in queryData.sendTimes"
                                :key="index"
                                closable
                                color="blue"
                                @close="handleTimesTagClose(tag)">
                            {{tag }}
                        </a-tag>
                    </div>
                    <a-row :gutter="24">
                        <a-col :span="6">
                            <a-form-item label="发送间隔时间：" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                <a-input @change="handleSendInterval" v-model="queryData.sendInterval" :maxLength="5"
                                         placeholder="请输入发送间隔天数" ></a-input>

                            </a-form-item>

                        </a-col>
                        <a-col :span="6">
                            (0天，即每日连续发送)
                        </a-col>
                    </a-row>
                </div>
            </a-form-item>
            <a-form-item label="适用语言："  :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-checkbox :indeterminate="isIndeterminate" :checked="checkAll" @change="handleCheckAllChange">全选</a-checkbox>
                <br>
                <a-checkbox-group v-model="checkedLanguage" @change="handleCheckedChange">
                    <a-checkbox v-for="(item,index) in language" :value="item" :key="index" >{{item.desc}}</a-checkbox>
                </a-checkbox-group>
                <a-form-item>
                    <a-button @click="languageDialog" type="primary">添加</a-button>
                    <span class="red-tips" style=" margin-left: 20px;">增加多语言邮件，用于使用不同的语言发送同一奖励</span>
                </a-form-item>

            </a-form-item>
            <a-form-item label="邮件内容："  :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-tabs v-model="activeName">
                    <a-tab-pane v-for="(item,index) in queryData.mulLanguages" :tab="item.desc" :key="item.desc">


                            <a-input v-model="item.title" :maxLength="128"
                                      :placeholder="'请输入'+ queryData.mulLanguages[index].desc+'邮件标题'"></a-input>

                            <a-input type="textarea" v-model="item.content" :maxLength="1000" :rows="6" style="margin-top: 20px"
                                      :placeholder="'请输入'+ queryData.mulLanguages[index].desc+'邮件内容'"></a-input>

                    </a-tab-pane>
                </a-tabs>
            </a-form-item>
            <a-form-item label="邮件发送原因："  :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入邮件发送原因"
                        v-model="queryData.reason">
                </a-input>
            </a-form-item>

            <a-form-item label="等级：" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                <a-input v-model="queryData.level" :maxLength="5" clearable placeholder="请输入等级"></a-input>
            </a-form-item>


            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">发送邮件</a-button>
            </a-form-item>

        </a-form>
        <a-modal title="请填写需要增加的语种" :visible="languageFormVisible" :footer="null" @cancel="handleCancel">
            <a-form>

                <a-form-item label="语种" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                    <a-select placeholder="选择需要增加的语种" @change="handleChange">
                        <a-select-option v-for="item in languageData.slice(2)" :key="item.id" >{{item.name}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item
                        :wrapper-col="{ span: 12, offset: 5 }"
                >
                    <a-button type="primary" @click="submitLanguage">增加</a-button>
                </a-form-item>
            </a-form>
        </a-modal>


    </a-card>
</template>

<script>
    import moment from 'moment'
    import {VIsNotEmpty} from '@/util/formValidator'

    export default {
        name: 'form-post',
        data() {
            return {
                form: this.$form.createForm(this),
                options: [
                    {id: 0, name: '服务器1'},
                    {id: 1, name: '服务器2'},
                    {id: 2, name: '服务器3'}
                ],
                channelData: [
                    {id: 0, name: '渠道1'},
                    {id: 1, name: '渠道2'},
                    {id: 2, name: '渠道3'},
                    {id: 3, name: '渠道4'},
                    {id: 4, name: '渠道5'},
                ],
                systems: [
                    {id: 0, name: 'IOS'},
                    {id: 1, name: '安卓'}
                ],
                goodItems: [
                    {id: "10001", name: "以旧换新"},
                    {id: "10002", name: "狂暴收割"},
                    {id: "10003", name: "引力毒雾"},
                    {id: "10004", name: "亡者邀请"},
                    {id: "10005", name: "芭比闪耀"},
                    {id: "10006", name: "命脉两失"},
                    {id: "10007", name: "湮灭挥砍"}
                ],
                dataSource: [],

                queryData: {
                    serverId: '',
                    channels: [],
                    opSystems: [],
                    receivers: '',
                    excludes: '',
                    goodsItems: [],
                    mulLanguages: [
                        {languageId: 1, title: '', content: '', desc: '中文'},
                        {languageId: 2, title: '', content: '', desc: '英文'}
                    ],
                    roleCreateBefore: null,
                    roleCreateAfter:null,
                    keepDays: '30',
                    level: '0',
                    taskType: 1,
                    sendStartDate: null,
                    sendEndDate:null,
                    sendTimes: [],
                    sendInterval: 0,
                    rechargeNum: 0,
                    reason: ''

                },
                receiversType: '0',
                receiversTips: '',
                receiversTipsClass: 'danger',
                excludesTips: '',
                excludesTipsClass: 'danger',
                money: '',
                gold: '',
                goodsList: [],
                goodsName: '',
                goodsId: '',
                goodsNum: '0',
                goodsTips: '',
                isTiming:true,
                times:null,
                timesTips: '',
                checkAll: true,
                checkedLanguage: [],
                language: [
                    {languageId: 1, desc: '中文', title: '', content: ''},
                    {languageId: 2, desc: '英文', title: '', content: ''}
                ],
                isIndeterminate: false,
                languageModel: {
                    languageId: '',
                    name: ''
                },
                languageFormVisible: false,
                activeName: '中文',
                languageData:[
            {id: 1, name: "中文"},
             {id: 2, name: "英文"},
             {id: 3, name: "繁体"},
             {id: 4, name: "印尼语"},
             {id: 5, name: "菲律宾"},
             {id: 6, name: "越南"},
             {id: 7, name: "泰语"},
             {id: 8, name: "葡萄牙语"},
             {id: 9, name: "韩语"},
             {id: 10, name: "法语"},
             {id: 11, name: "德语"},
             {id: 12, name: "马来语"}]
            }
        },
        created () {
            this.defaultCheck()
        },
        methods: {
            moment,
            //提交
            handleSubmit() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log(Object.assign(this.queryData, values))
                    }
                })
            },
            //  清除指定收件人
            clearRoleTxts() {
                this.queryData.receivers = ''
                this.receiversTips = ''
                this.receiversTipsClass = 'danger'
            },
            //  验证指定收件人
            checkRoleTxts() {
                if (!VIsNotEmpty(this.queryData.receivers)) {
                    this.receiversTipsClass = 'danger'
                    this.receiversTips = '请输入收件人！'
                }
                else {
                    let ids = []
                    ids = this.queryData.receivers.split(',')
                    this.receiversTipsClass = 'success'
                    this.receiversTips = ids + '验证成功！'
                }
            },
            // 指定角色id输入限制
            handleReceivers(e) {
                this.queryData.receivers = e.target.value.replace(/[^0-9\u002c]/g, '').replace(new RegExp(',+', 'gm'), ',')
            },
            //  清除排除收件人
            clearExcludeRoleTxts() {
                this.queryData.excludes = ''
                this.excludesTips = ''
                this.excludesTipsClass = 'danger'
            },
            //  验证排除收件人
            checkExcludeRoleTxts() {
                if (!VIsNotEmpty(this.queryData.excludes)) {
                    this.excludesTipsClass = 'danger'
                    this.excludesTips = '请输入收件人！'
                }
                else {
                    let ids = []
                    ids = this.queryData.excludes.split(',')
                    this.excludesTipsClass = 'success'
                    this.excludesTips = ids + '验证成功！'
                }
            },
            // 排除角色id输入限制
            handleExcludes(e) {
                this.queryData.excludes = e.target.value.replace(/[^0-9\u002c]/g, '').replace(new RegExp(',+', 'gm'), ',')
            },
            // 增加金币
            addMoney(e) {
                this.money = e.target.value.replace(/[^\d]/g, '')
                console.log(this.money)
            },
            // 增加钻石
            addGold(e) {
                this.gold = e.target.value.replace(/[^\d]/g, '')
                console.log(this.gold)
            },
            // 选择物品id
            handleSelectGoodsId(value) {
                for (let item of this.goodItems) {
                    if (value === item.id) {
                        this.goodsName = item.name
                    }
                }
                this.goodsTips = ''
                this.goodsId = value
                this.goodsNum = '1'
            },
            // 选择物品名称
            handleSelectGoodsName(value) {
                for (let item of this.goodItems) {
                    if (value === item.name) {
                        this.goodsId = item.id
                    }
                }
                this.goodsTips = ''
                this.goodsName = value
                this.goodsNum = '1'
            },
            // 增加物品tag
            addGoodsTag() {
                if(this.goodsName &&this.goodsId&&this.goodsNum)
                {
                    this.goodsTips = ''
                    let goodsObj = {'id': this.goodsId, 'num': parseInt(this.goodsNum), 'name': this.goodsName}
                    this.goodsList.push(goodsObj)
                    this.queryData.goodsItems = this.goodsList
                }
                else{
                    this.goodsTips = '物品道具输入框不能为空！'
                }

            },
            // 清除物品tag
            clearGoodsTags() {
                this.goodsTips = ''
                this.goodsList = []
                this.queryData.goodsItems = null
            },
            // 物品tag关闭
            handleGoodsTagClose (tag) {
                this.goodsList.splice(this.goodsList.indexOf(tag), 1)
            },
            // 时间角色创建选择
            pickerOptionsStart(startValue) {
                const endValue = this.queryData.roleCreateBefore;
                if (!startValue || !endValue) {
                       return false
                    }
                return startValue.valueOf() > endValue.valueOf();
            },
            pickerOptionsEnd(endValue){
                const startValue = this.queryData.roleCreateAfter;
                if (!endValue || !startValue) {
                    return false
                }
                return startValue.valueOf() >= endValue.valueOf();

            },
            // 是否定时发送
            changeTaskType () {
                if (this.isTiming) {
                    this.queryData.taskType = 1
                    this.queryData.sendInterval = 0
                } else {
                    this.queryData.taskType = 0
                    this.queryData.sendStartDate = null
                    this.queryData.sendEndDate = null
                    this.queryData.sendInterval = ''
                    this.queryData.sendTimes = []
                }
            },
            // 时间角色创建选择
            sendStart(startValue) {
                const endValue = this.queryData.sendEndDate
                if (!startValue || !endValue) {
                    return false
                }
                return startValue.valueOf() > endValue.valueOf()
            },
            sendEnd(endValue){
                const startValue = this.queryData.sendStartDate
                if (!endValue || !startValue) {
                    return false
                }
                return startValue.valueOf() >= endValue.valueOf();

            },
            // 增加定时tag
            addTimesTag () {
                if (!this.times) {
                    this.timesTips = '定时发送时间不能为空！'
                    return false
                } else {
                    if (!this.queryData.sendStartDate || !this.queryData.sendEndDate) {
                        this.timesTips = '请选择日期！'
                    } else {
                        this.timesTips = ''
                        const sendTime = []
                        sendTime.push(moment(this.times).format("HH:mm:ss"))
                        for (let i = 0; i < sendTime.length; i++) {
                            if (this.queryData.sendTimes.indexOf(sendTime[i]) === -1) {
                                this.queryData.sendTimes.push(sendTime[i])
                            } else {
                                this.$message.warning( '当前选择的定时发送时间已存在')
                            }
                        }
                    }
                }
            },
            // 清除定时tag
            clearTimesTags () {
                this.timesTips = ''
                this.times = null
                this.queryData.sendTime = []
            },
            // 定时tag关闭
            handleTimesTagClose (tag) {
                this.queryData.sendTimes.splice(this.queryData.sendTimes.indexOf(tag), 1)
            },
            // 增加间隔时间
            handleSendInterval (e) {
                    this.queryData.sendInterval = e.target.value.replace(/[^\d]/g, '')
            },
            // 默认全选
            defaultCheck () {
                let defaultCheck = []
                this.language.map(function (item) {
                    defaultCheck.push(item)
                })
                this.checkedLanguage = defaultCheck
                this.queryData.mulLanguages = defaultCheck
            },
            //  语种的全选
            handleCheckAllChange (e) {
                if (e.target.checked === true) {
                    this.queryData.mulLanguages = this.language
                    this.checkedLanguage = this.language
                    this.isIndeterminate = false
                } else {
                    this.$message.error('不可取消全选，至少要选择一种语言！')
                }
            },
            //  语种选择
            handleCheckedChange (value) {
                if(value.length===0)
                {this.$message.error('至少要选择一种语言！')
                    this.checkedLanguage = [this.language[0]]
                    return false
                }
                let checkedCount = value.length
                this.checkAll = checkedCount === this.language.length
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.language.length
                this.checkedLanguage = value
                let allItem = []
                value.map(function (item) {
                    allItem.push(item)
                })
                this.queryData.mulLanguages = allItem
                this.activeName = this.checkedLanguage[0].desc
            },
            //  增加选择
            languageDialog () {
                this.languageModel.languageId = ''
                this.languageModel.name = ''
                this.languageFormVisible = true
            },
            handleCancel() {
                this.languageFormVisible = false
            },
            handleChange (value) {
                this.languageModel.languageId=value
            },
            submitLanguage () {

                        for (let item of this.languageData) {
                            if (this.languageModel.languageId === item.id) {
                                this.language.push({languageId: item.id, desc: item.name, title: '', content: ''})
                                this.languageData.splice(this.languageData.indexOf(item), 1)
                            }
                        }
                this.languageFormVisible = false
                    }
        }
    }
</script>

<style scoped>
    .success {
        color: #67C23A
    }

    .danger {
        color: #F56C6C
    }

    .red-tips {
        color: red;
        font-size: 14px;
    }
</style>
