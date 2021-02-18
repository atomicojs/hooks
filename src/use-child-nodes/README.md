# use-child-nodes

## Intalación

```bash
npm install @atomico/kit
```

## Modulo

```js
import { useChildNodes } from "@atomico/kit/use-child-nodes";
```

## Sintaxis

```js
const [childNodes, update] = useChildNodes();
```

Donde :

1. `childNodes` : Lista de nodos que no pertenecen al render del webcomponent.
2. `update`: Callback que fuerza una nueva exploracion de `childNodes`.

## Ejemplo

```jsx
function component() {
  const [childNodes] = useChildNodes();
  return (
    <host>
      {childNodes
        .filter((node) => node.localName == "h1")
        .map((Title) => (
          <Title onclick={() => console.log("click h1!")} />
        ))}
    </host>
  );
}
```
