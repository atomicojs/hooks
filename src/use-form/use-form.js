import { useLayoutEffect, useState } from "atomico";
import { useParent } from "../use-parent/use-parent.js";
import { useListener } from "../use-listener/use-listener.js";

/**
 * Gets the top form
 * @returns {import("atomico").Ref<HTMLFormElement>}
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
 * @template {string|number|boolean|null} T
 * @param {string} name
 * @returns {T}
 */
export function useFormValue(name, defaultValue = null) {
  const ref = useForm();

  const checkField = () => {
    const { current } = ref;
    if (!current) return defaultValue;
    const target = current[name];
    return target ? target.value : defaultValue;
  };

  const [value, setValue] = useState(checkField);

  const check = () => setValue(checkField);

  useFormListener("input", check);
  useFormListener("change", check);
  useFormListener("reset", check);

  useLayoutEffect(check, []);

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
