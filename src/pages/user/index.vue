<template>
	<div class="user">
		<hi-table
            :tableData="userList"
            :tableHeaders="tableHeaders"
        ></hi-table>
	</div>
</template>

<script type="text/javascript">
    import HiTable from '@/components/HiTable'
    import {
        getUserList
    } from '@/api/common'
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
                }]
			}
		},
        components: {
            HiTable
        },
		methods: {
            fetchList() {
                getUserList().then(res => {
                    console.log(res)
                    this.userList = res.data || []
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
	}
</style>
