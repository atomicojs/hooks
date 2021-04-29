import { expect } from "@esm-bundle/chai";
import { setViewport } from "@web/test-runner-commands";
import { createHooks } from "atomico/test-hooks";
import { useResizeState } from "../use-resize-state.js";

it("useResponsiveState <= 320px", async () => {
  const host = document.createElement("div");
  let step = 0;

  document.body.appendChild(host);

  const hooks = createHooks(() => hooks.load(load), host);

  const load = () => {
    const value = useResizeState("no, yes 320px");
    switch (step++) {
      case 0:
        expect(value).to.undefined;
        break;
      case 1:
        expect(value).to.equal("yes");
        break;
      case 2:
        expect(value).to.equal("no");
        break;
    }
  };

  hooks.load(load);

  hooks.cleanEffects()();

  await setViewport({ width: 360, height: 640 });

  await setViewport({ width: 200, height: 640 });
});
