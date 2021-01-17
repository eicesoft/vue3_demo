import { AnchorSpec } from "jsplumb";

export enum ElementType {
  node = "node",
  link = "link"
}

export enum NodeType {
  approval, //审批
  end //结束
}

export interface FlowElement {
  nodeId: string; //节点id
  type: ElementType;
  option?: object;
}

export interface NodeInfo {
  id: string;
  type?: NodeType;
  name?: string;
  left?: string;
  state?: "success" | "running" | "error" | "warning";
  top?: string;
  ico?: string;
}

export interface LinkInfo {
  from: string;
  to: string;
  label?: string;
  connector?: string;
  anchors?: AnchorSpec;
  paintStyle?: any;
}

export interface FlowInfo {
  nodes: NodeInfo[];
  links: LinkInfo[];
}
