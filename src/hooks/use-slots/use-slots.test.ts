import { expect } from "@esm-bundle/chai";
import { h } from "atomico";
import { createHooks } from "atomico/test-hooks";
import { useSlots } from "./use-slots";

it("useSlots", () => {
  const div = document.createElement("div");
  const header = div.appendChild(document.createElement("header"));

  header.setAttribute("slot", "Header");

  const hooks = createHooks(null, div);

  function load() {
    const slots = useSlots();
    expect(slots).to.deep.equal({
      Header: header,
      children: [h(header)],
    });
  }

  hooks.load(load);
});
