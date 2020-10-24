import {
  Match,
  Params,
  createMatch,
  getParts,
  searchParams,
} from "@uppercod/exp-route";

interface Cache {
  [path: string]: Match;
}

const cache: Cache = {};

const getMatch = (path: string) =>
  (cache[path] = cache[path] || createMatch(path));

export type RouteCallback<R = any> = (params: Params, search: Params) => R;

export interface Routes {
  [path: string]: RouteCallback;
}

export const matches = (routes: Routes, currentPath: string) => {
  const [path, pathSearch] = getParts(currentPath);
  const search = pathSearch ? searchParams(pathSearch) : {};
  for (const route in routes) {
    const match = getMatch(route);
    const params = match(path);
    if (params) {
      return [routes[route](params, search), currentPath, params, search];
    }
  }
};
