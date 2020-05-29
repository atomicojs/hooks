import { O, B, d, T, P } from './chunks/7af3821d.js';
export { y as render } from './chunks/7af3821d.js';

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
  let ref = O();
  let {
    current
  } = ref;
  B(() => {
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
  let [state, setState] = P(0);
  let stylesText = useStylesheet(`:host{color:red}`, `:host{background:rgba(0,0,0,.${state})}`);
  return d("host", {
    shadowDom: true
  }, d("style", null, stylesText), d("h1", null, "Is the text red?"), d("button", {
    onclick: () => setState(state + 1 > 10 ? 0 : state + 1)
  }, "update : ", state));
};

Example1.props = {
  src: String
};
T("use-stylesheet-example-1", Example1);
var useStylesheet_showcase = [{
  label: "Example useStylesheet",

  render() {
    return d("host", null, d("use-stylesheet-example-1", null));
  }

}];

export default useStylesheet_showcase;
//# sourceMappingURL=use-stylesheet.showcase.js.map
