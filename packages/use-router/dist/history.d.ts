/**
 * @param {string} url
 * @param {string} [title]
 */
export declare function redirect(path: any, title?: any): void;
/**
 *
 * @param {(ev: PopStateEvent) => void} handler
 */
export declare const listener: (handler: any) => () => void;
export declare const getPath: () => string;
