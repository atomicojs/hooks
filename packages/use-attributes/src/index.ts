import { useHost, useState } from "atomico";
import { AtomicoStatic } from "atomico/types/dom";
import { useMutationObserver } from "@atomico/use-mutation-observer";

const getProp = (value: string) =>
	value.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());

interface Attrs {
	[prop: string]: string;
}

const mapAttributes = (element: HTMLElement) => {
	const { constructor } = element as HTMLElement & {
		constructor: AtomicoStatic<any>;
	};

	const props = constructor.props || {};

	const attrs: Attrs = {};

	return Object.values(element.attributes).reduce((attrs, attr) => {
		const prop = getProp(attr.name);
		if (!(prop in props)) attrs[prop] = attr.value;
		return attrs;
	}, attrs);
};

export function useAttributes() {
	const host = useHost();
	const setAttributes = () => mapAttributes(host.current);
	const [state, setState] = useState(setAttributes);

	useMutationObserver(host, () => setState(setAttributes), {
		attributes: true,
	});

	return state;
}
