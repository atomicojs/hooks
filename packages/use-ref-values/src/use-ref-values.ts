import { Ref, useEffect, useRef, useLayoutEffect } from "atomico";

type Args<E extends Ref[]> = {
	[I in keyof E]: E[I]["current"];
};

type Collector = void | (() => any);

export function useRefValues<T extends Ref[]>(
	callback: (args: Args<T>) => Collector,
	args: T,
	mode: boolean,
) {
	const { current } = useRef<{
		values: Args<T>;
		mode: boolean;
		collector?: Collector;
	}>({ values: [] as Args<T>, mode });

	const clean = () => {
		if (typeof current.collector === "function") {
			current.collector();
			delete current.collector;
		}
	};

	const effect = current.mode ? useEffect : useLayoutEffect;

	effect(() => clean, []);

	effect(() => {
		const oldValues = current.values;
		const values = args.map((ref) => ref.current) as Args<T>;
		const withDiff = values.some((value, i) => value !== oldValues[i]);

		if (withDiff) {
			clean();
			if (
				values.filter((value) => value != null).length === args.length
			) {
				current.collector = callback(values);
			}
		}

		current.values = values;
	});
}
