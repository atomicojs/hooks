import { useListener } from "../use-listener/use-listener.js";

/**
 * reflects an event to another node
 * @param {Element} current
 * @param {Event} event
 * @param {boolean} [composed] - allows to reflect the events from target with independent shadowDOM to the host
 */
export const reflectEvent = (current, event, composed) => {
  const { currentTarget } = event;
  const { shadowRoot } = currentTarget;
  const path = event.composedPath();

  if (path.includes(current)) return;

  const index = path.indexOf(currentTarget);
  const insetShadowRoot = path
    .slice(0, index)
    .find((el) => el instanceof ShadowRoot);

  if (!composed && insetShadowRoot !== shadowRoot) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  current.dispatchEvent(new event.constructor(event.type, event));
};
/**
 * This hook reflects an event and cancels its propagation
 * @param {string} type
 * @param {import("atomico").Ref<Element>} refFrom - event source reference
 * @param {import("atomico").Ref<Element>} refTo - event destination reference
 * @param {{capture?:boolean, composed?:boolean}} [options] - allows to reflect the events from target with independent shadowDOM to the host
 */
export function useReflectEvent(
  refFrom,
  refTo,
  type,
  { capture = true, composed = true } = {}
) {
  useListener(
    refFrom,
    type,
    /**
     * @param {Event} event
     */
    (event) => {
      const { current } = refTo;
      current && reflectEvent(current, event, composed);
    },
    { capture }
  );
}
