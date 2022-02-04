import { useHost, useLayoutEffect } from "atomico";
import { getRules } from "./src/utils.js";

let ID = 0;
/**
 * Create a style collector to apply once the render is finished
 * @param {import("atomico").Sheet} sheet
 */
export function useCssLightDom(sheet) {
  const host = useHost();

  useLayoutEffect(() => {
    const style = document.createElement("style");

    const { current } = host;

    if (!current.dataset.sheet) {
      current.dataset.sheet = ID++;
    }

    current.appendChild(style);

    getRules(
      sheet,
      current.localName + `[data-sheet="${current.dataset.sheet}"]`
    ).forEach((rule, index) => style.sheet.insertRule(rule, index));

    return () => style.remove();
  }, [sheet]);
}
