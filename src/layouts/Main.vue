<template>
  <el-container class="app">
    <el-aside :width="sideWidth">
      <Logo :collapse="isCollapse"></Logo>
      <Menu :collapse="isCollapse"></Menu>
    </el-aside>
    <el-container>
      <el-header style="height: auto">
        <Header :collapse="isCollapse"></Header>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }" :key="route.fullPath">
          <transition name="zoom-fade" mode="out-in" appear>
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
      <el-footer style="height: auto">
        Copyright © 2020~2021 eIcesoft, All Rights Reserved, Version 0.9.0.1
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {
  ref,
  computed,
  watch,
  provide,
  defineComponent,
  onMounted,
  onUnmounted
} from "vue";
import { useRoute } from "vue-router";

import router from "/@/routers";

import pageStore from "/@/store/page";
import { store } from "/@/store";

import { Header, Menu, Logo } from "/@/layouts/components";

const setTitle = title => {
  pageStore.setTitle(title);
  document.title = title;
};

export default defineComponent({
  name: "MainLayout",
  components: { Header, Menu, Logo },
  setup(props, ctx) {
    onMounted(() => {});
    const route = useRoute();
    setTitle(router.currentRoute.value.meta.title);
    watch(router.currentRoute, value => {
      console.log(value, "路由改变");
      setTitle(value.meta.title);

      store.dispatch("tab/add", {
        name: value.meta.title,
        is_active: true,
        path: value.fullPath
      });
    });

    const isCollapse = ref(false);

    const collapseSide = () => {
      isCollapse.value = !isCollapse.value;
    };

    const sideWidth = computed(() => (isCollapse.value ? "64px" : "240px"));

    provide("collapse", collapseSide);

    return {
      route,
      isCollapse,
      sideWidth
    };
  }
});
</script>

<style lang="scss">
.app {
  height: 100%;
  .el-header,
  .el-footer {
    background-color: #fff;
    color: #333;
    margin: 0;
    padding: 0;
  }

  .el-footer {
    text-align: center;
    margin: 12px 0;
    color: rgb(92, 91, 91);
    background-color: #ebebeb;
  }

  .el-aside {
    background-color: #545c64;
    color: #fff;
    height: 100%;
  }

  .el-main {
    background-color: #ffffff;
    color: #111111;
    height: 100%;
    padding: 4px;
  }
}
</style>
