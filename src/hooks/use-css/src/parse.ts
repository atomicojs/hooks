const mark = /<(\d+)>/;
const markG = /<(\d+)>/g;

export interface Rule {
  id: number;
  children: Rule[];
  toString(): string;
  content?: string;
  selector?: string;
  before?: string;
}

export interface Rules {
  [id: string]: Rule;
}

export function parse(css: string) {
  const rules: Rules = {};
  let item: RegExpMatchArray;
  let index = 0;

  css = css
    .replace(/\n/g, "")
    .replace(/@import *("[^"]+"|'[^']+');/, "@import $1{}");

  while ((item = css.match(/([^{};]+){([^{}]*)}/))) {
    const [capture, selector, content] = item;
    const id = index++;
    const node: Rule = {
      id,
      children: [],
      toString() {
        const { selector, children, content } = this;
        const delc = content
          ? content
          : children.map((node) => node + "").join("");
        return selector + (delc ? `{${delc}}` : ";");
      },
    };
    node.content = content
      .replace(markG, (_, id: string) => {
        let child: Rule = rules[id];
        while (child) {
          delete rules[child.id];
          node.children.unshift(child);
          if (child.before) {
            child = rules[child.before];
          } else {
            break;
          }
        }
        return "";
      })
      .trim();

    node.selector = selector
      .replace(markG, (_, id) => {
        node.before = id;
        return "";
      })
      .trim();

    rules[id] = node;

    css =
      css.slice(0, item.index) +
      "<" +
      id +
      ">" +
      css.slice(item.index + capture.length);
  }
  return rules;
}
