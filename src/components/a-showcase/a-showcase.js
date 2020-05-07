import {
  h,
  useRef,
  useHost,
  useState,
  useEffect,
  customElement,
} from "atomico";
import { isUrl } from "../../utils";
import { useLazy } from "../../hooks/use-lazy/use-lazy";
import { useEventMove } from "../../hooks/use-event-move/use-event-move";
import style from "./a-showcase.css";

const AShowcase = ({ src, width, height, origin }) => {
  const refSandbox = useRef();
  const refPreview = useRef();
  const refHeader = useRef();
  const refHost = useHost();

  let [select, setSelect] = useState();

  let currentZone;

  const propsMove = useEventMove((type, range) => {
    if (type == "start") {
      currentZone = refHost.current.getBoundingClientRect();
    }
    if (type == "move") {
      const last = range[range.length - 1];
      const move = last.x - currentZone.x;
      const minWidth = refHeader.current
        ? refHeader.current.clientWidth + 22
        : 50;
      const width =
        ((move < minWidth ? minWidth : move) / currentZone.width) * 100;

      refPreview.current.style.width =
        (width > 100 ? 100 : width < 0 ? 0 : width) + "%";
    }
  });

  const [lazyState, lazyResult] = useLazy(
    () =>
      import((isUrl(src) ? "" : "./") + src).then((md) => ({ default: md })),
    true
  );

  const lazyStateIsDone = lazyState == "done";

  const cases = lazyStateIsDone ? [].concat(lazyResult.default) : [];

  select = select || (lazyStateIsDone && cases[0].label);

  useEffect(() => {
    const { render, rendered } =
      cases.find(({ label }) => label == select) || {};
    render && lazyResult.render(render(), refSandbox.current);
    rendered && rendered(refSandbox.current);
  }, [lazyStateIsDone, select]);

  return (
    <host shadowDom style={{ width, height }}>
      <style>{style}</style>

      {lazyStateIsDone && (
        <header ref={refHeader} class="showcase -header">
          <select
            class="showcase -select"
            onchange={({ target: { value } }) => setSelect(value)}
          >
            {cases.map(({ label }) => (
              <option value={label}>{label}</option>
            ))}
          </select>
          {origin && (
            <a class="showcase -btn" href={origin} target="_blank">
              <svg
                height="14"
                viewBox="0 0 467.765 467.765"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M146.175 87.707L0 233.883l146.175 146.175 41.34-41.34L82.681 233.883l104.834-104.836zM321.59 87.707l-41.34 41.34 104.834 104.836L280.25 338.717l41.34 41.34 146.175-146.175z" />
              </svg>
            </a>
          )}
        </header>
      )}

      <section class="showcase -preview" ref={refPreview}>
        <div class="showcase -sandbox" ref={refSandbox}></div>
        <button class="showcase -resize" {...propsMove}></button>
      </section>
    </host>
  );
};

AShowcase.props = {
  width: {
    type: String,
  },
  height: {
    type: String,
  },
  src: {
    type: String,
  },
  centered: {
    type: Boolean,
    reflect: true,
  },
  origin: String,
};

export default customElement("a-showcase", AShowcase);
