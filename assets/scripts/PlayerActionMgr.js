export const PlayerActionMgr = void 0;
t.token = '';
t._instance = null;
t.prototype.triggerAction = function (t) {
  for (const e = [], n = 1; n < arguments.length; n++) {
    e[n - 1] = arguments[n];
  }
  this._msg.forEach(function (n) {
    let o;
    (o = n.callback).call.apply(o, __spreadArrays([n.caller, t], e));
  });
};
t.prototype.unRegisterEvent = function (t) {
  if (this._msg.has(t)) {
    this._msg.delete(t);
  }
};
t.prototype.registerEvent = function (t, e, n) {
  this._msg.set(t, {
    callback: e,
    caller: n,
  });
};
Object.defineProperty(t, 'instance', {
  get: function () {
    if (null == this._instance) {
      this._instance = new t();
    }
    return this._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this._msg = new Map();
}
const o = t;
export const PlayerActionMgr = o;
