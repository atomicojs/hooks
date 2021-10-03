import { useLayoutEffect } from "atomico";
import { useCurrentValue } from "../use-current-value/use-current-value";
/**
 * @template {string} T
 * @template {import("atomico").Ref<HTMLElement>} R
 * @param {R} ref
 * @param {T} name
 * @param {(ev:any)=>any} handler
 * @param {boolean|AddEventListenerOptions} [options]
 */
export function useListener(ref, name, handler, options) {
  const value = useCurrentValue(handler);
  useLayoutEffect(() => {
    const { current } = ref;
    if (!current) return;
    return addListener(current, name, (event) => value.current(event), options);
  }, [name, !!handler]);
}

/**
 * Associate an event and return a callback to remove said event
 * @param {Element} current
 * @param {string} name
 * @param {(ev:any)=>any} handler
 * @param {boolean|AddEventListenerOptions} options
 * @returns {()=>void}
 */
export function addListener(current, name, handler, options) {
  current.addEventListener(name, handler, options);
  return () => current.removeEventListener(name, handler);
}
