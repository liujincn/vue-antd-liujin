<template>
  <a-select placeholder="请选择区服"
            v-model="serverId"
            @change="changeValue"
            class="input-item">

    <a-select-option v-for="item in server"
                     :value="item.id"
                     :key="item.id">{{item.name}}</a-select-option>

  </a-select>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ServerItem',
  data () {
    return {
      serverId: undefined,
      server: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      axios.get('/api/server').then(res => {
        this.server = res.data.server
      })
    },
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
}
</style>
