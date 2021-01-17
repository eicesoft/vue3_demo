<template>
  <div class="properties">
    {{ nodeProp }}

    <div class="body" v-if="Object.keys(nodeProp).length > 0">
      <template v-if="nodeProp.type == ElementType.node">
        <div>节点</div>
      </template>

      <template v-else>
        <div>连接</div>
      </template>

      <div>
        <el-button size="mini" type="danger">删除</el-button>
      </div>
    </div>
    <div class="body" v-else>请选择元素</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { NodeInfo, ElementType } from "./types";

export default defineComponent({
  props: {
    node: {
      type: Object as PropType<NodeInfo>,
      required: true
    }
  },
  setup(props, { emit }) {
    const nodeProp = computed({
      get: () => props.node,
      set: val => emit("update:node", val)
    });

    return { nodeProp, ElementType };
  }
});
</script>
<style lang="scss" scoped>
.properties {
  // margin: 6px;
  border-left: 1px solid #cccccc;
  height: 100%;

  .body {
    margin: 6px;
  }
}
</style>
