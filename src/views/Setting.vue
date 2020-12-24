<template>
  <div>
    {{ pageStore.title }} {{ count }}
    <div>
      <el-input type="text" v-model="count" />

      <el-button @click="add">Test</el-button>

      <el-input type="text" v-model="text" />
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import pageStore from "/@/store/page";
import { useEventbus } from "/@/utils/eventbus";
import toActions from "/@/utils/http/action";

export default {
  setup() {
    console.log("setup");

    const { $emit } = useEventbus();

    let count = ref(0);
    let text = ref("");
    const add = () => {
      count.value += 2;
      $emit("test", { count });
    };

    return { count, add, pageStore: pageStore.useState(), text };
  }
};
</script>

<style></style>
