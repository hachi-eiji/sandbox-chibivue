import { ReactiveEffect } from '../reactivity'
import { ComponentOptions } from './componentOptions'
import { VNode, VNodeChild } from './vnode'

export type Component = ComponentOptions

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
  }
  return instance;
}
