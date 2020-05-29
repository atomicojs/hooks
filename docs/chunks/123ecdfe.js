const e = {};

function t(e, t) {
  e[0] && (e[1] = e[0](e[1], t));
}

function n(e, n) {
  for (let r in e) t(e[r], n);
}

function r(t, n) {
  if (e.ref.hook) return e.ref.hook.use(t, n)[1];
}

function i() {
  return e.ref.render;
}

function l(e, t) {
  let n = e.length;
  if (n !== t.length) return !1;

  for (let r = 0; r < n; r++) if (e[r] !== t[r]) return !1;

  return !0;
}

const o = e => "function" == typeof e,
      u = e => "object" == typeof e,
      s = Symbol(""),
      c = Symbol(""),
      a = {
  id: 1,
  className: 1,
  checked: 1,
  value: 1,
  selected: 1
},
      f = {},
      h = [],
      p = document;

function d(e, t, ...n) {
  return (n = function e(t, n = []) {
    for (let r = 0; r < t.length; r++) {
      let i = t[r];

      if (i) {
        if (Array.isArray(i)) {
          e(i, n);
          continue;
        }

        null != i.key && (n._ || (n._ = {}), n._[i.key] = 1);
      }

      let l = typeof i;
      i = null == i || "boolean" == l || "function" == l ? "" : i, n.push(i);
    }

    return n;
  }((t = t || f).children || n)).length || (n = h), {
    type: e,
    props: t,
    children: n,
    key: t.key,
    shadow: t.shadowDom,
    raw: 1 == e.nodeType
  };
}

function y(e, t, n = c) {
  m(n, t, e);
}

function m(e, t, n, r) {
  let i;

  if ((null != n || !t) && (r = r || "svg" == n.type, i = "host" != n.type && (n.raw ? t != n.type : t ? t.localName != n.type : !t), i)) {
    let e;
    if (null == n.type) return p.createTextNode(n + "");
    if (n.type.nodeType) return n.type;
    e = r ? p.createElementNS("http://www.w3.org/2000/svg", n.type) : p.createElement(n.type, n.is ? {
      is: n.is
    } : null), t = e;
  }

  if (3 == t.nodeType) return n += "", t.data != n && (t.data = n || ""), t;
  let l = t[e] ? t[e].vnode : f,
      o = l.props || f,
      u = l.children || h,
      c = i || !t[e] ? {} : t[e].handlers;

  if (n.shadow && (t.shadowRoot || t.attachShadow({
    mode: "open"
  })), n.props != o && v(t, o, n.props, c, r), n.children != u) {
    !function (e, t, n, r) {
      let i = n._,
          l = n.length,
          o = t.childNodes,
          u = {},
          c = o.length,
          a = i ? 0 : c > l ? l : c;

      for (; a < c; a++) {
        let e = o[a];

        if (i) {
          let t = e[s];

          if (i[t]) {
            u[t] = e;
            continue;
          }
        }

        a--, c--, e.remove();
      }

      for (let s = 0; s < l; s++) {
        let l = n[s],
            c = o[s],
            a = i ? l.key : s,
            f = i ? u[a] : c;
        if (i && f && f != c && t.insertBefore(f, c), i && !l.key) continue;
        let h = m(e, f, l, r);
        f ? h != f && t.replaceChild(h, f) : o[s] ? t.insertBefore(h, o[s]) : t.appendChild(h);
      }
    }(e, n.shadow ? t.shadowRoot : t, n.children, r);
  }

  return t[e] = {
    vnode: n,
    handlers: c
  }, t;
}

function v(e, t, n, r, i) {
  for (let l in t) l in n || b(e, l, t[l], null, i, r);

  for (let l in n) b(e, l, t[l], n[l], i, r);
}

function b(e, t, n, r, i, l) {
  if (n = null == n ? null : n, r = null == r ? null : r, (t = "class" != t || i ? t : "className") in e && a[t] && (n = e[t]), r !== n && "shadowDom" != t) if ("o" == t[0] && "n" == t[1] && (o(r) || o(n))) w(e, t, r, l);else if ("key" == t) e[s] = r;else if ("ref" == t) r && (r.current = e);else if ("style" == t) {
    let t = e.style;
    r = r || "";
    let i = u(n = n || ""),
        l = u(r);
    if (i) for (let e in n) {
      if (!l) break;
      e in r || _(t, e, null);
    }
    if (l) for (let e in r) {
      let l = r[e];
      i && n[e] === l || _(t, e, l);
    } else t.cssText = r;
  } else !i && "list" != t && "type" != t && "size" != t && "form" != t && t in e ? e[t] = null == r ? "" : r : null == r ? e.removeAttribute(t) : e.setAttribute(t, u(r) ? JSON.stringify(r) : r);
}

function w(e, t, n, r) {
  t = t.slice("-" == t[2] ? 3 : 2), r.handleEvent || (r.handleEvent = t => r[t.type].call(e, t)), n ? (r[t] || e.addEventListener(t, r), r[t] = n) : r[t] && (e.removeEventListener(t, r), delete r[t]);
}

function _(e, t, n) {
  let r = "setProperty";
  null == n && (r = "removeProperty", n = null), ~t.indexOf("-") ? e[r](t, n) : e[t] = n;
}

const g = null;

class k extends HTMLElement {
  constructor() {
    super(), this._create();
  }

  async _update() {
    if (!this._prevent) {
      let e;
      this._prevent = !0, this.updated = new Promise(t => e = t), await this.mounted, this._prevent = !1, this.update(), e();
    }
  }

  static get observedAttributes() {
    let {
      props: e = {}
    } = this,
        t = [],
        n = [];

    for (let r in e) x(this.prototype, r, e[r], n, t);

    return this.prototype._create = function () {
      this._attrs = {}, this._props = {}, t.forEach(e => e(this)), this.mounted = new Promise(e => this.mount = e), this.unmounted = new Promise(e => this.unmount = e), this.create && this.create(), this._update();
    }, n;
  }

  attributeChangedCallback(e, t, n) {
    e !== this._ignoreAttr && t !== n && (this[this._attrs[e]] = n);
  }

  connectedCallback() {
    this.mount();
  }

  disconnectedCallback() {
    this.unmount();
  }

}

const N = (e, t, n) => e.dispatchEvent(new CustomEvent(t, u(n) ? n : null)),
      A = [!0, 1, "", "1", "true"],
      E = [Function, null],
      S = e => e.replace(/([A-Z])/g, "-$1").toLowerCase();

function x(e, t, n, r, i) {
  if (!(t in e)) {
    let {
      type: l,
      reflect: s,
      event: c,
      value: a,
      attr: f = S(t)
    } = u(n) && null != n ? n : {
      type: n
    },
        h = !E.includes(l);
    r.push(f), Object.defineProperty(e, t, {
      set: function (e) {
        let n = this[t],
            {
          error: r,
          value: i
        } = function (e, t) {
          if (null == e) return {
            value: t
          };

          try {
            if (e == Boolean ? t = A.includes(t) : "string" == typeof t && (t = e == Number ? Number(t) : e == Object || e == Array ? JSON.parse(t) : t), {}.toString.call(t) == `[object ${e.name}]`) return {
              value: t,
              error: e == Number && Number.isNaN(t)
            };
          } catch (e) {}

          return {
            value: t,
            error: !0
          };
        }(l, h && o(e) ? e(n) : e);

        if (r && null != i) throw `The value defined for prop '${t}' must be of type '${l.name}'`;
        n != i && (this._props[t] = i, this._update(), this.updated.then(() => {
          c && N(this, c), s && (this._ignoreAttr = f, ((e, t, n, r) => {
            null == r || t == Boolean && !r ? e.removeAttribute(n) : e.setAttribute(n, u(r) ? JSON.stringify(r) : t == Boolean ? "" : r);
          })(this, l, f, this[t]), this._ignoreAttr = null);
        }));
      },

      get() {
        return this._props[t];
      }

    }), i.push(e => {
      null != a && (e[t] = a), e._attrs[f] = t;
    });
  }
}

function C(r) {
  let i = class extends k {
    async create() {
      let i = Symbol();

      this.update = () => {
        y(l.load(r, { ...this._props
        }), this, i), l.updated();
      };

      let l = function (r, i) {
        let l,
            o = {},
            u = {
          use: function (n, r) {
            let i,
                l = e.index++;
            o[l] || (o[l] = [null, r], i = 1);
            return o[l][0] = n, t(o[l], i ? 1 : 3), o[l];
          },
          load: function (t, n) {
            e.index = 0, e.ref = s;
            let r = t(n);
            return e.ref = 0, r;
          },
          updated: function () {
            let e = l ? 4 : 2;
            l = 1, n(o, e);
          },
          unmount: function () {
            n(o, 5);
          }
        },
            s = {
          hook: u,
          host: i,
          render: r
        };
        return u;
      }(() => this._update(), this);

      await this.unmounted, l.unmount();
    }

  };
  return i.props = r.props, i;
}

const T = (e, t) => o(e) ? C(e) : customElements.define(e, C(t));

function O() {
  return r(0, {
    current: e.ref.host
  });
}

function P(e) {
  let t = i();
  return r((n, r) => (1 == r && (n[0] = o(e) ? e() : e, n[1] = e => {
    (e = o(e) ? e(n[0]) : e) != n[0] && (n[0] = e, t());
  }), n), []);
}

function B(e, t) {
  let n;
  r((r, i) => {
    switch (null == n && (n = !t || !r[0] || !l(t, r[0]), r[0] = t), i) {
      case 3:
      case 5:
        (n || 5 == i) && r[1] && (r[1](), r[1] = 0), 5 == i && (r[0] = null);
        break;

      case 2:
      case 4:
        (n || 2 == i) && (r[1] = e());
    }

    return r;
  }, []);
}

function j(e) {
  return r(0, {
    current: e
  });
}

function R(e, t) {
  let n = O();
  return n[e] || (n[e] = r => N(n.current, e, r ? { ...t,
    detail: r
  } : t)), n[e];
}

export { B, O, P, R, T, d, g, j, y };
//# sourceMappingURL=123ecdfe.js.map
