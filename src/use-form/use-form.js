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
 * @tempalte {import("./internal").KeyFormEvents} T
 * @param {T} name
 * @param {import("./internal").Handler<T>} handler
 * * @param {boolean|AddEventListenerOptions} [options]
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
