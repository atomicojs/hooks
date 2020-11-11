import { useState } from "atomico";

export function useForceRender() {
  const [count, setCount] = useState(0);
  return () => setCount(count + 1);
}
