import { ReactiveEffect } from '../reactivity'
import { ComponentOptions } from './componentOptions'
import { VNode, VNodeChild } from './vnode'
import {Props,initProps} from './componentProps'
import { emit } from "./componentEmits";

export type Component = ComponentOptions
export type Data = Record<string, unknown>;

type CompileFunction = (template: string) => InternalRenderFunction;
let compile: CompileFunction | undefined;

export function registerRuntimeCompiler(_compile: any){
  compile = _compile;
}

export type InternalRenderFunction = {
  (ctx: Data): VNodeChild
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
  emit: (event: string, ...args: any[]) => void
  setupState: Data // setupの結果はオブジェクトの場合はここに格納することにする
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
    emit: null!,
    setupState: {}
  }
  instance.emit = emit.bind(null, instance);
  return instance;
}

export const setupComponent = (instance: ComponentInternalInstance) => {
  const {props} = instance.vnode;
  initProps(instance, props);

  const component = instance.type as Component;
  if(component.setup){
    const setupResult = component.setup(
      instance.props,
      {emit: instance.emit}
    ) as InternalRenderFunction;

    if (typeof setupResult === 'function'){
      instance.render = setupResult
    } else if(typeof setupResult === 'object' && setupResult !== null){
      instance.setupState = setupResult
    }
  }


  if(compile && !component.render) {
    const template = component.template ?? '';
    if(template){
      instance.render = compile(template)
    }
  }
}
