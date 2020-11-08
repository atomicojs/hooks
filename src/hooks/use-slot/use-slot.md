---
title: use-slot
description: Hook that captures the childNodes of a slot in shadowDOM
linkTitle:
  $ref: ~title
category: hooks
---

## Install

```bash
npm install @atomico/kit
```

## Module

```js
import { useSlot } from "@atomico/kit/use-slot";
```

## Example

this hook gets the `childNodes` associated with the slot and observes the list changes using the slotchange event.

```tsx
function component() {
  const ref = useRef<HTMLSlotElement>();
  const childNodes: ChildNodes[] = useSlot(ref);

  return (
    <host>
      <slot ref={ref} />
      <h1>Slot: {childNodes.length}</h1>
    </host>
  );
}
```
