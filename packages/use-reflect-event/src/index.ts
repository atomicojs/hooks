import { Ref } from "atomico";
import { useListener } from "@atomico/use-listener";

/**
 * reflects an event to another node
 */
export const reflectEvent = (
	current: Element,
	event: Event,
	composed?: boolean,
) => {
	const { currentTarget } = event;
	const { shadowRoot } = currentTarget as HTMLElement;
	const path = event.composedPath();

	if (path.includes(current)) return;

	const index = path.indexOf(currentTarget);
	const insetShadowRoot = path
		.slice(0, index)
		.find((el) => el instanceof ShadowRoot);

	if (!composed && insetShadowRoot !== shadowRoot) return;

	event.preventDefault();
	event.stopImmediatePropagation();
	//@ts-ignore
	current.dispatchEvent(new event.constructor(event.type, event));
};
/**
 * This hook reflects an event and cancels its propagation
 */
export function useReflectEvent(
	refFrom: Ref,
	refTo: Ref,
	type: string,
	{
		capture = true,
		composed = true,
	}: { capture?: boolean; composed?: boolean } = {},
) {
	useListener(
		refFrom,
		type,
		(event) => {
			const { current } = refTo;
			current && reflectEvent(current, event as any, composed);
		},
		{ capture },
	);
}
