import { h, customElement, useRef } from "atomico";
import { useStateSize } from "./use-state-size";
export { render } from "atomico";

const Example1 = ({ src }) => {
  let ref = useRef();

  let state = useStateSize(
    "small 420w, medium 720w, large 1080w, extra-large 1366w, full",
    ref
  );
  console.log(state);
  return (
    <host shadowDom ref={ref}>
      <style>{`:host{display:block;width:100%}img{width:100%}`}</style>
      <h1>{state}</h1>
    </host>
  );
};

customElement("use-media-resize-example-1", Example1);

export default [
  {
    label: "Example useMediaResize",
    render() {
      return (
        <host>
          <use-media-resize-example-1></use-media-resize-example-1>
        </host>
      );
    },
  },
];
