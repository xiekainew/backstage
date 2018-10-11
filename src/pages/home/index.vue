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
    return {
      test: [2, 89, 3, 1, 6, 12, 21, 13, 54, 43, 9]
    }
  },
  components: {
    HiForm
  },
  methods: {
    /**
     * 算法参考某个元素值，将小于它的值，放到左数组中，
     * 大于它的值的元素就放到右数组中，然后递归进行上一次左右数组的操作，
     * 返回合并的数组就是已经排好顺序的数组了。
     */
    fast (arr) {
      if (arr.length <= 1) {
        return arr
      }
      let leftArr = []
      let rightArr = []
      let q = arr[0]
      for (let i = 1; i < arr.length; i++) {
        if (q > arr[i]) {
          leftArr.push(arr[i])
        } else {
          rightArr.push(arr[i])
        }
      }
      return [].concat(this.fast(leftArr), [q], this.fast(rightArr))
    },
    bubble (arr) {
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i; j < arr.length; j++) {
          if (arr[i] > arr[j]) {
            let m = arr[i]
            arr[i] = arr[j]
            arr[j] = m
          }
        }
      }
      return arr
    },
    /**
     * 对整个为排序的数列分为两个部分，一部分是已经排序好的，
     * 一部分是没有排序好的，每次都从还未排序好的数列中去除一个数，
     * 插入到已经排序好的数列之中，直到未排序的数列为零；
     */
    insert (arr) {
      let p = [arr.shift()]
      while (arr.length) {
        console.log(p)
        let a = arr.shift()
        for (let i = 0, l = p.length; i < l; i++) {
          if (p.length === 1) {
            if (a > p[i]) {
              p.splice(i + 1, 0, a)
            } else {
              p.unshift(a)
            }
          } else {
            if (p[i + 1]) {
              console.log(p[i], p[i + 1])
              if (a < p[i]) {
                p.splice(i, 0, a)
              } else if (a >= p[i] && a < p[i + 1]) {
                p.splice(i + 1, 0, a)
              } else if (a >= p[i + 1]) {
                p.push(a)
              }
            } else {
              if (a < p[i]) {
                p.splice(i, 0, a)
              } else if (a >= p[i]) {
                p.splice(i + 1, 0, a)
              }
            }
          }
        }
      }
      return p
    }
  },
  mounted () {
    // console.log(this.bubble(this.test))
    // console.log(this.fast(this.test))
    console.log(this.insert(this.test))
    console.log('home')
  }
}
</script>

<style lang="scss">

</style>
