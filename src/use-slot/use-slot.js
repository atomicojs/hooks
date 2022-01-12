import { useState, useEffect, Mark } from "atomico";
import { addListener } from "../use-listener/use-listener.js";
/**
 *
 * @param {import("atomico").Ref<HTMLSlotElement>} ref
 * @returns {ChildNode[]}
 */
export function useSlot(ref) {
  const [childNodes, setChildNodes] = useState([]);

  useEffect(() => {
    const { current } = ref;
    if (!current) return;
    // handler subscriber to the event
    const handler = () =>
      setChildNodes(
        current.assignedNodes().filter((child) => !(child instanceof Mark))
      );
    // First load
    handler();
    // listener and unlistener
    return addListener(current, "slotchange", handler);
  }, []);

  return childNodes;
}
