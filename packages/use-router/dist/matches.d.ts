import { Match, Params } from "@uppercod/exp-route";
type RouterCallback = (params: Params, search: Params) => any;
type Routes = {
    [path: string]: RouterCallback;
};
export declare const getMatch: (path: string) => Match;
export declare const matches: (routes: Routes, currentPath: string) => any[];
export {};
