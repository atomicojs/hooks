import { useState } from "atomico";

function useForceRender() {
  const [count, setCount] = useState(0);
  return () => setCount(count + 1);
}
