/**
 * force the type according to the configuration of the form
 * @param {HTMLFormElement} target
 * @param {string} prop
 * @param {string} value
 * @returns
 */
const getFormValue = (target, prop, value) => {
  const field = target[prop];
  return field.length
    ? value
    : field.type === "checkbox"
    ? field.hasAttribute("value")
      ? value
      : field.checked
    : field.type === "number"
    ? Number(value)
    : value;
};
/**
 * returns a property path from an expression
 * @param {string} path
 * @returns {string[]}
 */
const getPath = (path) => path.match(/(\[\d+\]|\w+)/g);

/**
 * create an object from a path
 * @param {string[]} path
 * @param {*} value
 * @returns
 */
const createObjectFromPath = (path, value) =>
  path.reverse().reduce((value, prop) => [prop, value], new Value(value));

/**
 * instance to identify a value
 * @param {*} value
 */
function Value(value) {
  this.value = value;
}

/**
 *
 * @param {*} parent
 * @param {[string,any]} next
 */
function merge(parent, [name, value]) {
  if (value instanceof Value) {
    parent[name] = value.value;
  } else {
    const current = parent[name];
    if (current == null) {
      merge((parent[name] = {}), value);
    } else {
      merge(current, value);
    }
  }
}
/**
 * convert formdata to object
 * @param {Object<string,any>} [defaultData]
 * @returns
 */
export const formDataToObject =
  (defaultData = {}) =>
  (target) =>
    [...new FormData(target)].reduce(
      (body, [name, value]) => {
        merge(
          body,
          createObjectFromPath(getPath(name), getFormValue(target, name, value))
        );
        return body;
      },
      { ...defaultData }
    );
