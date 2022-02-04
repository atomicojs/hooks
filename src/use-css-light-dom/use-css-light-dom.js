import { useEffect, useHost } from "atomico";
import { getRules } from "./src/utils.js";

let ID = 0;
/**
 * Create a style collector to apply once the render is finished
 * @param {import("atomico").Sheet[]} sheets
 */
export function useCssLightDom(sheet) {
  const host = useHost();
  const { current } = host;

  if (!host.style) {
    host.style = document.createElement("style");
    if (!current.dataset.sheet) {
      current.dataset.sheet = ID++;
    }
    current.appendChild(host.style);
  }

  if (host.sheet != sheet) {
    getRules(
      sheet,
      current.localName + `[data-sheet="${current.dataset.sheet}"]`
    ).forEach((rule, index) => host.style.sheet.insertRule(rule, index));
  }

  useEffect(() => () => host.style.remove(), []);
}
