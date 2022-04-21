import { useHost, useLayoutEffect } from "atomico";
import { getSheet } from "@atomico/design-tokens";
import { getRules } from "./src/utils.js";

let ID = 0;
/**
 * Create a style collector to apply once the render is finished
 * @param {import("atomico").Sheets} sheet
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

    if (style.sheet) {
      (Array.isArray(sheet) ? sheet.flat(100) : [sheet]).forEach((target) => {
        if (!target) return;

        const sheet = getSheet(target);

        getRules(
          sheet,
          current.localName + `[data-sheet="${current.dataset.sheet}"]`
        ).forEach((rule) =>
          style.sheet.insertRule(rule, style.sheet.cssRules.length)
        );
      });
    }
    return () => style.remove();
  }, [sheet]);
}
