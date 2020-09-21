import { useHost } from 'atomico';

/**
 * Define a customProperty on the host that declares this hook
 * @param {string} name
 * @param {string} value
 */
function useCustomProperty(name, value) {
  let ref = useHost();
  if (ref[name] != value) {
    ref.current.style.setProperty("--" + name, value);
    ref[name] = value;
  }
}

export { useCustomProperty };
