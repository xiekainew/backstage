<template>
  <section></section>
</template>

<script>
export default {
  data () {
    return {
      test: [2, 1, 3, 4, 12, 3, 1, 5, 7]
    }
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
    insert (arr) { // [3, 2, 1]
      for (let i = 1, l = arr.length; i < l; i++) {
        let temp = arr[i] // 1
        let j = i - 1 // 1
        while (j >= 0 && arr[j] > temp) {
          arr[j + 1] = arr[j] // 2
          j-- // 0
        }
        console.log(j)
        arr[j + 1] = temp // 1
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
    selection (arr) {
      let l = arr.length
      for (let i = 0; i < l - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < l; j++) {
          if (arr[j] < arr[minIndex]) {
            minIndex = j
          }
        }
        let temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
      }
      return arr
    },
    init () {
      function Animal (name) {
        this.name = name || 'animal' // 属性
        this.type = 'animal-type'
        // 实例方法
        this.sleep = function () {
          console.log(this.name + '正在睡觉')
        }
      }

      // 原型方法
      Animal.prototype.eat = function (food) {
        console.log(this.name + '正在吃' + food)
      }

      /**
       * 原型链继承
       *
       * 非纯粹的继承关系，实例是子类的实例，也是父类的实例
       * 父类新增原型方法属性，子类都能访问到
       * 简单，易于实现
       * 缺点：
       *    如果要新增原型属性和方法，必须放在new Animal 这样的语句之后进行
       *    无法实现多继承
       *    来自原型对象的所有属性被所有实例共享
       *    创建子类实例时，无法向父类传参
       * @constructor
       */
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
      // console.log(cat.type)
      // console.log(cat instanceof Animal)
      // console.log(cat instanceof Cat)
      /**
       * 构造函数继承
       *    解决了1中子类实例共享父类引用属性的问题
       *    创建子类实例时，可以向父类传递参数
       *    可以实现多继承
       * 缺点：
       *    实例并不是父类的实例，只是子类的实例
       *    只能继承父类实例的属性和方法，不能继承原型属性和方法
       *    无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
       * @param name
       * @constructor
       */
      function Dog (name) {
        Animal.call(this)
        this.name = name || 'dog'
      }
      let dog = new Dog()
      console.log(dog)

      // 实例继承
      function Tom (name) {
        let instance = new Animal()
        instance.name = name || 'Tom'
        return instance
      }
      let tom = new Tom()
      console.log(tom)

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
      /**
       * 组合继承
       */
      function Fish (name) {
        Animal.call(this, name)
        this.name = name || 'fish'
      }
      Fish.prototype = new Animal()
      Fish.prototype.constructor = Fish
      let fish = new Fish('小鱼')
      console.log(fish)
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
    let t = [2, 1]
    console.log(this.insert(t))
  }
}
</script>

<style lang="scss">

</style>
