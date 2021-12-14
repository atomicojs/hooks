import { useLayoutEffect, useState, useHost } from "atomico";
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
 * @param {string} name
 * @returns {[FormDataEntryValue,(value:any)=>void]}
 */
export function useFormValue(name) {
  const ref = useForm();

  const host = useHost();

  const checkField = () => {
    const { current } = ref;
    if (!current) return;
    return new FormData(current).get(name);
  };

  const [value, setValue] = useState(checkField);

  const check = () => {
    setValue(checkField);
  };

  const setFormValue = (value) => {
    if (!ref.current) return;
    if (!host.input) {
      host.input = document.createElement("input");
      host.input.type = "hidden";
      host.input.name = name;
      host.current.appendChild(host.input);
    }
    host.input.value = value;
  };

  // create a task to read from after the form clears its state
  useFormListener("reset", () => Promise.resolve().then(check));
  useFormListener("change", check);

  useLayoutEffect(check, [name]);

  return [value, setFormValue];
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
