import { useCurrentValue } from "../use-current-value/use-current-value.js";
import { useListener } from "../use-listener/use-listener.js";
/**
 *
 * @param {import("atomico").Ref} ref
 * @param {(coordinates:Coordinates)=>void} callback
 */
export function useClickCoordinates(ref, callback) {
  const value = useCurrentValue(callback);
  useListener(ref, "click", (event) => {
    const coordinates = getCoordinates(event);
    coordinates && value.current(coordinates);
  });
}

/**
 *
 * @param {PointerEvent & TouchEvent} event
 * @returns {Coordinates|null}
 */
export function getCoordinates({ pageX: x, pageY: y, currentTarget }) {
  const rect = currentTarget.getBoundingClientRect();

  return {
    x,
    y,
    offset: {
      x: x - rect.left,
      y: y - rect.top,
    },
  };
}

/**
 *
 * @typedef {{x:number,y:number,offset:{x:number,y:number}}} Coordinates
 */
