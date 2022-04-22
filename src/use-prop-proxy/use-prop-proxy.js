import { useHost, useState } from "atomico";
import { useCurrentValue } from "../use-current-value/use-current-value.js";

/**
 * this hook replaces a property with a setter and
 * getter to observe these mutations
 * @param {string} prop
 * @param { { set?: (value: any) => any, get?: () => any }} config
 */
export function usePropProxy(prop, config) {
  const host = useHost();
  const value = useCurrentValue(config);

  useState(() => {
    const { current } = host;

    const descriptor = Object.getOwnPropertyDescriptor(
      current.constructor.prototype,
      prop
    );

    Object.defineProperty(current, prop, {
      configurable: true,
      enumerable: !!descriptor?.enumerable,
      get() {
        if (value.current?.get) {
          return value.current?.get();
        }
        return descriptor?.get?.call(current);
      },
      set(nextValue) {
        value.current?.set(nextValue);
        return descriptor?.set?.call(current, nextValue);
      },
    });
  });
}
