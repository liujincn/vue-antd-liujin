<template>
    <a-select placeholder="请选择区服" v-model="serverId" @change="changeValue" class="input-item">

        <a-select-option v-for="item in server" :value="item.id" :key="item.id">{{item.name}}</a-select-option>

    </a-select>
</template>
<script>
    export default {
        name: 'ServerItems',
        data () {
            return {
                serverId:undefined,
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
            changeValue (value) {
                this.serverId = value
                this.$emit('input', value)
            }
        }
    }
</script>

<style scoped>
    .input-item {
        display: inline-block;
        width: 200px;
    }
</style>
