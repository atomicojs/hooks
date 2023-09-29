/// <reference types="@uppercod/exp-route" />
export { redirect, getPath } from "./history.js";
/**
 * @template T
 * allows you to listen to only one route
 * @param {import("./src/matches").Routes} routes
 * @returns {[T, StringPath, ParamsPath, SearchPath]}
 */
export declare function useRouter(routes: any): any;
/**
 * @template T
 * allows you to listen to only one route
 * @param {string} path
 * @param {import("./src/matches").RouterCallback} [callback]
 * @returns {[T, StringPath, ParamsPath, SearchPath]}
 */
export declare function useRoute(path: any, callback?: (param: any) => any): any;
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
export declare function useRouteMatch(): (path: any) => import("@uppercod/exp-route").Params;
/**
 * Capture the click events of a reference to find
 * if a node declares href to associate redirection
 * @param {import("atomico").Ref<Element>} ref
 * @param {{proxy?:(path:string)=>string, composed?:boolean}} [options] allows to change the redirect url
 */
export declare function useRedirect(ref: any, { proxy, composed }?: {
    proxy: any;
    composed?: boolean;
}): void;
/**
 * @typedef {Object} InternalState
 * @property {string} [path]
 * @property {any} [result]
 */
/**
 * @typedef {string} StringPath
 */
/**
 * @typedef {Object<string,string>} ParamsPath
 */
/**
 * @typedef {Object<string,string>} SearchPath
 */
