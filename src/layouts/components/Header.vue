<template>
  <div class="header-info">
    <el-row justify="space-around" align="middle" type="flex">
      <el-col :span="18">
        <div class="title">
          <i @click="collapse" class="icon-button" :class="sideClass"></i>
          <div style="margin: 0 0 0px 8px">
            <el-breadcrumb separator=">" style="line-height: 26px">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>
                <a>{{ title }}</a>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
      </el-col>

      <el-col :span="6" style="text-align: right; padding: 4px">
        <i title="刷新" class="el-icon-refresh icon-button" @click="reload"></i>
        <i
          title="全屏"
          class="el-icon-full-screen icon-button"
          @click="fullScreen"
        ></i>

        <el-badge is-dot class="item">
          <el-popover placement="bottom" :width="400" trigger="click">
            <template #reference>
              <i title="消息中心" class="el-icon-bell icon-button" />
            </template>
            十多个傻瓜傻瓜
          </el-popover>
        </el-badge>

        <el-popover
          v-if="errors?.length > 0"
          placement="bottom"
          :width="500"
          trigger="click"
        >
          <template #reference>
            <i
              title="错误信息"
              style="color: #f56c6c"
              class="el-icon-error icon-button"
            ></i>
          </template>
          <div>
            <div v-for="error in errors" class="error-info">
              <div :title="error.err.stack">
                <el-tag type="danger" size="mini">{{ error.info }}</el-tag>
                {{ error.err }}
              </div>
            </div>
            <el-button
              @click="clearErrors"
              style="width: 100%"
              icon="el-icon-delete"
              size="mini"
            >
              清除
            </el-button>
          </div>
        </el-popover>

        <el-dropdown @command="handleCommand" style="margin-left: 18px">
          <span class="cursor">
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

import { ElMessage } from "element-plus";
import { store } from "/@/store";

import Tabber from "/@/layouts/components/Tabber.vue";
import { useRouter } from "vue-router";

/**
 * Topbar
 */
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
        await router.replace(decodeURIComponent("/login"));
        break;
    }
  };

  return {
    handleCommand,
    reload: inject("reload"),
    fullScreen
  };
};

/**
 * 错误信息
 */
const ErrorBox = () => {
  const clearErrors = () => {
    store.dispatch("error/clear");
  };
  return {
    errors: store.getters["error/all"],
    clearErrors
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
    return {
      ...Topbar(),
      ...ErrorBox(),
      title: computed(() => store.getters["page/title"]),
      sideClass,
      collapse
    };
  }
});
</script>

<style lang="scss" scoped>
$color: #409eff;
.header-info {
  line-height: 26px;
  font-size: 18px;
  // padding: 0px;
  .title {
    font-weight: 560;
    font-size: 16px;
    display: flex;
  }
}

.error-info {
  padding: 8px 0;
}
.cursor {
  cursor: pointer;
}

.icon-button {
  cursor: pointer;
  margin: 0px 0px 0 8px;
  font-size: 24px;
  &:hover {
    color: $color;
  }
}
</style>
