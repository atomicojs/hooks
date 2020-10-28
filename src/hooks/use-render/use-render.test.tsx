import { expect } from "@esm-bundle/chai";
import { h } from "atomico";
import { createHooks } from "atomico/test-hooks";
import { useRender } from "./use-render";

it("use-render", () => {
  const container = document.createElement("div");
  const hooks = createHooks(() => {}, container);

  hooks.load(() => {
    useRender(() => <button />);
  });

  expect(container.querySelector("button")).to.not.equal(null);
});
