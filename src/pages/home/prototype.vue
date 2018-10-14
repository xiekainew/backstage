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
      function SuperType (name) {
        this.name = name
        this.color = ['red', 'blue', 'green']
      }
      SuperType.prototype.sayName = function () {
        console.log(this.name)
      }

      function SubType (name, age) {
        SuperType.call(this, name)
        this.age = age
      }
      SubType.prototype = new SuperType()
      SubType.prototype.constructor = SubType
      SubType.prototype.sayAge = function () {
        console.log(this.age)
      }

      let in1 = new SubType('nick', 23)
      in1.color.push('black')
      console.log(in1.color)
      in1.sayName()
      in1.sayAge()
      console.log(SuperType.prototype.constructor)

      function Animal () {}
      Animal.prototype.type = '动物'

      function extend (child, parent) {
        let F = function () {}
        F.prototype = parent.prototype
        child.prototype = new F()
        child.prototype.constructor = child
      }

      function Cat (name, age) {
        this.name = name
        this.age = age
      }
      extend(Cat, Animal)
      // Cat.prototype = Animal.prototype
      // Cat.prototype.constructor = Cat
      let cat = new Cat()
      console.log(cat.type)
      /**
       * 寄生组合继承
       */
      function Dog (name) {
        Animal.call(this)
        this.name = name
      }
      (function () {
        let F = function () {}
        F.prototype = Animal.prototype
        Dog.prototype = new F()
        Dog.prototype.constructor = Dog
      })()
      let dog = new Dog('沙皮')
      console.log(dog.name)
    },
    test () {
      (function () {
        let a = 4
        console.log(a)
        console.log(window.a)
        a = 3
        console.log(a)
      })()
    }
  },
  mounted () {
    this.test()
    this.init()
  }
}
</script>

<style lang="scss">

</style>
