import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { css } from "./use-css-shadow";

it("use-css-shadow", () => {
  const host = document.createElement("div");

  host.attachShadow({
    mode: "open",
  });

  function load() {
    css`
      :host {
        width: 200px;
        height: 200px;
        display: block;
      }
    `;
  }

  const hooks = createHooks(null, host);

  hooks.load(load);

  hooks.updated();
  // @ts-ignore
  expect(host.shadowRoot.adoptedStyleSheets.length).to.equal(1);
});
