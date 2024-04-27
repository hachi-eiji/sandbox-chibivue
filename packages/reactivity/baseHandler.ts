import {track, trigger} from './effect';
import {reactive} from './reactive';

export const mutableHandlers: ProxyHandler<object> = {
  // target: 対象のオブジェクト
  // key: プロパティ名
  // receiver: Proxyまたはプロキシから継承するオブジェクト
  //https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get
  get(target: object, key: string | symbol, receiver: object){
    track(target, key);

    const res = Reflect.get(target,key,receiver)

    // ネストしたオブジェクトもリアクティブにするために
    // objectの場合はreactiveにする
    if(res !== null && typeof res === 'object'){
      return reactive(res)
    }
    return res
  },

  set(target: object, key: string | symbol, value: unknown, receiver: object){
    let oldValue = (target as any)[key]
    Reflect.set(target, key, value, receiver)

    if(hasChanged(value, oldValue)) {
      trigger(target ,key);
    }
    return true;
  }
};

const hasChanged = (value: any, oldValue: any): boolean =>
  !Object.is(value, oldValue)
