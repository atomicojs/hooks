import { useEffect, useRef } from "atomico";

const HandlerCancel = [
  "touchend",
  "mouseup",
  "mouseleave",
  "touchleave",
  "click",
];

const HandlerCapture = ["mousemove", "touchmove"];

const HandlerStart = ["touchstart", "mousedown"];

/**
 * Capture and homologate the coordinates from the touch or mouse event
 * @param {import("atomico").Ref<Element>} ref
 * @param {(action:Types,capture:Capture[])=>any} callback
 */
export function useDrag(ref, callback) {
  const target = useRef();

  target.callback = callback;

  let offset;
  let timeStamp;

  useEffect(() => {
    const { current } = ref;

    const onCapture = (event) => {
      target.event = event;
      if (!target.capture || target.prevent) return;

      target.prevent = true;

      let x;
      let y;

      requestAnimationFrame(() => {
        if (!target.capture) return;
        target.prevent = false;
        const event = target.event;

        if (/touch/.test(event.type)) {
          let touch = event.touches[0];
          if (!touch) return;
          x = touch.clientX;
          y = touch.clientY;
        } else {
          x = event.clientX;
          y = event.clientY;
        }

        target.capture.push({ x, y, offset, ms: event.timeStamp - timeStamp });

        target.callback("move", target.capture);
      });
    };

    let listeners;

    const onCancel = () => {
      listeners && cleanListeners(listeners);
      target.callback("stop", target.capture);
      target.capture = null;
    };

    const onStart = (event) => {
      target.capture = [];

      listeners = HandlerCapture.map((type) =>
        addListener(window, type, onCapture)
      ).concat(
        HandlerCancel.map((type) => addListener(window, type, onCancel))
      );
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
      timeStamp = event.timeStamp;
      target.callback("start", target.capture);
    };

    const listenersStart = HandlerStart.map((type) => {
      return addListener(current, type, onStart);
    });

    return () => onCancel && cleanListeners(listenersStart);
  }, [ref]);
}
/**
 *
 * @param {(()=>any)[]} list
 */
const cleanListeners = (list) => list.forEach((fn) => fn());

/**
 * @param {window|Element} target
 * @param {string} type
 * @param {(event:Event)=>any} callback
 */
const addListener = (target, type, callback) =>
  !target.addEventListener(type, callback) &&
  (() => target.removeEventListener(type, callback));

/**
 * @typedef {"start"|"move"|"stop"} Types
 */

/**
 * @typedef {{x:number,y:number}} Point
 */

/**
 * @typedef {Point & {offset:Point, ms: number}} Capture
 */
