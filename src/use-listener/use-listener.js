import { useLayoutEffect, useRef } from "atomico";

/**
 * @template {string} T
 * @template {import("atomico").Ref<HTMLElement>} R
 * @param {R} ref
 * @param {T} name
 * @param {(ev:any)=>any} handler
 * @param {boolean|AddEventListenerOptions} [options]
 */
export function useListener(ref, name, handler, options) {
  const scope = useRef();
  scope.current = handler;
  useLayoutEffect(() => {
    const { current } = ref;
    if (!current) return;
    let handler = (event) => scope.current(event);
    current.addEventListener(name, handler, options);
    return () => current.removeEventListener(current, handler);
  }, [name, !!handler]);
}
