<template>
  <router-view v-if="isRouterAlive" />
</template>

<script>
import {
  ref,
  computed,
  provide,
  nextTick,
  onUnmounted,
  getCurrentInstance
} from "vue";
import { store } from "/@/store";
import NProgress from "nprogress"; // progress bar
import { $on, $clear } from "/@/utils/eventbus";

export default {
  name: "App",
  setup(props, context) {
    const inst = getCurrentInstance();
    // console.log(inst);
    inst.appContext.config.errorHandler = (err, vm, info) => {
      store.dispatch("error/add", {
        err,
        vm,
        info
      });
    };

    onUnmounted(() => {
      $clear();
    });
    $on("test", ({ count }) => {
      console.log("Custom Event:", count.value);
    });

    const isRouterAlive = ref(true);
    const reload = () => {
      NProgress.start();

      isRouterAlive.value = false;
      nextTick(function () {
        isRouterAlive.value = true;

        NProgress.done();
      });
    };

    provide("reload", reload);

    return { isRouterAlive };
  }
};
</script>
