import {
  h,
  useRef,
  useHost,
  useState,
  useEffect,
  customElement
} from "atomico";
import { isUrl } from "../../utils";
import { useLazy } from "../../hooks/use-lazy/use-lazy";
import { useEventMove } from "../../hooks/use-event-move/use-event-move";
import style from "./a-showcase.css";

const AShowcase = ({ src, width, height }) => {
  const refSandbox = useRef();
  const refPreview = useRef();
  const refSelect = useRef();
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
      const minWidth = refSelect.current
        ? refSelect.current.clientWidth + 22
        : 50;
      const width =
        ((move < minWidth ? minWidth : move) / currentZone.width) * 100;

      refPreview.current.style.width =
        (width > 100 ? 100 : width < 0 ? 0 : width) + "%";
    }
  });

  const [lazyState, lazyResult] = useLazy(
    () => import((isUrl(src) ? "" : "./") + src).then(md => ({ default: md })),
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
        <select
          ref={refSelect}
          class="showcase -select"
          onchange={({ target: { value } }) => setSelect(value)}
        >
          {cases.map(({ label }) => (
            <option value={label}>{label}</option>
          ))}
        </select>
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
    type: String
  },
  height: {
    type: String
  },
  src: {
    type: String
  },
  centered: {
    type: Boolean,
    reflect: true
  }
};

export default customElement("a-showcase", AShowcase);
