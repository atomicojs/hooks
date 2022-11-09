import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useScript } from "./use-script.js";

describe("useScript", () => {
  it("case 1", async () => {
    const hooks = createHooks(() => {
      hooks.load(load);
    });

    const steps = [];

    const task = new Promise((resolve) => (window.____useScript = resolve));

    const load = () => {
      const status = useScript(
        "data:text/javascript, window.____useScript(100)",
        () => {
          steps.push("done!");
        }
      );

      steps.push(status);
    };

    hooks.load(load);

    hooks.cleanEffects()()();

    const value = await task;

    expect(value).to.equal(100);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(steps).to.deep.equal(["", "pending", "done!", "fulfilled"]);
  });
});
