<template>
  <div class="header-info">
    <el-row justify="space-around" type="flex">
      <el-col :span="1">
        <i @click="collapse" class="icon-button" :class="sideClass"></i>
      </el-col>
      <el-col class="title" :span="12">{{ pageState.title }}</el-col>
      <el-col :span="11" style="text-align: right">
        <i class="el-icon-refresh icon-button" @click="reload"></i>
        <i class="el-icon-full-screen icon-button" @click="fullScreen"></i>

        <el-dropdown @command="handleCommand">
          <span class="cursor">
            <i class="el-icon-user icon-button"></i>
            我的信息
            <i class="el-icon-arrow-down"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
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
import { ElMessage } from "element-plus";
import { store } from "/@/store";

import Tabber from "/@/layouts/components/Tabber.vue";
import { useRouter } from "vue-router";

const Topbar = () => {
  const router = useRouter();

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

  const enum Commands {
    User = "user",
    Logout = "logout"
  }

  const handleCommand = async command => {
    switch (command) {
      case Commands.Logout:
        await store.dispatch("user/logout");
        ElMessage.success({
          message: "退出登录成功",
          type: "success"
        });
        const toPath = decodeURIComponent("/login");
        await router.replace(toPath);
        break;
    }
  };

  return {
    handleCommand,
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
  .title {
    font-weight: 560;
    font-size: 16px;
  }
}
.cursor {
  cursor: pointer;
}

.icon-button {
  cursor: pointer;
  font-size: 20px;
  &:hover {
    color: $color;
  }
}
</style>
