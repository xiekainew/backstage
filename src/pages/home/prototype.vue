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
      console.log(SubType.prototype.constructor)
      console.log(SuperType.prototype.constructor)

      function Animal () {}
      Animal.prototype.type = '动物'

      function extend (child, parent) {
        let F = function () {}
        F.prototype = parent.prototype
        child.prototype = new F()
        child.prototype.constructor = child
        console.log(F.prototype.constructor)
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
      console.log(Cat.prototype.constructor)
      console.log(Animal.prototype.constructor)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss">

</style>
