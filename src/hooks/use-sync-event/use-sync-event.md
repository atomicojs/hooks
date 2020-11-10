---
title: use-sync-event
description: Synchronize parent and child components thanks to the emission of mounted  and dismounted events
linkTitle:
  $ref: ~title
category: hooks
---

Designed for component synchronization through the use of events and microtask.

## Install

```bash
npm install @atomico/kit
```

## Module

```js
import {
  useSyncEventListener,
  useSyncEventDispatch,
} from "@atomico/kit/use-sync-event";
```

### useSyncEventListener

Listen to the event emitted by the hook ʻuseSyncEventDispatch` from a child, example:

```tsx
function Component() {
  useSyncEventListener("MySyncEvent", (entries: HTMLElement[]) => {
    console.log(entries.filter((child) => child.isConnected));
  });
  return (
    <host shadowDom>
      <slot />
    </host>
  );
}
```

### useSyncEventDispatch

It allows to emit a synchronization event, the event is emitted in mounted and dismounted of the webcomponent.

```tsx
function component() {
  useSyncEventDispatch("MySyncEvent");
}
```
