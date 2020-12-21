<template>
  <el-menu
    :collapse="collapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="default_route"
    router
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
  setup() {
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

<style></style>
