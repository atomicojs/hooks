export interface Params {
  [param: string]: string;
}

export type RouteCallback<R = any> = (params: Params, search: Params) => R;

export interface Routes {
  [path: string]: RouteCallback;
}

export type Result<T> = [T, string, Params, Params];

export function redirect(path: string): void;

export function useRouter<T = any>(routes: Routes): Result<T>;
export function useRoute<T = any>(
  path: string,
  callback?: RouteCallback<T>
): Result<T>;
