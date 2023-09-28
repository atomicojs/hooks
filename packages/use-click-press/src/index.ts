import { Ref, useRef } from "atomico";
import { useListener } from "@atomico/use-listener";

/**
 * Capture the click or touch event to execute the callback multiple times,
 * depending on the type of pressure
 */
export function useClickPress(
	ref: Ref,
	callback: () => any,
	aceleration = 0.9,
	minMs = 24,
) {
	const ctx = useRef();

	const isEventIsTouches = (event: Event) => event.type.startsWith("touch");

	const handlerStart = (event: Event) => {
		let isTouches = isEventIsTouches(event);

		if (isTouches) ctx.touches = true;

		if (!ctx.current && (ctx.touches ? isTouches : true)) {
			ctx.current = true;
			const loop = (ms: number) => {
				ms = minMs > ms ? minMs : ms;
				if (ctx.current) {
					ctx.timeout = setTimeout(() => {
						if (ctx.current) {
							callback();
							loop(ms * aceleration);
						}
					}, ms);
				}
			};
			loop(200);
		}
	};

	const handlerStop = (event: Event) => {
		let isTouches = isEventIsTouches(event);
		if (ctx.touches && !isTouches) return;

		if (ctx.timeout && ctx.current) {
			clearInterval(ctx.timeout);
			callback();
		}

		ctx.current = false;
	};

	useListener(ref, "mousedown", handlerStart);
	useListener(ref, "touchstart", handlerStart);

	useListener(
		ref,
		"keydown",
		(event: KeyboardEvent) => event.code === "Space" && handlerStart(event),
	);

	useListener(ref, "mouseup", handlerStop);
	useListener(ref, "mouseleave", handlerStop);
	useListener(ref, "touchend", handlerStop);
	useListener(ref, "touchmove", handlerStop);

	useListener(ref, "keyup", (event: KeyboardEvent) => handlerStop(event));
}
