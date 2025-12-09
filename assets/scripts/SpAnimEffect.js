import $spAnimCtrl from './SpAnimCtrl';
import $effectBase from './EffectBase';
let i;
const c = cc._decorator;
const l = c.ccclass;
const u = c.property;
e.prototype.onPlayRemvoeEffect = function () {};
e.prototype.playRemoveEffect = function () {
  const t = this;
  this.onPlayRemvoeEffect();
  if ("" !== this._removeEffectName) {
    this.playDefaultAnim(this._removeEffectName, 1, !1, function () {
      t.remove();
    });
  } else {
    this.remove();
  }
};
e.prototype.setRemvoeEffectName = function (t) {
  this._removeEffectName = t;
};
e.prototype.onDefaultAnimFrameEvent = function () {};
e.prototype.hasAnimInDefault = function (t) {
  return !!this.spAnimCtrls[0].spAnim.findAnimation(t);
};
e.prototype.onRemove = function () {
  const e = this;
  this.spAnimCtrls.forEach(function (t) {
    t.clearAnim();
    t.spAnim.enabled = !1;
    t.spAnim.setToSetupPose();
    t.unregisterComplete(e);
    t.unregisterFrameEvent(e);
  });
  t.prototype.onRemove.call(this);
};
e.prototype.onEffectAnimCompleteEvent = function () {
  for (const t = [], e = 0; e < arguments.length; e++) {
    t[e] = arguments[e];
  }
  if (this._onAnimComplete) {
    this._onAnimComplete();
  }
  if (this._isAnimCompleteRemove) {
    this.remove();
  }
};
e.prototype.playDefaultAnim = function (t, e, n, i, o) {
  if (void 0 === o) {
    o = !0;
  }
  this._isAnimCompleteRemove = !n && o;
  this._onAnimComplete = i;
  this.spAnimCtrls[0].clearAnim();
  this.spAnimCtrls[0].playAnim(t, e, n);
};
e.prototype.playOnceAllAnim = function (t, e) {
  if (void 0 === t) {
    t = null;
  }
  if (void 0 === e) {
    e = 1;
  }
  this._onAnimComplete = t;
  this._isAnimCompleteRemove = !0;
  this.spAnimCtrls.forEach(function (t) {
    t.clearAnim();
    t.playAnim(t.spAnim.defaultAnimation, e, !1);
  });
};
e.prototype.setDefaultAnimSkin = function (t) {
  this.spAnimCtrls[0].spAnim.setSkin(t);
};
e.prototype.onInit = function () {
  const t = this;
  this._isAnimCompleteRemove = !0;
  this.spAnimCtrls.forEach(function (e, n) {
    e.init();
    if (0 === n) {
      e.registerComplete(t.onEffectAnimCompleteEvent, t);
      e.registerFrameEvent(t.onDefaultAnimFrameEvent, t);
    }
    e.spAnim.setToSetupPose();
  });
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.spAnimCtrls = [];
  e._isAnimCompleteRemove = !0;
  e._removeEffectName = "";
  return e;
}
exports.default = p;
