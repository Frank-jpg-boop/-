import $randomUtil from './RandomUtil';
import $battleMgr from './BattleMgr';
import $frameAnimEffect from './FrameAnimEffect';
let i;
const l = cc._decorator;
const u = l.ccclass;
const p =
  (l.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._owner = null;
      e._refreshPos = null;
      return e;
    }
    e.prototype.play = function (t, e) {
      this._owner = t;
      this._refreshPos = e.add(cc.v2(0, 50));
      const n = $battleMgr.default.instance.getCurScene();
      if (n) {
        const i = n.effectParent.convertToWorldSpaceAR(this._refreshPos);
        const o = n.cameraCtrl.gameWorldPosToUiWorldPos(i);
        const r = this.node.parent.convertToNodeSpaceAR(o);
        const c = n.cameraCtrl.gameWorldPosToUiWorldPos(
          this._owner.node.convertToWorldSpaceAR(cc.v2(0, 50)),
        );
        const l = this.node.parent.convertToNodeSpaceAR(c);
        const u = r.sub(l).normalize();
        const p = l.add(u.mul($randomUtil.RandomUtil.randomInt(300, 330)));
        this.node.setPosition(p);
      }
      this.playOnceAllAnim(null, !0);
    };
    e.prototype.onUpdate = function () {};
  })($frameAnimEffect.default));
export default p;
