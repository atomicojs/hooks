import { expect } from "vitest";
import { setViewport } from "@web/test-runner-commands";
import { createHooks } from "atomico/test-hooks";
import { useRefResizeState } from "./use-resize-state.js";

describe("useResponsiveState", () => {
	it("useResponsiveState <= 320px", async () => {
		const current = document.createElement("div");
		const ref = { current };
		const results = [];

		document.body.appendChild(current);

		const hooks = createHooks(() => hooks.load(load), current);

		const load = () => {
			const value = useRefResizeState(ref, "no, yes 320px");
			results.push(value);
		};

		hooks.load(load);

		hooks.cleanEffects()()();

		await setViewport({ width: 360, height: 640 });

		await new Promise((resolve) => setTimeout(resolve, 100));

		await setViewport({ width: 200, height: 640 });

		await new Promise((resolve) => setTimeout(resolve, 100));

		expect(results).to.deep.equal([undefined, "yes", "no"]);
	});
});
