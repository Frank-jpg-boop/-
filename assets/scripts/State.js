exports.State = void 0;
t.prototype.end = function () {};
t.prototype.reason = function () {};
t.prototype.begin = function () {
  for (const t = [], e = 0; e < arguments.length; e++) {
    t[e] = arguments[e];
  }
};
t.prototype.onInitialized = function () {};
Object.defineProperty(t.prototype, "stateType", {
  get: function () {
    return this._stateType;
  },
  enumerable: !1,
  configurable: !0,
});
function t(t) {
  this._context = null;
  this._stateType = 0;
  this._context = t;
  this.onInitialized();
}
const i = t;
exports.State = i;
