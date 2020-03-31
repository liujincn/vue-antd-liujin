<template>
    <a-select placeholder="请选择系统" v-model="systemId" @change="changeValue" class="input-item">

        <a-select-option v-for="item in system" :value="item.id" :key="item.id">{{item.name}}</a-select-option>

    </a-select>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'SystemItem',
        data() {
            return {
                systemId: undefined,
                system: [

                ]
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                axios.get('/api/system').then(res => {
                    this.system = res.data.system
                })
            },
            changeValue(value) {
                this.systemId = value
                this.$emit('input', value)
            }
        }
    }
</script>
<style scoped>
    .input-item {
        display: inline-block;
    }
</style>
