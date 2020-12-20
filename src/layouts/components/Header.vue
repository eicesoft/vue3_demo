<template>
  <div class="header-info">
    <el-row justify="space-around" type="flex">
      <el-col :span="1">
        <i @click="collapse" class="icon-button" :class="sideClass"></i>
      </el-col>
      <el-col :span="12">{{ pageState.title }}</el-col>
      <el-col :span="11" style="text-align: right">
        <i class="el-icon-refresh icon-button" @click="reload"></i>
        <i class="el-icon-full-screen icon-button" @click="fullScreen"></i>

        <el-dropdown>
          <span class="cursor">
            <i class="el-icon-user icon-button"></i>
            我的
            <i class="el-icon-arrow-down"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
  <Tabber></Tabber>
</template>

<script lang="ts">
import { inject, computed, defineComponent } from "vue";
import pageStore from "/@/store/page";

import Tabber from "/@/layouts/components/Tabber.vue";

const Topbar = () => {
  const fullScreen = () => {
    var element = document.getElementById("app");

    let requestMethod =
      element.requestFullScreen ||
      element.webkitRequestFullScreen ||
      element.mozRequestFullScreen ||
      element.msRequestFullScreen;
    if (requestMethod) {
      requestMethod.call(element);
    }
  };
  return {
    reload: inject("reload"),
    fullScreen
  };
};

export default defineComponent({
  name: "ice-header",
  components: { Tabber },
  props: {
    collapse: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  setup(props) {
    const collapse = inject("collapse");
    const sideClass = computed(() =>
      props.collapse ? "el-icon-s-unfold" : "el-icon-s-fold"
    );
    return { ...Topbar(), ...pageStore, sideClass, collapse };
  }
});
</script>

<style lang="scss" scoped>
$color: #409eff;
.header-info {
  line-height: 26px;
  font-size: 18px;
  padding: 4px;
}
.cursor {
  cursor: pointer;
}

.icon-button {
  cursor: pointer;
  font-size: 26px;
  &:hover {
    color: $color;
  }
}
</style>
