import { useRef, useState } from "atomico";
import { useParent } from "../use-parent/use-parent.js";
import { useListener } from "../use-listener/use-listener";

/**
 * Gets the top form
 * @returns {{current?:HTMLForm}}
 */
export function useForm() {
  return useParent("form");
}

/**
 * Allows you to listen to the native events of the form
 * @template {keyof FormEvents} T
 * @param {T} name
 * @param {FormHandler<T>} handler
 * @param {boolean|AddEventListenerOptions} [options]
 */
export function useFormListener(name, handler, options) {
  useListener(useForm(), name, handler, options);
}

/**
 * It allows observing the status of a value associated with a form field
 * @param {string} name
 * @returns {string|number|boolean|null}
 */
export function useFormValue(name) {
  const ref = useForm();

  const checkField = () => {
    const target = ref.current[name];
    return target ? target.value : null;
  };

  const [value, setValue] = useState(checkField);

  useFormListener("change", () => setValue(checkField));
  useFormListener("reset", () => setValue(checkField));

  return value;
}

/**
 * @typedef SubmitEvent
 * @property {FormData} formData
 */

/**
 * @typedef FormDataEvent
 * @property {HTMLElement} submitter
 */

/**
 * @typedef FormEvents
 * @property {FormDataEvent & Event} formdata
 * @property {SubmitEvent & Event} submit
 * @property {Event} reset
 * @property {Event} change
 * @property {Event} input
 */

/**
 * @template {keyof FormEvents} T
 * @typedef {(ev:FormEvents[T])=>any} FormHandler
 */
