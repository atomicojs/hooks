export function redirect(url: string) {
  history.pushState({}, "history", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function listener(handler: (ev: PopStateEvent) => void) {
  window.addEventListener("popstate", handler);
  return () => window.removeEventListener("popstate", handler);
}

export const getPath = () =>
  location.pathname + location.hash + location.search;
