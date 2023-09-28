import { Ref, DOMEvent, useState } from "atomico";
import { useRefValues } from "@atomico/use-ref-values";
import { useCurrentValue } from "@atomico/use-current-value";

export function useListener(
	ref: Ref,
	name: string,
	handler: EventListener,
	options?: boolean | AddEventListenerOptions,
) {
	const value = useCurrentValue(handler);
	useRefValues(
		([current]) => {
			return addListener(
				current,
				name,
				(event) => value.current(event),
				options,
			);
		},
		[ref],
	);
}

/**
 * Associate an event and return a callback to remove said event
 */
export function addListener<
	T extends ChildNode | typeof window,
	E extends Event,
>(
	current: T,
	name: string,
	handler: (event: DOMEvent<T, E>) => any,
	options: boolean | AddEventListenerOptions,
) {
	current.addEventListener(name, handler, options);
	return () => current.removeEventListener(name, handler);
}

export function useListenerState<T>(
	ref: Ref,
	name: string,
	handler: (event: Event) => T,
	options: boolean | AddEventListenerOptions,
): T | null {
	const [state, setState] = useState();
	useListener(ref, name, (event) => setState(handler(event)), options);
	return state;
}
