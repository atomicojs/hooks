import { useState, useEffect } from "atomico";
import { getPath, listener } from "./use-router/history.js";
import { matches, getMatch } from "./use-router/matches.js";
export { redirect, getPath } from "./use-router/history.js";

/**@type {InternalState} */
const DefaultState = {};

/**
 *
 * @param {import("./use-router/matches").Routes} routes
 */
export function useRouter(routes) {
  const [state, setState] = useState(DefaultState);

  useEffect(() => {
    if (!routes) return;
    // Returns to the default state to recycle the routes object
    setState(DefaultState);

    const reduce = () => {
      setState((current) => {
        const path = getPath();
        return current.path != path
          ? {
              path,
              result: matches(routes, path),
            }
          : current;
      });
    };

    reduce();

    return listener(reduce);
  }, [routes]);

  return state.result;
}

/**
 *
 * @param {string} path
 * @param {import("./use-router/matches").RouterCallback} callback
 */
export function useRoute(path, callback = (param) => param) {
  const routes = { [path]: callback };
  return useRouter(routes);
}
/**
 * Create a match function to manually compare route matches,
 * the instance of this hook listens for route changes
 * @example
 * ```js
 * const match = useRouteMatch();
 *
 * if(match("/")){
 *  console.log("in root")
 * }
 *
 * console.log(match("/:id"))
 * ```
 * @returns {(path:string)=>import("@uppercod/exp-route").Match}
 */
export function useRouteMatch() {
  const [state, setState] = useState(getPath);
  useEffect(() => listener(() => setState(getPath)), []);
  return (path) => getMatch(path)(state);
}

/**
 * @typedef {Object} InternalState
 * @property {string} [path]
 * @property {any} [result]
 */
