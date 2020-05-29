import { O, d, T, P } from './chunks/7af3821d.js';
export { y as render } from './chunks/7af3821d.js';

/**
 * Define a customProperty on the host that declares this hook
 * @param {string} name
 * @param {string} value
 */

function useCustomProperty(name, value) {
  let ref = O();

  if (ref[name] != value) {
    ref.current.style.setProperty("--" + name, value);
    ref[name] = value;
  }
}

const Example1 = ({
  src
}) => {
  let [state, setState] = P(0);
  let value = state ? "red" : "teal";
  useCustomProperty("color", value);
  return d("host", {
    shadowDom: true
  }, d("style", null, `:host{color:var(--color)}`), d("h1", null, "Is the text ", value, "?"), d("button", {
    onclick: () => setState(!state)
  }, "Toggle color"));
};

Example1.props = {
  src: String
};
T("use-custom-property-example-1", Example1);
var useCustomProperty_showcase = [{
  label: "Example useCustomProperty",

  render() {
    return d("host", null, d("use-custom-property-example-1", null));
  }

}];

export default useCustomProperty_showcase;
//# sourceMappingURL=use-custom-property.showcase.js.map
