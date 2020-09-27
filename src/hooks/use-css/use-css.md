---
title: "use-css"
description: Hook that allows to obtain the value of a css property that affects the reference.
category: hooks
linkTitle:
  $ref: ~title
---

```js
import { useCss } from "@atomico/kit/use-css";

function Component() {
  const css = useCss();
  return (
    <host
      class={css`
        width: 200px;
        height: 200px;
        &:hover {
          background: teal;
        }
        &[active] {
          background: red;
        }
        @media (max-width: 200px) {
          &:hover {
            width: 200px;
          }
        }
      `}
    >
      <style ref={css.ref}></style>
    </host>
  );
}
```
