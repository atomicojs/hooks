import { h, c } from "atomico";
import { useRouter } from "./use-router";

function example() {
  const [result, path] = useRouter({
    "/use-router": () => <h1>use router?</h1>,
    "/use-router#every": () => <h1>use router?#every------</h1>,
    "/{...any}": ({ any }, params) => (
      <h1>
        {any} {JSON.stringify(params)}
      </h1>
    ),
  });

  return (
    <host>
      {path}
      {result}
    </host>
  );
}

customElements.define("example-use-router", c(example));
