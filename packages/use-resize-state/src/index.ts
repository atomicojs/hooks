import { Ref, useHost, useState } from "atomico";
import { useResizeObserver } from "@atomico/use-resize-observer";
import media from "@uppercod/match-media";

const CACHE_TEMPLATE: { [index: string]: ReturnType<typeof media> } = {};
export function useRefResizeState(ref: Ref, sizes: string) {
	const template: ReturnType<typeof media> = media.call(null, {
		raw: [sizes],
	});

	const [state, setState] = useState();

	function getState() {
		const { clientWidth } = ref.current;

		return template.match(({ size }) => size <= clientWidth);
	}

	useResizeObserver(ref, () => setState(getState));

	return state;
}

export function useResizeState(
	part: string | TemplateStringsArray,
	...args: any[]
) {
	const ref = useHost();

	let template: ReturnType<typeof media>;
	if (typeof part === "string") {
		if (!CACHE_TEMPLATE[part]) {
			CACHE_TEMPLATE[part] = media.call(null, { raw: [part] });
		}
		template = CACHE_TEMPLATE[part];
	} else {
		template = media.call(null, part, ...args);
	}

	const [state, setState] = useState();

	function getState() {
		const { clientWidth } = ref.current;

		return template.match(({ size }) => size <= clientWidth);
	}

	useResizeObserver(ref, () => setState(getState));

	return state;
}
