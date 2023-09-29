import { Ref } from "atomico";
import { Routes, RouterCallback } from "./matches.js";
export { redirect, getPath } from "./history.js";
import { Match, Params } from "@uppercod/exp-route";
export declare function useRouter<T>(routes: Routes): [T, string, Params, Params];
export declare function useRoute<T>(path: string, callback?: RouterCallback): [T, string, Params, Params];
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
 
 */
export declare function useRouteMatch(): (path: string) => Match;
/**
 * Capture the click events of a reference to find
 * if a node declares href to associate redirection
 
 */
export declare function useRedirect(ref: Ref<Element>, { proxy, composed, }?: {
    proxy?: (path: string) => string;
    composed?: boolean;
}): void;
