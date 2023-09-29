import { it, expect } from "vitest";
import { createHooks } from "atomico/test-hooks";
import { useKeyboard } from "../src/";

it("useKeyboard", () => {
	const ref = { current: document };
	const hooks = createHooks();
	const capture = [];
	hooks.load(() => {
		useKeyboard(ref, ["KeyA", "KeyQ"], (event) => {
			capture.push(event);
		});
	});

	hooks.cleanEffects()()();

	ref.current.dispatchEvent(
		new KeyboardEvent("keydown", { code: "KeyQ", key: "1" }),
	);

	ref.current.dispatchEvent(
		new KeyboardEvent("keydown", { code: "KeyA", key: "1" }),
	);

	ref.current.dispatchEvent(
		new KeyboardEvent("keyup", { code: "KeyQ", key: "1" }),
	);

	ref.current.dispatchEvent(
		new KeyboardEvent("keyup", { code: "KeyA", key: "1" }),
	);

	ref.current.dispatchEvent(
		new KeyboardEvent("keydown", { code: "KeyA", key: "2" }),
	);
	ref.current.dispatchEvent(
		new KeyboardEvent("keydown", { code: "KeyQ", key: "2" }),
	);

	expect(capture.length).to.equal(1);

	const [event] = capture;

	// The captured event defines key as 2, if it is 1 the hook ignores the convination
	expect(event.key).to.equal("2");
});
