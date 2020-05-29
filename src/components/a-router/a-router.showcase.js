import { h } from "atomico";
export { render } from "atomico";
import "./a-router";

const demoResult = (result) => () =>
  new Promise((resolve) => setTimeout(resolve, 1000, { default: result }));

const result1 = demoResult((props) => (
  <form>
    <input type="file" name="ddd" value="" />
    Home
  </form>
));

const result2 = demoResult((props) => <h3>Config</h3>);

const result3 = demoResult((props) => <h3>{JSON.stringify(props)}</h3>);

export default [
  {
    label: "Ejemplo",
    render() {
      return (
        <host>
          <a-router-proxy>
            <p>
              The import effect is emulated with a delay to show the use of the
              loading slot
            </p>
            <nav>
              <a style="margin:5px" href="/">
                home
              </a>
              <a style="margin:5px" href="/user">
                user
              </a>
              <a style="margin:5px" href="/config">
                config
              </a>
            </nav>
            <a-router-switch>
              <a-router-case path="/" src={result1}></a-router-case>
              <a-router-case path="/user" src={result2}></a-router-case>
              <a-router-case path="/:any..." src={result3}></a-router-case>
              <h1 slot="loading">loading...</h1>
              <h1 slot="404">404</h1>
            </a-router-switch>
          </a-router-proxy>
        </host>
      );
    },
  },
];
