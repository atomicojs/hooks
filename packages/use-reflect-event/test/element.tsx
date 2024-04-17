import { c, useRef } from "atomico";
import { useReflectEvent } from "../src";

export const Element = c(() => {
	const ref1 = useRef();
	const ref2 = useRef();
	useReflectEvent(ref1, ref2, "click");
	return (
		<host>
			<button ref={ref1}>1</button>
			<button ref={ref2}>2</button>
		</host>
	);
});

customElements.define("test-element-use-reflect-event-1", Element);
