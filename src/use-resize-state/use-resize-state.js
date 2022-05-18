import { useState } from "atomico";
import { useResizeObserver } from "../use-resize-observer/use-resize-observer.js";
import media from "@uppercod/match-media";

/**
 *
 * @param {import("atomico").Ref<Element>} ref
 * @return {string}
 */
export function useResizeState(ref, sizes) {
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
