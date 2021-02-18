---
title: use-listener
description: Hook to isolate the capture of DOM events from a custom hook.
linkTitle:
  $ref: ~title
category: hooks
---

Designed to capture events through the use of references, the association of events is thanks to [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

## Install

```bash
npm install @atomico/kit
```

## Module

```js
import { useListener, useListenerRef } from "@atomico/kit/use-listener";
```

### useListener

Associate the host reference by default, thanks to the useHost hook, example:

```tsx
function useCustomHook() {
  useListener("click", () => {
    console.log("Webcomponent Click!");
  });
}
```

### useListenerRef

Allows you to use an external reference to the hook.

```tsx
function useCustomHook(ref) {
  useListenerRef(ref, "click", () => {
    console.log("Ref Click!");
  });
}
```
