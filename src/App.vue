<template>
  <router-view v-if="isRouterAlive" />
</template>

<script>
import { ref, computed, provide, nextTick, onUnmounted } from "vue";
import router from "/@/routers";
import NProgress from "nprogress"; // progress bar

import pageStore from "/@/store/page";
import axios from "axios";

import { useEventbus } from "/@/utils/eventbus";

export default {
  name: "App",
  setup(props, context) {
    const { $on, $clear } = useEventbus();
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

    pageStore.useProvide();

    return { isRouterAlive };
  }
};
</script>
