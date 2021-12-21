import { useLayoutEffect } from "atomico";
import { useCurrentValue } from "../use-current-value/use-current-value";
/**
 * @param {import("atomico").Ref} ref
 * @param {string} name
 * @param {EventListener} handler
 * @param {boolean|AddEventListenerOptions} [options]
 */
export function useListener(ref, name, handler, options) {
  const value = useCurrentValue(handler);
  useLayoutEffect(() => {
    const { current } = ref;
    if (!current || !handler) return;
    return addListener(current, name, (event) => value.current(event), options);
  }, [ref, ref?.current, name, !!handler]);
}

/**
 * Associate an event and return a callback to remove said event
 * @param {ChildNode} current
 * @param {string} name
 * @param {EventListener} handler
 * @param {boolean|AddEventListenerOptions} [options]
 * @returns {()=>void}
 */
export function addListener(current, name, handler, options) {
  current.addEventListener(name, handler, options);
  return () => current.removeEventListener(name, handler);
}
