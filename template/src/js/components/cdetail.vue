<template>
    <div class="detail-container" v-clickoutside="handleClose">
        <div class="detail-header">
            <h2 class="detail-title">{{title}}</h2>
            <div class="detail-close">
                <slot name="options" style="float: left"></slot>
            </div>
        </div>
        <div class="detail-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    props: ['title'],
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
    methods: {
        handleClose() {
            this.$emit('on-esc')
        },
        keyUpEvent(e) {
            // esc close
            if (e.keyCode === 27) {
                e.preventDefault()
                this.$emit('on-esc')
            } else if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                // save
                e.preventDefault();
                this.$emit('on-save')
            }
        }
    }
}
</script>

<style scoped lang="sass">
.detail-container{
    box-shadow: 0px 0px 5px black;
    position: fixed;
    top: 10px;
    width: 900px;
    right: 0px;
    bottom: 10px;
    z-index: 10;
    background-color: rgba(13, 36, 56, 0.32);
    padding: 20px;
    .detail-header {
        overflow: hidden;
        zoom: 1;
        .detail-title {
            color: white;
            float: left;
            display: inline-block;
        }
        .detail-close {
            float: right
        }
    }
    .detail-body {
        overflow: scroll;
        position: absolute;
        left: 20px;
        right: 20px;
        top: 60px;
        bottom: 0px;
        margin-bottom: 10px;
        margin-top: 10px;
    }
}

</style>
