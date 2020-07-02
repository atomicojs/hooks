import { b as useHost, a as useEffect, h, c as customElement, u as useState } from './chunks/1fcfa7f3.js';
export { r as render } from './chunks/1fcfa7f3.js';

let cache = {};
let support = document.adoptedStyleSheets;
/**
 * Add support to styleSheet, only in browsers that
 * implement it, it is remembered that adoptedStyleSheets
 * (05/13/2020) is not standard of the w3 is just a
 * valid implementation for google crhome
 * @param  {...(string|CSSStyleSheet)} stylesheet
 */

function useStylesheet(...stylesheet) {
  let ref = useHost();
  let {
    current
  } = ref;
  useEffect(() => {
    if (support) {
      ref.prev = ref.prev || [];
      let shadowRootPrev = current.shadowRoot.adoptedStyleSheets.filter(styleSheet => !ref.prev.includes(styleSheet));
      ref.prev = stylesheet.map(css => {
        if (typeof css == "string" && !cache[css]) {
          let sheet = new CSSStyleSheet();
          sheet.replace(css);
          cache[css] = sheet;
        }

        return cache[css] || css;
      });
      current.shadowRoot.adoptedStyleSheets = [...shadowRootPrev, ...ref.prev];
    }
  }, stylesheet);
  return support ? "" : stylesheet.join("");
}

const Example1 = ({
  src
}) => {
  let [state, setState] = useState(0);
  let stylesText = useStylesheet(`:host{color:red}`, `:host{background:rgba(0,0,0,.${state})}`);
  return h("host", {
    shadowDom: true
  }, h("style", null, stylesText), h("h1", null, "Is the text red?"), h("button", {
    onclick: () => setState(state + 1 > 10 ? 0 : state + 1)
  }, "update : ", state));
};

Example1.props = {
  src: String
};
customElement("use-stylesheet-example-1", Example1);
var useStylesheet_showcase = [{
  label: "Example useStylesheet",

  render() {
    return h("host", null, h("use-stylesheet-example-1", null));
  }

}];

export default useStylesheet_showcase;
//# sourceMappingURL=use-stylesheet.showcase.js.map
