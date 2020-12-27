<template>
  <div>
    {{ title }}: {{ count }}
    <div>
      <el-input type="text" v-model="count" />

      <el-button @click="add">Test</el-button>

      <el-input type="text" v-model="text" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, reactive, defineComponent } from "vue";
import { useStore } from "vuex";

import { $emit } from "/@/utils/eventbus";
import toActions from "/@/utils/http/action";

export default defineComponent({
  setup() {
    const store = useStore();
    console.log(store);
    let count = ref(0);
    let text = ref("");
    const add = () => {
      count.value += 2;
      // let x = 100 / b;
      $emit("test", { count });
    };
    // let x = 100 / b;
    return {
      // title: store.getters["page/title"],
      title: computed(() => store.getters["page/title"]),
      count,
      add,
      text
    };
  }
});
</script>

<style></style>
