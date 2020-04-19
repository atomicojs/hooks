import { useEffect, useState } from "atomico";

export function useMediaResize(value, ref = {}) {
  let sizes = getSizes(value); // The computation process is light in cost vs useMemo

  let [state, setState] = useState(() => [null, ref]);

  state[2] = sizes;

  useEffect(() => {
    let [, ref] = state;

    if (!ref.listeners) {
      let listeners = [];
      let observer = new ResizeObserver(
        ([
          {
            contentRect: { width },
          },
        ]) => {
          listeners.forEach((fn) => fn(width));
        }
      );
      ref.listeners = listeners;
      observer.observe(ref.current);
    }

    let listener = (width) => {
      let sizes = state[2];
      if (
        !sizes.cases.some(([value, px]) => {
          if (px >= width) {
            setState(updateState(value));
            return true;
          }
        })
      ) {
        setState(updateState(sizes.default || value));
      }
    };

    ref.listeners.push(listener);

    return () => ref.listeners.splice(ref.listeners.indexOf(listener) >>> 0, 1);
  }, []);
  return state;
}

let updateState = (nextValue) => (currentState) => {
  let [value, ...state] = currentState;
  return nextValue == value ? currentState : [nextValue, ...state];
};

function getSizes(value) {
  let sizes = { cases: [] };

  value.split(/ *, */).forEach((value) => {
    let size = value.match(/([^\s]+) +(\d+)px/);
    if (size) {
      let [, value, number] = size;
      sizes.cases.push([value, Number(number)]);
    } else {
      sizes.default = value;
    }
  });

  sizes.cases.sort(([, a], [, b]) => (a > b ? 1 : -1));

  return sizes;
}
