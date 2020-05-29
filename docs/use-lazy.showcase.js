import { d, T, P } from './chunks/7af3821d.js';
export { y as render } from './chunks/7af3821d.js';
import { u as useLazy } from './chunks/4fc5287b.js';

const delay = result => new Promise(resolve => setTimeout(resolve, 1000, result));

const Example1 = () => {
  const [load, setLoad] = P(false);
  const [lazyState, LazyResult] = useLazy(() => delay(({
    children
  }) => d("h1", null, "Done! ", children)), load);
  return d("host", {
    shadowDom: true
  }, d("style", null, `:host{display:block;width:100%}img{width:100%}`), d("button", {
    onclick: () => setLoad(true)
  }, "load module?"), lazyState == "unimport" ? "✋" : lazyState == "loading" ? "⏳" : lazyState == "error" ? "😞" : d(LazyResult, null, "\uD83E\uDD42"));
};

T("use-lazy-example-1", Example1);
var useLazy_showcase = [{
  label: "Example useLazy",

  render() {
    const url = "https://via.placeholder.com/";
    return d("section", null, d("p", null, "This would be an example of useLazy, first generate the request of the I modulate the one that takes 1000 ms, to later show the lazyResult"), d("use-lazy-example-1", {
      src: `${url}1080x150, ${url}720x200 720px, ${url}520x300 520px, ${url}320x500 240px`
    }));
  }

}];

export default useLazy_showcase;
//# sourceMappingURL=use-lazy.showcase.js.map
