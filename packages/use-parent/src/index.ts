import { createRef, useHost, useMemo } from "atomico";

export function useParent<T extends Element>(
	matches: T | string,
	composed?: boolean,
) {
	const path = useParentPath(composed);
	return useMemo(
		() =>
			createRef(
				path.find(
					typeof matches === "string"
						? (el) => el?.matches?.(matches)
						: //@ts-ignore
						  (el) => el instanceof matches,
				) as T extends string ? typeof Element : T,
			),
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
