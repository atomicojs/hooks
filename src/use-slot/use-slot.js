import { useState, useEffect, Mark, useHost } from "atomico";
import { addListener } from "../use-listener/use-listener.js";

/**
 * returns the assigned nodes of a slot
 * @template {ChildNode} T
 * @param {import("atomico").Ref<HTMLSlotElement>} ref
 * @returns {T[]}
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

/**
 * creates a persistent list of nodes from a source with the intention of
 * keeping the node in the list as long as it remains on the host
 * @template {ChildNode} T
 * @param {import("atomico").Ref<HTMLSlotElement>} ref
 * @returns {T[]}
 */
export function useProxySlot(ref) {
  const host = useHost();
  const children = useSlot(ref);
  const [currentChildren, setCurrentChildren] = useState(children);

  useEffect(() => {
    if (!children.length) return;

    const { current } = host;
    const intoHost = (node) => node.parentElement === current;

    const group = [...currentChildren, ...children].filter(intoHost);

    const slots = group.reduce(
      (slots, el) =>
        el.assignedSlot === ref.current
          ? slots
          : slots.includes(el.assignedSlot)
          ? slots
          : [...slots, el.assignedSlot],
      []
    );

    const unlisteners = slots.map((slot) =>
      addListener(slot, "slotchange", (event) => {
        setCurrentChildren((children) => {
          const next = children.filter(intoHost);
          if (children.length === next.length) return children;
          return next;
        });
      })
    );

    setCurrentChildren(group);

    return () => unlisteners.map((unlistener) => unlistener());
  }, children);

  return currentChildren;
}
