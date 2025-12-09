import $nodeUtil from './NodeUtil';
import $battleMgr from './BattleMgr';
import $spAnimEffect from './SpAnimEffect';
let i;
const l = cc._decorator;
const u = l.ccclass;
const p = l.property;
e.prototype.onDefaultAnimFrameEvent = function (t, e) {
  if ('atk' == e && this._onEventComplete) {
    this._onEventComplete();
  }
};
e.prototype.updateProgressCd = function (t) {
  const e = t < 1;
  this.nProgress.active = e;
  if (e) {
    this.nProgress.getChildByName('Bar').getComponent(cc.Sprite).fillRange = t;
  }
};
e.prototype.reset = function (t) {
  if (void 0 === t) {
    t = 1;
  }
  const e = null;
  if (1 == t) {
    e = 10;
  } else {
    e = -10;
  }
  this.spAnimCtrls[0].spAnim.node.angle = e;
  this.spAnimCtrls[0].spAnim.node.scaleX = Math.abs(this.spAnimCtrls[0].spAnim.node.scaleX) * t;
  this.nProgress.scaleX = Math.abs(this.nProgress.scaleX) * t;
  this.nProgress.angle = e;
};
e.prototype.setDir = function (t) {
  const e = t.x >= 0;
  const n = null;
  if (e) {
    n = 1;
  } else {
    n = -1;
  }
  this.spAnimCtrls[0].spAnim.node.scaleX = Math.abs(this.spAnimCtrls[0].spAnim.node.scaleX) * n;
  const i = (180 * cc.v2(e ? 1 : -1, 0).signAngle(t)) / Math.PI;
  this.spAnimCtrls[0].spAnim.node.angle = i;
  this.nProgress.scaleX = Math.abs(this.nProgress.scaleX) * n;
};
e.prototype.playShootAnim = function (t, e, n, i) {
  const o = this;
  this._onEventComplete = t;
  this._isShooting = !0;
  const r = this.spAnimCtrls[0].spAnim.findAnimation('atk').duration;
  const a = Math.max(1 - r, 0);
  const s = null;
  if (1 > r) {
    s = 1;
  } else {
    s = r / 1;
  }
  this.setDir(n);
  this.playDefaultAnim(
    'atk',
    2 * s,
    !1,
    function () {
      o._isShooting = !1;
      o.spAnimCtrls[0].spAnim.setToSetupPose();
      if (i) {
        i(a);
      }
    },
    !1,
  );
};
e.prototype.onInit = function () {
  t.prototype.onInit.call(this);
  this.nProgress.active = !1;
};
Object.defineProperty(e.prototype, 'shootPos', {
  get: function () {
    const t = $battleMgr.default.instance.getCurScene();
    return $nodeUtil.default.nodeParentChangeLocalPos(this.nShootPos, t.bulletParent);
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, 'isShooting', {
  get: function () {
    return this._isShooting;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nProgress = null;
  e.nShootPos = null;
  e._isShooting = !1;
  e._onEventComplete = null;
  return e;
}
export default h;
