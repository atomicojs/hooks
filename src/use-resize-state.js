import { useState, useHost } from "atomico";
import { useResizeObserver } from "./use-resize-observer.js";
import { getSizes } from "./use-responsive-state.js";

/**
 *
 * @param {import("atomico").Ref<Element>} ref
 * @return {string}
 */
export function useResizeState(sizes) {
  const ref = useHost();
  const [sizeDefault, matches] = getSizes(sizes);
  const [state, setState] = useState();

  function getState() {
    const { clientWidth, clientHeight } = ref.current;
    const match = matches.find(
      ({ width, height }) =>
        width <= clientWidth && height <= (clientHeight || height)
    );
    return match ? match.value : sizeDefault;
  }

  useResizeObserver(ref, () => setState(getState));

  return state;
}
