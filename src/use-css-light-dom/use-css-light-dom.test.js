import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useCssLightDom } from "./use-css-light-dom";

it("useCss", () => {
  const host = document.body.appendChild(document.createElement("div"));

  const hooks = createHooks(() => {}, host);

  const cssText = /*css*/ `
    :host{
        color: red
    }
  `;

  hooks.load(() => {
    const css = useCssLightDom(cssText);
    host.className = css`
      :host {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: block;
      }
    `;
  });

  hooks.cleanEffects();

  const style = getComputedStyle(host);

  expect(style.width).to.equal("100px");
  expect(style.height).to.equal("100px");
  expect(style.borderRadius).to.equal("50%");
  expect(style.display).to.equal("block");
});
