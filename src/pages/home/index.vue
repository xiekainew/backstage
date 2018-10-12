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
      test: [2, 1, 3]
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
      console.log(p)
      while (arr.length) {
        console.log(p)
        let a = arr.shift()
        for (let i = 0, l = p.length; i < l; i++) {
          if (a < p[i]) {
            p.splice(i, 0, a)
          } else if (a >= p[i]) {
            if (p[i + 1]) {
              if (a < p[i + 1]) {
                p.splice(i + 1, 0, a)
              } else {
                p.push(a)
              }
            } else {
              p.push(a)
            }
          }
        }
      }
      return p
    },
    init () {
      function Animal (name) {
        this.name = name || 'animal' // 属性
        // 实例方法
        this.sleep = function () {
          console.log(this.name + '正在睡觉')
        }
      }
      // 原型方法
      Animal.prototype.eat = function (food) {
        console.log(this.name + '正在吃' + food)
      }
      let pig = new Animal('pig')
      pig.sleep()
      pig.eat('苹果')
      // 原型链继承
      function Cat () {
        this.name = 'catt'
        // this.sleeps = function () {
        //   console.log(this.name + '睡觉')
        // }
      }
      Cat.prototype = new Animal()
      Cat.prototype.name = 'cat'
      // let cat = new Cat()
      // cat.sleeps()
      // console.log(cat.name)

      // 构造函数继承
      // function Dog (name) {
      //   Animal.call(this)
      //   this.name = name || 'dog'
      // }
      // let dog = new Dog()
      // console.log(dog)

      // 实例继承
      // function Tom (name) {
      //   let instance = new Animal()
      //   instance.name = name || 'Tom'
      //   return instance
      // }
      // let tom = new Tom()
      // console.log(tom)
      // tom.sleep()
      // console.log(tom.name)

      // 拷贝继承
      function Jury (name) {
        this.name = name || 'jury'
        let animal = new Animal()
        for (let i in animal) {
          Jury.prototype[i] = animal[i]
        }
        // Jury.prototype.name = name || 'jury'
      }
      let jury = new Jury()
      console.log(jury)
      console.log(jury.name)
      jury.sleep()
    }
  },
  mounted () {
    // console.log(this.bubble(this.test))
    // console.log(this.fast(this.test))
    // console.log(this.insert(this.test))
    this.init()
  }
}
</script>

<style lang="scss">

</style>
