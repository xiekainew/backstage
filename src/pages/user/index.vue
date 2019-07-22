<template>
	<div class="user">
        <div class="user-nav">
            <el-button type="primary" size="small" @click="create">创建用户</el-button>
        </div>
		<hi-table
            :tableData="userList"
            :tableHeaders="tableHeaders"
            :clickData="clickData"
            @clickRight="clickRight"
        ></hi-table>
        <el-dialog title="创建用户" :visible.sync="createVisible">
            <el-form ref="form" label-width="120px">
                <hi-form
                    label='名称'
                    prop="v"
                    required
                    v-model="createModel.nick"
                ></hi-form>
                <hi-form
                    label='密码'
                    type="password"
                    prop="v"
                    required
                    v-model="createModel.password"
                ></hi-form>
            </el-form>
            <div slot="footer">
                <el-button @click="createVisible = false">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </div>
        </el-dialog>
	</div>
</template>

<script type="text/javascript">
    import HiTable from '@/components/HiTable'
    import HiForm from '@/components/HiForm'
    import {
        getUserList,
        register,
        deleteUser
    } from '@/api/common'
    import Mixin from '@/common/mixin'
	export default {
		data() {
			return {
                userList: [],
                tableHeaders: [{
                    headerKey: 'name',
                    headerName: '用户名'
                }, {
                    headerKey: 'phone',
                    headerName: '手机号'
                }, {
                    headerKey: 'type',
                    headerName: '类型'
                }],
                createVisible: false,
                createModel: {
                    nick: '',
                    password: ''
                },
                clickData: [{
                    label: '删除',
                    value: 1
                }]
			}
		},
        mixins: [Mixin],
        components: {
            HiTable,
            HiForm
        },
		methods: {
            fetchList() {
                getUserList().then(res => {
                    console.log(res)
                    this.userList = res.data || []
                })
            },
            confirm() {
                let value = this.validator(this.$refs.form)
                if (value) return
                register(this.createModel).then(res => {
                    if (res.status === 0) {
                        this.createVisible = false
                        this.fetchList()
                        this.$message.success('创建成功！')
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            create() {
                this.createVisible = true
                this.$nextTick(() => {
                    this.reset(this.$refs.form)
                })
            },
            clickRight(data) {
                console.log(data)
                this.$confirm('确认要删除吗？', '提示信息', {type: 'warning'}).then(() => {
                    deleteUser({name: data.row.name}).then(res => {
                        if (res.status === 0) {
                            this.createVisible = false
                            this.fetchList()
                            this.$message.success('删除成功！')
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                })
            }
		},
		mounted() {
            this.fetchList()
		}
	}
</script>
<style lang="scss">
	.user{
        background: white;
        padding: 20px;
        &-nav{
            text-align: right;
            margin-bottom: 10px;
        }
	}
</style>
