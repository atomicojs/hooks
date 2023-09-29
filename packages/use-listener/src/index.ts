import { Ref, DOMEvent, useState } from "atomico";
import { useRefValues } from "@atomico/use-ref-values";
import { useCurrentValue } from "@atomico/use-current-value";

export type HandlerEvent<
	Base extends Node,
	Name extends string,
> = `on${Name}` extends keyof Base
	? Base[`on${Name}`] extends (event: infer E) => void
		? E
		: Event
	: Name extends keyof GlobalEventHandlersEventMap
	? GlobalEventHandlersEventMap[Name]
	: Event;

export type Handler<Base extends Node, Name extends string> = (
	event: HandlerEvent<Base, Name>,
) => any;

export function useListener<Base extends Ref, Name extends string>(
	ref: Base,
	name: Name,
	handler: Handler<Base["current"], Name>,
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
export function addListener<Base extends Node, Name extends string>(
	current: Base,
	name: Name,
	handler: Handler<Base, Name>,
	options?: boolean | AddEventListenerOptions,
) {
	current.addEventListener(name, handler as EventListener, options);
	return () => current.removeEventListener(name, handler as EventListener);
}

export function useListenerState<Base extends Ref, Name extends string>(
	ref: Base,
	name: Name,
	handler: Handler<Base["current"], Name>,
	options?: boolean | AddEventListenerOptions,
): HandlerEvent<Base["current"], Name> | null {
	const [state, setState] = useState();
	useListener(ref, name, (event) => setState(handler(event)), options);
	return state;
}
