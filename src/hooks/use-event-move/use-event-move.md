---
title: use-event-move
description: This hooks allows you to observe the touch or mousemove event at the moment of the drag and drop action
category: hooks
linkTitle:
  $ref: ~title
---

```js
import { useEventMove, getSwiper } from "@atomico/kit/use-event-move";

function Component() {
  const props = useEventMove((type, range) => {
    if (type == "end") {
      switch (getSwipe(range)) {
        case "toLeft":
          console.log("<<");
          break;

        case "toRight":
          console.log(">>");
          break;
      }
    }
  });

  return <host {...props} />;
}
```

Where :

- `props` :configuration for the target to trigger the capture, this will revive a ref and the associated events for the capture `{ref, ontouchstart, onmousedown}`

- `useEventMove(callback)` : This callback receives the state of the capture be `start, move, end`. the second argument of the callback is the capture data `{x:number, y: number, y : TimeStamp }`
