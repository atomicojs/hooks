import { expect } from "@esm-bundle/chai";
import { setViewport } from "@web/test-runner-commands";
import { createHooks } from "atomico/test-hooks";
import { useResizeState } from "./use-resize-state.js";

it("useResponsiveState <= 320px", async () => {
  const current = document.createElement("div");
  const ref = { current };
  let step = 0;
  const results = [];

  document.body.appendChild(current);

  const hooks = createHooks(() => hooks.load(load), current);

  const load = () => {
    const value = useResizeState(ref, "no, yes 320px");
    results.push(value);
  };

  hooks.load(load);

  hooks.cleanEffects()();

  await setViewport({ width: 360, height: 640 });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await setViewport({ width: 200, height: 640 });

  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(results).to.deep.equal([undefined, "yes", "no"]);
});
