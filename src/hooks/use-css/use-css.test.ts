import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useCss } from "./use-css";

it("renders a hello world message", () => {
  const container = document.createElement("div");
  const ref = {
    current: container.appendChild(document.createElement("style")),
  };

  document.body.appendChild(container);

  function load() {
    const css = useCss();

    container.className = css(`
    width: 200px;
    height: 200px;
    &:hover{
      background:black;
    }
    @media (max-width:200px){
      height:200px;
      a{
        background:teal;
      }
    }
  `);

    Object.assign(css.ref, ref);
  }

  const hooks = createHooks();
  /**
   *
   */
  hooks.load(load);
  hooks.updated();

  const cases = [
    ".c02f49-2f69-2f5f { width: 200px; height: 200px; }",
    ".c02f49-2f69-2f5f:hover { background: black; }",
    "@media (max-width: 200px) {\n" +
      "  .c02f49-2f69-2f5f a { background: teal; }\n" +
      "  .c02f49-2f69-2f5f { height: 200px; }\n" +
      "}",
  ];

  cases.forEach((value, index) => {
    expect(ref.current.sheet.rules[index].cssText).to.equal(value);
  });
});
