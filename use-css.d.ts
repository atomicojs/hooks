import { Ref } from "atomico";

export interface CSS {
  (param: TemplateStringsArray, ...args: any[]): string;
  (param: string): string;
  ref: Ref<HTMLStyleElement>;
}

export function useCss(): CSS;
