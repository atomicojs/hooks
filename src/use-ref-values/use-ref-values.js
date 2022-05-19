import { useHook } from "atomico";

/**
 * @template {import("atomico").Ref[]} T
 * @param {(args: Args<T>)=>(void | ()=>any)} callback
 * @param {T} args
 * @param {boolean} [mode] - by default it is executed in the cycle of useLayoutEffect, if true it will be executed in the cycle of useEffect
 */
export function useRefValues(callback, args, mode) {
  const effect = (state, unmounted) => {
    const { length } = args;
    let [prevArgs = [], collector] = state;
    let withCurrent = 0;
    let withDiff = 0;
    let nextArgs = [];

    for (let i = 0; i < length; i++) {
      const { current } = args[i];
      if (current != null) {
        withCurrent++;
      }
      if (current != prevArgs[i]) {
        withDiff++;
      }
      nextArgs.push(current);
    }

    if ((withDiff || unmounted) && collector) {
      collector();
      collector = null;
    }

    if (withDiff && !unmounted && withCurrent === length) {
      collector = callback(nextArgs);
    }

    return [nextArgs, collector];
  };

  useHook((state = []) => state, !mode && effect, mode && effect);
}

/**
 * @template T
 * @typedef { { [I in keyof T ]: T[I] extends {current?: infer R} ?  R : any } } Args
 */
