<template>
  <div>
    <a-date-picker @change="onChange" />
    <br />
    <a-month-picker @change="onChange" placeholder="Select month" />
    <br />
    <a-range-picker @change="onChange" />
    <br />
    <a-week-picker @change="onChange" placeholder="Select week" />
  </div>
</template>
<script>
    export default {
        methods: {
            onChange(date, dateString) {
                console.log(dateString);
            }
        }
    }
</script>
