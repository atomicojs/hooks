import { b as useHost, h, c as customElement, u as useState } from './chunks/1fcfa7f3.js';
export { r as render } from './chunks/1fcfa7f3.js';

/**
 * Define a customProperty on the host that declares this hook
 * @param {string} name
 * @param {string} value
 */

function useCustomProperty(name, value) {
  let ref = useHost();

  if (ref[name] != value) {
    ref.current.style.setProperty("--" + name, value);
    ref[name] = value;
  }
}

const Example1 = ({
  src
}) => {
  let [state, setState] = useState(0);
  let value = state ? "red" : "teal";
  useCustomProperty("color", value);
  return h("host", {
    shadowDom: true
  }, h("style", null, `:host{color:var(--color)}`), h("h1", null, "Is the text ", value, "?"), h("button", {
    onclick: () => setState(!state)
  }, "Toggle color"));
};

Example1.props = {
  src: String
};
customElement("use-custom-property-example-1", Example1);
var useCustomProperty_showcase = [{
  label: "Example useCustomProperty",

  render() {
    return h("host", null, h("use-custom-property-example-1", null));
  }

}];

export default useCustomProperty_showcase;
//# sourceMappingURL=use-custom-property.showcase.js.map
