<template>
  <section class="hi-layout-wrapper">
    <div class="left" :style="{width: width + 'px'}">
      <slot name="left"></slot>
    </div>
    <div class="right" :style="{marginLeft: width + 'px'}">
      <slot></slot>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      width: {
        type: String,
        default: '220'
      }
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="scss">
  .hi-layout-wrapper {
    width: 100%;
    .left {
      width: 300px;
      height: 100px;
      float: left;
      .el-card__header {
        padding: 15px;
      }
      .el-card__body {
        padding: 15px;
        .item {
          padding-bottom: 10px;
        }
        .item:last-child {
          padding-bottom: 0;
        }
        .footer {
          padding-top: 10px;
          display: flex;
          justify-content: space-around;
        }
      }
    }
    .right {
      margin-left: 300px;
      padding-left: 20px;
    }
  }
</style>
