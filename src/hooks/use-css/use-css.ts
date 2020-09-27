import { useEffect } from "atomico";
import { hash } from "./src/hash";
import { parse } from "./src/parse";

interface Scope {
  [id: string]: string[];
}

interface Style extends HTMLStyleElement {
  scopes: { [scope: string]: boolean };
}

interface Css {
  (template: string[], ...vars: any[]): string;
  ref?: {
    current: Style;
  };
}

const cache: Scope = {};

const createCss = (task: Scope): Css => (template, ...vars) => {
  const css = template
    .map((item, index) => item + (vars[index] || ""))
    .join("");
  const scope = "c" + hash(css);

  if (!cache[scope]) {
    cache[scope] = [];
    const nodes = parse(css);
    for (const id in nodes) {
      const rule = nodes[id];
      const atRule = /@/.test(rule.selector);
      const block: string = `${rule}`.replace(/\&/g, "." + scope);
      cache[scope].push(block);
    }
  }

  task[scope] = cache[scope];

  return scope;
};

export function useCss(): Css {
  const task: Scope = {};
  const css = createCss(task);
  useEffect(() => {
    const { current } = css.ref;
    if (!current.scopes) current.scopes = {};
    const { sheet, scopes } = current;
    for (const scope in task) {
      if (!scopes[scope]) {
        scopes[scope] = true;
        task[scope].forEach((rule) => {
          sheet.insertRule(rule, sheet.rules.length);
        });
      }
    }
  });
  return css;
}
