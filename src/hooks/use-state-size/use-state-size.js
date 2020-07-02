import { useEffect, useState } from "atomico";

const RESIZE_OBSERVER = [];
const CACHE_SIZES = {};

/**
 * @param {Ref} ref
 * @return {ResizeObserverEntry}
 */
export function useResizeObserver(ref, proxyObserver) {
  let [state, setState] = useState();
  useEffect(() => {
    let { current } = ref;
    // Create or reuse the listener associated with the resizeObserver event
    if (!current[RESIZE_OBSERVER]) {
      let handlers = [];
      let observer = new ResizeObserver(([entry]) => {
        observer.entry = entry;
        handlers.forEach((handler) => handler(entry));
      });
      observer.handlers = handlers;

      observer.observe(current);

      current[RESIZE_OBSERVER] = observer;
    }

    let { handlers, entry } = current[RESIZE_OBSERVER];

    let handler = (entry) => (proxyObserver || setState)(entry);

    handlers.push(handler);

    if (entry) handler(entry);

    return () => {
      handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      if (!handlers.length) {
        current[RESIZE_OBSERVER].disconnect();
        delete current[RESIZE_OBSERVER];
      }
    };
  }, [ref]);

  return state;
}
/**
 * @param {Ref} ref
 */
export function useSize(ref, proxyObserver) {
  let getState = (resizeObserverEntry) => {
    if (resizeObserverEntry) {
      let {
        contentRect: { width, height },
      } = resizeObserverEntry;
      return [width, height];
    } else {
      return [];
    }
  };

  let nextProxyObserver = proxyObserver
    ? (resizeObserverEntry) => proxyObserver(getState(resizeObserverEntry))
    : null;

  let resizeObserverEntry = useResizeObserver(ref, nextProxyObserver);

  return !nextProxyObserver && getState(resizeObserverEntry);
}
/**
 *
 * @param {*} value
 * @param {Ref} ref
 */
export function useStateSize(value, ref) {
  let sizes = getSizes(value);
  let valueIsArray = sizes.w && sizes.h;
  let [state, setState] = useState(valueIsArray ? [] : null);

  useSize(ref, ([width, height]) =>
    setState((currentState) => {
      let state;
      let addValue = (value, isDefault) => {
        if (valueIsArray) {
          state = state || [];
          state.push(value);
        } else {
          state = value;
        }
      };

      if (
        sizes.w &&
        !sizes.w.some(([value, w]) => {
          if (w >= width) {
            addValue(value);
            return true;
          }
        })
      ) {
        addValue(sizes.default, true);
      }

      if (
        sizes.h &&
        !sizes.h.some(([value, h]) => {
          if (h >= height) {
            addValue(value);
            return true;
          }
        })
      ) {
        addValue(sizes.default, true);
      }
      if (
        valueIsArray &&
        !state.every((value, index) => currentState[index] == value)
      ) {
        return state;
      } else {
        return state != currentState ? state : currentState;
      }
    })
  );
  return state;
}

function getSizes(value) {
  if (CACHE_SIZES[value]) return CACHE_SIZES[value];

  let sizes = {};

  value.split(/ *, */).forEach((value) => {
    let size = value.match(/([^\s]+)\s+(\d+)(w|h)/);
    if (size) {
      let [, value, number, type] = size;
      number = Number(number);
      sizes[type] = sizes[type] || [];
      sizes[type].push([value, number]);
    } else {
      sizes.default = value;
    }
  });

  let sort = ([, a], [, b]) => (a > b ? 1 : -1);

  for (let key in sizes) {
    if (Array.isArray(sizes[key])) sizes[key].sort(sort);
  }

  return (CACHE_SIZES[value] = sizes);
}

/**
 * @typedef {{borderBoxSize: Object, contentBoxSize: Object, contentRect: DOMRectReadOnly, target: Element}} ResizeObserverEntry
 */

/**
 * @typedef {{current?: Ref}} Ref
 */
