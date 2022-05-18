import { expect } from "@esm-bundle/chai";
import { setViewport } from "@web/test-runner-commands";
import { createHooks } from "atomico/test-hooks";
import { useResponsiveState } from "./use-responsive-state.js";

describe("useResponsiveState", () => {
  it("useResponsiveState <= 320px", async () => {
    const hooks = createHooks(() => {});

    await setViewport({ width: 360, height: 640 });

    const load = () => {
      return useResponsiveState("no, yes 320px");
    };

    expect(hooks.load(load)).to.equal("yes");

    hooks.cleanEffects()();

    await setViewport({ width: 280, height: 640 });

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(hooks.load(load)).to.equal("no");
  });
});
