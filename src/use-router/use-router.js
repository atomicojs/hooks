import { useState, useEffect } from "atomico";
import { getPath, listener } from "./src/history.js";
import { matches } from "./src/matches.js";
export { redirect } from "./src/history.js";

/**@type {InternalState} */
const DefaultState = {};

/**
 *
 * @param {import("./src/matches").Routes} routes
 */
export function useRouter(routes) {
  const [state, setState] = useState(DefaultState);

  useEffect(() => {
    if (!routes) return;

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
 * @param {import("./src/matches").RouterCallback} callback
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
