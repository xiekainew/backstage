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
      test: [2, 1, 3, 4, 12, 3, 1, 5, 7]
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
      for (let i = 1, l = arr.length; i < l; i++) {
        let temp = arr[i]
        let j = i - 1
        while (j >= 0 && arr[j] > temp) {
          arr[j + 1] = arr[j]
          j--
        }
        arr[j + 1] = temp
      }
      return arr
    },
    insertTwo (arr) {
      let p = [arr.shift()]
      for (let i = 0, l = arr.length; i < l; i++) {
        let j = i
        while (j >= 0 && p[j] > arr[i]) {
          p[j + 1] = p[j]
          j--
        }
        p[j + 1] = arr[i]
      }
      return p
    },
    swap (a, b) {
      b = b - a
      a = a + b
      b = a - b
      return [a, b]
    },
    fibo (n) {
      let arr = []
      let i = 0
      while (i < n) {
        if (i <= 1) {
          arr.push(i)
        } else {
          arr.push(arr[i - 1] + arr[i - 2])
        }
        i++
      }
      return arr
    }
  },
  mounted () {
    // console.log(this.bubble(this.test))
    // console.log(this.fast(this.test))
    // console.log(this.insert(this.test))
//    console.log(this.insertTwo(this.test))
//    console.log(this.swap(1, 2))
    console.log(this.fibo(8))
    console.log('home')
  }
}
</script>

<style lang="scss">

</style>
