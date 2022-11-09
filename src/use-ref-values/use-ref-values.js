import { useEffect, useRef, useLayoutEffect } from "atomico";

/**
 * @template {import("atomico").Ref[]} T
 * @param {(args: Args<T>)=>(void | ()=>any)} callback
 * @param {T} args
 * @param {boolean} mode
 */
export function useRefValues(callback, args, mode) {
  const { current } = useRef({ args, mode });

  (current.mode ? useEffect : useLayoutEffect)(() => {
    if (
      args.some(
        (ref, i) => ref.current && ref.current !== current.args[i]?.current
      )
    ) {
      current.args = args;
      callback(args.map(({ current }) => current));
    }
  });
}

/**
 * @template T
 * @typedef { { [I in keyof T ]: T[I] extends {current?: infer R} ?  R : any } } Args
 */
