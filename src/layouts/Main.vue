<template>
  <el-container class="app">
    <el-aside :width="sideWidth" class="aside">
      <Logo :collapse="isCollapse"></Logo>
      <Menu :collapse="isCollapse"></Menu>
    </el-aside>
    <el-container>
      <el-header style="height: auto">
        {{ domWidth }} - {{ domHeight }}

        <Header :collapse="isCollapse"></Header>
      </el-header>
      <el-main class="el-scrollbar__wrap">
        <suspense>
          <template #default>
            <RouterTransition
              :not-need-key="true"
              :animate="false"
            ></RouterTransition>
          </template>
          <template #fallback>
            <div v-loading="true">组件加载中...</div>
          </template>
        </suspense>

        <el-backtop :right="50" :bottom="70" target=".el-scrollbar__wrap">
          <el-button type="primary" icon="el-icon-caret-top" circle></el-button>
        </el-backtop>
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
  inject,
  defineComponent,
  onMounted,
  onUnmounted,
  getCurrentInstance
} from "vue";
import { useRoute } from "vue-router";
import { usePage } from "/@/hooks/usePage";
import router from "/@/routers";
import { store } from "/@/store";
import { Header, Menu, Logo } from "/@/layouts/components";

/**
 * 折叠相关业务
 */
const useCollapse = () => {
  const page = usePage();
  //是否折叠
  const isCollapse = ref(false);
  const collapseSide = () => {
    isCollapse.value = !isCollapse.value;
  };
  //页面缩小折叠菜单
  watch(page.domWidth, value => {
    if (value < 1000) {
      isCollapse.value = true;
    }
  });

  const sideWidth = computed(() => (isCollapse.value ? "64px" : "240px"));

  provide("collapse", collapseSide);

  return {
    ...page,
    isCollapse,
    sideWidth
  };
};

const usePageRoute = () => {
  const setTitle = title => {
    store.dispatch("page/setTitle", title);
    document.title = title;
  };

  const route = useRoute();
  setTitle(route.meta.title);
  watch(route, value => {
    // console.log(value, "路由改变");
    setTitle(value.meta.title);

    store.dispatch("tab/add", {
      name: value.meta.title,
      is_active: true,
      path: value.fullPath
    });
  });
};

export default defineComponent({
  name: "MainLayout",
  components: { Header, Menu, Logo },
  setup(props, context) {
    // const { ctx } = getCurrentInstance(); //获取上下文实例，ctx=vue2的this
    // console.log("Inject lodash version: ", $_.VERSION);
    usePageRoute();
    const collapse = useCollapse();

    return {
      ...collapse
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
    color: rgb(136, 136, 136);
    background-color: #ebebeb;
  }

  .el-aside {
    background-color: #1d1e23;
    color: #ffffff;
    height: 100%;
    border-right: 1px solid rgb(230, 230, 230);
  }

  .el-main {
    background-color: #ffffff;
    color: #0f0f0f;
    height: 100%;
    padding: 4px;
  }
}
</style>
