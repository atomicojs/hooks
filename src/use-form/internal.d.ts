interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

interface FormDataEvent extends Event {
  formData: FormData;
}

export interface FormEvents {
  submit: SubmitEvent;
  reset: Event;
  formdata: FormDataEvent;
  change: Event;
  input: Event;
}

export type KeyFormEvents = keyof FormEvents;

export type Handler<T extends KeyFormEvents> = (ev: FormEvents[T]) => any;
