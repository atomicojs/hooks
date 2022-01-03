import { c, html } from "atomico";
import { fixture } from "atomico/test-dom";
import { expect } from "@esm-bundle/chai";
import { useFormValue } from "./use-form.js";

it("useFormValue", async () => {
  const Component = c(() => {
    useFormValue("field", "20");
    return html`<host shadowDom></host>`;
  });

  customElements.define("use-form-value", Component);

  const node = new Component();

  const form = fixture(html`<form>
    <${node} />
  </form>`);

  await node.updated;

  expect(form.elements.field.value).to.equal("20");
});
