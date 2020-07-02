import { u as useState, a as useEffect, h, c as customElement, e as useRef } from './chunks/1fcfa7f3.js';
export { r as render } from './chunks/1fcfa7f3.js';

const RESIZE_OBSERVER = [];
const CACHE_SIZES = {};
/**
 * @param {Ref} ref
 * @return {ResizeObserverEntry}
 */

function useResizeObserver(ref, proxyObserver) {
  let [state, setState] = useState();
  useEffect(() => {
    let {
      current
    } = ref; // Create or reuse the listener associated with the resizeObserver event

    if (!current[RESIZE_OBSERVER]) {
      let handlers = [];
      let observer = new ResizeObserver(([entry]) => {
        observer.entry = entry;
        handlers.forEach(handler => handler(entry));
      });
      observer.handlers = handlers;
      observer.observe(current);
      current[RESIZE_OBSERVER] = observer;
    }

    let {
      handlers,
      entry
    } = current[RESIZE_OBSERVER];

    let handler = entry => (proxyObserver || setState)(entry);

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

function useSize(ref, proxyObserver) {
  let getState = resizeObserverEntry => {
    if (resizeObserverEntry) {
      let {
        contentRect: {
          width,
          height
        }
      } = resizeObserverEntry;
      return [width, height];
    } else {
      return [];
    }
  };

  let nextProxyObserver = proxyObserver ? resizeObserverEntry => proxyObserver(getState(resizeObserverEntry)) : null;
  let resizeObserverEntry = useResizeObserver(ref, nextProxyObserver);
  return !nextProxyObserver && getState(resizeObserverEntry);
}
/**
 *
 * @param {*} value
 * @param {Ref} ref
 */

function useStateSize(value, ref) {
  let sizes = getSizes(value);
  let valueIsArray = sizes.w && sizes.h;
  let [state, setState] = useState(valueIsArray ? [] : null);
  useSize(ref, ([width, height]) => setState(currentState => {
    let state;

    let addValue = (value, isDefault) => {
      if (valueIsArray) {
        state = state || [];
        state.push(value);
      } else {
        state = value;
      }
    };

    if (sizes.w && !sizes.w.some(([value, w]) => {
      if (w >= width) {
        addValue(value);
        return true;
      }
    })) {
      addValue(sizes.default);
    }

    if (sizes.h && !sizes.h.some(([value, h]) => {
      if (h >= height) {
        addValue(value);
        return true;
      }
    })) {
      addValue(sizes.default);
    }

    if (valueIsArray && !state.every((value, index) => currentState[index] == value)) {
      return state;
    } else {
      return state != currentState ? state : currentState;
    }
  }));
  return state;
}

function getSizes(value) {
  if (CACHE_SIZES[value]) return CACHE_SIZES[value];
  let sizes = {};
  value.split(/ *, */).forEach(value => {
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

  let sort = ([, a], [, b]) => a > b ? 1 : -1;

  for (let key in sizes) {
    if (Array.isArray(sizes[key])) sizes[key].sort(sort);
  }

  return CACHE_SIZES[value] = sizes;
}
/**
 * @typedef {{borderBoxSize: Object, contentBoxSize: Object, contentRect: DOMRectReadOnly, target: Element}} ResizeObserverEntry
 */

/**
 * @typedef {{current?: Ref}} Ref
 */

const Example1 = ({
  src
}) => {
  let ref = useRef();
  let state = useStateSize("1fr 1fr 1fr, 1fr 1fr 720w, 1fr 520w", ref);
  return h("host", {
    shadowDom: true,
    ref: ref
  }, h("style", null, `:host{display:block;width:100%}img{width:100%}`), h("h1", null, state));
};

customElement("use-media-resize-example-1", Example1);
var useStateSize_showcase = [{
  label: "Example useMediaResize",

  render() {
    return h("host", null, h("use-media-resize-example-1", null));
  }

}];

export default useStateSize_showcase;
//# sourceMappingURL=use-state-size.showcase.js.map
