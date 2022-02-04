# Documentation in [👉 atomico.gitbook.io/doc](https://atomico.gitbook.io/doc/v/es/atomico/atomico-hooks)

```js
import { css } from "atomico";
import { useCssLightDom } from "@atomico/hooks/use-css-light-dom";

const sheet = css`
  :host {
    width: 200px;
    height: 200px;
    background: black;
  }
`;

function component() {
  useCssLightDom(sheet);
  return <host></host>;
}
```

Limitaciones:

1. Un solo sheet por `useCssLightDom`.
2. El nodo queda expuesto en el lightDOM.
