<template>
  <section class="layout-wrapper">
    <div class="top-bread">后台管理系统</div>
    <div class="navigation">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {},
  mounted () {
  }
}
</script>

<style lang="scss">
.layout-wrapper {
  height: 100%;
  background: #fafafa;
  .top-bread{
    background: black;
    height: 60px;
    color: white;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
  .navigation{
    float: left;
    width: 220px;
    height: 100%;
    margin-bottom: -60px;
    background: rgb(84, 92, 100);
  }
  .main-content{
    margin-left: 220px;
    padding: 10px;
    overflow: hidden;
  }
}
</style>
