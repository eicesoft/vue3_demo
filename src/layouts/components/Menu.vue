<template>
  <el-menu
    :collapse="collapse"
    :default-active="default_route"
    background-color="#1D1E23"
    text-color="hsla(0,0%,100%,.7)"
    router
    class="main-menu"
  >
    <el-submenu v-for="(menu, index) in menus" :index="menu.path" :key="index">
      <template #title>
        <i :class="menu.meta?.icon"></i>
        <span>{{ menu.meta?.title }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="(submenu, i) in menu.children"
          :index="submenu.path"
          :key="i"
        >
          {{ submenu.meta?.title }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import VueTypes from "vue-types";
import { store } from "/@/store";
import router from "/@/routers";

export default defineComponent({
  name: "ice-menu",
  props: {
    collapse: VueTypes.bool.def(false).isRequired,
    routers: VueTypes.array
  },
  setup(props) {
    const default_route = ref<String>(router.currentRoute.value.path);

    watch(router.currentRoute, value => {
      default_route.value = router.currentRoute.value.path;
    });

    return {
      menus: store.getters["user/menus"],

      default_route
    };
  }
});
</script>

<style lang="scss" scoped>
:deep {
  .el-menu {
    border-right: 0px !important;
  }
  .el-menu-item {
    background-color: #101117 !important;
    &:hover {
      color: #fff !important;
      background-color: #1d1e23 !important;
    }
  }
  .el-menu-item,
  .el-submenu__title {
    line-height: 46px !important;
    height: 46px !important;
  }
  .el-submenu .is-active {
    border-right: 3px solid rgba(160, 162, 175, 0.75) !important;
    background-color: rgba(63, 64, 69, 0.75) !important;
    color: #fff !important;
  }
}
</style>
