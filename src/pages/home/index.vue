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
    <!--<prototype></prototype>-->
    <!--<tree></tree>-->
    <!--<publish></publish>-->
    <order>Order</order>
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
  },
  mounted () {
  }
}
</script>

<style lang="scss">

</style>
