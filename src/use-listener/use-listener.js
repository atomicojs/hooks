import { useState } from "atomico";
import { useRefValues } from "../use-ref-values/use-ref-values.js";
import { useCurrentValue } from "../use-current-value/use-current-value.js";
/**
 * @param {import("atomico").Ref} ref
 * @param {string} name
 * @param {EventListener} handler
 * @param {boolean|AddEventListenerOptions} [options]
 */
export function useListener(ref, name, handler, options) {
  const value = useCurrentValue(handler);
  useRefValues(
    ([current]) => {
      return addListener(
        current,
        name,
        (event) => value.current(event),
        options
      );
    },
    [ref]
  );
}

/**
 * Associate an event and return a callback to remove said event
 * @template {ChildNode | typeof window} C
 * @template {Event} E
 * @param {C} current
 * @param {string} name
 * @param {(event:import("atomico").DOMEvent<C, E>)=>any} handler
 * @param {boolean|AddEventListenerOptions} [options]
 * @returns {()=>void}
 */
export function addListener(current, name, handler, options) {
  current.addEventListener(name, handler, options);
  return () => current.removeEventListener(name, handler);
}

/**
 * @template T
 * @param {import("atomico").Ref} ref
 * @param {string} name
 * @param {(event:Event)=>T} handler
 * @param {boolean|AddEventListenerOptions} [options]
 * @return {T|null}
 */
export function useListenerState(ref, name, handler, options) {
  const [state, setState] = useState();
  useListener(ref, name, (event) => setState(handler(event)), options);
  return state;
}
