<template>
    <div class="app-container">
        <a-card :bordered="false" class="header-container">
            <a-table :columns="columns" :dataSource="data" :rowKey="(data, index) => index" :expandedRowKeys="expands"
                     @expand="expandSelect">
                <!--<a-table  :dataSource="data" :rowKey="(data, index) => index" :expandedRowKeys="expands" @expand="expandSelect" >

                <a-table-column title="大区" dataIndex="areaId" key="areaId"></a-table-column>-->
                <template slot="areaId" slot-scope="text,record">
                    {{record.areaId | formatStatus(areaData)}}
                </template>

                <template slot="worlds" slot-scope="text,record">
                    <a-tag v-if="record.worlds.length ===server.length">所有</a-tag>
                    <div v-else v-for="item in record.worlds" :key="item">
                        <a-tag color="#2db7f5">{{item | formatStatus(server)}}</a-tag>
                    </div>
                </template>

                <template slot="taskType" slot-scope="text,record">
                    <a-tag v-if="record.taskType ===0" color="#2db7f5">实时</a-tag>
                    <a-tag v-else>定时</a-tag>
                </template>


                <template slot="operation" slot-scope="text,record">
                    <a-button :disabled="record.status === 2" type="danger" style="margin-left: 10px;"
                              @click="cancel(record)">撤销
                    </a-button>
                    <a-button :disabled="record.status !== 0" type="danger" style="margin-left: 10px;"
                              @click="stop(record)">停止
                    </a-button>
                </template>

                <template slot="sendStartDate" slot-scope="text,record">
                    <div v-if="record.taskType ===0">&#45;&#45;</div>
                    <div v-else>
                        <a-tag color="#2db7f5">起始日期：{{ record.sendStartDate }} 00:00:00</a-tag>
                        <br/>
                        <a-tag color="#2db7f5" style="margin-top: 10px">截止日期：{{ record.sendEndDate }} 23:59:59</a-tag>
                    </div>
                </template>
                <template slot="sendTime" slot-scope="text,record">
                    <div v-if="record.taskType ===0">&#45;&#45;</div>
                    <p v-else v-for="(item,index) in record.sendTime" :key="index">
                        <a-tag>{{item}}</a-tag>
                    </p>
                </template>

                <template slot="sendInterval" slot-scope="text,record">
                    <div v-if="record.sendInterval ===null">&#45;&#45;</div>
                    <div v-else>
                        {{record.sendInterval}}
                    </div>
                </template>

                <template slot="keepDays" slot-scope="text,record">
                    <div v-if="record.keepDays ===''">&#45;&#45;</div>
                    <div v-else>
                        {{record.keepDays}}
                    </div>
                </template>

                <template slot="reason" slot-scope="text,record">
                    <div v-if="record.reason ===''">&#45;&#45;</div>
                    <div v-else>
                        {{record.reason}}
                    </div>
                </template>


                <template slot="goodsItems" slot-scope="text,record">
                    <div v-if="record.goodsItems.length ===0 ">&#45;&#45;</div>
                    <p v-else v-for="(item,index) in record.goodsItems" :key="index">
                        <a-tag color="#2db7f5">
                            物品ID：{{item.id}}，数量：{{item.num}}
                        </a-tag>
                    </p>
                </template>

                <template slot="status" slot-scope="text,record">
                    <template v-for="(item,index) in statusData">
                        <span :key="index" v-if="record.status === item.id"><a-tag
                                :type="item.type">{{ item.name }}</a-tag></span>
                    </template>

                </template>

                <template slot="creator" slot-scope="text,record">
                    {{record.creator.name}}
                </template>
                <div slot="expandedRowRender" slot-scope="record">

                    <h4 style="color: #f00;">邮件内容</h4>
                    <a-table
                            :columns="innerColumns"
                            :dataSource="record.mulLanguages"
                            :pagination="false"
                            :rowKey="(record, index) => index">
                        <template slot="languageId" slot-scope="text,record">
                            {{record.languageId | formatStatus(languageData)}}
                        </template>
                    </a-table>

                    <h4 style="color: #f00;margin-top: 10px;">子任务({{record.subTasks.length}})</h4>
                    <a-table
                            :dataSource="record.subTasks"
                            :pagination="false"
                            :rowKey="(record, index) => index"
                    >
                        <a-table-column title="序列">
                            <template slot-scope="text,record,index">
                                {{index+1}}
                            </template>
                        </a-table-column>

                        <a-table-column title="发送状态" dataIndex="isSent" key="isSent">
                            <template slot-scope="isSent">
                                <a-tag v-if="isSent === true" color="green">已发送</a-tag>
                                <a-tag v-if="isSent === false" color="#2db7f5">未发送</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column title="实际发送时间" dataIndex="sendTime" key="sendTime">
                            <template slot-scope="sendTime">
                                {{sendTime | formatDate }}
                            </template>
                        </a-table-column>
                    </a-table>
                    <h4 style="color: #f00; margin-top: 10px;">
                        <em style=" font-style: normal">
                            <span v-if="record.filter.excludes===null">指定</span>
                            <span v-else>排除</span>
                        </em>
                        收件人(
                        <em style=" font-style: normal">
                            <span v-if="record.filter.excludes===null &&record.filter.receivers===null">所有人/</span>
                            <span v-if="record.filter.excludes!==null">{{record.filter.excludes.length}}人/</span>
                            <span v-if="record.filter.receivers!==null">{{record.filter.receivers.length}}人/</span>
                        </em>
                        <em style=" font-style: normal">
                            <span v-if="record.worlds.length ===0">所有服务器</span>
                            <span v-else v-for="item in record.worlds"
                                  :key="item">{{item | formatStatus(server)}};</span>)
                        </em>
                    </h4>
                    <a-row style="line-height: 30px; padding: 10px 0; width: 100%" v-if="record.filter.excludes!==null">
                        <el-tag v-for="(item,index) in scope.row.filter.excludes" :key="index"
                                style="margin:0 10px 10px; width: 70px;text-align: center">{{item}}
                        </el-tag>
                    </a-row>
                    <a-row style="line-height: 30px; padding: 10px 0;" v-if="record.filter.receivers!==null">
                        <a-tag color="green" v-for="(item,index) in record.filter.receivers" :key="index"
                               style="margin:0 10px 10px; width: 70px; text-align: center">{{item}}
                        </a-tag>
                    </a-row>
                </div>

            </a-table>

        </a-card>
    </div>

</template>
<script>
    import {simpleFormat} from '@/util/date'
    import {transformData} from '@/util/transform'


    const columns = [
        {title: '服务器', key: 'areaId', scopedSlots: {customRender: 'areaId'}},
        {title: '游戏世界', key: 'worlds', scopedSlots: {customRender: 'worlds'}},
        {title: '任务类型', key: 'taskType', scopedSlots: {customRender: 'taskType'}},
        {title: '定时日期', key: 'sendStartDate', scopedSlots: {customRender: 'sendStartDate'}},
        {title: '定时发送时间', key: 'sendTime', scopedSlots: {customRender: 'sendTime'}},
        {title: '间隔天数', key: 'sendInterval', scopedSlots: {customRender: 'sendInterval'}},
        {title: '过期时间', key: 'keepDays', scopedSlots: {customRender: 'keepDays'}},
        {title: '发送原因', key: 'reason', scopedSlots: {customRender: 'reason'}},
        {title: '附件', key: 'goodsItems', scopedSlots: {customRender: 'goodsItems'}},
        {title: '状态', key: 'status', scopedSlots: {customRender: 'status'}},
        {title: '创建人', key: 'creator', scopedSlots: {customRender: 'creator'}},
        {title: '操作', key: 'operation', scopedSlots: {customRender: 'operation'}},
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            areaId: 1,
            createdTime: "2019-11-14T02:23:31.725Z",
            creator: {name: "段郴", id: "0ca43155-6328-4acc-bb84-a3c090d100c4"},
            filter: {
                channels: [],
                excludes: null,
                gender: null,
                level: 0,
                opSystems: [],
                receivers: [10086],
                rechargeNum: 0,
                roleCreateAfter: null,
                roleCreateBefore: null
            },
            goodsItems: [{id: 1, num: 10}, {id: 2, num: 10}],
            id:  i,
            keepDays: 3,
            mulLanguages: [
                {languageId: 1, title: "标题测试", content: "内容测试"},
                {languageId: 2, title: "标题测试", content: "内容测试"},
                {languageId: 3, title: "标题测试", content: "内容测试"}
            ],
            reason: "测试",
            sendEndDate: '2019-11-20',
            sendInterval: null,
            sendStartDate: '2019-11-20',
            sendTime: ["17:25:00", "18:25:00"],
            status: 3,
            subTasks: [{
                sendTime: "2019-11-14T02:23:31.725Z",
                isSent: true,
                id: "90cc07e5-4772-4f3c-a8ab-3d7d45b8042f"
            }],
            taskType: 1,
            timezone: null,
            worlds: [1001]
        })
    }

    const innerColumns = [
        {title: '语言', key: 'languageId', scopedSlots: {customRender: 'languageId'}},
        {title: '标题', key: 'title', dataIndex: 'title'},
        {title: '内容', key: 'content', dataIndex: 'content'},

    ]

    export default {
        name: 'form-demo',
        data() {
            return {
                data,
                columns,
                innerColumns,
                expands: [],
                areaData: [
                    {id: 1, name: '开发区'},
                    {id: 2, name: '测试区'},
                ],
                server: [
                    {id: 1001, name: '测试一区'},
                    {id: 1002, name: '测试二区'},
                    {id: 1003, name: '测试三区'},
                    {id: 1004, name: '测试四区'},
                    {id: 1005, name: '测试五区'},
                    {id: 1006, name: '测试六区'},
                    {id: 1007, name: '测试七区'}
                ],
                statusData: [
                    {id: 0, name: '正常', type: ''},
                    {id: 1, name: '已停止', type: 'orange'},
                    {id: 2, name: '已撤销', type: 'red'},
                    {id: 3, name: '已完成', type: 'blue'}
                ],
                languageData: [{id: 1, name: "中文"}, {"id": 2, name: "英文"}, {"id": 3, name: "繁体"}, {
                    "id": 4,
                    name: "印尼语"
                }, {"id": 5, name: "菲律宾"}, {"id": 6, name: "越南"}, {"id": 7, name: "泰语"}, {
                    "id": 8,
                    name: "葡萄牙语"
                }, {"id": 9, name: "韩语"}, {"id": 10, name: "法语"}, {"id": 11, name: "德语"}, {"id": 12, name: "马来语"}]

            }
        },
        methods: {

            cancel(record) {
                this.$confirm({
                    title: '此操作不可撤回, 是否继续?',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        console.log(record.id)
                    },
                    onCancel() {
                        console.log(record.id)
                    }
                })
            },
            stop(record) {
                console.log(record.id)
            },
            expandSelect(expanded, record) {
                if (expanded) {
                    this.expands = []
                    if (record) {
                        this.expands.push(record.id)
                    }
                } else {
                    this.expands = []
                }
            },

        },
        filters: {
            formatDate(value) {
                return simpleFormat(value)
            },
            formatStatus(value, arr) {
                return transformData(value, arr)
            }
        }
    }
</script>
