import { Ref, useRef } from "atomico";

export function useCurrentValue<Value>(value: Value): Ref<Value> {
	const ref = useRef();
	ref.current = value;
	return ref;
}
