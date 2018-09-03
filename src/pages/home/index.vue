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
  </section>
</template>

<script>
import HiForm from '@/components/HiForm'
export default {
  data () {
    return {}
  },
  components: {
    HiForm
  },
  methods: {},
  mounted () {
  }
}
</script>

<style lang="scss">

</style>
