import { Ref, useState } from "atomico";
import { useParent } from "@atomico/use-parent";
import { useListener } from "@atomico/use-listener";
import { useRender } from "@atomico/use-render";

interface SubmitEvent {
	formData: FormData;
}

interface FormDataEvent {
	submitter: HTMLElement;
}

type FormHandler<T extends FormKeyofEvents> = (ev: FormEvents[T]) => any;

interface FormEvents {
	formdata: FormDataEvent & Event;
	submit: SubmitEvent & Event;
	reset: Event;
	change: Event;
	input: Event;
}

type FormKeyofEvents = keyof FormEvents;

export function useForm(): Ref<HTMLFormElement> {
	return useParent("form");
}

/**
 * Allows you to listen to the native events of the form
 */
export function useFormListener<T extends FormKeyofEvents>(
	name: T,
	handler: FormHandler<T>,
	options?: boolean | AddEventListenerOptions,
) {
	useListener(useForm(), name, handler, options);
}

export function useFormInputHidden(name: string, value: string) {
	const [slot] = useState(Math.random);
	useRender(
		() => (
			<input type="hidden" value={value} name={name} slot={`${slot}`} />
		),
		[name, value],
	);
}
