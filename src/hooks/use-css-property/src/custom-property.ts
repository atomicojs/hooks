const COMPUTED_STYLE = Symbol("");

export type GetProperty = (property: string) => string;
export type DefaultValueFn = (getProperty: GetProperty) => string;
export type DefaultValue = string | DefaultValueFn;

export function getPropertyValue(
  current: Element,
  property: string,
  cache = true
) {
  let priority: boolean;

  if (!current[COMPUTED_STYLE] || !cache) {
    current[COMPUTED_STYLE] = getComputedStyle(current);
  }

  if (property[0] == "!") {
    property = property.slice(1);
    priority = true;
  }

  const value: string = priority
    ? current[COMPUTED_STYLE].getPropertyPriority(property)
    : current[COMPUTED_STYLE].getPropertyValue(property);

  return {
    priority,
    property,
    value,
  };
}

export function setDefaultProperty(
  current: Element & { style: any },
  property: string,
  defaultValue: DefaultValue
) {
  const { value, property: prop } = getPropertyValue(current, property);

  if (!value && value != defaultValue) {
    current.style.setProperty(
      prop,
      typeof defaultValue == "function"
        ? defaultValue((property) => getPropertyValue(current, property).value)
        : defaultValue
    );
  }
}
