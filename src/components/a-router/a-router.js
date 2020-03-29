import {
  h,
  customElement,
  Any,
  useRef,
  useHost,
  useEvent,
  useEffect
} from "atomico";

import style from "./a-router.css";

const ARouterCase = ({ src, path }) => {
  let refHost = useHost();

  let dispatchUpdatedARouterCase = useEvent("UpdatedARouterCase", {
    bubbles: true
  });

  useEffect(() => {
    let { current } = refHost;
    let disconect;
    dispatchUpdatedARouterCase(callback => (disconect = callback));
    return () => {
      !current.isConnected && disconect();
    };
  }, [src]);

  return <host></host>;
};

const ARouterSwitch = () => {
  let ref = useRef({});

  let chunkUpdate;
  let chunkRemove;

  let define = () => {
    console.log(ref.current);
  };

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
      <style>{style}</style>
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

customElement("a-router-switch", ARouterSwitch);
customElement("a-router-case", ARouterCase);
