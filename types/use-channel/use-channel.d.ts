/**
 * @template T
 * @param {string} channel
 * @returns {[T,(T)=>T]}
 */
export function useChannel<T>(namespace: any): [T, (T: any) => T];
