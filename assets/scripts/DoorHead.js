let i;
const a = cc._decorator;
const s = a.ccclass;
const c = a.property;
e.prototype.updateHp = function (t, e) {
  const n = this;
  if (void 0 === e) {
    e = !1;
  }
  this.lValue.string = t.toString();
  if (e) {
    //
  } else {
    this.node.active = !0;
    this.unscheduleAllCallbacks();
    this.scheduleOnce(function () {
      n.node.active = !1;
    }, 2);
  }
};
e.prototype.init = function (t) {
  this._headOffsetY = t;
  this.node.active = !1;
};
Object.defineProperty(e.prototype, 'headOffsetY', {
  get: function () {
    return this._headOffsetY;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lValue = null;
  e._headOffsetY = 0;
  return e;
}
export default l;
