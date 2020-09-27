import { Ref, useHost, useEffect } from "atomico";
import { setDefaultProperty } from "../use-custom-property/src/custom-property";

export function useDefaultCSSProperties(properties) {
  const { current } = useHost();
  useEffect(() => {
    for (const property in properties) {
      setDefaultProperty(current, property, properties[property]);
    }
  }, []);
}
