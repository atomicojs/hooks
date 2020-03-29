import { a as customElement, d as useHost, f as useEvent, e as useEffect, c as createElement, A as Any } from './chunks/ee5de865.js';

var style = ":host {\n  font-size: 30px;\n}\n";

const ARouterCase = ({
  src,
  path
}) => {
  let refHost = useHost();
  let dispatchChangeSrc = useEvent("ChangeARouterCaseSrc", {
    bubbles: true
  });
  let dispatchRemoveSrc = useEvent("RemoveARouterCaseSrc", {
    bubbles: true
  });
  useEffect(() => {
    let {
      current
    } = refHost;
    dispatchChangeSrc({
      src,
      path
    });
    return () => {
      !current.isConnected && dispatchRemoveSrc();
    };
  }, [src]);
  return createElement("host", null);
};

const ARouterSwitch = () => {
  let ref = useHost();
  return createElement("host", {
    shadowDom: true,
    onChangeARouterCaseSrc: ({
      target: {
        src,
        path
      }
    }) => {},
    onRemoveARouterCaseSrc: ({
      target: {
        src,
        path
      }
    }) => {
      console.log({
        src,
        path
      });
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
//# sourceMappingURL=a-router.js.map
