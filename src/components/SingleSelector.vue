<template>
  <div class="single-selector">
    <a-select class="input-item" placeholder="请选择查询类型" v-model="selectedId" @change="selector">

      <a-select-option v-for="item in data" :value="item.id" :key="item.id">{{item.name}}</a-select-option>

    </a-select>
<template v-for="(item, index) in data">
    <a-input  :key="item.id" v-if="item.id === selectedId" v-model="selectedTxt" @input="handleInput" :placeholder="'请输入'+ data[index].name" style="width: 200px" allowClear></a-input>
</template>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default () {
        return [
          { id: 1, name: '角色ID', type: 'roleId' },
          { id: 2, name: '角色名称', type: 'roleName' },
          { id: 3, name: '通行证ID', type: 'bcUserId' },
          { id: 4, name: '游戏用户ID', type: 'userId' },
          { id: 5, name: '账号', type: 'account' }
        ]
      }
    },
    selected: {
      type: [Number, String],
      default: 1
    }
  },
  data () {
    return {
      selectedId: this.selected,
      selectedType: this.data[0].type,
      selectedTxt: ''
    }
  },
  methods: {
    selector (value) {
      this.selectedId = value
      this.selectedType = this.data[value - 1].type
      this.selectedTxt = ''
      const type = this.selectedType
      this.$emit('select', { label: value, type: type })
    },
    handleInput () {
      const id = this.selectedId
      const type = this.selectedType
      this.$nextTick(() => {
        if (id === 1 || id === 3 || id === 4) {
          this.selectedTxt = this.selectedTxt.replace(/[^\d]/g, '')
        }
      })
      this.$emit('input', { [type]: this.selectedTxt })
    }
  }
}
</script>

<style scoped>
  .input-item{
    width: 200px; margin-right: 10px;
  }
  .single-selector{
    display: inline-block;
  }

</style>
