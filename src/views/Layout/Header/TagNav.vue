<template>
  <div>
    <div class="tagNavBox">
      <transition-group name="list"
                        tag="ul">
        <li v-for="(item, index) in $store.getters.tagNav"
            @contextmenu.prevent="openMenu(item,$event,index)"
            :key="item.title"
            class="tagNav"
            :class="{ active: $route.path === item.path }">
          <router-link :to="item.path">{{ item.title}}</router-link>
          <a-icon v-if="index !== 0"
                  type="close"
                  @click="removeTag(item)"
                  :style="{ fontSize: '8px' }"></a-icon>
        </li>
      </transition-group>
    </div>
    <ul v-show="this.contextMenuShow"
        :style="{left:this.left+'px',top:this.top+'px'}"
        class="menuBox">
      <li @click="removeTag($store.getters.selectTag)">关闭</li>
      <li @click="removeOtherTag($store.getters.selectTag)">关闭其他</li>
      <li @click="removeAllTag">关闭所有</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tagNav',
  data () {
    return {
      contextMenuShow: false,
      left: 0,
      top: 0
    }
  },
  methods: {
    openMenu (item, e, index) {
      if (index === 0) {
        return false
      }
      this.contextMenuShow = true
      this.left = e.clientX + 10
      this.top = e.clientY
      this.$store.dispatch('openMenu', item)
    },
    removeTag (tabItem) {
      this.$store.dispatch('removeTag', { tabItem, fullPath: this.$route.fullPath, router: this.$router })
    },
    removeOtherTag (tabItem) {
      this.$store.dispatch('removeOtherTag', { tabItem, fullPath: this.$route.fullPath, router: this.$router })
    },
    removeAllTag () {
      this.$store.dispatch('removeOtherTag', { all: true, fullPath: this.$route.fullPath, router: this.$router })
    }
  },
  watch: {
    contextMenuShow (value) {
      if (value) {
        document.body.addEventListener('click', () => {
          this.contextMenuShow = false
        })
      } else {
        document.body.removeEventListener('click', () => {
          this.contextMenuShow = false
        })
      }
    }
  }
}
</script>
<style>
li {
  list-style: none;
}
.tagNav {
  display: inline-block;
  transition: all 0.5s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
}

.list-enter-active {
  transition: all 0.5s;
}

.list-leave-active {
  position: absolute;
  transition: all 0.5s;
}
</style>
<style lang="scss">
$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);

%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}

.tagNavBox {
  @extend %w100;
  padding-top: 10px;

  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  ul {
    display: flex;
    justify-content: flex-start;
    padding-#{$left}: 20px;
    flex-wrap: nowrap;
    overflow-x: auto;
    li {
      height: 30px;
      line-height: 30px;
      @extend %cursor;
      margin-#{$right}: 5px;
      text-align: center;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      border: 1px solid #cccccc;
      border-bottom: none;
      &:not(:first-child) {
        padding-#{$right}: 10px;
        min-width: 80px;
      }
      a {
        @include set-value(padding, 13px);
        display: inline-block;
        @extend %h100;
        font-size: 12px;
        color: #999999;
      }
      &:nth-child(n + 2) {
        a {
          padding-#{$right}: 15px;
        }
      }
      i {
        @extend %cursor;
        &:hover {
          color: red;
        }
      }
    }
    li.active {
      background: #409eff;
      color: #ffffff;
      a {
        color: #ffffff;
      }
    }
  }
}

.menuBox {
  margin: 0;
  background: #fff;
  z-index: 999;
  position: absolute;
  padding: 5px 0;
  border: 1px solid #cccccc;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 1px 6px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    @extend %cursor;
    &:hover {
      background: #e1e6ea;
    }
  }
}
</style>
