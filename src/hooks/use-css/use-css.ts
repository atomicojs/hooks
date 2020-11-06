import { useState, useEffect, Ref } from "atomico";
import hash from "@uppercod/hash";
import { parse } from "./src/parse";

interface Log {
  [css: string]: {
    id: string;
    rules: string[];
    print?: boolean;
  };
}

interface State {
  id: number;
  ref: Ref<HTMLStyleElement>;
  task: Log;
}

let id = 0;

const cache: Log = {};

const initialState = (): State => ({ id: id++, task: {}, ref: {} });

const transform = (css: string) =>
  (cache[css] = cache[css] || {
    id: hash(css),
    rules: parse(css),
  });

export function useCss() {
  const [state] = useState<State>(initialState);

  const css = (template: TemplateStringsArray | string, ...args: any[]) => {
    const { task, id } = state;
    const str =
      typeof template == "string"
        ? template
        : template.map((part, index) => part + (args[index] || "")).join("");

    if (!task[str]) {
      task[str] = { ...transform(str) };
      task[str].id = "c" + id + task[str].id;
    }
    return task[str].id;
  };

  useEffect(() => {
    const { ref, task } = state;
    const { current } = ref;
    for (const str in task) {
      const { id, rules, print } = task[str];
      if (!print) {
        task[str].print = true;
        rules.map((rule) => {
          const cssText = rule
            .replace(/:host/g, "." + id)
            .replace(/host_/g, id);
          current.sheet.insertRule(cssText, current.sheet.rules.length);
        });
      }
    }
  });

  css.ref = state.ref;

  return css;
}
