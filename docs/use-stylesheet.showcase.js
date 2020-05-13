import { C, O, p, x, T } from './chunks/61e0f1f4.js';
export { d as render } from './chunks/61e0f1f4.js';

let cache = {};
/**
 * Add support to styleSheet, only in browsers that
 * implement it, it is remembered that adoptedStyleSheets
 * (05/13/2020) is not standard of the w3 is just a
 * valid implementation for google crhome
 * @param  {...(string|CSSStyleSheet)} stylesheet
 */

function useStylesheet(...stylesheet) {
  let ref = C();
  O(() => {
    let {
      current
    } = ref;

    if (current.shadowRoot && current.shadowRoot.adoptedStyleSheets) {
      current.shadowRoot.adoptedStyleSheets = stylesheet.map(css => {
        if (typeof css == "string" && !cache[css]) {
          let sheet = new CSSStyleSheet();
          sheet.replace(css);
          cache[css] = sheet;
        }

        return cache[css] || css;
      });
    }
  }, stylesheet);
}

const Example1 = ({
  src
}) => {
  let [state, setState] = T(0);
  useStylesheet(`:host{color:red}`, `:host{background:rgba(0,0,0,.${state})}`);
  return p("host", {
    shadowDom: true
  }, p("h1", null, "Is the text red?"), p("button", {
    onclick: () => setState(state + 1 > 10 ? 0 : state + 1)
  }, "update : ", state));
};

Example1.props = {
  src: String
};
x("use-stylesheet-example-1", Example1);
var useStylesheet_showcase = [{
  label: "Example useStylesheet",

  render() {
    return p("host", null, p("use-stylesheet-example-1", null));
  }

}];

export default useStylesheet_showcase;
//# sourceMappingURL=use-stylesheet.showcase.js.map
