<template>
  <div class="page">
    <!-- 过滤器组件 -->
    <suspense>
      <template #default>
        <Filter :size="12" @change="changeFilter" :module="'user'">
          <div class="test">
            <el-button size="mini">Test</el-button>
            <el-button size="mini">Test</el-button>
            <el-button size="mini">Test</el-button>
          </div>
        </Filter>
      </template>
      <template #fallback>
        <el-skeleton :rows="1" animated />
      </template>
    </suspense>
  </div>
</template>

<script lang="ts">
import Filter from "/@/components/Filter.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: { Filter },
  data() {
    return {
      module: "test"
    };
  },
  setup() {
    // 更换过滤器
    const changeFilter = filter => {
      console.log(filter);
    };

    return {
      changeFilter
    };
  }
});
</script>

<style lang="scss" scoped>
.test {
  vertical-align: middle;
  position: absolute;
  bottom: 0px;
  padding: 0px;
  margin: 0px;
  right: 0;
}
</style>
