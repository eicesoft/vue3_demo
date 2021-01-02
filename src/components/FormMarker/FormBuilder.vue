<template>
  <el-form :labelPosition="left" :model="formModel" size="mini">
    sadgasdg
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  props: {},
  methods: {
    getData() {
      let datas = {};

      return datas;
    }
  },
  setup(props) {
    const formModel = reactive({});

    return { formModel };
  }
});
</script>

<style lang="scss" scoped></style>
