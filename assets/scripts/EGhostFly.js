import $mathUtil from './MathUtil';
import $randomUtil from './RandomUtil';
import $gameUI from './GameUI';
import $battleMgr from './BattleMgr';
import $frameAnimEffect from './FrameAnimEffect';
let i;
const p = cc._decorator;
const h = p.ccclass;
const f = p.property;
e.prototype.flyTargetPos = function () {
  const t = this;
  const e = $battleMgr.default.instance.getCurScene();
  const n = e.uiNode.getComponent($gameUI.default).nGameUILayer;
  const i = e.cameraCtrl.gameWorldPosToUiWorldPos(
    this.node.convertToWorldSpaceAR(cc.v2()),
  );
  const o = n.convertToNodeSpaceAR(i);
  this.node.parent = n;
  this.node.setPosition(o);
  this.motionStreak.enabled = !0;
  const r = cc.v2(o.x + $randomUtil.RandomUtil.randomInt(-100, 100), o.y + 100);
  const u = cc.v2(
    this._targetPos.x + $randomUtil.RandomUtil.randomInt(-100, 100),
    this._targetPos.y - 100,
  );
  $mathUtil.MathUtil.bezierTo(
    this.node,
    1,
    r,
    u,
    this._targetPos,
    function (e) {
      const n = e.x - t.node.x;
      const i = e.y - t.node.y;
      const o = cc.v2(n, i).normalizeSelf();
      if (0 == o.x && 0 == o.y) {
        //
      } else {
        t.node.angle =
          $mathUtil.MathUtil.radians2Angle(cc.v2(1, 0).signAngle(o)) - 90;
      }
    },
  )
    .call(function () {
      if (t._onComplete) {
        t._onComplete();
      }
      t.remove();
    })
    .start();
};
e.prototype.play = function (t, e) {
  const n = this;
  this._onComplete = e;
  this._targetPos = this.node.parent.convertToNodeSpaceAR(t);
  this.playOnceAllAnim(function () {
    n.flyTargetPos();
  }, !1);
};
e.prototype.onInit = function () {
  this.node.angle = 0;
  this.motionStreak.enabled = !1;
  t.prototype.onInit.call(this);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.motionStreak = null;
  e._targetPos = null;
  e._onComplete = null;
  return e;
}
exports.default = d;
