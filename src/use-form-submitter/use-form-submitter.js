import { useState, useEffect } from "atomico";
import { useCurrentValue } from "../use-current-value/use-current-value";
import { addListener } from "../use-listener/use-listener";
export { formToObject } from "@uppercod/form-tools";
/**
 * @type {Options}
 */
const defaultOptions = {
  action: "",
  request: { method: "POST", credentials: "same-origin" },
  submit: (body, { action, request }) =>
    fetch(action, { ...request, body }).then((res) => res.json()),
  formData: (target) => new FormData(target),
};

/**
 * Capture the submit of a form for submission
 * @param {import("atomico").Ref<HTMLFormElement>} ref
 * @param {Options} options
 * @returns {[any, import("../use-promise/use-promise").PromiseStatus,()=>void]}
 */
export function useFormSubmitter(ref, options) {
  const currentOptions = useCurrentValue(options);
  /**
   * @type {import("atomico").UseState<[any, import("../use-promise/use-promise").PromiseStatus]>}
   */
  const [state, setState] = useState([null, ""]);

  async function submit(event) {
    if (event instanceof Event) {
      event.preventDefault();
    }
    const { current } = ref;
    /**
     * @type {Options}
     */
    const { action, request, submit, formData } = {
      ...defaultOptions,
      ...{
        action: current.getAttribute("action"),
      },
      ...currentOptions.current,
    };

    if (currentOptions.prevent) return;
    currentOptions.prevent = true;

    setState([null, "pending"]);
    const data = await formData(current);
    try {
      setState([await submit(data, { action, request }), "fulfilled"]);
    } catch (error) {
      setState([error, "rejected"]);
    }
    currentOptions.prevent = false;
  }

  useEffect(() => {
    const { current } = ref;
    return addListener(current, "submit", submit);
  }, []);

  return [...state, submit];
}

/**
 * @typedef {Object} Options
 * @property {string} action
 * @property {RequestInit} request
 * @property {(target: HTMLFormElement)=>any} [formData]
 * @property {(data: any, options: {action: string, request: RequestInit})=>any} submit
 */
