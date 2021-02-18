import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useListenerRef } from "./use-listener";

it("use-listener", (done) => {
  const ref = {
    current: document.createElement("div"),
  };

  const ev = new Event("myEvent");

  function load() {
    useListenerRef(ref, "myEvent", (event) => {
      expect(event).to.equal(ev);
      done();
    });
  }

  const hooks = createHooks();

  hooks.load(load);

  hooks.cleanEffects();

  ref.current.dispatchEvent(ev);
});
