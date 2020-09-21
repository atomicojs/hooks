import { c, h, useHost, useEvent, useEffect, useRef, useState, Any } from 'atomico';
import { r as redirect, j as join, u as useHistory, m as match } from './assets/c-225a9328.js';
import { useLazy } from './use-lazy.js';

const aRouterProxy = ({ path }) => {
  return (
    h('host', {
      onclick: (event) => {
        let { target } = event;
        let href;
        while (target) {
          href = target.getAttribute("href");
          if (target.hasAttribute("ignore")) return;
          target = href ? 0 : target.parentElement;
        }
        if (href) {
          event.preventDefault();
          redirect(join(path, href));
        }
      },}
    )
  );
};

const aRouterCase = ({ src, path }) => {
  let refHost = useHost();

  let dispatchUpdatedARouterCase = useEvent("UpdatedARouterCase", {
    bubbles: true,
    composed: true,
  });

  useEffect(() => {
    let { current } = refHost;
    let disconect;
    dispatchUpdatedARouterCase((callback) => (disconect = callback));
    return () => {
      !current.isConnected && disconect();
    };
  }, [src, path]);

  return h('host', null);
};

const notFound = { src: () => Promise.resolve(() => h('slot', { name: "404",})) };

const aRouterSwitch = () => {
  let [pathname] = useHistory();
  let ref = useRef({});
  let [routeState, setRouteState] = useState(notFound);

  let [lazyState, LazyResult] = useLazy(
    () =>
      typeof routeState.src == "string"
        ? import(routeState.src)
        : routeState.src(),
    routeState.src,
    [routeState.src]
  );

  let chunkUpdate;
  let chunkRemove;

  let define = () => {
    let select = notFound;
    for (let path in ref.current) {
      let { src, default: isDefault } = ref.current[path];
      let [state, params] = match(path, pathname);
      if (state || isDefault) {
        select = { state, params, path, src, pathname };
        if (!isDefault) break;
      }
    }
    setRouteState((state) =>
      state.pathname == select.pathname ? state : select
    );
  };
  useEffect(define, [pathname]);
  return (
    h('host', {
      shadowDom: true,
      onUpdatedARouterCase: ({ target, detail }) => {
        let { path } = target;
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
      },}
    
      , lazyState == "loading" ? (
        h('slot', { name: "loading",}, lazyState)
      ) : lazyState == "error" ? (
        h('slot', { name: "error",}, lazyState)
      ) : lazyState == "done" ? (
        LazyResult(routeState.params)
      ) : (
        ""
      )
    )
  );
};

aRouterCase.props = {
  path: {
    type: String,
    reflect: true,
  },
  src: {
    type: Any,
  },
  default: {
    type: Boolean,
  },
};

aRouterProxy.props = {
  path: {
    type: String,
    value: "",
  },
};

customElements.define("a-router-switch", c(aRouterSwitch));
customElements.define("a-router-case", c(aRouterCase));
customElements.define("a-router-proxy", c(aRouterProxy));
