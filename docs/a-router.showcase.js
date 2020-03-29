import { c as customElement, u as useHost, a as useEvent, b as useEffect, d as createElement, e as useRef, A as Any } from './chunks/d1ffcc7b.js';
export { r as render } from './chunks/d1ffcc7b.js';

var style = ":host {\n  font-size: 30px;\n}\n";

const ARouterCase = ({
  src,
  path
}) => {
  let refHost = useHost();
  let dispatchUpdatedARouterCase = useEvent("UpdatedARouterCase", {
    bubbles: true
  });
  useEffect(() => {
    let {
      current
    } = refHost;
    let disconect;
    dispatchUpdatedARouterCase(callback => disconect = callback);
    return () => {
      !current.isConnected && disconect();
    };
  }, [src]);
  return createElement("host", null);
};

const ARouterSwitch = () => {
  let ref = useRef({});
  let chunkUpdate;
  let chunkRemove;

  let define = () => {
    console.log(ref.current);
  };

  return createElement("host", {
    shadowDom: true,
    onUpdatedARouterCase: ({
      target,
      detail
    }) => {
      let {
        src,
        path
      } = target;
      ref.current[path] = src;
      detail(() => {
        delete ref.current[path];

        if (!chunkRemove) {
          chunkRemove = true;
          queueMicrotask(define);
        }
      });

      if (!chunkUpdate) {
        chunkUpdate = true;
        queueMicrotask(define);
      }
    }
  }, createElement("style", null, style));
};

ARouterCase.props = {
  path: {
    type: String,
    reflect: true
  },
  src: {
    type: Any
  }
};
customElement("a-router-switch", ARouterSwitch);
customElement("a-router-case", ARouterCase);

const callback = () => new Promise(resolve => setTimeout(resolve, 1000, () => createElement("h1", null, "...")));

var aRouter_showcase = [{
  label: "Ejemplo",

  render() {
    return createElement("a-router-switch", null, createElement("a-router-case", {
      path: "/",
      src: callback
    }), createElement("a-router-case", {
      path: "/id",
      src: callback
    }));
  }

}];

export default aRouter_showcase;
//# sourceMappingURL=a-router.showcase.js.map
