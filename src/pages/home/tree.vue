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
      class Node {
        constructor (key) {
          this.key = key
          this.left = null
          this.rigth = null
        }
      }
      class BinarySearchTree {
        constructor () {
          this.root = null
        }
        inset (key) {
          const newNode = new Node(key)
          const insertNode = (node, newNode) => {
            if (newNode.key < node.key) {
              if (node.left === null) {
                node.left = newNode
              } else {
                insertNode(node.left, newNode)
              }
            } else {
              if (node.right === null) {
                node.right = newNode
              } else {
                insertNode(node.right, newNode)
              }
            }
          }
          if (!this.root) {
            this.root = newNode
          } else {
            insertNode(this.root, newNode)
          }
        }
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss">

</style>
