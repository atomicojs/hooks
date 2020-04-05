---
title: use-delegate-focus
description: These hooks allow to redirect the focus effect associated to the component a reference
group: Hooks
---

# {{page.title}}

> {{page.description}}

```jsx
import { h, useRef } from "atomico";
import { useDelegateFocus } from "{{pkg.name}}/{{page.title}}";

function Component() {
  let ref = useRef();
  useDelegateFocus(ref);

  return (
    <host shadowDom>
      <input placeholder="Ignore focus" />
      <input placeholder="Ignore focus" />
      <input placeholder="Focus" ref={ref} />
    </host>
  );
}
```

Where :

- `useRef`: Create a persistent object between renders to use as reference

- `useDelegateFocus(ref)` : Redirects all focus actions that point to the webcomponent to the reference
