import { c, html } from "atomico";
import { fixture } from "atomico/test-dom";
import { expect } from "@esm-bundle/chai";
import { useFormValue } from "./use-form.js";

it("useFormValue", async () => {
  const Component = c(() => {
    const [value] = useFormValue("field");
    return html`<host data-value=${value}></host>`;
  });

  customElements.define("use-form-value", Component);

  const node = new Component();

  const form = fixture(html`<form>
    <input name="field" value="xxx" />
    <${node} />
  </form>`);

  await node.updated;

  expect(node.dataset.value).to.equal("xxx");

  form.reset();

  await node.updated;
  await node.updated;

  expect(node.dataset.value).to.equal("");
});
