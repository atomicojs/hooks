import { expect } from "@esm-bundle/chai";
import { useSize } from "./use-state-size";
import { createHooks } from "atomico/src/hooks/create-hooks";

const nextFps = () =>
  new Promise((resolve) => requestAnimationFrame(() => resolve()));

it("useSize", async () => {
  //synthetic reference
  const div = document.createElement("div");
  const ref = { current: div };
  div.style.width = "100%";
  document.body.appendChild(div);

  // The hook has 2 execution cycles
  let cycle = 0;

  const update = () => load(render);

  const render = () => {
    const [width, height] = useSize(ref);
    switch (cycle++) {
      case 0:
        expect(width).is.undefined;
        expect(height).is.undefined;
        break;
      case 1:
        expect(width).to.equal(div.clientWidth);
        expect(height).to.equal(div.clientHeight);
        break;
    }
  };

  const { load, updated } = createHooks(update);

  update();

  updated();
  // internally useEffect uses requestAnimation
  // to associate the following frame to the resizing
  await nextFps();
});
