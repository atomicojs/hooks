import { useState, useEffect, Mark } from "atomico";
/**
 *
 * @param {import("atomico").Ref<HTMLSlotElement>} ref
 */
export function useSlot(ref) {
  const [childNodes, setChildNodes] = useState([]);

  useEffect(() => {
    const { current } = ref;
    const type = "slotchange";

    // handler subscriber to the event
    const handler = () =>
      setChildNodes(
        current.assignedNodes().filter((child) => !(child instanceof Mark))
      );
    // First load
    handler();
    // listener and unlistener
    current.addEventListener(type, handler);
    return () => current.removeEventListener(type, handler);
  }, []);

  return childNodes;
}
