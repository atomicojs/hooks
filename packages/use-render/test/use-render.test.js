import { it, expect } from "vitest";
import { html } from "atomico";
import { createHooks } from "atomico/test-hooks";
import { useRender } from "../src/use-render.js";

it("use-render", () => {
	const container = document.createElement("div");
	const hooks = createHooks(() => {}, container);

	hooks.load(() => {
		useRender(() => html`<button />`);
	});

	expect(container.querySelector("button")).to.not.equal(null);
});
