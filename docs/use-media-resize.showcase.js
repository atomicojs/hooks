import { f as useState, b as useEffect, d as createElement, c as customElement } from './chunks/d1ffcc7b.js';
export { r as render } from './chunks/d1ffcc7b.js';

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

function useMediaResize(value) {
  let sizes = getSizes(value);
  let [state, setState] = useState(() => [null, {}]);
  state[2] = sizes;
  useEffect(() => {
    let observer = new ResizeObserver(([{
      contentRect: {
        width
      }
    }]) => {
      update(width);
    });
    observer.observe(state[1].current);

    function update(width) {
      let sizes = state[2];

      if (!sizes.cases.some(([value, px]) => {
        if (px >= width) {
          setState(([, ...state]) => [value, ...state]);
          return true;
        }
      })) {
        setState(([value, ...state]) => [sizes.default || value, ...state]);
      }
    }

    return () => resizeObserver.unobserve(state.ref.current);
  }, []);
  return state;
}

const Example1 = ({
  src
}) => {
  const [state, ref] = useMediaResize(src);
  return createElement("host", {
    ref: ref,
    shadowDom: true
  }, createElement("style", null, `:host{display:block;width:100%}img{width:100%}`), createElement("img", {
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
    return createElement("use-media-resize-example-1", {
      src: `${url}1080x150, ${url}720x200 720px, ${url}520x300 520px, ${url}320x500 240px`
    });
  }

}];

export default useMediaResize_showcase;
//# sourceMappingURL=use-media-resize.showcase.js.map
