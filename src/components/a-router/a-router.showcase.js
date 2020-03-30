import { h } from "atomico";
export { render } from "atomico";
import "./a-router";

const demoResult = result => () =>
  new Promise(resolve => setTimeout(resolve, 1000, { default: result }));

const result1 = demoResult("h1");
const result2 = demoResult("h2");

export default [
  {
    label: "Ejemplo",
    render() {
      return (
        <a-router-proxy>
          <nav>
            <a href="/">home</a>
            <br />
            <a href="/user">user</a>
            <br />
            <a href="/config">config</a>
          </nav>
          <a-router-switch>
            <a-router-case path="/" src={result1}></a-router-case>
            <a-router-case path="/:id" src={result2}></a-router-case>
          </a-router-switch>
        </a-router-proxy>
      );
    }
  }
];
