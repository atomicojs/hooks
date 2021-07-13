/**
 * Capture and homologate the coordinates from the touch or mouse event
 * @param {import("atomico").Ref<Element>} ref
 * @param {(action:Types,capture:Capture[])=>any} callback
 */
export function useDrag(ref: import("atomico").Ref<Element>, callback: (action: Types, capture: Capture[]) => any): void;
export type Types = "start" | "move" | "stop";
export type Point = {
    x: number;
    y: number;
};
export type Capture = Point & {
    offset: Point;
    ms: number;
};
