import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useRoute } from "./use-router.js";

it("useRouter", () => {
  const hooks = createHooks(() => {});

  function load() {
    const [result] = useRoute("/[...any]");

    expect(result).to.deep.equal({ any: "" });
  }

  hooks.load(load);
});
