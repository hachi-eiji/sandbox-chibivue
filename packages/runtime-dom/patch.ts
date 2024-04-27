import {RendererOptions} from '../runtime-core';
import {patchEvent}  from './modules/evnets';

type DOMRenderOptions = RendererOptions<Node, Element>

const onRe = /^on[^a-z]/

export const isOn = (key: string) => onRe.test(key);

export const patchProp: DOMRenderOptions['patchProp'] = (el, key, value) => {
  if(isOn(key)){
    patchEvent(el, key ,value);
  } else {
    // patchAttr(el, key ,value);
  }
}
