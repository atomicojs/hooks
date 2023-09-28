import { useHost, useMemo, useEffect, options } from "atomico";

const host = <host />;

const IdUseRender = Symbol.for("Atomico.useRender");

const props = {
	[IdUseRender]: true,
};
/**
 * Ensures that the render function always
 * receives a tree that starts from the host tag
 */
function fillHost(vdom?: any) {
	if (vdom && typeof vdom == "object") {
		return vdom.type == "host" ? (
			{
				...vdom,
				props: {
					...props,
					...vdom.props,
				},
			}
		) : (
			<host {...props}>{vdom}</host>
		);
	}
	return host;
}
/**
 * Generate a second render, this render escapes the current
 * one and is useful for collaborative work between LightDOM and shadowDOM
 */
export function useRender(callback: () => any, args?: any[]) {
	const host = useHost();
	host.id = host.id || Symbol();
	useMemo(
		() =>
			!options.ssr && fillHost(callback()).render(host.current, host.id),
		args,
	);
	// Clean nodes in case of recycling
	useEffect(() => () => fillHost().render(host.current, host.id), []);
}
