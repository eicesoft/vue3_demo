<template>
  <el-container class="app">
    <el-aside :width="sideWidth">
      <div>Logo</div>
      <el-menu :collapse="isCollapse">
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>导航二</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <template #title>导航三</template>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <template #title>导航四</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="height: auto">
        <div>
          <i
            @click="collapseSide"
            style="font-size: 22px"
            :class="sideClass"
          ></i>
        </div>
        <Tabber></Tabber>
      </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { ref, computed } from "vue";
import Tabber from "./components/Layout/Tabber.vue";

/**
 * Side 相关组件
 */
const aSideComp = () => {
  const isCollapse = ref(false);

  const collapseSide = () => {
    isCollapse.value = !isCollapse.value;
  };

  const sideWidth = computed(() => (isCollapse.value ? "64px" : "240px"));
  const sideClass = computed(() =>
    isCollapse.value ? "el-icon-s-unfold" : "el-icon-s-fold"
  );

  return { isCollapse, collapseSide, sideWidth, sideClass };
};

export default {
  name: "App",
  components: { Tabber },
  setup() {
    return { ...aSideComp() };
  }
};
</script>

<style lang="scss">
.app {
  height: 1000px;
  .el-header,
  .el-footer {
    color: #333;
    margin: 0;
    padding: 0;
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    height: 100%;
  }

  .el-main {
    background-color: #f5f5f5;
    color: #111111;
    text-align: center;
  }
}
</style>
