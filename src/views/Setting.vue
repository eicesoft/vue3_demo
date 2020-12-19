<template>
  <div>
    Setting {{ count }}
    <div>
      <input type="text" :value="count" />
      <button @click="add">Test</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const count = ref(0);
    console.log("setup");
    const add = () => {
      count.value++;
    };

    return { count, add };
  }
};
</script>

<style></style>
