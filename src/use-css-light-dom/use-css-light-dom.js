import { useHost, useLayoutEffect, useState } from "atomico";
import { cssToObject } from "@uppercod/css-to-object";

let count = 0;
/**
 * Create a style collector to apply once the render is finished
 * @returns {(template:TemplateStringsArray|string,...args:string[])=>string}
 */
export function useCssLightDom() {
  const host = useHost();
  const [styles] = useState(() => {
    host.style = host.current.appendChild(document.createElement("style"));
    host.id = `S` + count++;
    return [];
  });

  useLayoutEffect(() =>
    styles
      .map((style, index) =>
        serialize(cssToObject(style)).map((rule) =>
          rule.replace(
            /:host/g,
            host.current.localName + " ." + host.id + index
          )
        )
      )
      .flat()
      .forEach((rule, index) => host.style.sheet.insertRule(rule, index))
  );

  return (template, ...args) => {
    const content =
      typeof template == "string"
        ? template
        : template.reduce((part, index) => part + (args[index] || ""));
    const iid = styles.indexOf(content);
    return host.id + (~iid ? iid : styles.push(content) - 1);
  };
}

/**
 * CSS ruler template
 * @param {string} selector
 * @param {string} content
 */
const rule = (selector, content) => `${selector}{${content}}`;
/**
 * Serializes the rules of an object and returns them in list
 * @param {any} json
 * @returns {string[]}
 */
function serialize(json, rules = [], parent = "") {
  const decl = [];
  for (const prop in json) {
    if (typeof json[prop] == "object") {
      const isAtRule = /@/.test(prop);
      const subparent = isAtRule
        ? parent
        : prop.startsWith(":host")
        ? parent || prop
        : parent + prop;

      const subrule = serialize(json[prop], [], subparent);

      if (isAtRule) {
        rules.push(rule(prop, subrule.join("")));
      } else {
        rules.push(...subrule);
      }
    } else {
      decl.push(prop + ":" + json[prop]);
    }
  }

  if (parent && decl.length) {
    rules.unshift(rule(parent, decl.join(";")));
  }

  return rules;
}
