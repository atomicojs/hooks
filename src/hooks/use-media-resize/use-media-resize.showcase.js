import { h, customElement } from "atomico";
import { useMediaResize } from "./use-media-resize";
export { render } from "atomico";

const Example1 = ({ src }) => {
  const [state, ref] = useMediaResize(src);
  return (
    <host ref={ref} shadowDom>
      <style>{`:host{display:block;width:100%}img{width:100%}`}</style>
      <img src={state} />
    </host>
  );
};

Example1.props = {
  src: String,
};

customElement("use-media-resize-example-1", Example1);

export default [
  {
    label: "Example useMediaResize",
    render() {
      const url = "https://via.placeholder.com/";
      return (
        <host>
          <use-media-resize-example-1
            src={`${url}1080x150, ${url}720x200 720px, ${url}520x300 520px, ${url}320x500 240px`}
          ></use-media-resize-example-1>
        </host>
      );
    },
  },
];
