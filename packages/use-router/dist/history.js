import { addListener } from "@atomico/use-listener";
/**
 * @param {string} url
 * @param {string} [title]
 */
export function redirect(path, title = path) {
    if (history.state?.path === path)
        return;
    history.pushState({ path }, title, path);
    window.dispatchEvent(new PopStateEvent("popstate"));
}
/**
 *
 * @param {(ev: PopStateEvent) => void} handler
 */
export const listener = (handler) => addListener(window, "popstate", handler);
export const getPath = () => location.pathname + location.hash + location.search;
