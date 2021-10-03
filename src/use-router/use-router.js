import { useState, useEffect } from "atomico";
import { getPath, listener } from "./src/history.js";
import { matches, getMatch } from "./src/matches.js";
export { redirect, getPath } from "./src/history.js";
import { addListener } from "../use-listener/use-listener";

/**@type {InternalState} */
const DefaultState = {};

/**
 * allows you to listen to only one route
 * @param {import("./src/matches").Routes} routes
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
 * allows you to listen to only one route
 * @param {string} path
 * @param {import("./src/matches").RouterCallback} callback
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
 * Capture the click events of a reference to find
 * if a node declares href to associate redirection
 * @param {import("atomico").Ref<Element>} ref
 * @param {(path:string)=>string} [proxy] allows to change the redirect url
 */
export function useRedirect(ref, proxy) {
  useEffect(() => {
    const { current } = ref;
    const handler = (ev) => {
      let { target } = ev;
      do {
        if (
          target.hasAttribute &&
          target.hasAttribute("href") &&
          !target.hasAttribute("ignore")
        ) {
          ev.preventDefault();
          const href = target.getAttribute("href");
          if (!/^(http(s){0,1}:){0,1}\/\//.test(href))
            redirect(proxy ? proxy(href) : href);
          break;
        }
      } while ((target = target.parentNode));
    };
    return addListener(current, "click", handler);
  }, [ref]);
}

/**
 * @typedef {Object} InternalState
 * @property {string} [path]
 * @property {any} [result]
 */
