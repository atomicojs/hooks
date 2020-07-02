import { u as useState, a as useEffect, h, c as customElement } from './chunks/1fcfa7f3.js';
export { r as render } from './chunks/1fcfa7f3.js';

function useMediaResize(value, ref = {}) {
  let sizes = getSizes(value); // The computation process is light in cost vs useMemo

  let [state, setState] = useState(() => [null, ref]);
  state[2] = sizes;
  useEffect(() => {
    let [, ref] = state;

    if (!ref.listeners) {
      let listeners = [];
      let observer = new ResizeObserver(([{
        contentRect: {
          width
        }
      }]) => {
        listeners.forEach(fn => fn(width));
      });
      ref.listeners = listeners;
      observer.observe(ref.current);
    }

    let listener = width => {
      let sizes = state[2];

      if (!sizes.cases.some(([value, px]) => {
        if (px >= width) {
          setState(updateState(value));
          return true;
        }
      })) {
        setState(updateState(sizes.default || value));
      }
    };

    ref.listeners.push(listener);
    return () => ref.listeners.splice(ref.listeners.indexOf(listener) >>> 0, 1);
  }, []);
  return state;
}

let updateState = nextValue => currentState => {
  let [value, ...state] = currentState;
  return nextValue == value ? currentState : [nextValue, ...state];
};

function getSizes(value) {
  let sizes = {
    cases: []
  };
  value.split(/ *, */).forEach(value => {
    let size = value.match(/([^\s]+) +(\d+)px/);

    if (size) {
      let [, value, number] = size;
      sizes.cases.push([value, Number(number)]);
    } else {
      sizes.default = value;
    }
  });
  sizes.cases.sort(([, a], [, b]) => a > b ? 1 : -1);
  return sizes;
}

const Example1 = ({
  src
}) => {
  const [state, ref] = useMediaResize(src);
  return h("host", {
    ref: ref,
    shadowDom: true
  }, h("style", null, `:host{display:block;width:100%}img{width:100%}`), h("img", {
    src: state
  }));
};

Example1.props = {
  src: String
};
customElement("use-media-resize-example-1", Example1);
var useMediaResize_showcase = [{
  label: "Example useMediaResize",

  render() {
    const url = "https://via.placeholder.com/";
    return h("host", null, h("use-media-resize-example-1", {
      src: `${url}1080x150, ${url}720x200 720px, ${url}520x300 520px, ${url}320x500 240px`
    }));
  }

}];

export default useMediaResize_showcase;
//# sourceMappingURL=use-media-resize.showcase.js.map
