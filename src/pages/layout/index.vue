<template>
  <section class="layout">
    <Menu class=layout-menu></Menu>
    <div class="layout-content">
      <Navigation></Navigation>
      <div class="layout-content__main">
        <transition name="router-fade" appear>
          <router-view></router-view>
        </transition>
      </div>
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
    &__main{
      padding: 20px;
      height: 100%;
    }
  }
}
.router-fade-enter, .router-fade-leave-to{
  opacity: 0;
  transform: translateX(30px);
}
.router-fade-enter-active{
  transition: all 0.3s ease;
}
</style>
