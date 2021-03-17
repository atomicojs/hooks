import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useRoute } from "./use-router.js";

it("useRouter", () => {
  const hooks = createHooks(() => {});
  let render = 0;
  function load() {
    const result = useRoute("/[...any]");

    if (render++) {
      expect(result[0]).to.deep.equal({ any: "" });
    } else {
      expect(result).to.undefined;
    }
  }

  hooks.load(load);

  hooks.cleanEffects()();
});
