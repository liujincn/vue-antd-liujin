<template>
  <svg :class="svgClass"
       aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>
<style scoped>
.svg-icon {
  width: 1rem;
  height: 1rem;
  vertical-align: -0.15rem;
  fill: currentColor;
  margin-right: 0.5rem;
}
</style>
