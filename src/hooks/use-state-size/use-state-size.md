---
title: "use-state-size"
description: grupo de hooks pensados para trabajar con redimencionamiento dinamico del webcomponent.
category: hooks
linkTitle:
  $ref: ~title
---

## @atomico/kit/use-state-size

Define un estado a base de un patrom como string, ejemplo:

```js
const value = "default, large 720w, small 520w";
const state = useStateSize(value, ref);
```

Donde:

1. Si el tamaño del contenedor es infrior o igual a 720w, el estado sera igual a `large`.
2. Si el tamaño del contenedor es infrior o igual a 520w, el estado sera igual a `small`.
3. Si no se cumple ninguno de los casos anteriores el estado sera igual a `default`.

**Para que este hook funcione correctamente la `ref` debe hacer uso de tamaño a base de porcentaje, ejemplo `width:100%`**

### Usage

```jsx
import { h } from "atomico";
import { useStateSize } from "@atomico/kit/use-state-size";

function Component() {
  useStateSize();
  return <host></host>;
}
```
