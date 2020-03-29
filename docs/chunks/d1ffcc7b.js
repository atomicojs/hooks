const HOOK_MOUNT = Symbol("mount");
const HOOK_MOUNTED = Symbol("mounted");
const HOOK_UPDATE = Symbol("update");
const HOOK_UPDATED = Symbol("updated");
const HOOK_UNMOUNT = Symbol("unmount");
const HOOK_CURRENT = {};

function update(hook, type) {
  hook[0] && (hook[1] = hook[0](hook[1], type));
}

function updateAll(hooks, type) {
  for (let i in hooks) update(hooks[i], type);
}

function useHook(reducer, initialState) {
  if (HOOK_CURRENT.ref.hook) {
    return HOOK_CURRENT.ref.hook.use(reducer, initialState)[1];
  }
}

function useRender() {
  return HOOK_CURRENT.ref.render;
}

function createHooks(render, host) {
  let hooks = {};
  let mounted;
  let hook = {
    use,
    load,
    updated,
    unmount
  };
  let ref = {
    hook,
    host,
    render
  };

  function load(callback, param) {
    HOOK_CURRENT.index = 0;
    HOOK_CURRENT.ref = ref;
    let resolve = callback(param);
    HOOK_CURRENT.ref = 0;
    return resolve;
  }

  function use(reducer, state) {
    let index = HOOK_CURRENT.index++;
    let mount; // record the hook and the initial state of this

    if (!hooks[index]) {
      hooks[index] = [null, state];
      mount = 1;
    } // The hook always receives the last reduce.


    hooks[index][0] = reducer;
    update(hooks[index], mount ? HOOK_MOUNT : HOOK_UPDATE);
    return hooks[index];
  }

  function updated() {
    let type = mounted ? HOOK_UPDATED : HOOK_MOUNTED;
    mounted = 1;
    updateAll(hooks, type);
  }

  function unmount() {
    updateAll(hooks, HOOK_UNMOUNT);
  }

  return hook;
}

const ARRAY_EMPTY = [];
const NODE_HOST = "host";
const LIMIT_NODE = Symbol("limitNode");
const IGNORE_CHILDREN = {
  innerHTML: 1,
  textContent: 1,
  contenteditable: 1
};
const JOIN_CHILDREN = {
  style: 1
};
const HYDRATE_PROPS = {
  id: 1,
  className: 1,
  checked: 1,
  value: 1,
  selected: 1
};
/**
 * Return if value is array
 * @param {*}
 * @return {boolean}
 */

const isArray = value => Array.isArray(value);
/**
 * compare 2 array
 * @param {array} before
 * @param {array} after
 * @example
 * isEqualArray([1,2,3,4],[1,2,3,4]) // true
 * isEqualArray([1,2,3,4],[1,2,3])   // false
 * isEqualArray([5,1,2,3],[1,2,3,5]) // false
 * isEqualArray([],[]) // true
 * @returns {boolean}
 */


function isEqualArray(before, after) {
  let length = before.length;
  if (length !== after.length) return false;

  for (let i = 0; i < length; i++) {
    if (before[i] !== after[i]) return false;
  }

  return true;
}

const isFunction = value => typeof value == "function"; // export function fps(callback, count = 3) {
//     count-- ? requestAnimationFrame(() => fps(callback, count)) : callback();
// }


const promise = callback => new Promise(callback);
/**
 *
 * @param {import("./render").HTMLNode} node
 * @param {Object} props
 * @param {Object} nextProps
 * @param {boolean} isSvg
 * @param {Object} handlers
 **/


function diffProps(node, props, nextProps, isSvg, handlers) {
  props = props || {};

  for (let key in props) {
    if (!(key in nextProps)) {
      setProperty(node, key, props[key], null, isSvg, handlers);
    }
  }

  let ignoreChildren;

  for (let key in nextProps) {
    setProperty(node, key, props[key], nextProps[key], isSvg, handlers);
    ignoreChildren = ignoreChildren || IGNORE_CHILDREN[key];
  }

  return ignoreChildren;
}

function setProperty(node, key, prevValue, nextValue, isSvg, handlers) {
  key = key == "class" && !isSvg ? "className" : key; // define empty value

  prevValue = prevValue == null ? null : prevValue;
  nextValue = nextValue == null ? null : nextValue;

  if (key in node && HYDRATE_PROPS[key]) {
    prevValue = node[key];
  }

  if (nextValue === prevValue) return;

  if (key[0] == "o" && key[1] == "n" && (isFunction(nextValue) || isFunction(prevValue))) {
    setEvent(node, key, nextValue, handlers);
    return;
  }

  switch (key) {
    case "key":
      node.dataset.key = nextValue;
      break;

    case "ref":
      if (nextValue) nextValue.current = node;
      break;

    case "style":
      setStyle(node, prevValue || "", nextValue || "");
      break;

    default:
      if (!isSvg && key != "list" && key in node) {
        node[key] = nextValue == null ? "" : nextValue;
      } else if (nextValue == null) {
        node.removeAttribute(key);
      } else {
        node.setAttribute(key, typeof nextValue == "object" ? JSON.stringify(nextValue) : nextValue);
      }

  }
}
/**
 *
 * @param {import("./render").HTMLNode} node
 * @param {string} type
 * @param {function} [nextHandler]
 * @param {object} handlers
 */


function setEvent(node, type, nextHandler, handlers) {
  // get the name of the event to use
  type = type.slice(type[2] == "-" ? 3 : 2); // add handleEvent to handlers

  if (!handlers.handleEvent) {
    /**
     * {@link https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener#The_value_of_this_within_the_handler}
     **/
    handlers.handleEvent = event => handlers[event.type].call(node, event);
  }

  if (nextHandler) {
    // create the subscriber if it does not exist
    if (!handlers[type]) {
      node.addEventListener(type, handlers);
    } // update the associated event


    handlers[type] = nextHandler;
  } else {
    // 	delete the associated event
    if (handlers[type]) {
      node.removeEventListener(type, handlers);
      delete handlers[type];
    }
  }
}
/**
 * define style as string inline,this generates less mutation
 * to the sun and cleans the previously defined properties.
 * @param {import("./render").HTMLNode} node
 * @param {(string|object)} prevValue
 * @param {(string|object)} nextValue
 */


function setStyle(node, prevValue, nextValue) {
  let style = node.style,
      prevIsObject;

  if (typeof prevValue == "object") {
    prevIsObject = true;

    for (let key in prevValue) {
      if (!(key in nextValue)) setPropertyStyle(style, key, null);
    }
  }

  if (typeof nextValue == "object") {
    for (let key in nextValue) {
      let value = nextValue[key];
      if (prevIsObject && prevValue[key] === value) continue;
      setPropertyStyle(style, key, value);
    }
  } else {
    style.cssText = nextValue;
  }
}

function setPropertyStyle(style, key, value) {
  let method = "setProperty";

  if (value == null) {
    method = "removeProperty";
    value = null;
  }

  if (~key.indexOf("-")) {
    style[method](key, value);
  } else {
    style[key] = value;
  }
}

let vNodeEmpty = createElement(null, {
  children: ""
});
let vNodeFill = createElement(null, {
  children: ARRAY_EMPTY
});
const META_MAP_CHILDREN = Symbol("mapChildren");
const META_KEYES = Symbol("keyes");
/**
 * @param {VnodeType} nodeType
 * @param {VnodeProps} [props]
 * @param {Vnode|Vnode[]} [children]
 * @returns {Vnode}
 **/

function createElement(nodeType, props, ...children) {
  return {
    children,
    ...props,
    nodeType: nodeType || null
  };
}
/**
 * toVnode, processes the object for correct use within the diff process.
 **/


function toVnode(value) {
  if (isVnodeValue(value)) {
    return value;
  } else {
    // this process occurs only once per vnode
    if (!value[META_MAP_CHILDREN]) {
      let {
        children,
        keyes
      } = mapChildren(value.children);
      value.children = children.length ? children : ARRAY_EMPTY;

      if (keyes && keyes.length == children.length) {
        value[META_KEYES] = keyes;
      }

      value[META_MAP_CHILDREN] = true;
    }
  }

  return value;
}

function mapChildren(children, scan = {
  children: []
}, deep = 0) {
  if (isArray(children)) {
    let length = children.length;

    for (let i = 0; i < length; i++) {
      mapChildren(children[i], scan, deep + 1);
    }
  } else {
    if (children == null && !deep) return scan;
    let vnode = toVnode(children);

    if (vnode != null && typeof vnode == "object") {
      if (isFunction(vnode.nodeType)) {
        let {
          nodeType,
          ...props
        } = vnode;
        return mapChildren(nodeType(props), scan, deep + 1);
      }

      let {
        key
      } = vnode;

      if (key != null) {
        key += "";
        scan.keyes = scan.keyes || [];

        if (!scan.keyes.includes(key)) {
          scan.keyes.push(key);
        }
      }
    }

    scan.children.push(vnode);
  }

  return scan;
}

function isVnodeEmpty(value) {
  let type = typeof value;
  return value == null || type == "boolean" || type == "function";
}

function fillVnodeValue(value) {
  return isVnodeEmpty(value) ? vNodeEmpty : createElement(null, {
    children: "" + value
  });
}

function isVnodeValue(value) {
  let type = typeof value;
  return value == null || type == "string" || type == "number" || type == "function" || type == "boolean";
}
/**
 * @typedef {(Object<string,any>)} VnodeProps;
 *
 * @typedef {(Function|string)} VnodeType;
 *
 * @typedef {{type:VnodeType,props:VnodeProps}} Vnode
 **/


const isRawNode = node => node instanceof Node;

const createLimitNode = parent => parent[LIMIT_NODE] = parent.appendChild(new Comment());
/**
 *
 * @param {string} type
 * @param {boolean} isSvg
 * @returns {import("./render").HTMLNode}
 */


function createNode(type, isSvg, is) {
  let doc = document;
  let nextNode;

  if (type != null) {
    if (isRawNode(type)) {
      return type;
    }

    nextNode = isSvg ? doc.createElementNS("http://www.w3.org/2000/svg", type) : doc.createElement(type, is ? {
      is
    } : null);
  } else {
    nextNode = doc.createTextNode("");
  }

  return nextNode;
}
/**
 * compare 2 nodes, to define if these are equal
 * @param {string|null|HTMLElement|SVGElement} nodeA
 * @param {string|null|HTMLElement|SVGElement} nodeB
 */


function equalNode(nodeA, nodeB) {
  let isRawA = nodeA && isRawNode(nodeA);
  let isRawB = nodeB && isRawNode(nodeB);

  if (isRawB && isRawA) {
    return isRawB == isRawB;
  }

  if (nodeA) {
    if (!nodeA.localName) {
      nodeA.localName = nodeA.nodeName.toLowerCase();
    }

    let localName = nodeA.localName;
    return (localName == "#text" ? null : localName) == nodeB;
  }
}

function insertNode(parent, newNode, beforeNode, afterLimit) {
  let limitNode = parent[LIMIT_NODE];

  if (!limitNode) {
    let {
      childNodes
    } = parent;
    let length = childNodes.length;

    for (let i = 0; i < length; i++) {
      let child = childNodes[length];

      if (child instanceof Comment) {
        limitNode = child;
        break;
      }
    }
  }

  if (!limitNode) limitNode = createLimitNode(parent);
  parent[afterLimit ? "appendChild" : "insertBefore"](newNode, beforeNode || limitNode);
}
/**
 *
 * @param {import("./render").ConfigRender} config
 * @param {import("./render").HTMLNode} node
 * @param {import("./vnode").Vnode} nextVnode
 * @param {boolean} isSvg
 * @param {Function} currentUpdateComponent
 * @return {import("./render").HTMLNode}
 **/


function diff(id, node, nextVnode, isSvg) {
  let {
    vnode,
    handlers = {}
  } = node && node[id] || {};
  if (vnode == nextVnode && vnode != null) return node;
  nextVnode = isVnodeValue(nextVnode) ? fillVnodeValue(nextVnode) : nextVnode;
  let {
    nodeType,
    shadowDom,
    children,
    is,
    ...props
  } = vnode || vNodeFill;
  let {
    nodeType: nextNodeType,
    shadowDom: nextShadowDom,
    children: nextChildren,
    is: nextIs,
    ...nextProps
  } = nextVnode;
  isSvg = isSvg || nextNodeType == "svg";

  if (nextNodeType != NODE_HOST && (!equalNode(node, nextNodeType) || is != nextIs)) {
    let nextNode = createNode(nextNodeType, isSvg, nextIs);
    let parent = node && node.parentNode;

    if (parent) {
      parent.replaceChild(nextNode, node);
    }

    node = nextNode;
    handlers = {};
  }

  if (JOIN_CHILDREN[nextNodeType]) {
    nextNodeType = null;
    nextChildren = nextChildren.join("");
  }

  if (nextNodeType == null) {
    if (node.textContent != nextChildren) {
      node.textContent = nextChildren;
    }
  } else {
    if (shadowDom != nextShadowDom) {
      let {
        shadowRoot
      } = node;
      let mode = nextShadowDom && !shadowRoot ? "open" : !nextShadowDom && shadowRoot ? "closed" : 0;
      if (mode) node.attachShadow({
        mode
      });
    }

    let ignoreChildren = diffProps(node, props, nextProps, isSvg, handlers);

    if (!ignoreChildren && children != nextChildren) {
      diffChildren(id, nextShadowDom ? node.shadowRoot : node, nextChildren, nextProps[META_KEYES], isSvg);
    }
  }

  node[id] = {
    vnode: nextVnode,
    handlers
  };
  return node;
}
/**
 *
 * @param {import("./render").ConfigRender} config
 * @param {import("./render").HTMLNode} parent
 * @param {import("./vnode").Vnode[]} [nextChildren]
 * @param {boolean} isSvg
 */


function diffChildren(id, parent, children, keyes, isSvg) {
  let childrenLenght = children.length;
  let {
    childNodes
  } = parent;
  let childNodesKeyes = {};
  let childNodesLength = childNodes.length;
  let index = 0; // limit Atomico's reach only to the comment marker

  let limitNode = parent[LIMIT_NODE];

  for (; index < childNodesLength; index++) {
    let childNode = childNodes[index];

    if (childNode == limitNode || childNode instanceof Comment) {
      limitNode = childNode;
      break;
    }

    if (keyes) {
      let key = childNode.dataset.key;

      if (keyes.includes(key)) {
        childNodesKeyes[key] = childNode;
        continue;
      }
    }

    if (keyes || index >= childrenLenght) {
      index--;
      childNodesLength--;
      childNode.remove();
    }
  } // If you don't find a bookmark in the list, you create it.


  if (!limitNode) limitNode = createLimitNode(parent);

  for (let i = 0; i < childrenLenght; i++) {
    let child = children[i];
    let indexChildNode = i == index ? null : childNodes[i];
    let key = keyes ? child.key : i;
    let childNode = keyes ? childNodesKeyes[key] : indexChildNode;

    if (keyes && childNode) {
      if (childNode != indexChildNode) {
        parent.insertBefore(childNode, indexChildNode);
      }
    }

    let nextChildNode = diff(id, childNode, child, isSvg);

    if (!childNode) {
      insertNode(parent, nextChildNode, i == index ? limitNode : childNodes[i]); // increase the limit position since a new node has been inserted

      index++;
    }
  }
}

function render(vnode, node, id = "vnode") {
  if (vnode != null && typeof vnode == "object" && vnode.nodeType != NODE_HOST) {
    vnode = createElement(NODE_HOST, {
      children: vnode
    });
  }

  vnode = toVnode(vnode);
  diff(id, node, vnode);
  return node;
}

const TRUE_VALUES = [true, 1, "", "1", "true"];
const Any = null;

function formatType(value, type) {
  if (type == Any) return {
    value
  };

  try {
    if (type == Boolean) {
      value = TRUE_VALUES.includes(value);
    } else if (typeof value == "string") {
      value = type == Number ? Number(value) : type == Object || type == Array ? JSON.parse(value) : value;
    }

    if ({}.toString.call(value) == `[object ${type.name}]`) {
      return {
        value,
        error: type == Number && Number.isNaN(value)
      };
    }
  } catch (e) {}

  return {
    value,
    error: true
  };
}

const setAttr = (node, attr, value) => value == null ? node.removeAttribute(attr) : node.setAttribute(attr, typeof value == "object" ? JSON.stringify(value) : value);

const propToAttr = prop => prop.replace(/([A-Z])/g, "-$1").toLowerCase();

const attrToProp = attr => attr.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());

const dispatchEvent = (node, type, customEventInit) => node.dispatchEvent(new CustomEvent(type, typeof customEventInit == "object" ? customEventInit : null));

const createPropError = (status, message) => Object.assign(new Error("Failed prop\n" + message), status);

const defer = callback => Promise.resolve().then(callback);

const maxFps = 1000 / 60;
let queue = [];
let running;
const IMPORTANT = Symbol("important");

function clearQueue() {
  let time = performance.now();
  let length = queue.length;
  let current = queue;
  queue = [];

  while (length--) {
    let callback = current[length]; // if in case one is defined as important, the execution will be forced

    if (callback[IMPORTANT] || performance.now() - time < maxFps) {
      callback();
    } else {
      queue = queue.concat(current.slice(0, length + 1));
      break;
    }
  }

  if (queue.length) {
    requestAnimationFrame(clearQueue);
    return;
  }

  running = false;
}
/**
 * add a task to the queue
 * @param {Function} callback
 * @returns {Promise} Generate a promise that show  if the queue is complete
 */


function addQueue(callback) {
  if (!running) {
    running = true;
    defer(clearQueue);
  } // if the callback is defined as IMPORTANT,
  // it is assumed to be in favor of the tree
  // of the DOM  that must be added by unshift,
  // assuming that the mount will be carried
  // out in order, the shift priority only works
  // after the first render


  if (!queue.includes(callback)) queue[callback[IMPORTANT] ? "unshift" : "push"](callback);
}

const ELEMENT_PROPS = Symbol("props");
const ELEMENT_IGNORE_ATTR = Symbol("ignore");

function load(target, componentRender, componentError) {
  if (target.mount) return;
  let id = Symbol("vnode");
  let isPrevent;
  let isUnmount;
  target[ELEMENT_PROPS] = {};
  let isMounted;
  let resolveUpdate;

  let rerender = () => {
    // disables blocking, allowing the cycle to be regenerate
    isPrevent = false; // After the first render it disables the important condition

    if (rerender[IMPORTANT]) rerender[IMPORTANT] = false;

    try {
      render(hooks.load(componentRender, { ...target[ELEMENT_PROPS]
      }), target, id);
      resolveUpdate();
    } catch (e) {
      (componentError || console.error)(e);
    }
  }; // mark the first render as important, target speeds up the rendering


  rerender[IMPORTANT] = true;

  target.update = () => {
    if (isUnmount) return;
    let rendered = target.rendered;

    if (!isPrevent) {
      isPrevent = true; // create a promise to observe the status of the update

      rendered = promise(resolve => resolveUpdate = resolve).then( // the UPDATED state is only propagated through
      // the resolution of the promise
      // Why? ... to improve communication between web-component parent and children
      hooks.updated); // if the component is already mounted, avoid using target.mounted,
      // to speed up the microtask

      isMounted ? addQueue(rerender) : target.mounted.then(() => {
        isMounted = true;
        addQueue(rerender);
      });
    }

    return target.rendered = rendered;
  }; // any update from hook is added to a separate queue


  let hooks = createHooks(() => addQueue(target.update), target); // creates a collection of microtask
  // associated with the mounted of the component

  target.mounted = promise(resolve => target.mount = () => {
    isMounted = false; // allows the reuse of the component when it is isUnmounted and mounted

    if (isUnmount == true) {
      isUnmount = false;
      target.mounted = target.update();
    }

    resolve();
  });
  /**
   * creates a collection of microtask
   * associated with the unmounted of the component
   */

  target.unmounted = promise(resolve => target.unmount = () => {
    isUnmount = true;
    hooks.unmount();
    resolve();
  });
  target.initialize();
  target.update();
}
/**
 * register the component, be it a class or function
 * @param {string} nodeType
 * @param {Function} component
 * @return {Function} returns a jsx component
 */


function customElement(nodeType, component, options) {
  if (isFunction(nodeType)) {
    // By defining nodeType as a function, custom ELement
    // allows the assignment of a constructor to be extended
    let BaseElement = component || HTMLElement;
    component = nodeType;
    let {
      props,
      error
    } = component;
    /**@type {Function[]}*/

    let initialize = [];
    /**@type {string[]} */

    let attrs = [];
    let CustomElement = class extends BaseElement {
      constructor() {
        super();
        /**
         * identifier to store the virtual-dom state,
         * this is unique between instances of the
         * component to securely consider the host status
         */

        load(this, component, error);
      }

      connectedCallback() {
        load(this, component, error);
        this.mount();
      }

      disconnectedCallback() {
        this.unmount();
      }

      attributeChangedCallback(attr, oldValue, value) {
        if (attr === this[ELEMENT_IGNORE_ATTR] || oldValue === value) return;
        this[attrToProp(attr)] = value;
      }

      initialize() {
        let length = initialize.length;

        while (length--) initialize[length](this);
      }

    };
    let prototype = CustomElement.prototype;

    for (let prop in props) setProperty$1(prototype, initialize, attrs, prop, props[prop]);

    CustomElement.observedAttributes = attrs;
    CustomElement.props = props;
    return CustomElement;
  } else {
    let {
      base,
      ...opts
    } = options || {};

    let define = () => customElements.define(nodeType, customElement(component, base), opts); // it allows to wait for one or more webcomponents
    // to be defined before the definition of this


    opts.waitFor ? Promise.all([].concat(opts.waitFor).map(nodeType => customElements.whenDefined(nodeType))).then(define) : define();
    return props => opts.extends ? createElement(opts.extends, { ...props,
      is: nodeType
    }) : createElement(nodeType, props);
  }
}

function setProperty$1(prototype, initialize, attrs, prop, schema) {
  // avoid rewriting the prototype
  if (prop in prototype) return;
  let attr = propToAttr(prop);
  schema = schema == Any || schema.name ? {
    type: schema
  } : schema;
  let isTypeFunction = schema.type == Function;

  function set(nextValue) {
    let prevValue = this[ELEMENT_PROPS][prop]; // if the next value in function, with the exception of the type function,
    // will be executed to get the next value

    if (!isTypeFunction && isFunction(nextValue)) {
      nextValue = nextValue(prevValue);
    } // Evaluate the defined type, to work with the value or issue an error


    let {
      value,
      error
    } = formatType(nextValue, schema.type); // define if the definition of prop has generated a type error

    if (error && value != null) {
      throw createPropError({
        target: this,
        schema,
        value
      }, `The value defined for prop '${prop}' must be of type '${schema.type.name}'`);
    } // define if the prop definition has generated an options error


    if (schema.options && !schema.options.includes(value)) {
      throw createPropError({
        target: this,
        schema,
        value
      }, `The value defined for prop '${prop}' It is not a valid option`);
    }

    if (prevValue == value) return;
    this[ELEMENT_PROPS][prop] = value;
    let rendered = this.update();

    if (schema.event) {
      // The event is only dispatched if the component has finished
      // the rendering cycle, this is useful to observe the changes
      rendered.then(() => dispatchEvent(this, schema.event.type || prop, schema.event));
    }

    if (schema.reflect) {
      // the default properties are only reflected once the web-component is mounted
      this.mounted.then(() => {
        this[ELEMENT_IGNORE_ATTR] = attr; //update is prevented

        setAttr(this, attr, schema.type == Boolean && !value ? null : value //
        );
        this[ELEMENT_IGNORE_ATTR] = false; // an upcoming update is allowed
      });
    }
  }

  function get() {
    return this[ELEMENT_PROPS][prop];
  }

  Object.defineProperty(prototype, prop, {
    set,
    get
  });

  if ("value" in schema) {
    initialize.push(target => {
      let {
        value
      } = schema;
      target[ELEMENT_PROPS][prop] = isFunction(value) ? value() : value;
    });
  }

  attrs.push(attr);
}

function useHost() {
  return useHook(0, {
    current: HOOK_CURRENT.ref.host
  });
}

function useState(initialState) {
  let render = useRender();
  return useHook((state, type) => {
    if (HOOK_MOUNT == type) {
      state[0] = isFunction(initialState) ? initialState() : initialState;

      state[1] = nextState => {
        nextState = isFunction(nextState) ? nextState(state[0]) : nextState;

        if (nextState != state[0]) {
          state[0] = nextState;
          render();
        }
      };
    }

    return state;
  }, []);
}

function useEffect(callback, args) {
  // define whether the effect in the render cycle should be regenerated
  let executeEffect;
  useHook((state, type) => {
    if (executeEffect == null) {
      executeEffect = args && state[0] ? !isEqualArray(args, state[0]) : true;
      state[0] = args;
    }

    switch (type) {
      case HOOK_UPDATE:
      case HOOK_UNMOUNT:
        // save the current args, for comparison
        if ((executeEffect || type == HOOK_UNMOUNT) && state[1]) {
          // compare the previous snapshot with the generated state
          state[1](); // clean the effect collector

          state[1] = 0;
        } // delete the previous argument for a hook
        // run if the hook is inserted in a new node
        // Why? ... to perform again dom operations associated with the parent


        if (type == HOOK_UNMOUNT) {
          state[0] = null;
        }

        break;

      case HOOK_MOUNTED:
      case HOOK_UPDATED:
        // save the current args, for comparison, repeats due to additional type HOOK_MOUNTED
        if (executeEffect || type == HOOK_MOUNTED) {
          // save the effect collector
          state[1] = callback();
        } // save the comparison argument


        break;
    }

    return state;
  }, []);
}

function useRef(current) {
  return useHook(0, {
    current
  });
}

function useEvent(type, customEventInit) {
  let ref = useHost();

  if (!ref[type]) {
    ref[type] = detail => dispatchEvent(ref.current, type, detail ? { ...customEventInit,
      detail
    } : customEventInit);
  }

  return ref[type];
}

export { Any as A, useEvent as a, useEffect as b, customElement as c, createElement as d, useRef as e, useState as f, render as r, useHost as u };
//# sourceMappingURL=d1ffcc7b.js.map
