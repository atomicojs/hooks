import { T, O, x, p, C, R, P, w } from './chunks/61e0f1f4.js';
export { d as render } from './chunks/61e0f1f4.js';
import { u as useLazy } from './chunks/e8be573d.js';

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
  let [, setState] = T({
    pathname
  });
  O(() => {
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
  return p("host", {
    onclick: event => {
      let {
        target
      } = event;
      let href;

      while (target) {
        href = target.getAttribute("href");
        if (target.hasAttribute("ignore")) return;
        target = href ? 0 : target.parentElement;
      }

      event.preventDefault();

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
  let refHost = C();
  let dispatchUpdatedARouterCase = R("UpdatedARouterCase", {
    bubbles: true,
    composed: true
  });
  O(() => {
    let {
      current
    } = refHost;
    let disconect;
    dispatchUpdatedARouterCase(callback => disconect = callback);
    return () => {
      !current.isConnected && disconect();
    };
  }, [src, path]);
  return p("host", null);
};

const notFound = {
  src: () => Promise.resolve(() => p("slot", {
    name: "404"
  }))
};

const ARouterSwitch = () => {
  let [pathname] = useHistory();
  let ref = P({});
  let [routeState, setRouteState] = T(notFound);
  let [lazyState, LazyResult] = useLazy(() => typeof routeState.src == "string" ? import(routeState.src) : routeState.src(), routeState.src, [routeState.src]);
  let chunkUpdate;
  let chunkRemove;

  let define = () => {
    let select = notFound;

    for (let path in ref.current) {
      let {
        src,
        default: isDefault
      } = ref.current[path];
      let [state, params] = match(path, pathname);

      if (state || isDefault) {
        select = {
          state,
          params,
          path,
          src,
          pathname
        };
        if (!isDefault) break;
      }
    }

    setRouteState(state => state.pathname == select.pathname ? state : select);
  };

  O(define, [pathname]);
  return p("host", {
    shadowDom: true,
    onUpdatedARouterCase: ({
      target,
      detail
    }) => {
      let {
        path
      } = target;
      ref.current[path] = target;
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
  }, lazyState == "loading" ? p("slot", {
    name: "loading"
  }, lazyState) : lazyState == "error" ? p("slot", {
    name: "error"
  }, lazyState) : lazyState == "done" ? LazyResult(routeState.params) : "");
};

ARouterCase.props = {
  path: {
    type: String,
    reflect: true
  },
  src: {
    type: w
  },
  default: {
    type: Boolean
  }
};
ARouterProxy.props = {
  path: {
    type: String,
    value: ""
  }
};
x("a-router-switch", ARouterSwitch);
x("a-router-case", ARouterCase);
x("a-router-proxy", ARouterProxy);

const demoResult = result => () => new Promise(resolve => setTimeout(resolve, 1000, {
  default: result
}));

const result1 = demoResult(props => p("h3", null, "Home"));
const result2 = demoResult(props => p("h3", null, "Config"));
const result3 = demoResult(props => p("h3", null, JSON.stringify(props)));
var aRouter_showcase = [{
  label: "Ejemplo",

  render() {
    return p("host", null, p("a-router-proxy", null, p("p", null, "The import effect is emulated with a delay to show the use of the loading slot"), p("nav", null, p("a", {
      style: "margin:5px",
      href: "/"
    }, "home"), p("a", {
      style: "margin:5px",
      href: "/user"
    }, "user"), p("a", {
      style: "margin:5px",
      href: "/config"
    }, "config")), p("a-router-switch", null, p("a-router-case", {
      path: "/",
      src: result1
    }), p("a-router-case", {
      path: "/user",
      src: result2
    }), p("a-router-case", {
      path: "/:any...",
      src: result3
    }), p("h1", {
      slot: "loading"
    }, "loading..."), p("h1", {
      slot: "404"
    }, "404"))));
  }

}];

export default aRouter_showcase;
//# sourceMappingURL=a-router.showcase.js.map
