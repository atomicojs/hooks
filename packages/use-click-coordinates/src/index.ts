import { Ref } from "atomico";
import { useCurrentValue } from "@atomico/use-current-value";
import { useListener } from "@atomico/use-listener";

interface Coordinates {
	x: number;
	y: number;
	offset: { x: number; y: number };
}

export function useClickCoordinates(
	ref: Ref,
	callback: (coordinates: Coordinates) => void,
) {
	const value = useCurrentValue(callback);
	useListener(ref, "click", (event) => {
		const coordinates = getCoordinates(event);
		coordinates && value.current(coordinates);
	});
}

export function getCoordinates({
	pageX: x,
	pageY: y,
	currentTarget,
}: {
	pageX: number;
	pageY: number;
	currentTarget: Element | null;
}): Coordinates {
	const rect = currentTarget.getBoundingClientRect();

	return {
		x,
		y,
		offset: {
			x: x - rect.left,
			y: y - rect.top,
		},
	};
}
