import { useState } from 'atomico';

let globalHandlerCancel = [
  "touchend",
  "mouseup",
  "mouseleave",
  "touchleave",
  "click"
];
let globalHandlerCapture = ["mousemove", "touchmove"];

function addEventListener(type, handler) {
  window.addEventListener(type, handler);
}

function removeEventListener(type, handler) {
  window.removeEventListener(type, handler);
}

function getSwipe(range, duration = 500, space = 100) {
  let length = range.length;
  let first = range[0];
  let last = range[length - 1];
  let [x, y] = range.reduce(([x, y], step) => [(x += step.x), (y += step.y)], [
    0,
    0
  ]);
  let ms = last.t - first.t;
  if (ms < duration) {
    let xD = first.x - last.x;

    let dir = xD > 0 ? "toRight" : "toLeft";

    if (Math.abs(xD) > 60) {
      let yM = y / length;

      let yMMax = yM + space / 2;
      let yMMin = yM - space / 2;

      let validZoneY = [first, last].every(({ y }) => y <= yMMax && y >= yMMin);
      if (validZoneY) {
        return dir;
      }
    }
  }
}

/**
 *
 * @param {ObserverEventMove} callback
 */
function useEventMove(callback) {
  let [ref] = useState(() => {
    function dispath(...args) {
      return ref.callback(...args);
    }
    function startCapture(event) {
      ref.capture = [];
      globalHandlerCancel.forEach(type => addEventListener(type, endCapture));
      globalHandlerCapture.forEach(type => addEventListener(type, capture));
      capture(event, true);
      dispath("start", ref.capture);
    }
    function endCapture(event) {
      if (!ref.capture) return;
      capture(event, false);
      let { capture: currentCapture } = ref;
      ref.capture = false;
      globalHandlerCancel.forEach(type =>
        removeEventListener(type, endCapture)
      );
      globalHandlerCapture.forEach(type => removeEventListener(type, capture));
      dispath("end", currentCapture);
    }
    function capture(event, ignoreEmit) {
      if (!ref.capture) return;
      let x;
      let y;

      if (/touch/.test(event.type)) {
        let touch = event.touches[0];
        if (!touch) return;
        x = touch.clientX;
        y = touch.clientY;
      } else {
        x = event.clientX;
        y = event.clientY;
      }
      ref.capture.push({ x, y, t: event.timeStamp });

      if (!ignoreEmit) dispath("move", ref.capture);
    }

    return {
      slide: -1,
      events: {
        startCapture
      }
    };
  });

  ref.callback = callback;

  return {
    ref,
    ontouchstart: ref.events.startCapture,
    onmousedown: ref.events.startCapture
  };
}

/**
 * @callback ObserverEventMove
 * @param {"start"|"end"|"move"} type - states associated with event capture
 * @param {Array.<{x:number,y:number,t:number}>} range - useful range of the associated movement
 * @return {{ref:{}}}
 */

export { getSwipe, useEventMove };
