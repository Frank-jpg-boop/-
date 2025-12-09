import $effectBase from './EffectBase';
let i;
const s = cc._decorator;
const c = s.ccclass;
const l = s.property;
e.prototype.onEffectAnimCompleteEvent = function () {
  for (const t = [], e = 0; e < arguments.length; e++) {
    t[e] = arguments[e];
  }
  if (this._onAnimComplete) {
    this._onAnimComplete();
  }
  if (this._isCompleteRemove) {
    this.remove();
  }
};
e.prototype.onRemove = function () {
  this.frameAnim.off(
    cc.Animation.EventType.FINISHED,
    this.onEffectAnimCompleteEvent,
    this,
  );
  t.prototype.onRemove.call(this);
};
e.prototype.playOnceAllAnim = function (t, e) {
  if (void 0 === t) {
    t = null;
  }
  this._onAnimComplete = t;
  this._isCompleteRemove = e;
  this.frameAnim.play(this.frameAnim.defaultClip.name, 0);
};
e.prototype.onInit = function () {
  this.frameAnim.on(
    cc.Animation.EventType.FINISHED,
    this.onEffectAnimCompleteEvent,
    this,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.frameAnim = null;
  e._isCompleteRemove = !1;
  return e;
}
exports.default = u;
