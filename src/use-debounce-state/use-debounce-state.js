import { useState, useRef } from "atomico";

const fpsP = () =>
  new Promise((resolve) => requestAnimationFrame(() => resolve()));

/**
 * Transform a fps into a promise
 * @param {number} length
 */
export const fps = async (length = 1) => {
  let current = Promise.resolve();

  while (length--) current = current.then(fpsP);

  await current;
};

/**
 *
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const idle = (ms) =>
  window.requestIdleCallback
    ? new Promise((resolve) => requestIdleCallback(resolve, { ms: timeout }))
    : timeout(ms);

/**
 *
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const timeout = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generates a bottleneck in the definition of the state
 * @template T
 * @param {number} delay
 * @param {T} [initialState]
 * @param {"timeout"|"fps"|"idle"} [mode]
 * @return {[T extends (...args:any[])=>infer R ? R : T, (current: T extends (...args:any[])=>infer R ? R : T)=>void]}
 */
export function useDebounceState(delay, initialState, mode = "timeout") {
  const [state, setState] = useState(initialState);
  const ref = useRef();
  return [
    state,
    (current) => {
      ref.current = current;
      if (!ref.prevent) {
        ref.prevent = true;
        (mode === "fps" ? fps : mode === "idle" ? idle : timeout)(delay).then(
          () => {
            ref.prevent = false;
            setState(ref.current);
          }
        );
      }
    },
  ];
}
