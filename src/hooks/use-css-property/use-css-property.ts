import { Ref, useState, useEffect } from "atomico";
import { getPropertyValue } from "./src/custom-property";

export function useCssProperty(ref: Ref<Element>, property: string) {
  const [state, setState] = useState("");
  useEffect(() => {
    const { current } = ref;
    setState(getPropertyValue(current, property, false).value);
  });
  return state;
}
