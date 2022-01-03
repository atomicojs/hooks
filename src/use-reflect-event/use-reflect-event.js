import { useListener } from "../use-listener/use-listener";

/**
 * reflects an event to another node
 * @param {Element} current
 * @param {Event} event
 */
export const reflectEvent = (current, event) => {
  if (!event.composedPath().includes(current)) {
    event.preventDefault();
    event.stopPropagation();
    current.dispatchEvent(new event.constructor(event.type, event));
  }
};
/**
 * This hook reflects an event and cancels its propagation
 * @param {string} type
 * @param {import("atomico").Ref<Element>} refFrom - event source reference
 * @param {import("atomico").Ref<Element>} refTo - event destination reference
 */
export function useReflectEvent(refFrom, refTo, type) {
  useListener(
    refFrom,
    type,
    /**
     * @param {Event} event
     */
    (event) => {
      const { current } = refTo;
      if (!current) return;
      reflectEvent(current, event);
    }
  );
}
