import { h, customElement, useState } from "atomico";
import { useStylesheet } from "./use-stylesheet";
export { render } from "atomico";

const Example1 = ({ src }) => {
  let [state, setState] = useState(0);
  useStylesheet(`:host{color:red}`, `:host{background:rgba(0,0,0,.${state})}`);

  return (
    <host shadowDom>
      <h1>Is the text red?</h1>
      <button onclick={() => setState(state + 1 > 10 ? 0 : state + 1)}>
        update : {state}
      </button>
    </host>
  );
};

Example1.props = {
  src: String,
};

customElement("use-stylesheet-example-1", Example1);

export default [
  {
    label: "Example useStylesheet",
    render() {
      return (
        <host>
          <use-stylesheet-example-1></use-stylesheet-example-1>
        </host>
      );
    },
  },
];
