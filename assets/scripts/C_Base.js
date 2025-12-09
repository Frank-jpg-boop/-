exports.C_Base = void 0;
t.prototype.queryOne = function (t) {
  for (let e, n = this._dict.values(); !(e = n.next()).done; ) {
    const i = e.value;
    if (t(i)) {
      return i;
    }
  }
  return null;
};
t.prototype.queryAll = function (t, e) {
  for (
    let n, i = new Array(), o = this._dict.values();
    !(n = o.next()).done;
  ) {
    const r = n.value;
    if (t(r) && (i.push(r), e && i.length >= e)) {
      break;
    }
  }
  return i;
};
t.prototype.sheet = function () {
  return Array.from(this._dict.values());
};
t.prototype.getById = function (t) {
  if (this._dict.has(t)) {
    return this._dict.get(t);
  } else {
    return null;
  }
};
t.prototype.initByMap = function (t) {
  for (let e in ((this._dict = new Map()), t)) {
    const n = t[e];
    this._dict.set(n.id, n);
  }
};
Object.defineProperty(t.prototype, "size", {
  get: function () {
    return this._dict.size;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this._name = null;
  this._dict = null;
}
const i = t;
exports.C_Base = i;
