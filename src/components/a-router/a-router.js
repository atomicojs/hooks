import {
  h,
  customElement,
  Any,
  useRef,
  useHost,
  useEvent,
  useEffect,
  useState
} from "atomico";

import { useHistory } from "../../hooks/use-router/use-router";
import { match, join } from "../../hooks/use-router/src/parse";
import { redirect } from "../../hooks/use-router/src/location";
import { useLazy } from "../../hooks/use-lazy/use-lazy";

const ARouterProxy = ({ path }) => {
  return (
    <host
      onclick={event => {
        event.preventDefault();
        let { target } = event;
        let href;
        while (target) {
          href = target.getAttribute("href");
          target = href ? 0 : target.parentElement;
        }
        if (href) {
          redirect(join(path, href));
        }
      }}
    ></host>
  );
};

const ARouterCase = ({ src, path }) => {
  let refHost = useHost();

  let dispatchUpdatedARouterCase = useEvent("UpdatedARouterCase", {
    bubbles: true,
    composed: true
  });

  useEffect(() => {
    let { current } = refHost;
    let disconect;
    dispatchUpdatedARouterCase(callback => (disconect = callback));
    return () => {
      !current.isConnected && disconect();
    };
  }, [src, path]);

  return <host></host>;
};

const ARouterSwitch = () => {
  let [pathname] = useHistory();
  let ref = useRef({});
  let [route, setRoute] = useState({});
  let [lazyState, LazyResult] = useLazy(
    () => (typeof route.src == "string" ? import(route.src) : route.src()),
    route.src,
    [route.src]
  );
  let chunkUpdate;
  let chunkRemove;

  let define = () => {
    let select;
    for (let path in ref.current) {
      let src = ref.current[path];
      let [state, params] = match(path, pathname);
      if (state) {
        select = { state, params, path, src, pathname };
        break;
      }
    }
    if (select) {
      setRoute(state => (state.pathname == select.pathname ? state : select));
    }
  };

  useEffect(define, [pathname]);

  return (
    <host
      shadowDom
      onUpdatedARouterCase={({ target, detail }) => {
        let { src, path } = target;
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
      }}
    >
      {lazyState == "loading" ? (
        <slot name="loading">loading...</slot>
      ) : lazyState == "error" ? (
        <slot name="error">Error</slot>
      ) : lazyState == "done" ? (
        <LazyResult {...route.params}>...</LazyResult>
      ) : (
        ""
      )}
    </host>
  );
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
