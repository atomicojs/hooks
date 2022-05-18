import { useEffect, useState } from "atomico";
import media from "@uppercod/match-media";

/**
 * @type {{[index:string]:MediaQueryList}}
 */
const CACHE = {};

/**
 * @param {import("@uppercod/match-media").Result} result
 */
const getId = ({ size, unit }) => `(min-width: ${size}${unit})`;

export function useResponsiveState(part, ...args) {
  /**@type {ReturnType<typeof media>} */
  let template;

  if (typeof part === "string") {
    if (!CACHE[part]) {
      CACHE[part] = media.call(null, { raw: [part] });
    }
    template = CACHE[part];
  } else if (part) {
    template = media.call(null, part, ...args);
  }

  const check = () =>
    template.match((result) => {
      const id = getId(result);

      CACHE[id] = CACHE[id] || matchMedia(id);

      return CACHE[id].matches;
    });

  const [value, setValue] = useState(check);

  useEffect(() => {
    const unlisteners = template.result
      .filter((result) => !result.default)
      .map((result) => {
        const id = getId(result);
        CACHE[id] = CACHE[id] || matchMedia(id);
        const eventType = "change";
        const eventHandler = () => {
          setValue(check);
        };
        CACHE[id].addEventListener(eventType, eventHandler);
        return () => {
          CACHE[id].removeEventListener(eventType, eventHandler);
        };
      });

    return () => unlisteners.forEach((fn) => fn());
  }, [template.result]);

  return value;
}
