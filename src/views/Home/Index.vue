<template>
  <div>
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
            :dataSource="dataSource">
      <a-list-item slot="renderItem"
                   slot-scope="item">
        <a-card :title="item.title">{{item.content}} </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      dataSource: [{
        title: 'Title 1',
        content: 'content 1'
      },
      {
        title: 'Title 2',
        content: 'content 2'
      },
      {
        title: 'Title 3',
        content: 'content 3'
      },
      {
        title: 'Title 4',
        content: 'content 4'
      },
      {
        title: 'Title 5',
        content: 'content 5'
      },
      {
        title: 'Title 6',
        content: 'content 6'
      }]
    }
  },
}
</script>
<style scoped>
.a-col {
  background: #f00;
}
</style>

