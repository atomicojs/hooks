import { useState, useRef } from "atomico";
import { ReturnUseState } from "atomico/types/hooks";

type Mode = "timeout" | "fps" | "idle";

const fpsP = () =>
	new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

export const fps = async (length = 1) => {
	let current = Promise.resolve();

	while (length--) current = current.then(fpsP);

	await current;
};

export const idle = (ms: number) =>
	window.requestIdleCallback
		? new Promise((resolve) =>
				requestIdleCallback(resolve, { timeout: ms }),
		  )
		: timeout(ms);

export const timeout = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export function useDebounceState<Value>(
	delay: number,
	initialState: Value,
	mode: Mode = "timeout",
): ReturnUseState<Value extends (...args: any[]) => infer V ? V : Value> {
	const [state, setState] = useState(initialState);
	const ref = useRef();
	return [
		state,
		(current) => {
			ref.current = current;
			if (!ref.prevent) {
				ref.prevent = true;
				(mode === "fps" ? fps : mode === "idle" ? idle : timeout)(
					delay,
				).then(() => {
					ref.prevent = false;
					setState(ref.current);
				});
			}
		},
	];
}
