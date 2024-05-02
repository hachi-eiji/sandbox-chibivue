import { RendererNode } from './renderer';
import {ComponentInternalInstance} from './component'

export const Text = Symbol();
export type VNodeTypes = string | typeof Text | object;

type VNodeChildAtom = VNode | string;
export type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>;
export type VNodeChild = VNodeChildAtom | VNodeArrayChildren
export type VNodeNormalizedChildren = string | VNodeArrayChildren;

export interface VNode<HostNode = RendererNode> {
  type: VNodeTypes
  props: VNodeProps | null
  children: VNodeNormalizedChildren
  el?: HostNode
  component: ComponentInternalInstance | null
}

export interface VNodeProps {
  [key: string]: any
}


export function createVNode(
  type: VNodeTypes,
  props: VNodeProps | null,
  children: VNodeNormalizedChildren,
): VNode {
  const vnode: VNode = {type, props, children}
  return vnode;
}

export function normalizeVNode(child: VNodeChild): VNode {
  if (typeof child === 'object') {
    return {...child} as VNode;
  }
  return createVNode(Text, null, String(child))
}
