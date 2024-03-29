import { it, expect } from "vitest";
import { useHost } from "atomico";
import { createHooks } from "atomico/test-hooks";
import { useListener } from "../src";

it("useListener", () =>
	new Promise((done) => {
		const host = document.createElement("div");
		const hooks = createHooks(null, host);
		const eventName = "customEvent";

		hooks.load(() => {
			const host = useHost();
			useListener(host, eventName, (event) => {
				expect(event).to.be.instanceof(CustomEvent);
				expect(event.type).to.equal(eventName);
				done();
			});
		});

		hooks.cleanEffects()()();

		host.dispatchEvent(new CustomEvent(eventName));
	}));
