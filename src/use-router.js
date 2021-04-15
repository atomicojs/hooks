import { useState, useEffect } from "atomico";
import { getPath, listener } from "./use-router/history.js";
import { matches } from "./use-router/matches.js";
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
 * @typedef {Object} InternalState
 * @property {string} [path]
 * @property {any} [result]
 */
