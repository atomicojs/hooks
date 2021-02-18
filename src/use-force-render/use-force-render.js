import { useState } from "atomico";
/**
 * Force rendering
 */
export function useForceRender() {
  const [count, setCount] = useState(0);
  return () => void setCount(count + 1);
}
