import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useSlots } from "./use-slots";

it("useSlots", () => {
  const div = document.createElement("div");
  const header = div.appendChild(document.createElement("header"));

  header.setAttribute("slot", "Header");

  const hooks = createHooks(null, div);

  function load() {
    const [Slots, childNodes] = useSlots();

    expect(Slots).to.deep.equal({
      Header: header,
    });

    expect(childNodes).to.deep.equal([header]);
  }

  hooks.load(load);
});
