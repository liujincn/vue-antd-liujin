<template>
    <a-time-picker
            @change="changeTime"
            v-model="time"
            format="HH:mm:ss"
            placeholder="选择时间">
    </a-time-picker>
</template>

<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                time: null,
            }
        },
        methods: {
            moment,
            changeTime(value) {
                const time = moment(value).format("HH:mm:ss")
                this.$emit('changeTime', time)
            }
        }
    }
</script>
