<template>
  <div class="content">
    Home
    {{ state.title }}
    <el-button @click="setTitle" size="mini" type="primary">
      el-button
    </el-button>
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
import pageStore from "/@/store/page";

export default {
  setup() {
    return {
      state: pageStore.useState(),
      setTitle: () => {
        pageStore.setTitle("sadgadgasg");
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
}
</style>
