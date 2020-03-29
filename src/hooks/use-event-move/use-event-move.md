---
title: use-event-move
group: Hooks
---

# useEventMove

This hooks is used by the component [a-slide](./a-slide.html), allows you to capture the mousemove or touchmove event from the selected target, eg:

```js
import { useEventMove, getSwiper } from "{{pkg.name}}/use-event-move";

function Component() {
  let props = useEventMove((type, range) => {
    if (type == "end") {
      switch (getSwipe(range)) {
        case "toLeft":
          prev();
          break;

        case "toRight":
          next();
          break;
      }
    }
  });

  return <host {...props} />;
}
```

Where :

* `props` :configuration for the target to trigger the capture, this will revive a ref and the associated events for the capture `{ref, ontouchstart, onmousedown}`

* `useEventMove(callback)` : This callback receives the state of the capture be `start, move, end`. the second argument of the callback is the capture data `{x:number, y: number, y : TimeStamp }`
