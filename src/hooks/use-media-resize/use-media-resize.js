import { useEffect, useState } from "atomico";

function getSizes(value) {
  let sizes = { cases: [] };

  value.split(/ *, */).forEach(value => {
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

export function useMediaResize(value) {
  let sizes = getSizes(value);

  let [state, setState] = useState(() => [null, {}]);

  state[2] = sizes;

  useEffect(() => {
    let observer = new ResizeObserver(
      ([
        {
          contentRect: { width }
        }
      ]) => {
        update(width);
      }
    );

    observer.observe(state[1].current);

    function update(width) {
      let sizes = state[2];
      if (
        !sizes.cases.some(([value, px]) => {
          if (px >= width) {
            setState(([, ...state]) => [value, ...state]);
            return true;
          }
        })
      ) {
        setState(([value, ...state]) => [sizes.default || value, ...state]);
      }
    }
    return () => resizeObserver.unobserve(state.ref.current);
  }, []);

  return state;
}
