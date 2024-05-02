import { ReactiveEffect } from '../reactivity'
import { ComponentOptions } from './componentOptions'
import { VNode, VNodeChild } from './vnode'
import {Props} from './componentProps'

export type Component = ComponentOptions
export type Data = Record<string, unknown>;

export type InternalRenderFunction = {
  (): VNodeChild
}

export interface ComponentInternalInstance {
  type: Component // 元となるユーザ定義のコンポーネント
  vnode: VNode
  subTree: VNode
  next: VNode | null
  effect: ReactiveEffect
  render: InternalRenderFunction
  update: () => void
  isMounted: boolean
  propsOptions: Props
  props: Data
}

export function createComponentInstance(
  vnode: VNode
): ComponentInternalInstance {
  const type = vnode.type as Component;

  const instance: ComponentInternalInstance = {
    type,
    vnode,
    next: null,
    effect: null!,
    subTree: null!,
    update: null!,
    render: null!,
    isMounted: false,
    propsOptions: type.props || {},
    props: {},
  }
  return instance;
}
