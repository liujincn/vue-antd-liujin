<template>
    <div class="app-container">
    <a-card  :bordered="false" class="header-container">
        <a-row class="app-header">

            <a-form :form="form" @submit.native.prevent="handleSubmit">
                <a-row>
                    <a-form-item class="input-item el-icon-search">
                        <a-select placeholder="请选择区服" class="input-item"
                                  v-decorator="['serverId',{rules: [{ required: true, message: '请选择服务器' }]}]">
                            <a-select-option v-for="item in server" :value="item.id" :key="item.id">{{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item class="input-item" prop="queryType">
                        <single-selector @select="selectRoleType" v-model="queryData.queryType"></single-selector>
                    </a-form-item>

                    <a-form-item class="input-item el-icon-search">
                        <a-select v-model="queryData.goodsType" placeholder="物品类型" allowClear>
                            <a-select-option v-for="item in goodsTypes" :key="item.id" :value="item.id">{{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item class="input-item el-icon-search">
                        <a-select v-model="queryData.sType" placeholder="请选择物品类型" @change="changeQueryTypes">
                            <a-select-option
                                    v-for="item in queryTypes"
                                    :key="item.id"
                                    :value="item.id">{{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item class="input-item el-icon-search">
                        <template v-for="(el, index) in queryTypes">
                            <a-input
                                    @input="handlesTypeValue"
                                    allowClear
                                    :key="index"
                                    v-if="queryData.sType === index+1"
                                    :placeholder="'请输入'+ queryTypes[index].name"
                                    v-model="queryData.sTypeValue"
                                    class="input-item">
                            </a-input>
                        </template>
                    </a-form-item>
                </a-row>
                <a-row>
                    <a-form-item class="input-item el-icon-search">
                        <a-select v-model="queryData.oprType" clearable placeholder="操作类型" @change="changeOprType">
                            <a-select-option
                                    v-for="(item,index) in dataType"
                                    :key="index"
                                    :value="item.id">{{item.name}}
                            </a-select-option>
                        </a-select>

                    </a-form-item>

                    <a-form-item class="input-item el-icon-search">
                        <a-select :disabled="isDisabled" v-model="queryData.reason" placeholder="请选择查询类型" allowClear>
                            <a-select-option
                                    v-for="(item,index) in numricalResource"
                                    :key="index"
                                    :value="item.id">{{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item class="input-item">
                        <a-range-picker style="width:410px"
                                        :showTime="{ format: 'HH:mm' }"
                                        format="YYYY-MM-DD HH:mm"
                                        :placeholder="['开始时间', '结束时间']"
                        />

                    </a-form-item>
                    <a-form-item class="input-item">
                        <a-button type="primary" html-type="submit" style="width: 200px">查询</a-button>
                    </a-form-item>
                </a-row>

            </a-form>
        </a-row>
    </a-card>
        <a-card class="header-container" :bordered="false">
        <a-table :columns="columns" :dataSource="queryResult" bordered :rowKey="(record, index) => index">

            <template slot="time" slot-scope="text,record">
                {{record.time | formatDate }}
            </template>

        </a-table>
    </a-card>

    </div>
</template>
<script>


    const test = [];
    for (let i = 0; i < 102; ++i) {
        test.push({
            account: "129557",
            goodsName: "跃迁星石",
            goodsNum: 111,
            id: 15605507,
            oprType: '增加',
            roleId: 104068,
            roleName: "刘津"+i,
            time: "2019-11-28T09:23:31Z",
            userId: 1890,
            reasonStr:'副本',
            bcUserId:i
        })
    }



    import SingleSelector from '@/components/SingleSelector'
    import {simpleFormat} from '@/util/date'
    // import DatePicker from '@/components/DatePicker'
    //import ServerItem from '@/components/ServerItem'
    export default {
        name: 'index',
        components: {
            SingleSelector,
            //DatePicker
            // ServerItem
        },
        data() {
            return {
                test,
                columns :[
                    {
                        title: '账号',
                        dataIndex: 'account',
                    },
                    {
                        title: '游戏用户ID',
                        dataIndex: 'userId',
                    },
                    {
                        title: '通行证ID',
                        dataIndex: 'bcUserId',
                    },
                    {
                        title: '角色ID',
                        dataIndex: 'roleId',
                    },
                    {
                        title: '角色名称',
                        dataIndex: 'roleName',
                    },
                    {
                        title: '物品名称(ID)',
                        dataIndex: 'goodsName',
                    },
                    {
                        title: '操作类型',
                        dataIndex: 'oprType',
                    },{
                        title: '途径',
                        dataIndex: 'reasonStr',
                    },{
                        title: '数量',
                        dataIndex: 'goodsNum',
                    },
                    {
                        title: '记录时间',
                        dataIndex: 'time',
                        scopedSlots: {customRender: 'time'}
                    }
                ],

                loading: false,
                isDisabled: true,
                form: this.$form.createForm(this),
                queryData: {
                    serverId: '',
                    pageIndex: 1,
                    pageSize: 20,
                    total: 0,
                    queryType: null,
                    goodsType: undefined,
                    oprType: undefined,
                    oprObjType: '',
                    reason: undefined,
                    sType: 1,
                    sTypeValue: '',
                    startTime: '',
                    endTime: ''
                },
                server: [
                    {id: 1001, name: '测试一区'},
                    {id: 1002, name: '测试二区'},
                    {id: 1003, name: '测试三区'},
                    {id: 1004, name: '测试四区'},
                    {id: 1005, name: '测试五区'},
                    {id: 1006, name: '测试六区'},
                    {id: 1007, name: '测试七区'}
                ],
                goodsTypes: [
                    {id: 1, name: "装备"},
                    {id: 2, name: "技能"},
                    {id: 3, name: "碎片"},
                    {id: 4, name: "数值物品"},
                    {id: 5, name: "其他物品"},
                    {id: 6, name: "头像"},
                    {id: 7, name: "阵列激活道具"},
                    {id: 8, name: "时间奖励道具"}
                ],
                queryTypes: [
                    {id: 1, name: '物品ID'},
                    {id: 2, name: '物品名称'}
                ],
                dataType: [{id: 0, name: "添加"}, {id: 1, name: "删除"}, {id: 2, name: "转移"}],
                numricalResource: [{id: 10001, name: "新账号赠送"}, {id: 10002, name: "幻境之塔"}, {
                    id: 10003,
                    name: "神石"
                }, {id: 10004, name: "挂机产生"}, {id: 10005, name: "领取挂机奖励"}, {id: 10006, name: " 先知树抽奖"}, {
                    id: 10007,
                    name: "许愿池"
                }, {id: 10008, name: "召唤法阵"}, {id: 10009, name: "战役战斗奖励"}, {id: 10010, name: "物品合成"}, {
                    id: 10011,
                    name: "市场购买"
                }, {id: 10012, name: "酒馆任务"}, {id: 10013, name: "酒馆加速"}, {id: 10014, name: "每日任务"}, {
                    id: 10015,
                    name: "成就"
                }, {id: 10016, name: "每日签到"}, {id: 10017, name: "勇者试炼通关"}, {id: 10018, name: "勇者试炼战斗胜利"}, {
                    id: 10019,
                    name: " 勇者试炼任务事件"
                }],
                queryResult:[ ]

            }
        },
        watch: {
            'queryData.queryType' () {
                for (let name in this.queryData.queryType) {
                    if (this.queryData.queryType[name] === '') {
                        this.queryData.queryType = null
                    }
                }
            }
        },
        methods: {
            //提交
            handleSubmit() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let queryData = JSON.parse(JSON.stringify(this.queryData))
                        if (queryData.queryType !== null) {
                            Object.assign(queryData, queryData.queryType, true)
                        }
                        queryData = this.lodash.omit(queryData, 'queryType')
                        this.queryResult=this.test
                        console.log(Object.assign(queryData, values))
                    }
                })
            },
            selectRoleType() {
                this.queryData.queryType = null
            },
            //  切换查询物品id/名称
            changeQueryTypes(value) {
                this.queryData.sTypeValue = ''
                this.queryData.sType = value
            },
            // input 输入控制
            handlesTypeValue(value) {
                this.$nextTick(() => {
                    if (this.queryData.sType === 1) {
                        this.queryData.sTypeValue = value.replace(/[^\d]/g, '')
                    }
                })
            },

            //操作类型
            changeOprType(value) {
                this.queryData.oprType = value
                this.type = value
                this.queryData.reason = undefined
                if (value !== '') {
                    this.isDisabled = false
                } else {
                    this.isDisabled = true
                }
            },
            getStartTime(value) {
                this.queryData.startTime = value
            },
            getEndTime(value) {
                this.queryData.endTime = value
            }

        },
        filters: {
            formatDate(value) {
                return simpleFormat(value)
            }
        }
    }
</script>

<style scoped>
    .header-container {
        margin-bottom: 20px;
    }

    .input-item {
        display: inline-block;
    }

    .ant-form-item {
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .el-icon-search {
        width: 200px;
    }

    .pages {
        margin-top: 20px
    }
</style>
