import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useQueue } from "./use-queue";

it("useQueue with collector callback", async () => {
  const hooks = createHooks();

  const entries = await new Promise((done) => {
    function load() {
      const callback = useQueue((entries: number[]) => done(entries));
      callback(1);
      callback(2);
      callback(3);
      callback(4);
    }

    hooks.load(load);
  });

  expect(entries).to.deep.equal([1, 2, 3, 4]);
});

it("useQueue with reducer callback", async () => {
  const hooks = createHooks();

  const entries = await new Promise((done) => {
    function load() {
      const callback = useQueue(
        (entries: number[]) => done(entries),
        (value) => value + 1
      );
      callback(1);
      callback(2);
      callback(3);
      callback(4);
    }

    hooks.load(load);
  });

  expect(entries).to.deep.equal([2, 3, 4, 5]);
});
