<template>
    <div class="app-container">
        <a-card :bordered="false" class="header-container">
            <a-row class="app-header">
                <a-form :form="form" @submit.native.prevent="handleSubmit">
                    <a-row style="float: right">
                        <a-form-item class="input-item">
                            <a-radio-group defaultValue="0" buttonStyle="solid">
                                <a-radio-button value="0">待处理</a-radio-button>
                                <a-radio-button value="1">被封禁</a-radio-button>
                                <a-radio-button value="2">不处理</a-radio-button>
                            </a-radio-group>
                        </a-form-item>
                        <a-form-item class="input-item">
                            <a-input allowClear placeholder="角色名或者内容" v-model='queryData.keyword' class="input-item">
                                查询
                            </a-input>
                        </a-form-item>
                        <a-form-item class="input-item">
                            <a-button type="primary" html-type="submit">查询</a-button>
                        </a-form-item>
                    </a-row>

                    <a-row style="float: left">
                        <a-form-item class="input-item">
                            <a-dropdown>
                                <a-menu slot="overlay" @click="postFreeze">
                                    <a-menu-item v-for="item in freezeTypes" :key="item.id">
                                        <a-tag :color="item.tagType" :title="item.title">{{item.type}}</a-tag>
                                        {{item.label}}
                                    </a-menu-item>
                                    <a-menu-item key="other">
                                        <a-tag color="red" title="其他">...</a-tag>
                                        其他
                                    </a-menu-item>
                                </a-menu>
                                <a-button type="primary">封号操作<a-icon type="down"/></a-button>
                            </a-dropdown>
                        </a-form-item>

                        <a-form-item class="input-item">
                            <a-dropdown>
                                <a-menu slot="overlay" @click="postMute">
                                    <a-menu-item v-for="item in muteTypes" :key="item.id">
                                        {{item.label}}
                                    </a-menu-item>
                                    <a-menu-item key="other">其他</a-menu-item>
                                </a-menu>
                                <a-button type="primary">禁言操作<a-icon type="down"/></a-button>
                            </a-dropdown>
                        </a-form-item>
                        <a-form-item class="input-item">
                            <a-button type="primary" @click="postKick">不处理</a-button>
                        </a-form-item>

                    </a-row>
                </a-form>
            </a-row>
        </a-card>
        <a-card class="header-container" :bordered="false">
            <a-table :columns="columns" :dataSource="queryResult" bordered :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
                <template slot="time" slot-scope="text,record">
                    {{record.time | formatDate }}
                </template>
            </a-table>
        </a-card>
        <a-modal title="请输入你需要封号的天数" v-model="dayFormVisible" :footer="null" width="400px">
            <a-form :form="form" @submit="submitOtherDay">
                <a-form-item label="天数" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input @change="controlMute" v-decorator="['days', { rules: [{ required: true, message: '请输入时间' }] }]"></a-input>
                </a-form-item>
                <a-form-item label="封号类别" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-select v-decorator="['freezeType',{ rules: [{ required: true, message: '请选择封号类别' }] },]" placeholder="请选择封号类别" >
                        <a-select-option
                                v-for="(item,index) in types"
                                :key="index"
                                :value="item.id">{{item.name}}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                    <a-button type="primary" html-type="submit" style="width:100%">提交</a-button>
            </a-form>
        </a-modal>

        <a-modal title="请输入你需要禁言的时间" v-model="muniteFormVisible" :footer="null" width="400px">
            <a-form :form="form" @submit="submitOtherMunite">
                <a-form-item label="分钟" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input @change="controlFreeze" v-decorator="['otherMunite', { rules: [{ required: true, message: '请输入时间' }] }]"></a-input>
                </a-form-item>
                <a-button type="primary" html-type="submit" style="width:100%">提交</a-button>
            </a-form>
        </a-modal>





    </div>
</template>
<script>

    const columns = [
        {
            title: '名字',
            dataIndex: 'name',
        },
        {
            title: '年纪',
            dataIndex: 'age',
        },
        {
            title: '地址',
            dataIndex: 'address',
        },
    ];

    const test = [];
    for (let i = 1; i < 46; i++) {
        test.push({
            key: i,
            name: `刘津 ${i}`,
            age: 18,
            address: `深圳no. ${i}`,
        });
    }
    import {simpleFormat} from '@/util/date'

    export default {
        name: 'message',
        data() {
            return {
                test,
                columns,
                muniteFormVisible: false,
                dayFormVisible: false,
                queryResult: [],
                selectedRowKeys: [],
                queryData: {
                    pageIndex: 1,
                    pageSize: 20,
                    status: 0,
                    keyword: '',
                },
                form: this.$form.createForm(this),
                freezeTypes: [
                    {id: 1, day: 3, label: '封号3天', type: '角', freezeType: 4, tagType: 'cyan', title: '角色ID'},
                    {id: 2, day: 365 * 20, label: '永久封号', type: '角', freezeType: 4, tagType: 'cyan', title: '角色ID'},
                    {id: 3, day: 3, label: '封号3天', type: '账', tagType: 'blue', freezeType: 1, title: '账号'},
                    {id: 4, day: 365 * 20, label: '永久封号', type: '账', tagType: 'blue', freezeType: 1, title: '账号'},
                    {id: 5, day: 3, label: '永久封号', type: '设', tagType: 'purple', freezeType: 3, title: '设备'},
                    {id: 6, day: 365 * 20, label: '永久封号', type: '设', tagType: 'purple', freezeType: 3, title: '设备'},
                    {id: 7, day: 3, label: '永久封号', type: 'IP', tagType: 'orange', freezeType: 2, title: 'IP'},
                    {id: 8, day: 365 * 20, label: '永久封号', type: 'IP', tagType: 'orange', freezeType: 2, title: 'IP'}
                ],
                muteTypes: [
                    {id: 1, munite: 1 * 60, label: '禁言60分钟'},
                    {id: 2, munite: 5 * 60, label: '禁言300分钟'},
                    {id: 3, munite: 24 * 60, label: '禁言1440分钟'}
                ],
                postFreezeData: {
                    ids: [],
                    freezeType: '',
                    days: '',
                    worldId: 0
                },
                postMuteData: {
                    ids: [],
                    munites: '',
                    worldId: 0
                },
                types: [
                    {id: 1, name: '账号ID'},
                    {id: 2, name: 'IP'},
                    {id: 3, name: '设备'},
                    {id: 4, name: '角色ID'}
                ],
                postUnhandleData: {
                    ids: []
                }
            }
        },
        created () {
            this.handleSubmit()
        },
        methods: {
            //查询
            handleSubmit() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let queryData = JSON.parse(JSON.stringify(this.queryData))
                        if (queryData.queryType !== null) {
                            Object.assign(queryData, queryData.queryType, true)
                        }
                        queryData = this.lodash.omit(queryData, 'queryType')
                        this.selectedRowKeys = []
                        this.queryResult = this.test
                        console.log(Object.assign(queryData, values))
                    }
                })
            },
            //  选择row
            onSelectChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys
                console.log(this.selectedRowKeys)
            },
            // 封号处理
            postFreeze(e) {
                if (this.selectedRowKeys.length === 0) {
                    this.postFreezeData.days = ''
                    this.$message.warning('请选择你需要操作的玩家！')

                } else {
                    if (e.key === 'other') {
                        console.log('其他操作')
                        this.creatingDay()
                    } else {
                        this.postFreezeData.days = this.freezeTypes[e.key - 1].day
                        this.postFreezeData.freezeType = this.freezeTypes[e.key - 1].freezeType
                        this.selectedFreezeType = this.freezeTypes[e.key - 1].label
                        this.selectedFreezeFreezeType = this.freezeTypes[e.key - 1].title
                        this.postFreezeData.ids = this.selectedRowKeys
                        this.$confirm({
                            title: '提示',
                            content: ' 对玩家进行' + ' [' + this.selectedFreezeFreezeType + '' + this.selectedFreezeType + '] ， 是否继续?, 提示',
                            okText: '确认',
                            cancelText: '取消',
                            onOk: () => {
                                console.log(this.postFreezeData)
                                this.$message.success('操作成功')
                            },
                            onCancel: () => {
                                this.$message.warning('已取消')
                            }

                        })
                    }
                }
            },
            // 禁言处理
            postMute (e) {
                if (this.selectedRowKeys.length === 0) {
                    this.postMuteData.munites = ''
                    this.$message.warning('请选择你需要操作的玩家！')
                } else {
                    if (e.key === 'other') {
                        this.creatingMunite()
                    } else {
                        this.postMuteData.munites = this.muteTypes[e.key - 1].munite
                        this.selectedMuteType = this.muteTypes[e.key - 1].label
                        this.postMuteData.ids = this.selectedRowKeys
                        this.$confirm({
                            title: '提示',
                            content: ' 对玩家进行' + ' [' + this.selectedMuteType + '] ， 是否继续?, 提示',
                            okText: '确认',
                            cancelText: '取消',
                            onOk: () => {
                                console.log(this.postMuteData)
                                this.$message.success('操作成功')
                            },
                            onCancel: () => {
                                this.$message.warning('已取消')
                            }
                        })
                    }
                }
            },
            // dialog
            creatingMunite () {
                this.muniteFormVisible = true
            },
            creatingDay () {
                this.dayFormVisible = true
            },
            // 其他时间封号
            submitOtherDay(e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.postFreezeData.freezeType = values.freezeType
                        this.postFreezeData.days = values.days
                        this.postFreezeData.ids = this.selectedRowKeys
                        console.log(this.postFreezeData)
                        this.$message.success('操作成功')
                        this.dayFormVisible =false
                    }
                })
            },
            // 其他时间禁言
            submitOtherMunite (e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.postMuteData.munites = values.otherMunite
                        this.postMuteData.ids = this.selectedRowKeys
                        console.log(this.postMuteData)
                        this.$message.success('操作成功')
                        this.muniteFormVisible =false
                    }
                })
            },
            // 不处理
            postKick () {
                if (this.selectedRowKeys.length === 0) {
                    this.$message.warning('请选择你需要操作的玩家！')
                } else {
                    this.postUnhandleData.ids = this.selectedRowKeys
                    this.$confirm({
                        title: '此操作不可撤回, 是否继续?',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            console.log(this.postUnhandleData)
                            this.$message.success('操作成功')
                        },
                        onCancel: () => {
                            this.$message.warning('已取消')
                        }
                    })
                }
            },
            controlFreeze (e) {
                console.log(e.target.value)
                    e.target.value = e.target.value.replace(/^(0+)|[^\d]+/gi, '')
                    if (e.target.value > 365 * 20) {
                        this.$message.warning('封号不能超过7300天(20年)!')
                        e.target.value = ''
                    }
            },
            controlMute (e) {
                console.log(e.target.value)
                    e.target.value = e.target.value.replace(/^(0+)|[^\d]+/gi, '')
                    if (e.target.value > 365 * 20 * 24 * 60) {
                        this.$message.warning('禁言不能超过10512000分钟(20年)!')
                        e.target.value = ''
                    }
            },
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
        width: 120px;
    }
    .pages {
        margin-top: 20px
    }
</style>

