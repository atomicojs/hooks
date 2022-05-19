import { useHost, useState } from "atomico";
import { useResizeObserver } from "../use-resize-observer/use-resize-observer.js";
import media from "@uppercod/match-media";

/**
 * @type {{[index:string]:ReturnType<media>}}
 */
const CACHE_TEMPLATE = {};
/**
 *
 * @param {import("atomico").Ref<Element>} ref
 * @return {string}
 */
export function useRefResizeState(ref, sizes) {
  /**
   * @type {ReturnType<media>}
   */
  const template = media.call(null, { raw: [sizes] });

  const [state, setState] = useState();

  function getState() {
    const { clientWidth } = ref.current;

    return template.match(({ size }) => size <= clientWidth);
  }

  useResizeObserver(ref, () => setState(getState));

  return state;
}

/**
 *
 * @param {string|TemplateStringsArray} part
 * @param  {...any} [args]
 * @returns
 */
export function useResizeState(part, ...args) {
  const ref = useHost();
  /**
   * @type {ReturnType<media>}
   */
  let template;
  if (typeof part === "string") {
    if (!CACHE_TEMPLATE[part]) {
      CACHE_TEMPLATE[part] = media.call(null, { raw: [part] });
    }
    template = CACHE_TEMPLATE[part];
  } else {
    template = media.call(null, part, ...args);
  }

  const [state, setState] = useState();

  function getState() {
    const { clientWidth } = ref.current;

    return template.match(({ size }) => size <= clientWidth);
  }

  useResizeObserver(ref, () => setState(getState));

  return state;
}
