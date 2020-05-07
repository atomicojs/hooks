import { useHost } from "atomico";

export function useMethod(name, callback) {
  let { current } = useHost();
  if (!current[name]) {
    let method = (...args) => method._(...args);
    current[name] = method;
  }
  current._ = callback;
  return current[name];
}
