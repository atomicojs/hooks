import { useState, useEffect } from "atomico";
import { useCurrentValue } from "../use-current-value/use-current-value";
import { addListener } from "../use-listener/use-listener";

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
 * @returns {[any, import("../use-promise/use-promise").PromiseStatus]}
 */
export function useFormSubmitter(ref, options) {
  const currentOptions = useCurrentValue(options);
  /**
   * @type {import("atomico").UseState<[any, import("../use-promise/use-promise").PromiseStatus]>}
   */
  const [state, setState] = useState([null, ""]);

  useEffect(() => {
    const { current } = ref;
    let prevent;
    return addListener(current, "submit", async (event) => {
      /**
       * @type {Options}
       */
      const { action, request, submit, formData } = {
        ...defaultOptions,
        ...currentOptions.options,
      };

      event.preventDefault();

      if (prevent) return;
      prevent = true;

      setState([null, "pending"]);
      const data = await formData(current);

      try {
        setState([await submit(data, { action, request }), "fulfilled"]);
      } catch (error) {
        setState([error, "rejected"]);
      }
    });
  }, []);

  return state;
}

/**
 * @typedef {Object} Options
 * @property {string} action
 * @property {RequestInit} request
 * @property {(target: HTMLFormElement)=>any} [formData]
 * @property {(data: any, options: {action: string, request: RequestInit})=>any} submit
 */
