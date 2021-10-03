import { useEffect } from "atomico";
import { useCurrentValue } from "../use-current-value/use-current-value";
import { addListener } from "../use-listener/use-listener";
/**
 *
 * @param {import("atomico").Ref} ref
 * @param {(coordinates:Coordinates)=>void} callback
 */
export function useClickCoordinates(ref, callback) {
  const value = useCurrentValue(callback);

  useEffect(() => {
    const { current } = ref;

    if (!current) return;

    const handler = (event) => {
      const coordinates = getCoordinates(event);
      coordinates && value.current(coordinates);
    };

    const removeClick = addListener(current, "click", handler, true);
    const removeTouchstart = addListener(current, "touchstart", handler, true);

    return () => {
      removeClick();
      removeTouchstart();
    };
  }, [ref]);
}

/**
 *
 * @param {PointerEvent & TouchEvent} event
 * @returns {Coordinates|null}
 */
export function getCoordinates(event) {
  if (!event.isTrusted) return;

  let x, y, offset;

  if (/touch/.test(event.type)) {
    let [touch] = event.touches;
    if (!touch) return;

    x = touch.clientX;
    y = touch.clientY;

    const rect = event.currentTarget.getBoundingClientRect();

    offset = {
      x: touch.pageX - rect.left,
      y: touch.pageY - rect.top,
    };
  } else {
    x = event.clientX;
    y = event.clientY;

    offset = {
      x: event.offsetX,
      y: event.offsetY,
    };
  }

  return { offset, x, y };
}

/**
 *
 * @typedef {{x:number,y:number,offset:{x:number,y:number}}} Coordinates
 */
