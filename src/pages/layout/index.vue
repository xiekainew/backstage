<template>
  <section class="layout">
    <Menu class=layout-menu></Menu>
    <div class="layout-content">
      <Navigation></Navigation>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import Menu from './menu.vue'
import Navigation from './navigation.vue'
export default {
  data () {
    return {}
  },
  components: {
    Menu,
    Navigation
  },
  methods: {},
  mounted () {
  }
}
</script>

<style lang="scss">
.layout {
  height: 100%;
  background: #f0f2f5;
  &-menu{
    float: left;
    // width: 200px;
    height: 100%;
    margin-bottom: -60px;
    background: rgb(48, 65, 86);
    .el-menu{
      border-right: none;
    }
  }
  &-content{
    // margin-left: 200px;
    overflow: hidden;
  }
}
</style>
