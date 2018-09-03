<template>
    <el-select
        v-model="cloneValue"
        :filter-method="handleFilter"
        filterable
        clearable
        :placeholder="placeholder"
        @change="changeValue"
    >
        <el-option
            v-for="item in cloneOpts"
            :key="item[defaultKey.value]"
            :label="item[defaultKey.label]"
            :value="item[defaultKey.value]">
        </el-option>
    </el-select>
</template>

<script>
    import { cloneDeep } from 'lodash'
    import Spell from '@/utils/spellChange'
    export default {
        data() {
            return {
                cloneOpts: cloneDeep(this.options),
                cloneValue: ''
            }
        },
        props: {
            value: [Number, String],
            options: {
                type: Array,
                default: () => {
                    return []
                }
            },
            placeholder: {
                type: String,
                default: '请选择'
            },
            defaultKey: {
                type: Object,
                default: () => {
                    return {
                        label: 'label',
                        value: 'value'
                    }
                }
            }
        },
        watch: {
            value(val) {
                this.cloneValue = val
            },
            options(val) {
                this.cloneOpts = cloneDeep(val)
            }
        },
        methods: {
            changeValue(val) {
                this.$emit('input', val)
            },
            handleFilter(value) {
                this.cloneOpts = this.options.filter(item => {
                    return Spell.getCamelChars(item.label).match(Spell.getCamelChars(value))
                })
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss">

</style>
