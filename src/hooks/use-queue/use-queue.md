---
title: use-queue
description: hook that captures and accumulates the parameters given to the callback for an analysis outside the event loop(microtask)
linkTitle: use-queue
category: hooks
---

This hook aims to group parameters for more efficient processing, the effect is similar to api of [MutationObserver] (https://developer.mozilla.org/es/docs/Web/API/MutationObserver) but as a hook.

## usage

```js
import { useQueue } from "@atomico/kit/use-queue";

function component() {
  /**
   * receives all the parameters once the microTask is finished
   */
  function collector(entries) {
    console.log(entries);
  }
  /**
   * It allows processing the parameter on demand,
   * it can be useful for canceling events
   */
  function optionalReduce(entry) {
    return { any: entry };
  }
  /**
   * callback allows associating new parameters for the microTask
   */
  const callback = useQueue(collector, optionalReduce);
}
```

## Example

Suppose we must capture the events emitted by a group of slots, by default each event will execute the processing callback, but with useQueue the execution will be limited to only one.

```js
import { h } from "atomico";
import { useQueue } from "@atomico/kit/use-queue";

function component() {
  const addEntry = useQueue((entries) => {
    entries.map(console.log);
  });
  return <host onCustomConnect={({ target }) => addEntry(target)}></host>;
}
```
