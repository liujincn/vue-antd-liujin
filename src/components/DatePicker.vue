<template>
  <div class="date-picker">
    <a-select style="width: 200px; margin-right: 10px;"
              placeholder="请选择日期"
              v-model="datePickerForm.selected"
              @change="changeSelect">
      <a-select-option v-for="item in datePickerForm.list"
                       :key="item.id"
                       :value="item.id">
        {{item.name}}
      </a-select-option>
    </a-select>

    <a-date-picker :disabledDate="disabledStartDate"
                   style="width: 200px;"
                   showTime
                   format="YYYY-MM-DD HH:mm:ss"
                   v-model="queryData.startTime"
                   placeholder="开始时间"
                   @openChange="handleStartOpenChange"
                   @change="changeStartTime" />
    <a-date-picker @change="changeEndTime"
                   style="width: 200px;margin-left: 10px;"
                   :disabledDate="disabledEndDate"
                   showTime
                   format="YYYY-MM-DD HH:mm:ss"
                   placeholder="结束时间"
                   v-model="queryData.endTime"
                   :open="endOpen"
                   @openChange="handleEndOpenChange" />
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    initNum: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      datePickerForm: {
        selected: parseInt(this.initNum),
        list: [
          { id: 0, name: '指定时间' },
          { id: 1, name: '今天' },
          { id: 2, name: '昨天' },
          { id: 3, name: '前天' },
          { id: 4, name: '近三天' },
          { id: 5, name: '近一周' },
          { id: 6, name: '近一月' },
          { id: 7, name: '近三月' },
          { id: 8, name: '近半年' },
          { id: 9, name: '近一年' }
        ]
      },

      queryData: {
        startTime: null,
        endTime: null
      },
      endOpen: false

    }
  },
  created () {
    this.shortcuts(this.datePickerForm.selected)
  },
  methods: {
    disabledStartDate (startValue) {
      const endValue = this.queryData.endTime;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate (endValue) {
      const startValue = this.queryData.startTime;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange (open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange (open) {
      this.endOpen = open;
    },
    shortcuts (id) {
      switch (id) {
        case 0:
          this.queryData.startTime = null
          this.queryData.endTime = null
          break
        case 1:
          this.queryData.startTime = moment().startOf('day')
          this.queryData.endTime = moment().endOf('day')
          break
        case 2:
          this.queryData.startTime = moment().startOf('day').subtract(1, 'days')
          this.queryData.endTime = moment().endOf('day').subtract(1, 'days')
          break
        case 3:
          this.queryData.startTime = moment().startOf('day').subtract(2, 'days')
          this.queryData.endTime = moment().endOf('day').subtract(2, 'days')
          break
        case 4:
          this.queryData.startTime = moment().startOf('day').subtract(2, 'days')
          this.queryData.endTime = moment().endOf('day')
          break
        case 5:
          this.queryData.startTime = moment().startOf('day').subtract(6, 'days')
          this.queryData.endTime = moment().endOf('day')
          break
        case 6:
          this.queryData.startTime = moment().startOf('day').subtract(29, 'days')
          this.queryData.endTime = moment().endOf('day')
          break
        case 7:
          this.queryData.startTime = moment().startOf('day').subtract(89, 'days')
          this.queryData.endTime = moment().endOf('day')
          break
        case 8:
          this.queryData.startTime = moment().startOf('day').subtract(181, 'days')
          this.queryData.endTime = moment().endOf('day')
          break
        case 9:
          this.queryData.startTime = moment().startOf('day').subtract(364, 'days')
          this.queryData.endTime = moment().endOf('day')
          break
        default:
          this.queryData.startTime = null
          this.queryData.endTime = null
          this.$emit('startTime', this.queryData.startTime)
          this.$emit('endTime', this.queryData.endTime)
      }
    },
    changeSelect (value) {
      this.shortcuts(value)
    },
    changeStartTime (date) {
      this.queryData.startTime = date
      this.datePickerForm.selected = 0
      this.$emit('startTime', date)
    },
    changeEndTime (date) {
      this.queryData.endTime = date
      this.datePickerForm.selected = 0
      this.$emit('endTime', date)
    }
  }
}
</script>

<style scoped>
.date-picker {
  display: inline-block;
}
</style>
