import { useLayoutEffect, useHost } from "atomico";
/**
 *
 * @param {string } type
 * @param { EventListenerOrEventListenerObject } handler
 * @param { boolean | AddEventListenerOptions } [options]
 */
export function useListener(type, handler, options) {
  const ref = useHost();
  useListenerRef(ref, type, handler, options);
}
/**
 *
 * @param {import("atomico").Ref<Element>} ref
 * @param {string} type
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions} [options]
 */
export function useListenerRef(ref, type, handler, options) {
  useLayoutEffect(() => {
    const { current } = ref;
    current.addEventListener(type, handler, options);
    return () => current.removeEventListener(type, handler);
  }, [ref, type, handler, options]);
}
