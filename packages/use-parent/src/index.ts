import { Ref, useHost, useMemo } from "atomico";

export function useParent<T extends HTMLElement>(
	matches: string,
	composed?: boolean,
): Ref<T> {
	const path = useParentPath(composed);
	return useMemo(
		() =>
			({
				current: path.find((el) => el.matches && el.matches(matches)),
			} as Ref<T>),
		[matches],
	);
}

export function useParentPath(composed: boolean): Element[] {
	const host = useHost();
	return useMemo(() => {
		const path = [];
		let { current } = host;
		//@ts-ignore
		while ((current = current.parentNode || (composed && current.host)))
			path.push(current);
		return path;
	}, [composed]);
}
