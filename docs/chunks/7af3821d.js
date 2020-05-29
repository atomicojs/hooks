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

function o(e, t) {
  let n = e.length;
  if (n !== t.length) return !1;

  for (let r = 0; r < n; r++) if (e[r] !== t[r]) return !1;

  return !0;
}

const l = e => "function" == typeof e,
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

      let o = typeof i;
      i = null == i || "boolean" == o || "function" == o ? "" : i, n.push(i);
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
  let o = t[e] ? t[e].vnode : f,
      l = o.props || f,
      u = o.children || h,
      c = i || !t[e] ? {} : t[e].handlers;

  if (n.shadow && (t.shadowRoot || t.attachShadow({
    mode: "open"
  })), n.props != l && v(t, l, n.props, c, r), n.children != u) {
    !function (e, t, n, r) {
      let i = n._,
          o = n.length,
          l = t.childNodes,
          u = {},
          c = l.length,
          a = i ? 0 : c > o ? o : c;

      for (; a < c; a++) {
        let e = l[a];

        if (i) {
          let t = e[s];

          if (i[t]) {
            u[t] = e;
            continue;
          }
        }

        a--, c--, e.remove();
      }

      for (let s = 0; s < o; s++) {
        let o = n[s],
            c = l[s],
            a = i ? o.key : s,
            f = i ? u[a] : c;
        if (i && f && f != c && t.insertBefore(f, c), i && !o.key) continue;
        let h = m(e, f, o, r);
        f ? h != f && t.replaceChild(h, f) : l[s] ? t.insertBefore(h, l[s]) : t.appendChild(h);
      }
    }(e, n.shadow ? t.shadowRoot : t, n.children, r);
  }

  return t[e] = {
    vnode: n,
    handlers: c
  }, t;
}

function v(e, t, n, r, i) {
  for (let o in t) o in n || b(e, o, t[o], null, i, r);

  for (let o in n) b(e, o, t[o], n[o], i, r);
}

function b(e, t, n, r, i, o) {
  if (n = null == n ? null : n, r = null == r ? null : r, (t = "class" != t || i ? t : "className") in e && a[t] && (n = e[t]), r !== n && "shadowDom" != t) if ("o" == t[0] && "n" == t[1] && (l(r) || l(n))) w(e, t, r, o);else if ("key" == t) e[s] = r;else if ("ref" == t) r && (r.current = e);else if ("style" == t) {
    let t = e.style;
    r = r || "";
    let i = u(n = n || ""),
        o = u(r);
    if (i) for (let e in n) {
      if (!o) break;
      e in r || _(t, e, null);
    }
    if (o) for (let e in r) {
      let o = r[e];
      i && n[e] === o || _(t, e, o);
    } else t.cssText = r;
  } else !i && "list" != t && "type" != t && "size" != t && "form" != t && t in e ? e[t] = null == r ? "" : r : null == r ? e.removeAttribute(t) : (console.log({
    key: t
  }), e.setAttribute(t, u(r) ? JSON.stringify(r) : r));
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
      type: o,
      reflect: s,
      event: c,
      value: a,
      attr: f = S(t)
    } = u(n) && null != n ? n : {
      type: n
    },
        h = !E.includes(o);
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
        }(o, h && l(e) ? e(n) : e);

        if (r && null != i) throw `The value defined for prop '${t}' must be of type '${o.name}'`;
        n != i && (this._props[t] = i, this._update(), this.updated.then(() => {
          c && N(this, c), s && (this._ignoreAttr = f, ((e, t, n, r) => {
            null == r || t == Boolean && !r ? e.removeAttribute(n) : e.setAttribute(n, u(r) ? JSON.stringify(r) : t == Boolean ? "" : r);
          })(this, o, f, this[t]), this._ignoreAttr = null);
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
        y(o.load(r, { ...this._props
        }), this, i), o.updated();
      };

      let o = function (r, i) {
        let o,
            l = {},
            u = {
          use: function (n, r) {
            let i,
                o = e.index++;
            l[o] || (l[o] = [null, r], i = 1);
            return l[o][0] = n, t(l[o], i ? 1 : 3), l[o];
          },
          load: function (t, n) {
            e.index = 0, e.ref = s;
            let r = t(n);
            return e.ref = 0, r;
          },
          updated: function () {
            let e = o ? 4 : 2;
            o = 1, n(l, e);
          },
          unmount: function () {
            n(l, 5);
          }
        },
            s = {
          hook: u,
          host: i,
          render: r
        };
        return u;
      }(() => this._update(), this);

      await this.unmounted, o.unmount();
    }

  };
  return i.props = r.props, i;
}

const T = (e, t) => l(e) ? C(e) : customElements.define(e, C(t));

function O() {
  return r(0, {
    current: e.ref.host
  });
}

function P(e) {
  let t = i();
  return r((n, r) => (1 == r && (n[0] = l(e) ? e() : e, n[1] = e => {
    (e = l(e) ? e(n[0]) : e) != n[0] && (n[0] = e, t());
  }), n), []);
}

function B(e, t) {
  let n;
  r((r, i) => {
    switch (null == n && (n = !t || !r[0] || !o(t, r[0]), r[0] = t), i) {
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
//# sourceMappingURL=7af3821d.js.map
