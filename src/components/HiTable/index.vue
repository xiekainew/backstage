<template>
    <section class="hi-table-wrapper">
        <el-table
            :data="cloneData"
            border
            style="width: 100%;"
            tooltip-effect='dark'
            @selection-change="selectionChange"
            @select='selectRow'
            @select-all='selectRow'
            :class='{"el-table_radio": select === "radio"}'
            ref='table'
            :stripe="false"
        >

            <el-table-column
                v-if="index && position === 'right'"
                type='index'
                :align="align"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                v-if="select && position === 'left'"
                type='selection'
                :selectable="selectable"
                align="center"
                fixed="left"
                label="操作(单选)"
                width="70">
            </el-table-column>
            <el-table-column
                v-for="(item, index) in _tableHeaders"
                :prop="item.headerKey"
                :min-width="item.width || defaultWidth"
                :key="item.headerKey"
                :align="align"
                :label="item.headerName"
            >
                <template slot-scope="scope">
                    <template v-if="item.hasOwnProperty('img')">
                        <img v-if="item.img.type || (item.img.value === scope.row[item.img.key])" :src="item.img.url"
                             width="12"/>
                    </template>
                    <a v-if="item.click" type="text" class="table-a-wrapper"
                       @click.stop="clickFirst(scope.row, item, index)">
                        {{formatRow(scope.row, item)}}
                    </a>
                    <template v-else-if="item.ableInput">
                        <el-input style="width: 70%; margin-right: 10px;" :type="item.inputType" @input="changeInput"
                                  v-model="scope.row[item.headerKey]">
                        </el-input>
                        {{item.tips}}
                    </template>
                    <template v-else-if="item.ableSelect">
                        <div>
                            <el-select
                                placeholder="请选择"
                                v-model="scope.row[item.headerKey]">
                                <el-option
                                    v-for="itm in item.rowOptions"
                                    :key="itm[item.defaultKey.value]"
                                    :label="itm[item.defaultKey.label]"
                                    :value="itm[item.defaultKey.value]">
                                </el-option>
                            </el-select>
                        </div>
                    </template>
                    <template v-else-if="item.image">
                        <img class="nb-image" :src="scope.row[item.headerKey]" alt="">
                    </template>
                    <template v-else>
                        {{formatRow(scope.row, item)}}
                    </template>
                </template>
                <el-table-column
                    v-for="(item0) in item.mergeHeader"
                    :prop="item0.headerKey"
                    :label="item0.headerName"
                    width="120"
                    aligin="center"
                    :key="item0.headerKey"
                >
                </el-table-column>
            </el-table-column>
            <el-table-column
                v-if="select && position === 'right'"
                type='selection'
                :selectable="selectable"
                align="center"
                fixed="right"
                label="操作(单选)"
                width="70">
            </el-table-column>
            <el-table-column
                v-if="filterClickData(clickData).length"
                fixed="right"
                label="操作"
                align="center"
                header-align='center'
                :width="fixedWidth">
                <template
                    slot-scope="scope"
                    v-if="filterClickData(clickData).length"
                >
                    <el-button
                        v-for="item in filterClickData(clickData, scope.row)"
                        @click="handleClick({row:scope.row, type:item.value})"
                        type="text"
                        :key="item.value"
                    >
                        {{item.label}}
                    </el-button>
                </template>
                <slot></slot>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    import { cloneDeep, isEqual } from 'lodash'
    import { formatTable } from '@/utils/validate'

    export default {
        data() {
            return {
                widthMap: {
                    1: '70',
                    2: '120',
                    3: '150',
                    4: '200',
                    5: '300',
                    6: '350',
                    7: '170',
                    8: '190',
                    9: '200'
                },
                data: [],
                value1: [],
                cloneField: cloneDeep(this.field),
                sortFlag: true,
                searchList: [],
                headerMaps: this.headerMap,
                tableRadio: '',
                tableHeight: 0,
                cloneHeaders: cloneDeep(this.tableHeaders),
                cloneData: this.tableData,
                cloneRow: null,
                target: null
            }
        },
        props: {
            tableHeaders: {
                type: Array,
                default: () => []
            },
            tableData: {
                type: Array,
                default: () => []
            },
            select: String,
            radio: Boolean,
            index: {
                type: Boolean,
                default: true
            },
            fixedOne: {
                type: Boolean,
                default: true
            },
            clickData: {
                type: Array,
                default: () => []
            },
            minWidth: {
                type: String,
                default: '180'
            },
            format: {
                type: Array,
                default: () => []
            },
            align: {
                type: String,
                default: 'center'
            },
            headerMap: {
                type: Array,
                default: () => []
            },
            defaultWidth: {
                type: String,
                default: '100'
            },
            position: {
                type: String,
                default: 'right'
            }
        },
        watch: {
            tableHeaders: {
                deep: true,
                handler(val) {
                    this.cloneHeaders = cloneDeep(val)
                }
            },
            tableData(val) {
                this.cloneData = val
            },
            headerMap() {
                this.headerMaps = this.headerMap
            }
        },
        components: {
        },
        computed: {
            fixedWidth() {
                let l = this.clickData.length ? this.clickData.length : '1'
                return this.widthMap[l] || '100'
            },
            _tableHeaders() {
                return this.cloneHeaders
            },
            isShowSearch() {
                return this.searchList.length > 0
            }
        },
        methods: {
            selectionChange(selection) {
                this.$emit('selectionChange', selection)
            },
            getData() {
                return this.cloneData
            },
            clickFirst(value, item, index) {
                this.$emit('clickRow', value, item, index)
            },
            handleClick(data) {
                this.$emit('clickRight', data)
            },
            formatRow(row, key) {
                if (key.hasOwnProperty('type')) {
                    let type = key.type.split('|')
                    return (formatTable[type[0]](row[key.headerKey], type[1]) + (key.tips || '')) || '-'
                }
                if (key.hasOwnProperty('rules')) {
                    let text = row[key.rules.key] === key.rules.value ? key.rules.success : key.rules.error
                    return (row[key.headerKey] && (row[key.headerKey] + text)) || '-'
                }
                if (row[key.headerKey] === '-' && key.tips) {
                    return '-'
                }
                if (key.hasOwnProperty('maps')) {
                    return key.maps[row[key.headerKey]]
                }
                return (row[key.headerKey] && (row[key.headerKey] + (key.tips || ''))) || '-'
            },
            checkDropdown(index, item, row) {
                let flag = false
                if (item.value === true) {
                    flag = row[item.key]
                } else {
                    flag = row[item.key] === item.value
                }
                return (index > 0) && flag
            },
            filterClickData(data, row) {
                let _data = cloneDeep(data)
                let __data = _data.filter(item => {
                    if (item.disabled) {
                        return false
                    } else if (!item.hasOwnProperty('key') && !item.hasOwnProperty('rule')) {
                        return true
                    } else if (row) {
                        if (item.result === true) {
                            return row[item.key]
                        } else if (item.sym) {
                            return row[item.key] !== item.result
                        } else if (item.hasOwnProperty('rule')) {
                            return item.rule(row)
                        } else {
                            return row[item.key] === item.result
                        }
                    } else {
                        return true
                    }
                })
                return __data
            },
            selectRow(selection, row) {
                if (this.select === 'radio') {
                    this.$refs.table.clearSelection()
                    if (isEqual(row, this.cloneRow)) {
                        this.cloneRow = null
                        this.$emit('selectRow', [], {})
                    } else {
                        this.cloneRow = row
                        this.$refs.table.toggleRowSelection(row)
                        this.$emit('selectRow', row ? [row] : [], row)
                    }
                } else {
                    this.$emit('selectRow', selection, row)
                }
            },
            setSelect(row) {
                row.forEach(item => {
                    this.$refs.table.toggleRowSelection(item)
                })
            },
            selectable(row, index) { // 判断是否可以勾选
                if (row.scope === 0 || row.scope > 0) {
                    return false
                } else {
                    return true
                }
            },
            changeInput(val) {
                this.$emit('change', val)
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss">
    .header-wrapper {
        width: 100%;
        padding: 0 !important;
        position: relative;
        top: 4px;

    .el-icon-caret-bottom, .el-icon-caret-top {
        cursor: pointer;
    }

    }
    .el-table_radio {

    .el-checkbox__inner {
        border-radius: 50%;
    }

    .el-table__fixed-header-wrapper {

    .el-checkbox {
        display: none;
    }

    }
    }
    .row-radio {
        width: 14px;
        overflow: hidden;
        margin: 0 auto;
    }

    .hi-table-wrapper {
        position: relative;
    }
    .hi-table-wrapper:after {
        left: 0px;
        position: absolute;
        content: '';
        top: 0;
        height: 100%;
        width: 1px;
        background: #e6ebf5;
        z-index: 999;
    }

    .nb-image {
        width: 80px;
        height: 46px;
    }

    .input-symbol {
        right: 10px;
        line-height: 40px;
        position: absolute;
        z-index: 9;
        color: #ccc;
    }

    .table-a-wrapper {

    .mark-self {
        position: absolute;
        right: 0px;
        top: 17px;
        background: white;
        transition: all 0.2s linear;
    }

    }
    .hover-row {

    .table-a-wrapper {

    .mark-self {
        position: absolute;
        right: 0px;
        top: 17px;
        background: #f5f5f5;
    }

    }
    }
</style>
