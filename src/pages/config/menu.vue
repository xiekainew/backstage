<template>
  <div class="menu">
    <div class="menu-bar">
      <el-button type='primary' size='mini' @click="show">添加一级菜单</el-button>
    </div>
    <el-tree
      :data=menuList
      :props="detaultProps"
      :render-content="renderContent"
      :expand-on-click-node="false"
    >
    </el-tree>
    <el-dialog title="编辑" :visible.sync="editVisible" @close="closeOver">
      <el-form ref="form" label-width="120px">
        <hi-form
          label="标题"
          required
          prop="v"
          v-model="dataModel.title"
        ></hi-form>
        <hi-form
          label="图标"
          required
          prop="v"
          v-model="dataModel.icon"
        ></hi-form>
        <hi-form
          label="路径"
          v-model="dataModel.path"
        ></hi-form>
        <hi-form
          label="排序"
          v-model="dataModel.sort"
        ></hi-form>
        <hi-form
          v-if="!dataModel.id"
          label="父节点"
          disabled
          v-model="parent"
        ></hi-form>
      </el-form>
      <div slot="footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  import Vuex from 'vuex'
  import HiForm from '@/components/HiForm'
  import Mixin from '@/common/mixin'
  import {
    createMenu,
    deleteMenu
  } from '@/api/common'
  export default {
    data() {
      return {
        editVisible: false,
        detaultProps: {
          children: 'children',
          label: 'title'
        },
        dataModel: {
          id: '',
          title: '',
          icon: '',
          path: '',
          sort: '',
          parent: ''
        },
        parent: ''
      }
    },
    mixins: [Mixin],
    components: {
      HiForm
    },
    computed: {
      ...Vuex.mapState({
        menuList: state => state.menuList
      })
    },
    mounted() {

    },
    methods: {
      confirm() {
        let value = this.validator(this.$refs.form)
        if (value) return
        createMenu(this.dataModel).then(res => {
          if (res.status === 0) {
            this.$message.success('成功！')
            this.$store.dispatch('getMenu')
            this.editVisible = false
          }
        })
      },
      show() {
        this.editVisible = true
      },
      edit(data) {
        this.dataModel.id = data.id
        this.dataModel.title = data.title
        this.dataModel.icon = data.icon
        this.dataModel.path = data.path
        this.dataModel.sort = data.sort
        this.dataModel.parent = data.parent
        this.show()
      },
      append(data) {
        this.dataModel.parent = data.id
        this.parent = data.title
        this.show()
      },
      remove(data) {
        this.$confirm('确认删除吗？', '友情提示', {type: 'warning'}).then(() => {
          deleteMenu({id: data.id}).then(res => {
            if (res.status === 0) {
              this.$message.success('成功！')
              this.$store.dispatch('getMenu')
              this.editVisible = false
            }
          })
        })
      },
      closeOver() {
        this.dataModel.parent = ''
        this.parent = ''
        this.dataModel.id = ''
        this.dataModel.title = ''
        this.dataModel.icon = ''
        this.dataModel.path = ''
        this.dataModel.sort = ''
      },
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="primary" on-click={ () => this.append(data) }>添加</el-button>
              <el-button size="mini" type="success" on-click={ () => this.edit(data) }>修改</el-button>
              <el-button
                size="mini"
                type="danger"
                disabled={Boolean(data.children && data.children.length)}
                on-click={ () => this.remove(data) }
              >删除</el-button>
            </span>
          </span>
        )
      }
    }
  }
</script>
<style lang="scss">
.menu{
  padding: 20px;
  background: white;
  border-radius: 4px;
  &-bar{
    text-align: right;
  }
}
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-left: 8px;
  }
  .el-tree-node{
    margin: 4px 0;

  }
</style>
