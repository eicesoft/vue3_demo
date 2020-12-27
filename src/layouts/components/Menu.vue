<template>
  <el-menu
    :collapse="collapse"
    :default-active="default_route"
    router
    class="main-menu"
  >
    <el-submenu v-for="(menu, index) in menus" :index="menu.path">
      <template #title>
        <i :class="menu.meta?.icon"></i>
        <span>{{ menu.meta?.title }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="(submenu, i) in menu.children"
          :index="submenu.path"
        >
          {{ submenu.meta?.title }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { store } from "/@/store";
import router from "/@/routers";

export default defineComponent({
  name: "ice-menu",
  props: {
    collapse: {
      type: Boolean,
      required: true,
      default: false
    },
    routers: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const default_route = ref<String>(router.currentRoute.value.path);

    watch(router.currentRoute, value => {
      default_route.value = router.currentRoute.value.path;
    });
    console.log(store.getters["user/menus"]);
    return {
      menus: store.getters["user/menus"],
      default_route
    };
  }
});
</script>

<style lang="scss">
.el-menu {
  border-right: 0px !important;
}
.el-menu-item,
.el-submenu__title {
  line-height: 42px !important;
  height: 42px !important;
}
.el-submenu .is-active {
  border-right: 3px solid rgb(148, 202, 255) !important;
  background-color: #ecf5ff !important;
}
</style>
