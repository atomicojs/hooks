import { useHost, useInsertionEffect, render } from "atomico";
/**
 * Ensures that the render function always
 * receives a tree that starts from the host tag
 */
const fillHost = (vnode?: any) =>
	vnode && vnode.type === "host" ? vnode : <host>{vnode}</host>;

/**
 * Generate a second render, this render escapes the current
 * one and is useful for collaborative work between LightDOM and shadowDOM
 */
export function useRender(callback: () => any, args: any[] = []) {
	const host = useHost();

	host.id = host.id || Symbol();

	useInsertionEffect(() => {
		render(fillHost(callback), host.current, host.id);
	}, args);
}
