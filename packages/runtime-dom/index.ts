import {
  CreateAppFunction,
  createAppAPI,
  createRenderer
} from '../runtime-core';
import {nodeOps} from './inodeOps';
import {patchProp} from './patch';

const {render} = createRenderer({...nodeOps, patchProp});
const _createApp = createAppAPI(render)

export const createApp = ((...args) => {
  const app = _createApp(...args)
  const {mount} = app;
  app.mount = (selector: string) => {
    const container = document.querySelector(selector)
    if(!container) return
    mount(container)
  }
  return app;
}) as CreateAppFunction<Element>

export {h} from '../runtime-core';
