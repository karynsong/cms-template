<template>
    <div class="acheckbox">
        <Checkbox style="font-weight: bolder;" v-model="checkAll" :indeterminate="indeterminate" @click.prevent.native="handleCheckAll">全选</Checkbox>
        <Checkbox-group v-model="exposeData" @on-change="onGroupChange" style="display: inline-block;">
            <Checkbox :label="item.value" v-for="item in datas">{{item.label}}</Checkbox>
        </Checkbox-group>
    </div>
</template>
<script>
export default {
    props: ['datas', 'value'],
    data() {
        return {
            exposeData: [],
            indeterminate: false,
            checkAll: true
        }
    },
    computed: {
        optionsMap() {
            return this.datas.map((item) => {
                return item.value
            })
        }
    },
    watch: {
        value(newVal) {
            if(this.datas.length === newVal.length) {
                this.checkAll = true
                this.indeterminate = false
            }
            this.exposeData = newVal
        },
        exposeData(newVal) {
            this.$emit('on-change', newVal)
        }
    },
    methods: {
        handleCheckAll(checked) {
            // this.exposeData = checked ? this.optionsMap : []

            if (this.indeterminate) {
                    this.checkAll = false
                } else {
                    this.checkAll = !this.checkAll
                }
                this.indeterminate = false

            if (this.checkAll) {
                this.exposeData = this.optionsMap
            } else {
                this.exposeData = []
            }
        },
        onGroupChange(newCheck) {
            // this.checkAll = newCheck.length === this.optionsMap.length
            if (newCheck.length === this.optionsMap.length) {
                this.indeterminate = false
                this.checkAll = true
            } else if (newCheck.length > 0) {
                this.indeterminate = true
                this.checkAll = false
            } else {
                this.indeterminate = false
                this.checkAll = false
            }
        },
    }
}
</script>

