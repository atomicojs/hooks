import { useRef } from "atomico";
import { createHooks } from "atomico/test-hooks";
import { describe, expect } from "vitest";
import { useRefValues } from "../src/";

describe("useRefValues", () => {
	const hooks = createHooks();
	const values = [];

	const load = () => {
		const ref = useRef();

		useRefValues(
			(args) => {
				const data = { args };
				values.push(data);
				return () => {
					data.clean = true;
				};
			},
			[ref],
		);

		return ref;
	};

	const ref = hooks.load(load);

	const cycle = () => {
		hooks.load(load);
		hooks.cleanEffects()()();
	};

	cycle();

	ref.current = 100;

	let loop = 3;

	while (loop--) {
		cycle();
	}

	ref.current = undefined;

	cycle();

	ref.current = 200;

	cycle();

	expect(values).to.deep.equal([
		{ args: [100], clean: true },
		{ args: [200] },
	]);

	hooks.cleanEffects(true)()();

	// expect(values).to.deep.equal([
	//   { args: [100], clean: true },
	//   { args: [200], clean: true },
	// ]);
});
