import html from "atomico/html";
import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useController } from "./use-controller.js";

class SimpleController {
  host;
  _x = '';

  get x() { return this._x; }
  set x(v) {
    this._x = v;
    this.host.requestUpdate();
  }

  constructor(host, value) {
    this.host = host;
    this.x = value;
    host.addController(this);
  }
}

it("use-controller", async () => {
  const hooks = createHooks(() => {});

  let controller;

  const useSimple = x =>
    useController(host =>
      new SimpleController(host, x));

  hooks.load(() => {
    controller = useSimple('x');
  });

  await controller.host.updateComplete;
  expect(controller.x, 'initial value').to.equal('x');

  controller.x = 'y';

  await controller.host.updateComplete;
  expect(controller.x, 'updated value').to.equal('y');

  controller.x = 'z';

  await controller.host.updateComplete;
  expect(controller.x, 'user value').to.equal('z');
});
