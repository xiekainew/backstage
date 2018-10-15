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
          this.right = null
        }
      }
      class BinarySearchTree {
        constructor () {
          this.root = null
        }
        insert (key) { // 插入节点
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

        /**
         * 中序遍历 从最小到最大顺序访问所有节点
         * @param callback
         */
        inOrderTraverse (callback) {
          let inOrderTraverseNode = function (node, callback) {
            if (node !== null) {
              inOrderTraverseNode(node.left, callback)
              callback(node.key)
              inOrderTraverseNode(node.right, callback)
            }
          }
          inOrderTraverseNode(this.root, callback)
        }

        /**
         * 先序遍历 优先于后代节点的顺序访问每个节点
         */
        preOrderTraverse (callback) {
          let preOrderTraverseNode = function (node, callback) {
            if (node !== null) {
              callback(node.key)
              preOrderTraverseNode(node.left, callback)
              preOrderTraverseNode(node.right, callback)
            }
          }
          preOrderTraverseNode(this.root, callback)
        }

        /**
         * 后续遍历 先访问节点的后代节点
         */
        postOrderTraverse (callback) {
          let postOrderTraverseNode = function (node, callback) {
            if (node !== null) {
              postOrderTraverseNode(node.left, callback)
              postOrderTraverseNode(node.right, callback)
              callback(node.key)
            }
          }
          postOrderTraverseNode(this.root, callback)
        }
      }
      let tree = new BinarySearchTree()
      let data = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25]
      for (let i = 0, l = data.length; i < l; i++) {
        tree.insert(data[i])
      }
      tree.insert(6)
      console.log(tree)
      function printNode (value) {
        console.log(value)
      }
//      tree.inOrderTraverse(printNode)
//      tree.preOrderTraverse(printNode)
      tree.postOrderTraverse(printNode)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss">

</style>
