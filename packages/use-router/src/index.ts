import { useMemo, useState, createRef } from "atomico";
import { createMatch, Params, Match } from "@uppercod/exp-route";
import { useListener } from "@atomico/use-listener";
import { getPath, redirect } from "./history.js";
export * from "./history.js";

interface RouteSwitch<Result> {
	[path: string]: (
		params: Params,
		data: { id: string; path: string },
	) => Result;
}

const refGlobalThis = createRef(globalThis);

const cache: { [path: string]: Match } = {};

export function useRouter<Result = any>(
	router: RouteSwitch<Result>,
	memo?: any,
): {
	id: string;
	path: string;
	params: Params;
	result: Result;
	redirect: (path: string, title?: string) => void;
} {
	const [id, setId] = useState(getPath);

	useListener(refGlobalThis, "popstate", () => {
		setId(getPath);
	});

	return useMemo(() => {
		for (const path in router) {
			cache[path] = cache[path] || createMatch(path);
			const params = cache[path](id);
			if (params) {
				const result = router[path](params, { id, path });
				return { result, id, path, params, redirect };
			}
		}
	}, [id, memo]);
}
