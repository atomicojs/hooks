import { h } from "atomico";
export { render } from "atomico";
import "./a-router";

const callback = () =>
  new Promise(resolve => setTimeout(resolve, 1000, () => <h1>...</h1>));

export default [
  {
    label: "Ejemplo",
    render() {
      return (
        <a-router-switch>
          <a-router-case path="/" src={callback}></a-router-case>
          <a-router-case path="/id" src={callback}></a-router-case>
        </a-router-switch>
      );
    }
  }
];
