import { HostContext, h, useHost, useState } from "atomico";

const selectedChild = Symbol();

function loadChildNodes(current: HTMLElement & HostContext): ChildNode[] {
  const { symbolId } = current;
  const currentChildren: ChildNode[] = [];
  current.childNodes.forEach((node: ChildNode) => {
    if (!node[symbolId]) {
      if (!node[symbolId] || node[selectedChild]) {
        node[selectedChild] = true;
        currentChildren.push(node);
      }
    }
  });
  return currentChildren;
}

export function useChildNodes(): [ChildNode[], () => void] {
  const { current } = useHost();
  const update = () => loadChildNodes(current);
  const [childNodes, setChildNodes] = useState(update);
  return [childNodes, () => setChildNodes(update)];
}
