import { ConnectParams, jsPlumb } from "jsplumb";
import { getCurrentInstance, ref, nextTick, onMounted, PropType } from "vue";
import {
  ElementType,
  FlowElement,
  FlowInfo,
  NodeInfo,
  NodeType
} from "./types";
import {
  jsplumbSetting,
  jsplumbSourceOptions,
  jsplumbTargetOptions,
  jsplumbConnectOptions
} from "./config";

/**
 *
 * @param flow
 */
export default function useFlow(flow) {
  const { nodes, links } = flow;
  const { merge } = window.$_;
  let loadEasyFlowFinish: boolean = false;
  const instance = jsPlumb.getInstance();
  const that = getCurrentInstance();
  const { ctx } = that;
  const activeElement = ref<FlowElement | object>({});

  const selectElement = (ele: FlowElement) => {
    activeElement.value = ele;
  };

  const enableNode = (node: NodeInfo) => {
    // 设置源点，可以拖出线连接其他节点
    instance.makeSource(node.id, merge(jsplumbSourceOptions, {}));
    // 设置目标点，其他源点拖出的线可以连接该节点
    instance.makeTarget(node.id, jsplumbTargetOptions);
    // 设置拖动
    instance.draggable(node.id, {
      containment: "parent",
      stop: function (el) {
        console.log("拖拽结束: ", el);
      }
    });
  };

  const hasLine = (from: string, to: string) => {
    for (var i = 0; i < links.length; i++) {
      let line = links[i];
      if (line.from === from && line.to === to) {
        return true;
      }
    }
    return false;
  };

  const findNode = (id: string): NodeInfo => {
    let node;
    nodes.forEach((element: NodeInfo) => {
      if (element.id == id) {
        node = element;
      }
    });

    return (node as unknown) as NodeInfo;
  };

  const initPlumb = () => {
    instance.ready(() => {
      instance.importDefaults(jsplumbSetting);
      instance.setSuspendDrawing(false, true);
      console.log(nodes);
      for (var i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        enableNode(node);
      }
      // console.log(linkList);
      for (var i = 0; i < links.length; i++) {
        let link = links[i];
        let connParam: ConnectParams = {
          source: link.from,
          target: link.to,
          label: link.label ? link.label : "",
          connector: link.connector ? link.connector : "",
          anchors: link.anchors ? link.anchors : undefined
          // paintStyle: link.paintStyle ? link.paintStyle : undefined
        };
        // console.log(connParam);
        instance.connect(connParam, jsplumbConnectOptions);
      }

      instance.bind("click", conn => {
        console.log(conn);
        selectElement({
          type: ElementType.link,
          nodeId: conn.id,
          option: {
            sourceId: conn.sourceId,
            targetId: conn.targetId
            // titl: conn.label
          }
        });
        // ctx.refs.nodeForm.lineInit({
        //   from: conn.sourceId,
        //   to: conn.targetId,
        //   label: conn.getLabel()
        // });
      });

      instance.bind("connection", evt => {
        let from = evt.source.id;
        let to = evt.target.id;
        if (loadEasyFlowFinish) {
          links.push({ from: from, to: to });
        }
      });

      instance.bind("beforeDrop", evt => {
        let from = evt.sourceId;
        let to = evt.targetId;

        let node: NodeInfo = findNode(from);
        if (node.type == NodeType.end) {
          ctx.$message.warning("结束节点不能再连接到其他节点");

          return false;
        }

        if (from === to) {
          return false;
        }

        if (hasLine(from, to)) {
          ctx.$message.warning("该关系已存在,不允许重复创建");
          return false;
        }

        if (hasLine(to, from)) {
          ctx.$message.error("不支持两个节点之间连线回环");
          return false;
        }

        return true;
      });

      nextTick(function () {
        loadEasyFlowFinish = true;
      });

      instance.setContainer(that.refs.efContainer);
    });
  };

  onMounted(() => {
    initPlumb();
  });

  const clickNode = (node: NodeInfo) => {
    selectElement({
      type: ElementType.node,
      nodeId: node.id,
      option: {
        name: node.name,
        state: node.state
      }
    });
  };

  const getConfig = () => {
    return instance.getAllConnections();
  };

  const getUUID = () => {
    return Math.random().toString(36).substr(3, 10);
  };

  const addNode = () => {
    const node: NodeInfo = {
      id: getUUID(),
      name: "节点_" + getUUID(),
      // type: "task",
      left: (Math.random() * 50).toFixed(0) + "px",
      // state: "error",
      top: (Math.random() * 100).toFixed(0) + "px",
      ico: "el-icon-tickets"
    };
    nodes.push(node);

    nextTick(() => {
      enableNode(node);
    });
  };

  const removeNode = (nodeId: string) => {
    ctx
      .$confirm("确定要删除节点" + nodeId + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      })
      .then(() => {
        /**
         * 这里需要进行业务判断，是否可以删除
         */
        // nodes = nodes.for(function (node: NodeInfo) {
        //   if (node.id === nodeId) {
        //     // 伪删除，将节点隐藏，否则会导致位置错位
        //     // node.show = false
        //     return false;
        //   }
        //   return true;
        // });
        nextTick(function () {
          instance.removeAllEndpoints(nodeId);
        });
      })
      .catch(() => {});
    return true;
  };

  return {
    activeElement,
    clickNode,
    getConfig,
    enableNode,
    addNode,
    removeNode
  };
}
