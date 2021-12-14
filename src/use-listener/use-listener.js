import { useLayoutEffect } from "atomico";
import { useCurrentValue } from "../use-current-value/use-current-value";
/**
 * @template {Element} E
 * @tempalte {string} T
 * @param {import("atomico").Ref<E>} ref
 * @param {T} name
 * @param {(ev:import("atomico").DOMEvent<"click",E>)=>any} handler
 * @param {boolean|AddEventListenerOptions} [options]
 */
export function useListener(ref, name, handler, options) {
  const value = useCurrentValue(handler);
  useLayoutEffect(() => {
    const { current } = ref;
    if (!current || !handler) return;
    return addListener(current, name, (event) => value.current(event), options);
  }, [name, !!handler]);
}

/**
 * Associate an event and return a callback to remove said event
 * @template {string} T
 * @param {Element} current
 * @param {T} name
 * @param {(ev:import("atomico").DOMEvent<"click">)=>any} handler
 * @param {boolean|AddEventListenerOptions} options
 * @returns {()=>void}
 */
export function addListener(current, name, handler, options) {
  current.addEventListener(name, handler, options);
  return () => current.removeEventListener(name, handler);
}
