/**
 * Create a style collector to apply once the render is finished
 * @returns {(template:TemplateStringsArray|string,...args:string[])=>string}
 */
export function useCssLightDom(): (template: TemplateStringsArray | string, ...args: string[]) => string;
