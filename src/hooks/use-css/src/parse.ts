import { cssToObject, CSSObjectFill } from "@uppercod/css-to-object";

const addRule = (
  list: string[],
  selector: string,
  decl: string,
  unshift?: boolean
) => list[unshift ? "unshift" : "push"](selector + `{${decl}}`);

function stringify(
  rules: CSSObjectFill,
  parent: string = "",
  rootRules: string[] = []
): [string[], string] {
  let decl = "";
  for (const prop in rules) {
    const content = rules[prop];
    const selector = prop.trim();
    if (typeof content == "object") {
      if (selector[0] == "@") {
        const [childRules, decl] = stringify(content, parent || selector);
        addRule(childRules, parent, decl);
        addRule(rootRules, selector, childRules.join(""));
      } else {
        const nextSelector =
          (parent || "") +
          (selector[0] == "&"
            ? selector.slice(1)
            : (parent ? " " : "") + selector);

        const [, decl] = stringify(content, nextSelector, rootRules);

        addRule(rootRules, nextSelector, decl, true);
      }
    } else {
      decl += selector + ":" + content + ";";
    }
  }
  return [rootRules, decl];
}

export function parse(css: string): string[] {
  const [rules] = stringify(cssToObject(css));
  return rules;
}
