import { useEffect, useState } from "atomico";
import media, { Result } from "@uppercod/match-media";

const CACHE: { [index: string]: MediaQueryList } = {};

const CACHE_TEMPLATE: { [index: string]: ReturnType<typeof media> } = {};

const getId = ({ size, unit }: Result) => `(min-width: ${size}${unit})`;

export function useResponsiveState(
	part: string | TemplateStringsArray,
	...args: any[]
) {
	let template: ReturnType<typeof media>;

	if (typeof part === "string") {
		if (!CACHE_TEMPLATE[part]) {
			CACHE_TEMPLATE[part] = media.call(null, { raw: [part] });
		}
		template = CACHE_TEMPLATE[part];
	} else {
		template = media.call(null, part, ...args);
	}

	const check = () =>
		template.match((result) => {
			const id = getId(result);

			CACHE[id] = CACHE[id] || matchMedia(id);

			return CACHE[id].matches;
		});

	const [value, setValue] = useState(check);

	useEffect(() => {
		const unlisteners = template.result
			.filter((result) => !result.default)
			.map((result) => {
				const id = getId(result);
				CACHE[id] = CACHE[id] || matchMedia(id);
				const eventType = "change";
				const eventHandler = () => {
					setValue(check);
				};
				CACHE[id].addEventListener(eventType, eventHandler);
				return () => {
					CACHE[id].removeEventListener(eventType, eventHandler);
				};
			});

		setValue(check);

		return () => unlisteners.forEach((fn) => fn());
	}, [template.result]);

	return value;
}
