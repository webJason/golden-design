function Yt(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function Fe(e) {
  if (d(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = R(s) ? kt(s) : Fe(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else {
    if (R(e))
      return e;
    if (w(e))
      return e;
  }
}
const Qt = /;(?![^(]*\))/g, Xt = /:([^]+)/, Zt = /\/\*.*?\*\//gs;
function kt(e) {
  const t = {};
  return e.replace(Zt, "").split(Qt).forEach((n) => {
    if (n) {
      const s = n.split(Xt);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function be(e) {
  let t = "";
  if (R(e))
    t = e;
  else if (d(e))
    for (let n = 0; n < e.length; n++) {
      const s = be(e[n]);
      s && (t += s + " ");
    }
  else if (w(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const en = (e) => R(e) ? e : e == null ? "" : d(e) || w(e) && (e.toString === pt || !N(e.toString)) ? JSON.stringify(e, ut, 2) : String(e), ut = (e, t) => t && t.__v_isRef ? ut(e, t.value) : B(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r]) => (n[`${s} =>`] = r, n), {})
} : ft(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : w(t) && !d(t) && !ht(t) ? String(t) : t, v = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, tn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], at = () => {
}, nn = /^on[^a-z]/, rn = (e) => nn.test(e), C = Object.assign, sn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, on = Object.prototype.hasOwnProperty, g = (e, t) => on.call(e, t), d = Array.isArray, B = (e) => Oe(e) === "[object Map]", ft = (e) => Oe(e) === "[object Set]", N = (e) => typeof e == "function", R = (e) => typeof e == "string", je = (e) => typeof e == "symbol", w = (e) => e !== null && typeof e == "object", cn = (e) => w(e) && N(e.then) && N(e.catch), pt = Object.prototype.toString, Oe = (e) => pt.call(e), dt = (e) => Oe(e).slice(8, -1), ht = (e) => Oe(e) === "[object Object]", Ae = (e) => R(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ln = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, un = ln((e) => e.charAt(0).toUpperCase() + e.slice(1)), ne = (e, t) => !Object.is(e, t), an = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let Ye;
const fn = () => Ye || (Ye = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Qe(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let _t;
function pn(e, t = _t) {
  t && t.active && t.effects.push(e);
}
function dn() {
  return _t;
}
const re = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, gt = (e) => (e.w & H) > 0, mt = (e) => (e.n & H) > 0, hn = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= H;
}, _n = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      gt(r) && !mt(r) ? r.delete(e) : t[n++] = r, r.w &= ~H, r.n &= ~H;
    }
    t.length = n;
  }
}, Re = /* @__PURE__ */ new WeakMap();
let k = 0, H = 1;
const Ie = 30;
let O;
const G = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), $e = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class gn {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, pn(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = O, n = z;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = O, O = this, z = !0, H = 1 << ++k, k <= Ie ? hn(this) : Xe(this), this.fn();
    } finally {
      k <= Ie && _n(this), H = 1 << --k, O = this.parent, z = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    O === this ? this.deferStop = !0 : this.active && (Xe(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Xe(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let z = !0;
const Et = [];
function Nt() {
  Et.push(z), z = !1;
}
function wt() {
  const e = Et.pop();
  z = e === void 0 ? !0 : e;
}
function y(e, t, n) {
  if (z && O) {
    let s = Re.get(e);
    s || Re.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = re());
    const o = process.env.NODE_ENV !== "production" ? { effect: O, target: e, type: t, key: n } : void 0;
    Ce(r, o);
  }
}
function Ce(e, t) {
  let n = !1;
  k <= Ie ? mt(e) || (e.n |= H, n = !gt(e)) : n = !e.has(O), n && (e.add(O), O.deps.push(e), process.env.NODE_ENV !== "production" && O.onTrack && O.onTrack(Object.assign({ effect: O }, t)));
}
function K(e, t, n, s, r, o) {
  const i = Re.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && d(e)) {
    const p = Number(s);
    i.forEach((h, l) => {
      (l === "length" || l >= p) && c.push(h);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        d(e) ? Ae(n) && c.push(i.get("length")) : (c.push(i.get(G)), B(e) && c.push(i.get($e)));
        break;
      case "delete":
        d(e) || (c.push(i.get(G)), B(e) && c.push(i.get($e)));
        break;
      case "set":
        B(e) && c.push(i.get(G));
        break;
    }
  const u = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: s, oldValue: r, oldTarget: o } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? Y(c[0], u) : Y(c[0]));
  else {
    const p = [];
    for (const h of c)
      h && p.push(...h);
    process.env.NODE_ENV !== "production" ? Y(re(p), u) : Y(re(p));
  }
}
function Y(e, t) {
  const n = d(e) ? e : [...e];
  for (const s of n)
    s.computed && Ze(s, t);
  for (const s of n)
    s.computed || Ze(s, t);
}
function Ze(e, t) {
  (e !== O || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(C({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const mn = /* @__PURE__ */ Yt("__proto__,__v_isRef,__isVue"), bt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(je)
), En = /* @__PURE__ */ ze(), Nn = /* @__PURE__ */ ze(!0), wn = /* @__PURE__ */ ze(!0, !0), ke = /* @__PURE__ */ bn();
function bn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = f(this);
      for (let o = 0, i = this.length; o < i; o++)
        y(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(f)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Nt();
      const s = f(this)[t].apply(this, n);
      return wt(), s;
    };
  }), e;
}
function On(e) {
  const t = f(this);
  return y(t, "has", e), t.hasOwnProperty(e);
}
function ze(e = !1, t = !1) {
  return function(s, r, o) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && o === (e ? t ? yt : xt : t ? An : Vt).get(s))
      return s;
    const i = d(s);
    if (!e) {
      if (i && g(ke, r))
        return Reflect.get(ke, r, o);
      if (r === "hasOwnProperty")
        return On;
    }
    const c = Reflect.get(s, r, o);
    return (je(r) ? bt.has(r) : mn(r)) || (e || y(s, "get", r), t) ? c : V(c) ? i && Ae(r) ? c : c.value : w(c) ? e ? Rt(c) : Dt(c) : c;
  };
}
const Sn = /* @__PURE__ */ Vn();
function Vn(e = !1) {
  return function(n, s, r, o) {
    let i = n[s];
    if (W(i) && V(i) && !V(r))
      return !1;
    if (!e && (!ge(r) && !W(r) && (i = f(i), r = f(r)), !d(n) && V(i) && !V(r)))
      return i.value = r, !0;
    const c = d(n) && Ae(s) ? Number(s) < n.length : g(n, s), u = Reflect.set(n, s, r, o);
    return n === f(o) && (c ? ne(r, i) && K(n, "set", s, r, i) : K(n, "add", s, r)), u;
  };
}
function xn(e, t) {
  const n = g(e, t), s = e[t], r = Reflect.deleteProperty(e, t);
  return r && n && K(e, "delete", t, void 0, s), r;
}
function yn(e, t) {
  const n = Reflect.has(e, t);
  return (!je(t) || !bt.has(t)) && y(e, "has", t), n;
}
function Dn(e) {
  return y(e, "iterate", d(e) ? "length" : G), Reflect.ownKeys(e);
}
const Rn = {
  get: En,
  set: Sn,
  deleteProperty: xn,
  has: yn,
  ownKeys: Dn
}, Ot = {
  get: Nn,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && Qe(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && Qe(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, In = /* @__PURE__ */ C({}, Ot, {
  get: wn
}), He = (e) => e, Se = (e) => Reflect.getPrototypeOf(e);
function ce(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = f(e), o = f(t);
  n || (t !== o && y(r, "get", t), y(r, "get", o));
  const { has: i } = Se(r), c = s ? He : n ? Ue : se;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, o))
    return c(e.get(o));
  e !== r && e.get(t);
}
function le(e, t = !1) {
  const n = this.__v_raw, s = f(n), r = f(e);
  return t || (e !== r && y(s, "has", e), y(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function ue(e, t = !1) {
  return e = e.__v_raw, !t && y(f(e), "iterate", G), Reflect.get(e, "size", e);
}
function et(e) {
  e = f(e);
  const t = f(this);
  return Se(t).has.call(t, e) || (t.add(e), K(t, "add", e, e)), this;
}
function tt(e, t) {
  t = f(t);
  const n = f(this), { has: s, get: r } = Se(n);
  let o = s.call(n, e);
  o ? process.env.NODE_ENV !== "production" && St(n, s, e) : (e = f(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? ne(t, i) && K(n, "set", e, t, i) : K(n, "add", e, t), this;
}
function nt(e) {
  const t = f(this), { has: n, get: s } = Se(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && St(t, n, e) : (e = f(e), r = n.call(t, e));
  const o = s ? s.call(t, e) : void 0, i = t.delete(e);
  return r && K(t, "delete", e, void 0, o), i;
}
function rt() {
  const e = f(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? B(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && K(e, "clear", void 0, void 0, n), s;
}
function ae(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, c = f(i), u = t ? He : e ? Ue : se;
    return !e && y(c, "iterate", G), i.forEach((p, h) => s.call(r, u(p), u(h), o));
  };
}
function fe(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = f(r), i = B(o), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, p = r[e](...s), h = n ? He : t ? Ue : se;
    return !t && y(o, "iterate", u ? $e : G), {
      // iterator protocol
      next() {
        const { value: l, done: a } = p.next();
        return a ? { value: l, done: a } : {
          value: c ? [h(l[0]), h(l[1])] : h(l),
          done: a
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function M(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${un(e)} operation ${n}failed: target is readonly.`, f(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function $n() {
  const e = {
    get(o) {
      return ce(this, o);
    },
    get size() {
      return ue(this);
    },
    has: le,
    add: et,
    set: tt,
    delete: nt,
    clear: rt,
    forEach: ae(!1, !1)
  }, t = {
    get(o) {
      return ce(this, o, !1, !0);
    },
    get size() {
      return ue(this);
    },
    has: le,
    add: et,
    set: tt,
    delete: nt,
    clear: rt,
    forEach: ae(!1, !0)
  }, n = {
    get(o) {
      return ce(this, o, !0);
    },
    get size() {
      return ue(this, !0);
    },
    has(o) {
      return le.call(this, o, !0);
    },
    add: M(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: M(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: M(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: M(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: ae(!0, !1)
  }, s = {
    get(o) {
      return ce(this, o, !0, !0);
    },
    get size() {
      return ue(this, !0);
    },
    has(o) {
      return le.call(this, o, !0);
    },
    add: M(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: M(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: M(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: M(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: ae(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = fe(o, !1, !1), n[o] = fe(o, !0, !1), t[o] = fe(o, !1, !0), s[o] = fe(o, !0, !0);
  }), [
    e,
    n,
    t,
    s
  ];
}
const [Cn, Tn, vn, Pn] = /* @__PURE__ */ $n();
function Ke(e, t) {
  const n = t ? e ? Pn : vn : e ? Tn : Cn;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(g(n, r) && r in s ? n : s, r, o);
}
const Mn = {
  get: /* @__PURE__ */ Ke(!1, !1)
}, Fn = {
  get: /* @__PURE__ */ Ke(!0, !1)
}, jn = {
  get: /* @__PURE__ */ Ke(!0, !0)
};
function St(e, t, n) {
  const s = f(n);
  if (s !== n && t.call(e, s)) {
    const r = dt(e);
    console.warn(`Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const Vt = /* @__PURE__ */ new WeakMap(), An = /* @__PURE__ */ new WeakMap(), xt = /* @__PURE__ */ new WeakMap(), yt = /* @__PURE__ */ new WeakMap();
function zn(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Hn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : zn(dt(e));
}
function Dt(e) {
  return W(e) ? e : We(e, !1, Rn, Mn, Vt);
}
function Rt(e) {
  return We(e, !0, Ot, Fn, xt);
}
function pe(e) {
  return We(e, !0, In, jn, yt);
}
function We(e, t, n, s, r) {
  if (!w(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = Hn(e);
  if (i === 0)
    return e;
  const c = new Proxy(e, i === 2 ? s : n);
  return r.set(e, c), c;
}
function J(e) {
  return W(e) ? J(e.__v_raw) : !!(e && e.__v_isReactive);
}
function W(e) {
  return !!(e && e.__v_isReadonly);
}
function ge(e) {
  return !!(e && e.__v_isShallow);
}
function Te(e) {
  return J(e) || W(e);
}
function f(e) {
  const t = e && e.__v_raw;
  return t ? f(t) : e;
}
function Kn(e) {
  return an(e, "__v_skip", !0), e;
}
const se = (e) => w(e) ? Dt(e) : e, Ue = (e) => w(e) ? Rt(e) : e;
function Wn(e) {
  z && O && (e = f(e), process.env.NODE_ENV !== "production" ? Ce(e.dep || (e.dep = re()), {
    target: e,
    type: "get",
    key: "value"
  }) : Ce(e.dep || (e.dep = re())));
}
function Un(e, t) {
  e = f(e);
  const n = e.dep;
  n && (process.env.NODE_ENV !== "production" ? Y(n, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : Y(n));
}
function V(e) {
  return !!(e && e.__v_isRef === !0);
}
function Bn(e) {
  return Gn(e, !1);
}
function Gn(e, t) {
  return V(e) ? e : new Jn(e, t);
}
class Jn {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : f(t), this._value = n ? t : se(t);
  }
  get value() {
    return Wn(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || ge(t) || W(t);
    t = n ? t : f(t), ne(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : se(t), Un(this, t));
  }
}
function qn(e) {
  return V(e) ? e.value : e;
}
const Ln = {
  get: (e, t, n) => qn(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return V(r) && !V(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Yn(e) {
  return J(e) ? e : new Proxy(e, Ln);
}
const q = [];
function Qn(e) {
  q.push(e);
}
function Xn() {
  q.pop();
}
function S(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  Nt();
  const n = q.length ? q[q.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = Zn();
  if (s)
    L(s, n, 11, [
      e + t.join(""),
      n && n.proxy,
      r.map(({ vnode: o }) => `at <${Gt(n, o.type)}>`).join(`
`),
      r
    ]);
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...kn(r)), console.warn(...o);
  }
  wt();
}
function Zn() {
  let e = q[q.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function kn(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...er(n));
  }), t;
}
function er({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${Gt(e.component, e.type, s)}`, o = ">" + n;
  return e.props ? [r, ...tr(e.props), o] : [r + o];
}
function tr(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...It(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function It(e, t, n) {
  return R(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : V(t) ? (t = It(e, f(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : N(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = f(t), n ? t : [`${e}=`, t]);
}
const $t = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function L(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    Ct(o, t, n);
  }
  return r;
}
function ve(e, t, n, s) {
  if (N(e)) {
    const o = L(e, t, n, s);
    return o && cn(o) && o.catch((i) => {
      Ct(i, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(ve(e[o], t, n, s));
  return r;
}
function Ct(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? $t[n] : n;
    for (; o; ) {
      const p = o.ec;
      if (p) {
        for (let h = 0; h < p.length; h++)
          if (p[h](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      L(u, null, 10, [e, i, c]);
      return;
    }
  }
  nr(e, n, r, s);
}
function nr(e, t, n, s = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = $t[t];
    if (n && Qn(n), S(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Xn(), s)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let me = !1, Pe = !1;
const I = [];
let j = 0;
const X = [];
let T = null, F = 0;
const Tt = /* @__PURE__ */ Promise.resolve();
let Be = null;
const rr = 100;
function sr(e) {
  const t = Be || Tt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function or(e) {
  let t = j + 1, n = I.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    oe(I[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function Ge(e) {
  (!I.length || !I.includes(e, me && e.allowRecurse ? j + 1 : j)) && (e.id == null ? I.push(e) : I.splice(or(e.id), 0, e), vt());
}
function vt() {
  !me && !Pe && (Pe = !0, Be = Tt.then(Mt));
}
function Pt(e) {
  d(e) ? X.push(...e) : (!T || !T.includes(e, e.allowRecurse ? F + 1 : F)) && X.push(e), vt();
}
function ir(e) {
  if (X.length) {
    const t = [...new Set(X)];
    if (X.length = 0, T) {
      T.push(...t);
      return;
    }
    for (T = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), T.sort((n, s) => oe(n) - oe(s)), F = 0; F < T.length; F++)
      process.env.NODE_ENV !== "production" && Ft(e, T[F]) || T[F]();
    T = null, F = 0;
  }
}
const oe = (e) => e.id == null ? 1 / 0 : e.id, cr = (e, t) => {
  const n = oe(e) - oe(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Mt(e) {
  Pe = !1, me = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), I.sort(cr);
  const t = process.env.NODE_ENV !== "production" ? (n) => Ft(e, n) : at;
  try {
    for (j = 0; j < I.length; j++) {
      const n = I[j];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        L(
          n,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    j = 0, I.length = 0, ir(e), me = !1, Be = null, (I.length || X.length) && Mt(e);
  }
}
function Ft(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > rr) {
      const s = t.ownerInstance, r = s && Bt(s.type);
      return S(`Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
const Z = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (fn().__VUE_HMR_RUNTIME__ = {
  createRecord: xe(lr),
  rerender: xe(ur),
  reload: xe(ar)
});
const Ee = /* @__PURE__ */ new Map();
function lr(e, t) {
  return Ee.has(e) ? !1 : (Ee.set(e, {
    initialDef: ee(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ee(e) {
  return Jt(e) ? e.__vccOpts : e;
}
function ur(e, t) {
  const n = Ee.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, ee(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function ar(e, t) {
  const n = Ee.get(e);
  if (!n)
    return;
  t = ee(t), st(n.initialDef, t);
  const s = [...n.instances];
  for (const r of s) {
    const o = ee(r.type);
    Z.has(o) || (o !== n.initialDef && st(o, t), Z.add(o)), r.appContext.optionsCache.delete(r.type), r.ceReload ? (Z.add(o), r.ceReload(t.styles), Z.delete(o)) : r.parent ? Ge(r.parent.update) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  Pt(() => {
    for (const r of s)
      Z.delete(ee(r.type));
  });
}
function st(e, t) {
  C(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function xe(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let A = null, Je = null;
function fr(e) {
  Je = e;
}
function pr() {
  Je = null;
}
const dr = (e) => e.__isSuspense;
function hr(e, t) {
  t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : Pt(e);
}
const de = {};
function _r(e, t, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = v) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && S('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), s !== void 0 && S('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const c = (_) => {
    S("Invalid watch source: ", _, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, u = dn() === (P == null ? void 0 : P.scope) ? P : null;
  let p, h = !1, l = !1;
  if (V(e) ? (p = () => e.value, h = ge(e)) : J(e) ? (p = () => e, s = !0) : d(e) ? (l = !0, h = e.some((_) => J(_) || ge(_)), p = () => e.map((_) => {
    if (V(_))
      return _.value;
    if (J(_))
      return Q(_);
    if (N(_))
      return L(
        _,
        u,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    process.env.NODE_ENV !== "production" && c(_);
  })) : N(e) ? t ? p = () => L(
    e,
    u,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : p = () => {
    if (!(u && u.isUnmounted))
      return a && a(), ve(e, u, 3, [m]);
  } : (p = at, process.env.NODE_ENV !== "production" && c(e)), t && s) {
    const _ = p;
    p = () => Q(_());
  }
  let a, m = (_) => {
    a = D.onStop = () => {
      L(
        _,
        u,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, E = l ? new Array(e.length).fill(de) : de;
  const x = () => {
    if (D.active)
      if (t) {
        const _ = D.run();
        (s || h || (l ? _.some((qt, Lt) => ne(qt, E[Lt])) : ne(_, E))) && (a && a(), ve(t, u, 3, [
          _,
          // pass undefined as the old value when it's changed for the first time
          E === de ? void 0 : l && E[0] === de ? [] : E,
          m
        ]), E = _);
      } else
        D.run();
  };
  x.allowRecurse = !!t;
  let ie;
  r === "sync" ? ie = x : r === "post" ? ie = () => ct(x, u && u.suspense) : (x.pre = !0, u && (x.id = u.uid), ie = () => Ge(x));
  const D = new gn(p, ie);
  return process.env.NODE_ENV !== "production" && (D.onTrack = o, D.onTrigger = i), t ? n ? x() : E = D.run() : r === "post" ? ct(D.run.bind(D), u && u.suspense) : D.run(), () => {
    D.stop(), u && u.scope && sn(u.scope.effects, D);
  };
}
function gr(e, t, n) {
  const s = this.proxy, r = R(e) ? e.includes(".") ? mr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  N(t) ? o = t : (o = t.handler, n = t);
  const i = P;
  lt(this);
  const c = _r(r, o.bind(s), n);
  return i ? lt(i) : Fr(), c;
}
function mr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function Q(e, t) {
  if (!w(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), V(e))
    Q(e.value, t);
  else if (d(e))
    for (let n = 0; n < e.length; n++)
      Q(e[n], t);
  else if (ft(e) || B(e))
    e.forEach((n) => {
      Q(n, t);
    });
  else if (ht(e))
    for (const n in e)
      Q(e[n], t);
  return e;
}
function qe(e) {
  return N(e) ? { setup: e, name: e.name } : e;
}
const Er = Symbol(), Me = (e) => e ? jr(e) ? Ar(e) || e.proxy : Me(e.parent) : null, te = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ C(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? pe(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? pe(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? pe(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? pe(e.refs) : e.refs,
    $parent: (e) => Me(e.parent),
    $root: (e) => Me(e.root),
    $emit: (e) => e.emit,
    $options: (e) => br(e),
    $forceUpdate: (e) => e.f || (e.f = () => Ge(e.update)),
    $nextTick: (e) => e.n || (e.n = sr.bind(e.proxy)),
    $watch: (e) => gr.bind(e)
  })
), Nr = (e) => e === "_" || e === "$", ye = (e, t) => e !== v && !e.__isScriptSetup && g(e, t), wr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let p;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (ye(s, t))
          return i[t] = 1, s[t];
        if (r !== v && g(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && g(p, t)
        )
          return i[t] = 3, o[t];
        if (n !== v && g(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const h = te[t];
    let l, a;
    if (h)
      return t === "$attrs" && (y(e, "get", t), process.env.NODE_ENV !== "production" && void 0), h(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== v && g(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      a = u.config.globalProperties, g(a, t)
    )
      return a[t];
    process.env.NODE_ENV !== "production" && A && (!R(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== v && Nr(t[0]) && g(r, t) ? S(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === A && S(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return ye(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && g(r, t) ? (S(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== v && g(s, t) ? (s[t] = n, !0) : g(e.props, t) ? (process.env.NODE_ENV !== "production" && S(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && S(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o } }, i) {
    let c;
    return !!n[i] || e !== v && g(e, i) || ye(t, i) || (c = o[0]) && g(c, i) || g(s, i) || g(te, i) || g(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : g(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (wr.ownKeys = (e) => (S("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function br(e) {
  const t = e.type, { mixins: n, extends: s } = t, { mixins: r, optionsCache: o, config: { optionMergeStrategies: i } } = e.appContext, c = o.get(t);
  let u;
  return c ? u = c : !r.length && !n && !s ? u = t : (u = {}, r.length && r.forEach((p) => Ne(u, p, i, !0)), Ne(u, t, i)), w(t) && o.set(t, u), u;
}
function Ne(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Ne(e, o, n, !0), r && r.forEach((i) => Ne(e, i, n, !0));
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && S('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const c = Or[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Or = {
  data: ot,
  props: U,
  emits: U,
  // objects
  methods: U,
  computed: U,
  // lifecycle
  beforeCreate: b,
  created: b,
  beforeMount: b,
  mounted: b,
  beforeUpdate: b,
  updated: b,
  beforeDestroy: b,
  beforeUnmount: b,
  destroyed: b,
  unmounted: b,
  activated: b,
  deactivated: b,
  errorCaptured: b,
  serverPrefetch: b,
  // assets
  components: U,
  directives: U,
  // watch
  watch: Vr,
  // provide / inject
  provide: ot,
  inject: Sr
};
function ot(e, t) {
  return t ? e ? function() {
    return C(N(e) ? e.call(this, this) : e, N(t) ? t.call(this, this) : t);
  } : t : e;
}
function Sr(e, t) {
  return U(it(e), it(t));
}
function it(e) {
  if (d(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function b(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function U(e, t) {
  return e ? C(C(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Vr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = C(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = b(e[s], t[s]);
  return n;
}
const ct = hr, xr = (e) => e.__isTeleport, jt = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), yr = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), Dr = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
const he = [];
let $ = null;
function At(e = !1) {
  he.push($ = e ? null : []);
}
function Rr() {
  he.pop(), $ = he[he.length - 1] || null;
}
function Ir(e) {
  return e.dynamicChildren = $ || tn, Rr(), $ && $.push(e), e;
}
function zt(e, t, n, s, r, o) {
  return Ir(Ve(
    e,
    t,
    n,
    s,
    r,
    o,
    !0
    /* isBlock */
  ));
}
function $r(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Cr = (...e) => Wt(...e), Ht = "__vInternal", Kt = ({ key: e }) => e ?? null, _e = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? R(e) || V(e) || N(e) ? { i: A, r: e, k: t, f: !!n } : e : null;
function Ve(e, t = null, n = null, s = 0, r = null, o = e === jt ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Kt(t),
    ref: t && _e(t),
    scopeId: Je,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: A
  };
  return c ? (Le(u, n), o & 128 && e.normalize(u)) : n && (u.shapeFlag |= R(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && S("VNode created with invalid key (NaN). VNode type:", u.type), // avoid a block node from tracking itself
  !i && // has current parent block
  $ && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && $.push(u), u;
}
const Tr = process.env.NODE_ENV !== "production" ? Cr : Wt;
function Wt(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Er) && (process.env.NODE_ENV !== "production" && !e && S(`Invalid vnode type when creating vnode: ${e}.`), e = Dr), $r(e)) {
    const c = we(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Le(c, n), !o && $ && (c.shapeFlag & 6 ? $[$.indexOf(e)] = c : $.push(c)), c.patchFlag |= -2, c;
  }
  if (Jt(e) && (e = e.__vccOpts), t) {
    t = vr(t);
    let { class: c, style: u } = t;
    c && !R(c) && (t.class = be(c)), w(u) && (Te(u) && !d(u) && (u = C({}, u)), t.style = Fe(u));
  }
  const i = R(e) ? 1 : dr(e) ? 128 : xr(e) ? 64 : w(e) ? 4 : N(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Te(e) && (e = f(e), S("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), Ve(e, t, n, s, r, i, o, !0);
}
function vr(e) {
  return e ? Te(e) || Ht in e ? C({}, e) : e : null;
}
function we(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e, c = t ? Mr(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Kt(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? d(r) ? r.concat(_e(t)) : [r, _e(t)] : _e(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && d(i) ? i.map(Ut) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== jt ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && we(e.ssContent),
    ssFallback: e.ssFallback && we(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Ut(e) {
  const t = we(e);
  return d(e.children) && (t.children = e.children.map(Ut)), t;
}
function Pr(e = " ", t = 0) {
  return Tr(yr, null, e, t);
}
function Le(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (d(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Le(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Ht in t) ? t._ctx = A : r === 3 && A && (A.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    N(t) ? (t = { default: t, _ctx: A }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Pr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Mr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = be([t.class, s.class]));
      else if (r === "style")
        t.style = Fe([t.style, s.style]);
      else if (rn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(d(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
let P = null;
const lt = (e) => {
  P = e, e.scope.on();
}, Fr = () => {
  P && P.scope.off(), P = null;
};
function jr(e) {
  return e.vnode.shapeFlag & 4;
}
function Ar(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Yn(Kn(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in te)
          return te[n](e);
      },
      has(t, n) {
        return n in t || n in te;
      }
    }));
}
const zr = /(?:^|[-_])(\w)/g, Hr = (e) => e.replace(zr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Bt(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Gt(e, t, n = !1) {
  let s = Bt(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(e.components || e.parent.type.components) || r(e.appContext.components);
  }
  return s ? Hr(s) : n ? "App" : "Anonymous";
}
function Jt(e) {
  return N(e) && "__vccOpts" in e;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function De(e) {
  return !!(e && e.__v_isShallow);
}
function Kr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, s = { style: "color:#9d288c" }, r = {
    header(l) {
      return w(l) ? l.__isVue ? ["div", e, "VueInstance"] : V(l) ? [
        "div",
        {},
        ["span", e, h(l)],
        "<",
        c(l.value),
        ">"
      ] : J(l) ? [
        "div",
        {},
        ["span", e, De(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${W(l) ? " (readonly)" : ""}`
      ] : W(l) ? [
        "div",
        {},
        ["span", e, De(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const a = [];
    l.type.props && l.props && a.push(i("props", f(l.props))), l.setupState !== v && a.push(i("setup", l.setupState)), l.data !== v && a.push(i("data", f(l.data)));
    const m = u(l, "computed");
    m && a.push(i("computed", m));
    const E = u(l, "inject");
    return E && a.push(i("injected", E)), a.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), a;
  }
  function i(l, a) {
    return a = C({}, a), Object.keys(a).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(a).map((m) => [
          "div",
          {},
          ["span", s, m + ": "],
          c(a[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, a = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : w(l) ? ["object", { object: a ? f(l) : l }] : ["span", n, String(l)];
  }
  function u(l, a) {
    const m = l.type;
    if (N(m))
      return;
    const E = {};
    for (const x in l.ctx)
      p(m, x, a) && (E[x] = l.ctx[x]);
    return E;
  }
  function p(l, a, m) {
    const E = l[m];
    if (d(E) && E.includes(a) || w(E) && a in E || l.extends && p(l.extends, a, m) || l.mixins && l.mixins.some((x) => p(x, a, m)))
      return !0;
  }
  function h(l) {
    return De(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
function Wr() {
  Kr();
}
process.env.NODE_ENV !== "production" && Wr();
const Ur = qe({
  name: "GButton"
}), Br = /* @__PURE__ */ qe({
  ...Ur,
  props: {
    type: String
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = Bn(0), s = () => {
      t("click", n);
    };
    return (r, o) => (At(), zt("button", {
      class: be([
        "g-button",
        e.type
      ]),
      onClick: s
    }, " 按钮 ", 2));
  }
}), Gr = qe({
  name: "HelloWorld",
  props: {
    msg: {
      type: String
    }
  }
});
const Jr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, qr = (e) => (fr("data-v-94601cce"), e = e(), pr(), e), Lr = { class: "greetings" }, Yr = { class: "green" }, Qr = /* @__PURE__ */ qr(() => /* @__PURE__ */ Ve("h3", null, " welcome to Jason's library ", -1));
function Xr(e, t, n, s, r, o) {
  return At(), zt("div", Lr, [
    Ve("h1", Yr, en(e.msg), 1),
    Qr
  ]);
}
const Zr = /* @__PURE__ */ Jr(Gr, [["render", Xr], ["__scopeId", "data-v-94601cce"]]), kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GButton: Br,
  HelloWorld: Zr
}, Symbol.toStringTag, { value: "Module" })), ns = () => {
  alert("biubiubiu");
}, es = function(e) {
  Object.values(kr).forEach((t) => {
    if (!t)
      return;
    const n = t.name || t.__name;
    e.component(n, t);
  });
}, rs = {
  install: es
  // use 必须
};
export {
  Br as GButton,
  Zr as HelloWorld,
  rs as default,
  ns as showMsg
};
