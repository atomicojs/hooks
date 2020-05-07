import { p, x, T } from './chunks/61e0f1f4.js';
export { d as render } from './chunks/61e0f1f4.js';
import { u as useLazy } from './chunks/e8be573d.js';

const delay = result => new Promise(resolve => setTimeout(resolve, 1000, result));

const Example1 = () => {
  const [load, setLoad] = T(false);
  const [lazyState, LazyResult] = useLazy(() => delay(({
    children
  }) => p("h1", null, "Done! ", children)), load);
  return p("host", {
    shadowDom: true
  }, p("style", null, `:host{display:block;width:100%}img{width:100%}`), p("button", {
    onclick: () => setLoad(true)
  }, "load module?"), lazyState == "unimport" ? "✋" : lazyState == "loading" ? "⏳" : lazyState == "error" ? "😞" : p(LazyResult, null, "\uD83E\uDD42"));
};

x("use-lazy-example-1", Example1);
var useLazy_showcase = [{
  label: "Example useLazy",

  render() {
    const url = "https://via.placeholder.com/";
    return p("section", null, p("p", null, "This would be an example of useLazy, first generate the request of the I modulate the one that takes 1000 ms, to later show the lazyResult"), p("use-lazy-example-1", {
      src: `${url}1080x150, ${url}720x200 720px, ${url}520x300 520px, ${url}320x500 240px`
    }));
  }

}];

export default useLazy_showcase;
//# sourceMappingURL=use-lazy.showcase.js.map
