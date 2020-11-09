import { useHost, useEffect } from "atomico";
/**
 * @todo test
 * @todo fix type any
 **/
interface GCSSStyleSheet extends CSSStyleSheet {
  replace?: (css: string) => void;
}

interface Sheets {
  [css: string]: GCSSStyleSheet;
}

const sheets: Sheets = {};

const refStyle = Symbol();

export function css(values: any, ...args: (string | number)[]) {
  const ref = useHost();
  const css = Array.isArray(values)
    ? values.map((value, index) => value + (args[index] || "")).join("")
    : values;
  useEffect(() => setSheet(ref.current, css), [css]);
}

function setSheet(parent: HTMLElement, css: string | GCSSStyleSheet) {
  if (!parent.shadowRoot) return;
  const { shadowRoot } = parent as any;
  if (shadowRoot.adoptedStyleSheets) {
    let sheet: CSSStyleSheet;

    if (css instanceof CSSStyleSheet) {
      sheet = css;
    } else {
      if (!sheets[css]) {
        sheets[css] = new CSSStyleSheet();
        sheets[css].replace(css);
      }
      sheet = sheets[css];
    }
    addSheet(shadowRoot, sheet);
  } else {
    shadowRoot[refStyle] =
      shadowRoot[refStyle] ||
      shadowRoot.appendChild(document.createElement("style"));
    if (shadowRoot[refStyle].textContent.indexOf(css) == -1) {
      shadowRoot[refStyle].textContent += css;
    }
  }
}

function addSheet(
  shadowRoot: ShadowRoot & { adoptedStyleSheets: CSSStyleSheet[] },
  sheet: CSSStyleSheet
) {
  const { adoptedStyleSheets } = shadowRoot;
  if (!adoptedStyleSheets.includes(sheet)) {
    shadowRoot.adoptedStyleSheets = adoptedStyleSheets.concat(sheet);
  }
}
