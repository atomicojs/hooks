import { useState } from "atomico";
/**
 * Force rendering
 */
export function useForceRender() {
  const [, setCount] = useState(0);
  return () => {
    setCount((count) => count + 1);
  };
}
