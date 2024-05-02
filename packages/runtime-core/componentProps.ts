import { reactive } from "../reactivity"
import { ComponentInternalInstance } from "./component"
import {Data} from './component'

export type Props = Record<string, PropsOption | null>
export type PropsType<T> = { new(...args: any[]):T & {} }

export interface PropsOption<T = any> {
  type?: PropsType<T> | true | null
  required?: boolean
  default?: null | undefined | object
}

export function initProps (
  instance: ComponentInternalInstance,
  rawProps: Data | null,
) {
  const props: Data = {};
  setFullProps(instance, rawProps, props);
  instance.props = reactive(props);
}

export function updateProps(
  instance: ComponentInternalInstance,
  rawProps: Data | null,
) {
  const { props } = instance;
  Object.assign(props, rawProps);
}

function setFullProps(
  instance: ComponentInternalInstance,
  rawProps: Data | null,
  props: Data,
) {
  const options = instance.propsOptions;

  if(rawProps) {
    for (let key in rawProps) {
      const value = rawProps[key];
      if(options && options.hasOwnProperty(key)){
        props[key] = value;
      }
    }
  }
}
