let i;
exports.EasyHurt = void 0;
e.prototype.onAgain = function (t) {
  this._addHurtValue += t;
  this._effects.forEach(function (t) {
    t.playOnceAllAnim(null, !1);
  });
};
e.prototype.onTrigger = function (t) {
  this._addHurtValue += t;
};
Object.defineProperty(e.prototype, "addHurtValue", {
  get: function () {
    return this._addHurtValue;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e._addHurtValue = 0;
  return e;
}
const r = e;
exports.EasyHurt = r;
