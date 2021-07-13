/**
 * allows you to listen to only one route
 * @param {import("./src/matches").Routes} routes
 */
export function useRouter(routes: import("./src/matches").Routes): any;
/**
 * allows you to listen to only one route
 * @param {string} path
 * @param {import("./src/matches").RouterCallback} callback
 */
export function useRoute(path: string, callback?: import("./src/matches").RouterCallback): any;
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
export function useRouteMatch(): (path: string) => import("@uppercod/exp-route").Match;
/**
 * Capture the click events of a reference to find
 * if a node declares href to associate redirection
 * @param {import("atomico").Ref<Element>} ref
 * @param {(path:string)=>string} [proxy] allows to change the redirect url
 */
export function useRedirect(ref: import("atomico").Ref<Element>, proxy?: ((path: string) => string) | undefined): void;
export type InternalState = {
    path?: string | undefined;
    result?: any;
};
export { redirect, getPath } from "./src/history.js";
