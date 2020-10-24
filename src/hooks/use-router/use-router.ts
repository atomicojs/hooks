import { useState, useEffect } from "atomico";
import { getPath, listener } from "./src/history";
import { Routes, RouteCallback, matches } from "./src/matches";
export { redirect } from "./src/history";

export function useRouter(routes: Routes) {
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

export function useRoute(
  path: string,
  callback: RouteCallback = (param) => param
) {
  const routes: Routes = { [path]: callback };
  return useRouter(routes);
}
