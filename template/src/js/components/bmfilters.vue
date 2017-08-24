<template>
    <div class="common-filter" v-clickoutside="close">
        <transition name="bounce" enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
            <p class="filter-title" v-show="!expend" @click="expend=true">
                <Icon type="search"></Icon>
                开启查询
            </p>
        </transition>
        <transition name="bounce" enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
            <p class="filter-title" v-show="expend" @click="close">
                <Icon type="close-round"></Icon>
                关闭查询
            </p>
        </transition>
        <transition name="bounce" enter-active-class="slideInRight" leave-active-class="slideOutRight">
            <Row class="filter-card-contanier" v-show="expend">
                <div class="filter-card">
                    <div class="filter-content">
                        <slot name="content"></slot>
                    </div>
                </div>
            </Row>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            expend: false
        }
    },
    mounted() {
        document.addEventListener('keydown', this.keyUpEvent, false)
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.keyUpEvent)
        // document.documentElement.style.overflow = 'hidden'
        // setTimeout(() => {
        //     document.documentElement.style.overflow = 'auto'
        // }, 300)
    },
    watch: {
        expend(newVal) {
            this.$emit(newVal ? 'on-expend' : 'on-close')
        }
    },
    methods: {
        close() {
            this.$emit('on-esc')
            this.expend = false
        },
        keyUpEvent(e) {
            // esc close
            if (e.keyCode === 27) {
                this.expend = false
            } else if (e.keyCode == 68 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                // save
                e.preventDefault();
                this.expend = !this.expend
            }
        }
    }
}
</script>
