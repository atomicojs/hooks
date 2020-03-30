import { u as useState, a as useEffect, c as customElement, b as createElement, d as useHost, e as useEvent, f as useRef, A as Any } from './chunks/eaceffd6.js';
export { r as render } from './chunks/eaceffd6.js';
import { u as useLazy } from './chunks/0e63c91b.js';

/**
 * @return {string} pathname
 */
function getPathname() {
  return location.pathname;
}
/**
 * Dispatch history a new pathname
 * @type {Redirect}
 */

function redirect(pathname) {
  if (pathname == getPathname()) return;
  history.pushState({}, "history", pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
function subscribe(handler) {
  window.addEventListener("popstate", handler);
  return () => window.removeEventListener("popstate", handler);
}

const FOLDERS = /([^\/]+)/g;
const FOLDER = "[^\\/]";
const SPLIT = "(?:\\/){0,1}";
const PARAM = /^(:)(\w+)(\?|(\.){3}){0,1}/;
const PARAMS_EMPTY = {};
const MEMO = {};
function format(path) {
  return path.replace(/(\/){2,}/g, "/").replace(/([^\/]+)\/$/, "$1");
}
function join(a, b) {
  let split = "/";
  return format((a || split) + split + (b || split));
}
function parse(string) {
  let folders = string.match(FOLDERS) || [""];
  let params = [];
  let regexp = new RegExp("^" + folders.map(folder => {
    let [string, param, field, type] = folder.match(PARAM) || [];

    if (param) {
      params.push(field);

      if (type === "...") {
        return `(.*)`;
      } else if (type === "?") {
        return `${SPLIT}(${FOLDER}*)`;
      } else {
        return `\\/(${FOLDER}+)`;
      }
    } else {
      return `\\/(?:${folder.replace(/(\.|\-)/g, "\\$1").replace(/\*/g, FOLDER + "+").replace(/\((?!\?\:)/g, "(?:")})`;
    }
  }).join("") + "$", "i");
  return {
    regexp,
    params,
    logs: {}
  };
}
/**
 * permite comparar un patron de captura vs un ruta de entrada
 * @param {string} path - ruta de patron de captura
 * @param {string} value  - ruta de comparacion a patron
 * @return {array} - [ inRoute:boolean, params:object ];
 */

function match(path, value) {
  path = format(path);
  value = format(value);

  if (!MEMO[path]) {
    MEMO[path] = parse(path);
  }

  let {
    regexp,
    params,
    logs
  } = MEMO[path];

  if (logs[value]) {
    return logs[value];
  }

  let vs = value.match(regexp);
  return logs[value] = [vs ? true : false, vs ? vs.slice(1).reduce((next, value, index) => {
    next[params[index] || index] = value;
    return next;
  }, {}) : PARAMS_EMPTY];
}

function useHistory() {
  let pathname = getPathname();
  let [, setState] = useState({
    pathname
  });
  useEffect(() => {
    function handler() {
      let pathname = getPathname();
      setState(state => state.pathname != pathname ? {
        pathname
      } : state);
    }

    return subscribe(handler);
  }, []);
  return [pathname, redirect];
}

const ARouterProxy = ({
  path
}) => {
  return createElement("host", {
    onclick: event => {
      event.preventDefault();
      let {
        target
      } = event;
      let href;

      while (target) {
        href = target.getAttribute("href");
        target = href ? 0 : target.parentElement;
      }

      if (href) {
        redirect(join(path, href));
      }
    }
  });
};

const ARouterCase = ({
  src,
  path
}) => {
  let refHost = useHost();
  let dispatchUpdatedARouterCase = useEvent("UpdatedARouterCase", {
    bubbles: true,
    composed: true
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
  }, [src, path]);
  return createElement("host", null);
};

const ARouterSwitch = () => {
  let [pathname] = useHistory();
  let ref = useRef({});
  let [route, setRoute] = useState({});
  let [lazyState, LazyResult] = useLazy(() => typeof route.src == "string" ? import(route.src) : route.src(), route.src, [route.src]);
  let chunkUpdate;
  let chunkRemove;

  let define = () => {
    let select;

    for (let path in ref.current) {
      let src = ref.current[path];
      let [state, params] = match(path, pathname);

      if (state) {
        select = {
          state,
          params,
          path,
          src,
          pathname
        };
        break;
      }
    }

    if (select) {
      setRoute(state => state.pathname == select.pathname ? state : select);
    }
  };

  useEffect(define, [pathname]);
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
  }, lazyState == "loading" ? createElement("slot", {
    name: "loading"
  }, "loading...") : lazyState == "error" ? createElement("slot", {
    name: "error"
  }, "Error") : lazyState == "done" ? createElement(LazyResult, route.params, "...") : "");
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
ARouterProxy.props = {
  path: {
    type: String,
    value: ""
  }
};
customElement("a-router-switch", ARouterSwitch);
customElement("a-router-case", ARouterCase);
customElement("a-router-proxy", ARouterProxy);

const demoResult = result => () => new Promise(resolve => setTimeout(resolve, 1000, {
  default: result
}));

const result1 = demoResult("h1");
const result2 = demoResult("h2");
var aRouter_showcase = [{
  label: "Ejemplo",

  render() {
    return createElement("a-router-proxy", null, createElement("nav", null, createElement("a", {
      href: "/"
    }, "home"), createElement("br", null), createElement("a", {
      href: "/user"
    }, "user"), createElement("br", null), createElement("a", {
      href: "/config"
    }, "config")), createElement("a-router-switch", null, createElement("a-router-case", {
      path: "/",
      src: result1
    }), createElement("a-router-case", {
      path: "/:id",
      src: result2
    })));
  }

}];

export default aRouter_showcase;
//# sourceMappingURL=a-router.showcase.js.map
