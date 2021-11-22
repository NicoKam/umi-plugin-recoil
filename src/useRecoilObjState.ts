import { useRef } from 'react'
import { RecoilState, useRecoilState } from 'recoil';

/**
 * 扩展 useRecoilState 使其支持类似 setState 合并对象状态
 * @param atom
 */
export function useRecoilObjState<T extends Object>(atom: RecoilState<T>) {
  const [state, _setState] = useRecoilState(atom);
  const setState = (newState: Partial<T> | ((state: T) => Partial<T>)) => {
    _setState(state => ({
      ...state,
      ...(typeof newState === 'function' ? newState(state) : newState),
    }));
  };

  const setStateRefFn = useRef<typeof setState>();
  setStateRefFn.current = setState;

  const persistFn = useRef<typeof setState>();
  if (!persistFn.current) {
    persistFn.current = function (...args) {
      return setStateRefFn.current!.apply(this, args);
    }
  }

  return [state, persistFn.current] as [T, typeof setState];
}
