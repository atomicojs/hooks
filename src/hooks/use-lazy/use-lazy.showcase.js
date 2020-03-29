import { h, customElement, useState } from "atomico";
import { useLazy } from "./use-lazy";
export { render } from "atomico";

const delay = result =>
  new Promise(resolve => setTimeout(resolve, 1000, result));

const Example1 = () => {
  const [load, setLoad] = useState(false);

  const [lazyState, LazyResult] = useLazy(
    () => delay(({ children }) => <h1>Done! {children}</h1>),
    load
  );
  return (
    <host shadowDom>
      <style>{`:host{display:block;width:100%}img{width:100%}`}</style>
      <button onclick={() => setLoad(true)}>load module?</button>

      {lazyState == "unimport" ? (
        "✋"
      ) : lazyState == "loading" ? (
        "⏳"
      ) : lazyState == "error" ? (
        "😞"
      ) : (
        <LazyResult>🥂</LazyResult>
      )}
    </host>
  );
};

customElement("use-lazy-example-1", Example1);

export default [
  {
    label: "Example useLazy",
    render() {
      const url = "https://via.placeholder.com/";
      return (
        <section>
          <p>
            This would be an example of useLazy, first generate the request of
            the I modulate the one that takes 1000 ms, to later show the
            lazyResult
          </p>
          <use-lazy-example-1
            src={`${url}1080x150, ${url}720x200 720px, ${url}520x300 520px, ${url}320x500 240px`}
          ></use-lazy-example-1>
        </section>
      );
    }
  }
];
