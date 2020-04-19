import { _, M, F } from './chunks/37634490.js';
export { T as render } from './chunks/37634490.js';
import { u as useLazy } from './chunks/c1e181f8.js';

const delay = result => new Promise(resolve => setTimeout(resolve, 1000, result));

const Example1 = () => {
  const [load, setLoad] = F(false);
  const [lazyState, LazyResult] = useLazy(() => delay(({
    children
  }) => _("h1", null, "Done! ", children)), load);
  return _("host", {
    shadowDom: true
  }, _("style", null, `:host{display:block;width:100%}img{width:100%}`), _("button", {
    onclick: () => setLoad(true)
  }, "load module?"), lazyState == "unimport" ? "✋" : lazyState == "loading" ? "⏳" : lazyState == "error" ? "😞" : _(LazyResult, null, "\uD83E\uDD42"));
};

M("use-lazy-example-1", Example1);
var useLazy_showcase = [{
  label: "Example useLazy",

  render() {
    const url = "https://via.placeholder.com/";
    return _("section", null, _("p", null, "This would be an example of useLazy, first generate the request of the I modulate the one that takes 1000 ms, to later show the lazyResult"), _("use-lazy-example-1", {
      src: `${url}1080x150, ${url}720x200 720px, ${url}520x300 520px, ${url}320x500 240px`
    }));
  }

}];

export default useLazy_showcase;
//# sourceMappingURL=use-lazy.showcase.js.map
