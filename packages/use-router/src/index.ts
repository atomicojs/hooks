import { Ref, useState, useEffect } from "atomico";
import { getPath, listener, redirect } from "./history.js";
import { Routes, matches, getMatch, RouterCallback } from "./matches.js";
export { redirect, getPath } from "./history.js";
import { useListener } from "@atomico/use-listener";
import { useCurrentValue } from "@atomico/use-current-value";
import { Match, Params } from "@uppercod/exp-route";

const DefaultState = {};

export function useRouter<T>(routes: Routes): [T, string, Params, Params] {
	const [state, setState] = useState<{
		path?: string;
		result?: any;
	}>(DefaultState);
	const refRoutes = useCurrentValue(routes);

	useEffect(() => {
		// Returns to the default state to recycle the routes object
		setState(DefaultState);

		const reduce = () => {
			setState((current) => {
				const path = getPath();
				return current.path != path
					? {
							path,
							result: matches(refRoutes.current, path),
					  }
					: current;
			});
		};

		reduce();

		return listener(reduce);
	}, Object.keys(routes));

	return state.result || [];
}

export function useRoute<T>(
	path: string,
	callback: RouterCallback = (param) => param,
): [T, string, Params, Params] {
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
 
 */
export function useRouteMatch(): (path: string) => Match {
	const [state, setState] = useState(getPath);
	useEffect(() => listener(() => setState(getPath)), []);
	// @ts-ignore
	return (path) => getMatch(path)(state);
}

/**
 * Capture the click events of a reference to find
 * if a node declares href to associate redirection
 
 */
export function useRedirect(
	ref: Ref<Element>,
	{
		proxy,
		composed = true,
	}: { proxy?: (path: string) => string; composed?: boolean } = {},
) {
	useListener(
		ref,
		"click",
		(event) => {
			const { current } = ref;
			const { shadowRoot } = current;

			const path = event.composedPath();

			const index = path.indexOf(current);

			const insetShadowRoot = path
				.slice(0, index)
				.find((el) => el instanceof ShadowRoot);

			if (!composed && insetShadowRoot !== shadowRoot) return;

			let target;

			while ((target = path.shift())) {
				if (
					target.hasAttribute &&
					target.hasAttribute("href") &&
					!target.hasAttribute("ignore")
				) {
					const href = target.getAttribute("href");
					if (
						!target.hasAttribute("target") &&
						!/^(http(s){0,1}:){0,1}\/\//.test(href)
					) {
						event.preventDefault();
						redirect(proxy ? proxy(href) : href);
					}
					break;
				}
			}
		},
		{ capture: true },
	);
}
