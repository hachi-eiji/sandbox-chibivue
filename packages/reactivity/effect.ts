import {Dep, createDep} from './dep';

type Target = any;
// key: リアクティブにしたいオブジェクト(=target)
// value:実行したい作用(関数) (=Dep)
type KeyToDepMap =  Map<Target, Dep>;

// これはグローバル変数
// key: target, value:dep
const targetMap =  new WeakMap<Target, KeyToDepMap>();

export let activeEffect: ReactiveEffect | undefined;
export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {}

  run() {
    // fnを実行する前のactiveEffectを保持して、実行したら元に戻す
    // 上書きして意図しない挙動をする
    let parent: ReactiveEffect | undefined = activeEffect;
    activeEffect = this;
    const res = this.fn();
    activeEffect = parent;
    return res;
  }
}

// targetMapに実行したい作用を登録する
export function track(target: object, key: unknown){
  let depsMap = targetMap.get(target);
  if(!depsMap){
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if(!dep){
    depsMap.set(key, (dep = createDep()));
  }

  if(activeEffect) {
    dep.add(activeEffect);
  }
}

// targetMapから作用を取り出して実行する
export function trigger(target: object, key?: unknown){
  const depsMap = targetMap.get(target);
  if(!depsMap) return ;

  const dep = depsMap.get(key);
  if(dep){
    const effects = [...dep];
    for(const effect of effects) {
      effect.run();
    }
  }
}
