---
title: use-lazy
description: Hook that allows the import of dynamic modules or promise resolution
category: hooks
linkTitle:
  $ref: ~title
---

## Sintax

```jsx
let [lazyState, lazyResult] = useLazy(
  importCallback,
  runImport,
  optionalArguments
);
```

**Where :**

1.  `importCallback`: Function, executed if `runImport` is true.

2.  `runImport`: Boolean, si es verdadero, comienza la resolución de la promesa obtenida de `importCallback`.
3.  `optionalArguments`: Array, the execution of `importCallback` is not regenerated before if`runImport` is constant, if you look for a dynamic behavior, you can observe certain arguments that force the regeneration of the hook state.
4.  `lazyResult` : String, shows the status of the promise resolution.
5.  `lazyResult` : Any, return of the promise resolution.

### Import states

| String value | Constants         | Description                                        |
| ------------ | ----------------- | -------------------------------------------------- |
| unimport     | USE_LAZY_UNIMPORT | The module has not been imported                   |
| loading      | USE_LAZY_LOADING  | The module is loading                              |
| error        | USE_LAZY_ERROR    | The module to import has generated a loading error |
| done         | USE_LAZY_DONE     | The module has been loaded                         |

### Example

```js
import { useLazy } from "@atomico/kit/use-lazy";

const Example = () => {
  const [load, setLoad] = useState(false);

  const [lazyState, LazyResult] = useLazy(() => import("my-module.js"), load);

  return (
    <host shadowDom>
      <button onclick={() => setLoad(true)}> load module?</button>
      <style>{`:host{display:block;width:100%}img{width:100%}`}</style>
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
```
