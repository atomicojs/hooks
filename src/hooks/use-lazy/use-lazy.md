---
title: use-lazy
description: Allows you to apply operations to capture the target dimension.
group: Hooks
---

# {{page.title}}

> {{page.description}}

### Sintax

```jsx
const url = "my-module.js";
const callback = () => import(url);
const optionalArguments = [url];
const [lazyState, lazyResult] = useLazy(callback, true, optionalArguments);
```

**Donde :**

`callback` : Funcion que retona una promesa, esta no condiciona la regeneracion de useLazy, si se busca hacer esta regeneracion condicional al cambio del modulo, se debe usar un tercer algumento que agrupe los parametros a observar para regenerar la importacion.

`lazyState`:String, Es el estado actual de la importacion siendo :

| String value | Constants         | Description                                        |
| ------------ | ----------------- | -------------------------------------------------- |
| unimport     | USE_LAZY_UNIMPORT | El modulo no se ha importado                       |
| loading      | USE_LAZY_LOADING  | El modulo se esta cargando                         |
| error        | USE_LAZY_ERROR    | El modulo a importar ha generado un error de carga |
| done         | USE_LAZY_DONE     | El modulo se ha cargado                            |

`optionalArguments`: Array opcional, permite regenerar el llamado del callback si un argumento cambia, esto es util si el modulo a importar se define de forma dinamica.

### Example

```js
import { useLazy } from "{{pkg.name}}/use-lazy";

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

<a-showcase src="./use-lazy.showcase.js"></a-showcase>

<script type="module" src="../../components/a-showcase/a-showcase.js"></script>
