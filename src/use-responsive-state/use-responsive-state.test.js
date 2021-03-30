import { expect } from "@esm-bundle/chai";
import { setViewport } from "@web/test-runner-commands";
import { createHooks } from "atomico/test-hooks";
import { getSizes, useResponsiveState } from "./use-responsive-state.js";

it("getSize", () => {
  // const [sizeDefault, sizes] = getSizes("default, hd 1080px, fullhd 1980px");

  // expect(sizeDefault).to.equal("default");

  // const cases = [
  //   {
  //     value: "hd",
  //     media: "(min-width: 1080px)",
  //   },
  //   {
  //     value: "fullhd",
  //     media: "(min-width: 1980px)",
  //   },
  // ];

  // sizes.map(({ match, value }, index) => {
  //   expect(value).to.equal(cases[index].value);
  //   expect(match.media).to.equal(cases[index].media);
  // });

  const [, sizes2] = getSizes(
    "default, fullhd 1980px, phone 1980x920px, hd 1080px, x2 320x1020px"
  );
  console.log(sizes2);
});

it("useResponsiveState <= 320px", async () => {
  const hooks = createHooks(() => {});

  await setViewport({ width: 360, height: 640 });

  const load = () => {
    return useResponsiveState("no, yes 320px");
  };

  expect(hooks.load(load)).to.equal("yes");

  await setViewport({ width: 280, height: 640 });

  hooks.cleanEffects()();

  expect(hooks.load(load)).to.equal("no");
});
