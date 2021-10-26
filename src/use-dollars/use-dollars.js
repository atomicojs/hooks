import { useHost, useEffect } from "atomico";
import { useSlot } from "../use-slot/use-slot";
import { State, Host } from "dollars.js";

class AtomicoState extends State {
  init(state) {
    return state;
  }
}

export function useDollars(ref, config = { prefix: "$" }) {
  const childNodes = useSlot(ref);
  const host = useHost();

  useEffect(() => {
    ref.states = childNodes
      .filter((el) => el instanceof Element)
      .map((element) => {
        const state = new AtomicoState(host.current);
        const isTemplate = element instanceof HTMLTemplateElement;
        new Host(isTemplate ? element.content : element, state, config);
        if (isTemplate)
          element.parentElement.insertBefore(element.content, element);
        return state;
      });
  }, childNodes);

  useEffect(() => ref?.states?.forEach((state) => state.update()));

  return ref;
}
