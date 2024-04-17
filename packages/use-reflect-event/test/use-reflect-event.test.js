import { expect, it } from "vitest";
import { Element } from "./element";
import { asyncEventListener } from "atomico/test-dom";

it("useReflectEvent", async () => {
	const element = new Element();
	document.body.append(element);

	await element.updated;

	const [button1, button2] = element.querySelectorAll("button");

	setTimeout(() => {
		button1.dispatchEvent(new Event("click"));
	}, 100);

	const event = await asyncEventListener(button2, "click");

	expect(event.type).toEqual("click");
});
