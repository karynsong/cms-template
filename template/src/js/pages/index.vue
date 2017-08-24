<template>
    <div class="layout" v-if="!$store.state.toLogin">
        <div class="layout-content">
            <div class="layout-left">
                <LayoutHeader></LayoutHeader>
                <LayoutNavbar></LayoutNavbar>
                <LayoutManage></LayoutManage>
            </div>
            <div class="layout-content-wapper">
                <div class="layout-content-main">
                    <!--<LayoutBreadcrumb></LayoutBreadcrumb>-->
                    <transition name="move" mode="out-in">
                        <router-view></router-view>
                    </transition>
                    <div class="layout-copy">
                    Copyright © 2017 由本木医疗提供技术支持
                    </div>
                </div>
            </div>
            <IndexModal></IndexModal>
        </div>
    </div>
</template>

<script>
    import LayoutHeader from 'Common/header/index'
    import LayoutNavbar from 'Common/navbar/index'
    import LayoutManage from 'Common/manage/index'
    import LayoutBreadcrumb from 'Common/breadcrumb/index'

    import IndexModal from 'Common/target/index'
    export default {
        components: {
            LayoutHeader,
            LayoutNavbar,
            LayoutManage,
            LayoutBreadcrumb,
            IndexModal
        }
    }
</script>
