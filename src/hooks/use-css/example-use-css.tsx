import { c, h } from "atomico";
import { useCss } from "./use-css";

function example() {
  const css = useCss();
  return (
    <host
      class={css`
        width: 200px;
        height: 200px;
        background: #000;
        display: block;
        &:hover {
          background: red;
          border-radius: 50%;
        }
        button {
          width: 200px;
          &:hover {
            background: gold;
          }
        }
        @media (max-width: 500px) {
          height: 500px;
        }
      `}
    >
      <style ref={css.ref}></style>
      <button
        class={css`
          background: #000;
        `}
      >
        1
      </button>
      <button>2</button>
      <button>3</button>
    </host>
  );
}

customElements.define("example-use-css", c(example));
