<template>
  <div>
    Setting {{ count }} {{ pageStore.title }}
    <div>
      <input type="text" :value="count" />
      <button @click="add">Test</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import pageStore from "/@/store/page";

export default {
  setup() {
    const count = ref(0);
    console.log("setup");
    const add = () => {
      count.value++;
    };

    return { count, add, pageStore: pageStore.useState() };
  }
};
</script>

<style></style>
