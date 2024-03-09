import { useListener } from "@atomico/use-listener";
import { useParent } from "@atomico/use-parent";
import { useRender } from "@atomico/use-render";
import { Ref, useState } from "atomico";

interface SubmitEvent {
	formData: FormData;
}

interface FormDataEvent {
	submitter: HTMLElement;
}

type FormHandler<T extends FormKeyofEvents> = (
	ev: Omit<FormEvents[T], "currentTarget"> & {
		currentTarget: HTMLFormElement;
	},
) => any;

interface FormEvents {
	formdata: FormDataEvent & Event;
	submit: SubmitEvent & Event;
	reset: Event;
	change: Event;
	input: Event;
}

type FormKeyofEvents = keyof FormEvents;

export function useForm(): Ref<HTMLFormElement> {
	return useParent<HTMLFormElement>("form");
}

/**
 * Allows you to listen to the native events of the form
 */
export function useFormListener<T extends FormKeyofEvents>(
	name: T,
	handler: FormHandler<T>,
	options?: boolean | AddEventListenerOptions,
) {
	useListener(useForm(), name as string, handler as any, options);
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
