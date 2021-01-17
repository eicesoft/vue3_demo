<template>
  <div
    ref="node"
    :style="nodeContainerStyle"
    @click="clickNode"
    @mouseup="changeNodeSite"
    :class="nodeContainerClass"
  >
    <div class="ef-node-left-ico flow-node-drag">
      <i :class="nodeIcoClass"></i>
    </div>
    <div class="ef-node-text" :show-overflow-tooltip="true">
      {{ node.name }}
    </div>
    <div class="ef-node-right-ico">
      <i
        class="el-icon-circle-check el-node-state-success"
        v-show="node.state === 'success'"
      ></i>
      <i
        class="el-icon-circle-close el-node-state-error"
        v-show="node.state === 'error'"
      ></i>
      <i
        class="el-icon-warning-outline el-node-state-warning"
        v-show="node.state === 'warning'"
      ></i>
      <i
        class="el-icon-loading el-node-state-running"
        v-show="node.state === 'running'"
      ></i>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { NodeType } from "./types";

import VueTypes from "vue-types";

export default defineComponent({
  props: {
    node: VueTypes.object,
    activeElement: VueTypes.object
  },
  methods: {
    // 点击节点
    clickNode() {
      this.$emit("clickNode", this.node);
    },
    // 鼠标移动后抬起
    changeNodeSite() {
      // 避免抖动
      if (
        this.node.left == this.$refs.node.style.left &&
        this.node.top == this.$refs.node.style.top
      ) {
        return;
      }
      this.$emit("changeNodeSite", {
        nodeId: this.node.id,
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top
      });
    }
  },
  setup(props) {
    const nodeContainerStyle = computed(() => {
      return {
        top: props.node.top,
        left: props.node.left
      };
    });

    const nodeContainerClass = computed(() => {
      return {
        "ef-node-container": true,
        "ef-node-end": props.node.type === NodeType.end,
        "ef-node-active":
          props.activeElement.type == "node"
            ? props.activeElement.nodeId === props.node.id
            : false
      };
    });

    const nodeIcoClass = computed(() => {
      let nodeIcoClass = {
        [props.node.ico]: true,
        ["flow-node-drag"]: props.node.viewOnly ? false : true
      };

      return nodeIcoClass;
    });

    return { nodeContainerStyle, nodeContainerClass, nodeIcoClass };
  }
});
</script>
<style lang="scss" scoped>
.ef-node-container {
  position: absolute;
  display: flex;
  width: 170px;
  height: 32px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  background-color: #fff;
  border-left: 4px solid #cccccc;
}

/* 设置移动样式*/
.ef-node-container:hover {
  cursor: move;
  background-color: #f0f7ff;
  /*box-shadow: #1879FF 0px 0px 12px 0px;*/
  border: 1px dashed #1879ff;
  border-left: 4px solid #1879ff;
}

.ef-node-end {
  background-color: #ececec;
  // box-shadow: #303030 0px 0px 6px 0px;
  border: 1px solid #303030;
  border-left: 4px solid #303030;
}

/*节点激活样式*/
.ef-node-active {
  background-color: #f0f7ff;
  box-shadow: #1879ff 0px 0px 8px 0px;
  border: 1px solid #1879ff;
  border-left: 4px solid #1879ff;
  color: #1879ff;
  .ef-node-text {
    color: #1879ff;
    font-weight: 800;
  }
}

/*节点左侧的图标*/
.ef-node-left-ico {
  line-height: 32px;
  margin-left: 8px;
  font-size: 18px;
}

.ef-node-left-ico:hover {
  /* 设置拖拽的样式 */
  cursor: crosshair;
}

/*节点显示的文字*/
.ef-node-text {
  color: #565758;
  font-size: 12px;
  line-height: 32px;
  margin-left: 8px;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

/*节点右侧的图标*/
.ef-node-right-ico {
  line-height: 32px;
  position: absolute;
  right: 5px;
  color: #84cf65;
  cursor: default;
}

/*节点的几种状态样式*/
.el-node-state-success {
  line-height: 32px;
  position: absolute;
  right: 5px;
  color: #84cf65;
  cursor: default;
}

.el-node-state-error {
  line-height: 32px;
  position: absolute;
  right: 5px;
  color: #f56c6c;
  cursor: default;
}

.el-node-state-warning {
  line-height: 32px;
  position: absolute;
  right: 5px;
  color: #e6a23c;
  cursor: default;
}

.el-node-state-running {
  line-height: 32px;
  position: absolute;
  right: 5px;
  color: #84cf65;
  cursor: default;
}
</style>
