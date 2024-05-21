export function redirect(path: string, title = path): void {
	if (history.state?.path === path) return;
	history.pushState({ path }, title, path);
	globalThis.dispatchEvent(new PopStateEvent("popstate"));
}

export const getPath = (): string =>
	location.pathname + location.hash + location.search;
