import { h, customElement, useState } from "atomico";
import { useCustomProperty } from "./use-custom-property";
export { render } from "atomico";

const Example1 = ({ src }) => {
  let [state, setState] = useState(0);
  let value = state ? "red" : "teal";
  useCustomProperty("color", value);
  return (
    <host shadowDom>
      <style>{`:host{color:var(--color)}`}</style>
      <h1>Is the text {value}?</h1>
      <button onclick={() => setState(!state)}>Toggle color</button>
    </host>
  );
};

Example1.props = {
  src: String,
};

customElement("use-custom-property-example-1", Example1);

export default [
  {
    label: "Example useCustomProperty",
    render() {
      return (
        <host>
          <use-custom-property-example-1></use-custom-property-example-1>
        </host>
      );
    },
  },
];
