<template>
  <WorkFlow ref="workflow" :flow="flow"></WorkFlow>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { WorkFlow } from "/@/components/Flow";
import { FlowInfo, NodeType } from "/@/components/Flow/types";

export default defineComponent({
  components: { WorkFlow },
  setup() {
    const flow = ref<FlowInfo>({
      nodes: [
        {
          id: "nodeA",
          name: "流程A-节点A",
          type: NodeType.approval,
          left: "26px",
          top: "161px",
          ico: "el-icon-tickets"
        },
        {
          id: "nodeB",
          name: "流程A-节点B",
          type: NodeType.approval,
          left: "340px",
          top: "161px",
          ico: "el-icon-tickets"
        },
        {
          id: "nodeC",
          name: "流程A-节点C",
          type: NodeType.end,
          left: "739px",
          top: "161px",
          ico: "el-icon-tickets"
        }
      ],
      links: [
        {
          from: "nodeA",
          to: "nodeB",
          label: "sgsdgsdgsgd"
        },
        {
          from: "nodeB",
          to: "nodeC"
        }
      ]
    });

    return { flow };
  }
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 600px;
  border: 1px solid gray;
}
</style>
