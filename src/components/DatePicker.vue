<template>
  <div class="date-picker">
    <a-select
      style="width: 200px; margin-right: 10px;"
      placeholder="请选择日期"
      v-model="datePickerForm.selected"
      @change="changeSelect">
      <a-select-option
        v-for="item in datePickerForm.list"
        :key="item.id"
        :value="item.id">
        {{item.name}}
      </a-select-option>
    </a-select>

    <a-date-picker
            :disabledDate="disabledStartDate"
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            v-model="queryData.startTime"
            placeholder="Start"
            @openChange="handleStartOpenChange"
            @change="changeStartTime"
    />
    <a-date-picker
            @change="changeEndTime"
            :disabledDate="disabledEndDate"
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="End"
            v-model="queryData.endTime"
            :open="endOpen"
            @openChange="handleEndOpenChange"
    />
    <!--<a-date-picker
      style="width: 200px;margin-right: 10px;"
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      @change="changeStartTime"
      v-model="queryData.startTime"
      :picker-options="pickerOptions0"
      placeholder="开始时间">
    </a-date-picker>
    <a-date-picker
      style="width: 200px"
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      @change="changeEndTime"
      v-model="queryData.endTime"
      :picker-options="pickerOptions1"
      placeholder="结束时间">
    </a-date-picker>-->
  </div>
</template>

<script>
import { formatDay } from '@/util/date'
export default {
  props: {
    initNum: {
      type: String,
      default: '99'
    }
  },
  data () {
    return {
      datePickerForm: {
        selected: parseInt(this.initNum),
        list: [
          { id: 99, name: '不限' },
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
          startValue: null,
          endValue: null,
      },
        endOpen: false,

      /*pickerOptions0: {
        disabledDate: (time) => {
          if (this.queryData.endTime !== null) {
            return time.getTime() > this.queryData.endTime
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          if (this.queryData.startTime !== null) {
            return time.getTime() < this.queryData.startTime
          }
        }
      }*/
    }
  },
  created () {
    this.shortcuts(this.datePickerForm.selected)
  },
  methods: {

      disabledStartDate(startValue) {
          const endValue = this.queryData.endTime;
          if (!startValue || !endValue) {
              return false;
          }
          return startValue.valueOf() > endValue.valueOf();
      },
      disabledEndDate(endValue) {
          const startValue = this.queryData.startTime;
          if (!endValue || !startValue) {
              return false;
          }
          return startValue.valueOf() >= endValue.valueOf();
      },
      handleStartOpenChange(open) {
          if (!open) {
              this.endOpen = true;
          }
      },
      handleEndOpenChange(open) {
          this.endOpen = open;
      },



    formatDay (from, to) {
      const date = formatDay(from, to)
      const queryData = this.queryData
      queryData.startTime = Object.assign(date.startTime)
      queryData.endTime = Object.assign(date.endTime)
      this.$emit('startTime', queryData.startTime)
      this.$emit('endTime', queryData.endTime)
    },
    shortcuts (id) {
        console.log(id)
      switch (id) {
            case 0:
                break
            case 1:
                this.formatDay(0, 0)
                break
            case 2:
                this.formatDay(1, 1)
                break
            case 3:
                this.formatDay(2, 2)
                break
            case 4:
                this.formatDay(2, 0)
                break
            case 5:
                this.formatDay(6, 0)
                break
            case 6:
                this.formatDay(30, 0)
                break
            case 7:
                this.formatDay(90, 0)
                break
            case 8:
                this.formatDay(180, 0)
                break
            case 9:
                this.formatDay(365, 0)
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
    changeStartTime (date,value) {
          console.log(value)
      this.queryData.startTime = date
      this.datePickerForm.selected = 0
      this.$emit('startTime', this.queryData.startTime)
    },
    changeEndTime (date,value) {
        console.log(value)
      this.queryData.endTime = date
      this.datePickerForm.selected = 0
      this.$emit('endTime', this.queryData.endTime)
    }
  }
}
</script>

<style scoped>
  .date-picker{
    display: inline-block;
  }
</style>
