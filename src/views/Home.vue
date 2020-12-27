<template>
  <div class="content">
    {{ title }}
    <el-button @click="setTitle" size="mini" type="primary">
      el-button
    </el-button>
    <br />
    sdgagd
    <br />
    sdgagd
    <br />

    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    dgagd
    <br />
    sdgagd
    <br />

    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    dgagd
    <br />
    sdgagd
    <br />

    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    dgagd
    <br />
    sdgagd
    <br />

    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    dgagd
    <br />
    sdgagd
    <br />

    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    dgagd
    <br />
    sdgagd
    <br />

    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    dgagd
    <br />
    sdgagd
    <br />

    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    dgagd
    <br />
    sdgagd
    <br />

    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
    sdgagd
    <br />
  </div>
</template>

<script>
// import { store } from "/@/store";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      title: computed(() => store.getters["page/title"]),

      // title: store.getters["page/title"],
      setTitle: () => {
        store.dispatch("page/setTitle", "测试标题");
        console.log(store);
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
}
</style>
