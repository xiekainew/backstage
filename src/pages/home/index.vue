<template>
  <section class="">
    <el-form ref="form" label-width="120px">
      <hi-form
        label="姓名"
        prop="value"
        required
      ></hi-form>
      <hi-form
        label="拼音码"
        prop="value"
        required="isSpell"
      ></hi-form>
    </el-form>
    <div class="list" v-for="item in list" :key="item">{{item}}</div>
    <span class="list1" v-for="item in list1" :key="item">{{item}}</span>
    <span>{{a}}</span>
    <!--<prototype></prototype>-->
    <!--<tree></tree>-->
    <!--<publish></publish>-->
    <!--<order>Order</order>-->
  </section>
</template>

<script>
import HiForm from '@/components/HiForm'
import Prototype from './prototype.vue'
import Tree from './tree'
import Publish from './test/publish'
import Order from './order.vue'
export default {
  data () {
    return {
      list: [],
      list1: [],
      a: {
        name: '12'
      }
    }
  },
  components: {
    HiForm,
    Prototype,
    Tree,
    Publish,
    Order
  },
  methods: {
    getList () {
      requestAnimationFrame(function () {
        console.log('animation')
      })
      new Promise(function (resolve, reject) {
        console.log(122)
        resolve()
      }).then(() => {
        console.log(666)
      })
      new Promise(function (resolve, reject) {
        console.log(122)
        resolve()
      }).then(() => {
        let num = document.getElementsByClassName('list')
        let num1 = document.getElementsByClassName('list1')
        console.log('p-num', num.length)
        console.log('p-num1', num1.length)
      })

      this.$nextTick(() => {
        let num = document.getElementsByClassName('list')
        let num1 = document.getElementsByClassName('list1')
        console.log('num', num.length)
        console.log('num1', num1.length)
      })

      this.list = [1, 2]
      this.list1 = [3, 4, 5]
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss">

</style>
