<template>
  <section></section>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    init () {
      const Event = (function () {
        let clientList = {}
        let listen = function (key, fn) {
          if (!clientList[key]) {
            clientList[key] = []
          }
          clientList[key].push(fn)
        }
        let trigger = function () {
          console.log(arguments)
          let key = [].shift.apply(arguments)
          let fns = clientList[key]
          if (!fns || !fns.length) {
            return
          }
          for (let i = 0, l = fns.length; i < l; i++) {
            // fns[i].apply(this, arguments)
            // fns[i].apply(arguments)
            fns[i].call()
            // fns[i]()
          }
        }
        return {
          listen: listen,
          trigger: trigger
        }
      })()
      Event.listen('ok', function () {
        console.log('已经OK啦')
      })
      Event.listen('sha', function () {
        console.log('你说的啥')
      })
      Event.trigger('ok')
      // Event.trigger('sha')
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss">

</style>
