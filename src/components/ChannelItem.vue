<template>
    <a-select placeholder="请选择渠道" v-model="channelId" @change="changeValue" class="input-item">

        <a-select-option v-for="item in channel" :value="item.id" :key="item.id">{{item.name}}</a-select-option>

    </a-select>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'ChannelItem',
        data() {
            return {
                channelId: undefined,
                channel: []
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                axios.get('/api/channel').then(res => {
                    this.channel = res.data.channel
                })
            },
            changeValue(value) {
                this.channelId = value
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
