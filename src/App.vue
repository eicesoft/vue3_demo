<template>
  <router-view v-if="isRouterAlive" />
</template>

<script>
import { ref, computed, provide, nextTick } from "vue";
import router from "/@/routers";
import NProgress from "nprogress"; // progress bar

import pageStore from "/@/store/page";
import axios from "axios";

export default {
  name: "App",
  setup(props, context) {
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
