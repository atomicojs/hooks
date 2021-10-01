import { useEffect } from "atomico";

/**
 *
 * @typedef {{x:number,y:number,offset:{x:number,y:number}}} Coordinates
 */

/**
 *
 * @param {PointerEvent & TouchEvent} event
 * @returns {Coordinates|null}
 */
export function getCoordinates(event) {
  if (event.isTrusted) {
    let x, y, offset;
    if (/touch/.test(event.type)) {
      let touch = event.touches[0];
      if (!touch) return;
      x = touch.clientX;
      y = touch.clientY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }
    if (/touch/.test(event.type)) {
      const rect = current.getBoundingClientRect();
      let touch = event.touches[0];
      offset = {
        x: touch.pageX - rect.left,
        y: touch.pageY - rect.top,
      };
    } else {
      offset = {
        x: event.offsetX,
        y: event.offsetY,
      };
    }
    return { offset, x, y };
  }
}

/**
 *
 * @param {import("atomico").Ref} ref
 * @param {(coordinates:Coordinates)=>void} callback
 */
export function useClickCoordinates(ref, callback) {
  useEffect(() => {
    const { current } = ref;

    if (!current) return;

    const handler = (event) => {
      const coordinates = getCoordinates(event);
      coordinates && callback(coordinates);
    };

    current.addEventListener("click", handler, true);
    current.addEventListener("touchstart", handler, true);

    return () => {
      current.removeEventListener("click", handler);
      current.removeEventListener("touchstart", handler);
    };
  }, [ref]);
}
