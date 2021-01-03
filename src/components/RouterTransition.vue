<template>
  <router-view
    :key="notNeedKey ? 'key' : route.fullPath"
    v-slot="{ Component }"
  >
    <transition v-if="animate" name="zoom-fade" mode="out-in">
      <component :is="Component" />
    </transition>
    <component v-else :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import VueTypes from "vue-types";

export default defineComponent({
  name: "RouterTransition",
  props: {
    notNeedKey: VueTypes.bool.def(false),
    animate: VueTypes.bool.def(true)
  },
  setup() {
    const route = useRoute();

    return {
      route
    };
  }
});
</script>
