<template>
  <el-row style="height: 100%">
    <el-col :span="20" style="height: 100%">
      <div class="tools">
        <div>
          <el-button
            circle
            @click="addNode"
            icon="el-icon-plus"
            size="mini"
          ></el-button>
        </div>
        <div></div>
      </div>
      <div style="display: flex; height: calc(100% - 26px)">
        <div id="efContainer" ref="efContainer" class="container">
          <FlowNode
            v-for="(node, key) in flow.nodes"
            :id="node.id"
            :key="node.id"
            :node="node"
            :activeElement="activeElement"
            @clickNode="clickNode"
          ></FlowNode>
          <div style="position: absolute; top: 2000px; left: 2000px">
            &nbsp;
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <NodeProperties :node.sync="activeElement"></NodeProperties>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import FlowNode from "/@/components/Flow/FlowNode.vue";
import NodeProperties from "/@/components/Flow/NodeProperties.vue";

import useFlow from "./useFlow";
import { FlowInfo } from "./types";

export default defineComponent({
  name: "WorkFlow",
  components: { FlowNode, NodeProperties },
  props: {
    flow: {
      type: Object as PropType<FlowInfo>,
      required: true
    }
  },
  setup(props, { emit }) {
    const flowProp = computed<FlowInfo>({
      get: () => props.flow,
      set: val => emit("update:flow", val)
    });
    const flowHook = useFlow(flowProp.value);

    return { ...flowHook };
  }
});
</script>

<style lang="scss">
/*画布容器*/
#efContainer {
  position: relative;
  overflow: scroll;
  flex: 1;
  box-sizing: border-box;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background: -webkit-linear-gradient(top, transparent 17px, #ececec 0),
    -webkit-linear-gradient(left, transparent 17px, #ececec 0);
  background-size: 18px 18px;

  .ef-dot {
    background-color: #1879ff;
    border-radius: 10px;
  }

  .ef-dot-hover {
    background-color: red;
  }

  .ef-rectangle {
    background-color: #1879ff;
  }

  .ef-rectangle-hover {
    background-color: red;
  }

  .ef-drop-hover {
    border: 1px dashed #1879ff;
  }

  /* 连线中的label 样式*/
  .flowLabel {
    background-color: white;
    color: #565758 !important;
    border-radius: 5px;
  }
}

.tools {
  display: flex;
}
</style>
