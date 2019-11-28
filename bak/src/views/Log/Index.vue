<template>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
        <a-row class="app-header">

            <a-form :form="form" @submit="handleSubmit">
                <a-row>

                    <a-form-item class="input-item el-icon-search">
                        <!--<server-item v-model="queryData.serverId" v-decorator="['serverId',{rules: [{ required: true, message: '请选择服务器' }]}]"></server-item>-->
                        <a-select placeholder="请选择区服" class="input-item" v-decorator="['serverId',{rules: [{ required: true, message: '请选择服务器' }]}]">

                            <a-select-option v-for="item in server" :value="item.id" :key="item.id">{{item.name}}</a-select-option>

                        </a-select>
                    </a-form-item>


                </a-row>
                <a-button type="primary" html-type="submit">发送邮件</a-button>


            </a-form>
        </a-row>
    </a-card>

</template>
<script>
    //import ServerItem from '@/components/ServerItem'

    export default {
        name: 'index',
       /* components: {
            ServerItem
        },*/
        data() {
            return {
                form: this.$form.createForm(this),
                queryData:{},
                server: [
                    {id:1001,name:'测试一区'},
                    {id:1002,name:'测试二区'},
                    {id:1003,name:'测试三区'},
                    {id:1004,name:'测试四区'},
                    {id:1005,name:'测试五区'},
                    {id:1006,name:'测试六区'},
                    {id:1007,name:'测试七区'}
                ]


            }
        },

        methods: {
            //提交
            handleSubmit() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log(Object.assign(this.queryData, values))
                    }
                })
            }

        },
        filters: {}
    }
</script>

<style scoped>
    .header-container {
        margin-bottom: 20px;
    }

    .input-item {
        display: inline-block;
    }

    .el-icon-search {
        width: 200px;
    }
</style>
