import { F, M, q, R, Z, _ } from './chunks/37634490.js';
import { u as useLazy } from './chunks/c1e181f8.js';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const isUrl = file => /^(http(s){0,1}:){0,1}\/\//.test(file);

let globalHandlerCancel = ["touchend", "mouseup", "mouseleave", "touchleave", "click"];
let globalHandlerCapture = ["mousemove", "touchmove"];

function addEventListener(type, handler) {
  window.addEventListener(type, handler);
}

function removeEventListener(type, handler) {
  window.removeEventListener(type, handler);
}
/**
 *
 * @param {ObserverEventMove} callback
 */

function useEventMove(callback) {
  let [ref] = F(() => {
    function dispath(...args) {
      return ref.callback(...args);
    }

    function startCapture(event) {
      ref.capture = [];
      globalHandlerCancel.forEach(type => addEventListener(type, endCapture));
      globalHandlerCapture.forEach(type => addEventListener(type, capture));
      capture(event, true);
      dispath("start", ref.capture);
    }

    function endCapture(event) {
      if (!ref.capture) return;
      capture(event, false);
      let {
        capture: currentCapture
      } = ref;
      ref.capture = false;
      globalHandlerCancel.forEach(type => removeEventListener(type, endCapture));
      globalHandlerCapture.forEach(type => removeEventListener(type, capture));
      dispath("end", currentCapture);
    }

    function capture(event, ignoreEmit) {
      if (!ref.capture) return;
      let x;
      let y;

      if (/touch/.test(event.type)) {
        let touch = event.touches[0];
        if (!touch) return;
        x = touch.clientX;
        y = touch.clientY;
      } else {
        x = event.clientX;
        y = event.clientY;
      }

      ref.capture.push({
        x,
        y,
        t: event.timeStamp
      });
      if (!ignoreEmit) dispath("move", ref.capture);
    }

    return {
      slide: -1,
      events: {
        startCapture
      }
    };
  });
  ref.callback = callback;
  return {
    ref,
    ontouchstart: ref.events.startCapture,
    onmousedown: ref.events.startCapture
  };
}
/**
 * @callback ObserverEventMove
 * @param {"start"|"end"|"move"} type - states associated with event capture
 * @param {Array.<{x:number,y:number,t:number}>} range - useful range of the associated movement
 * @return {{ref:{}}}
 */

var style = ":host {\n  width: 100%;\n  display: block;\n  --scope-border-color: var(--border-color, #d6d8d8);\n  --scope-border-radius: var(--border-border-radius, 5px);\n}\n\n:host([centered]) .showcase.-sandbox {\n  align-items: center;\n  justify-content: center;\n}\n\n.showcase.-preview {\n    width: 100%;\n    position: relative;\n    overflow: hidden;\n    border-radius: var(--scope-border-radius);\n    border: 1px solid var(--scope-border-color);\n    height: calc(100% - 38px);\n    box-sizing: border-box;\n    border-top-left-radius: 0px;\n  }\n\n.showcase.-btn {\n    min-height: 100%;\n    display: flex;\n    padding: 0px 0.8rem;\n    align-items: center;\n    transition: 0.3s ease all;\n    color: currentColor\n  }\n\n.showcase.-btn:hover {\n      background: var(--scope-border-color);\n    }\n\n.showcase.-btn svg path {\n      fill: currentColor;\n    }\n\n.showcase.-header {\n    border: 1px solid var(--scope-border-color);\n    border-bottom: none;\n    border-radius: var(--scope-border-radius) var(--scope-border-radius) 0px 0px;\n    display: inline-flex\n  }\n\n.showcase.-header > * + * {\n      border-left: 1px solid var(--scope-border-color);\n    }\n\n.showcase.-select {\n    border: none;\n    padding: 10px;\n    background: transparent;\n    color: currentColor\n  }\n\n.showcase.-select option {\n      color: black;\n    }\n\n.showcase.-sandbox {\n    width: 100%;\n    height: 100%;\n    box-sizing: border-box;\n    display: flex;\n    flex-flow: row wrap;\n    padding: 1rem 30px 1rem 1rem;\n    overflow-y: auto;\n  }\n\n.showcase.-resize {\n    width: 20px;\n    height: 100%;\n    position: absolute;\n    top: 0px;\n    right: 0px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0px;\n    border: none;\n    background: transparent;\n    cursor: col-resize;\n    border-left: 1px solid var(--scope-border-color)\n  }\n\n.showcase.-resize:before,\n    .showcase.-resize:after {\n      content: \"\";\n      display: block;\n      width: 1px;\n      height: 20px;\n      background: var(--scope-border-color);\n    }\n\n.showcase.-resize:after {\n      margin-left: 3px;\n    }\n";

const AShowcase = ({
  src,
  width,
  height,
  origin
}) => {
  const refSandbox = q();
  const refPreview = q();
  const refHeader = q();
  const refHost = R();
  let [select, setSelect] = F();
  let currentZone;
  const propsMove = useEventMove((type, range) => {
    if (type == "start") {
      currentZone = refHost.current.getBoundingClientRect();
    }

    if (type == "move") {
      const last = range[range.length - 1];
      const move = last.x - currentZone.x;
      const minWidth = refHeader.current ? refHeader.current.clientWidth + 22 : 50;
      const width = (move < minWidth ? minWidth : move) / currentZone.width * 100;
      refPreview.current.style.width = (width > 100 ? 100 : width < 0 ? 0 : width) + "%";
    }
  });
  const [lazyState, lazyResult] = useLazy(() => import((isUrl(src) ? "" : "./") + src).then(md => ({
    default: md
  })), true);
  const lazyStateIsDone = lazyState == "done";
  const cases = lazyStateIsDone ? [].concat(lazyResult.default) : [];
  select = select || lazyStateIsDone && cases[0].label;
  Z(() => {
    const {
      render,
      rendered
    } = cases.find(({
      label
    }) => label == select) || {};
    render && lazyResult.render(render(), refSandbox.current);
    rendered && rendered(refSandbox.current);
  }, [lazyStateIsDone, select]);
  return _("host", {
    shadowDom: true,
    style: {
      width,
      height
    }
  }, _("style", null, style), lazyStateIsDone && _("header", {
    ref: refHeader,
    class: "showcase -header"
  }, _("select", {
    class: "showcase -select",
    onchange: ({
      target: {
        value
      }
    }) => setSelect(value)
  }, cases.map(({
    label
  }) => _("option", {
    value: label
  }, label))), origin && _("a", {
    class: "showcase -btn",
    href: origin,
    target: "_blank"
  }, _("svg", {
    height: "14",
    viewBox: "0 0 467.765 467.765",
    xmlns: "http://www.w3.org/2000/svg"
  }, _("path", {
    d: "M146.175 87.707L0 233.883l146.175 146.175 41.34-41.34L82.681 233.883l104.834-104.836zM321.59 87.707l-41.34 41.34 104.834 104.836L280.25 338.717l41.34 41.34 146.175-146.175z"
  })))), _("section", {
    class: "showcase -preview",
    ref: refPreview
  }, _("div", {
    class: "showcase -sandbox",
    ref: refSandbox
  }), _("button", _extends({
    class: "showcase -resize"
  }, propsMove))));
};

AShowcase.props = {
  width: {
    type: String
  },
  height: {
    type: String
  },
  src: {
    type: String
  },
  centered: {
    type: Boolean,
    reflect: true
  },
  origin: String
};
var aShowcase = M("a-showcase", AShowcase);

export default aShowcase;
//# sourceMappingURL=a-showcase.js.map
