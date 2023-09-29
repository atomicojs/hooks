import {
	Match,
	Params,
	createMatch,
	getParts,
	searchParams,
} from "@uppercod/exp-route";

export type RouterCallback = (params: Params, search: Params) => any;

export type Routes = {
	[path: string]: RouterCallback;
};

const cache: { [path: string]: Match } = {};

export const getMatch = (path: string) =>
	(cache[path] = cache[path] || createMatch(path));

export const matches = (routes: Routes, currentPath: string) => {
	const [path, pathSearch] = getParts(currentPath);
	const search = pathSearch ? searchParams(pathSearch) : {};
	for (const route in routes) {
		const match = getMatch(route);
		const params = match(path);
		if (params) {
			return [routes[route](params, search), route, params, search];
		}
	}
};
