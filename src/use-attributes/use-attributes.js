import { useHost, useState } from "atomico";
import { useMutationObserver } from "../use-mutation-observer/use-mutation-observer.js";

/**
 * @param {string} value
 */
const getProp = (value) =>
  value.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());

/**
 * @param {HTMLElement} element
 */
const mapAttributes = (element) => {
  /** @type {HTMLElement & {constructor: import("atomico/types/dom").AtomicoStatic<any>}} */

  const { constructor } = element;
  const props = constructor.props || {};

  /**
   * @type {Attrs}
   */
  const attrs = {};

  return Object.values(element.attributes).reduce((attrs, attr) => {
    const prop = getProp(attr.name);
    if (!(prop in props)) attrs[prop] = attr.value;
    return attrs;
  }, attrs);
};

/**
 * @template {Attrs} T
 * @returns {T}
 */
export function useAttributes() {
  const host = useHost();
  const setAttributes = () => mapAttributes(host.current);
  const [state, setState] = useState(setAttributes);

  useMutationObserver(host, () => setState(setAttributes), {
    attributes: true,
  });

  return state;
}

/**
 * @typedef {{[prop:string]:string}} Attrs
 */
