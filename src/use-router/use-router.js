import { useState, useEffect } from "atomico";
import { getPath, listener } from "./src/history.js";
import { matches } from "./src/matches.js";
export { redirect } from "./src/history.js";
/**
 *
 * @param {import("./src/matches").Routes} routes
 */
export function useRouter(routes) {
  let lastPath = getPath();
  const [state, setState] = useState(() => matches(routes, lastPath));
  useEffect(
    () =>
      listener(() => {
        const currentPath = getPath();
        if (currentPath != lastPath) {
          setState(matches(routes, (lastPath = currentPath)));
        }
      }),
    []
  );
  return state;
}

/**
 *
 * @param {string} path
 * @param {import("./src/matches").RouterCallback} callback
 */
export function useRoute(path, callback = (param) => param) {
  const routes = { [path]: callback };
  return useRouter(routes);
}
