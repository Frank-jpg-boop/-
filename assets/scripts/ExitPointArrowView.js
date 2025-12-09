import $animUtils from './AnimUtils';
import $guideMgr from './GuideMgr';
import $guideDataProxy from './GuideDataProxy';
import $battleMgr from './BattleMgr';
import $actorMgr from './ActorMgr';
import $levelBattleData from './LevelBattleData';
let i;
const h = cc._decorator;
const f = h.ccclass;
const d = h.property;
e.prototype.update = function () {
  if (this._isInit) {
    const t = $battleMgr.default.instance.getCurScene();
    if (t) {
      const e = $actorMgr.default.instance.getActor(t.playerId);
      if (e) {
        if (
          0 == $levelBattleData.levelBattleData.cfgStage.id &&
          $guideMgr.GuideMgr.instance.cfgGuideStepId < $guideDataProxy.EGuideStepId.G_12
        ) {
          this.nView.active = !1;
        } else {
          const n = t.effectParent.convertToWorldSpaceAR(this._exitPos);
          const i = t.cameraCtrl.gameWorldPosToUiWorldPos(n);
          const o = this.node.parent.convertToNodeSpaceAR(i);
          const r = this.node.parent.height - 200;
          if (
            new cc.Rect(-this.node.parent.width / 2, -r / 2, this.node.parent.width, r).contains(o)
          ) {
            this.nView.active = !0;
            this.nView.angle = 0;
            this.nView.getChildByName('Arrow').angle = 180;
            o.y += 230;
            this.node.setPosition(o);
            return void (
              this._isInView || ((this._isInView = !0), $animUtils.AnimUtil.floatAnim(this.nView))
            );
          }
          if (this._isInView) {
            this._isInView = !1;
            cc.Tween.stopAllByTarget(this.nView);
            this.nView.angle = 0;
            this.nView.getChildByName('Arrow').angle = 0;
            this.nView.setPosition(0, 0);
          }
          const h = t.cameraCtrl.gameWorldPosToUiWorldPos(
            e.node.convertToWorldSpaceAR(cc.v2(0, 0)),
          );
          const f = i.sub(h);
          const d = f.normalize();
          const m = this.node.parent.convertToNodeSpaceAR(h);
          const y = f.mag();
          if (y < 50) {
            this.nView.active = !1;
          } else {
            y = Math.min(y, 350);
            this.nView.getChildByName('Arrow').angle = 0;
            const _ = m.add(d.mul(y));
            this.node.setPosition(_);
            this.nView.active = !0;
            this.nView.angle = (180 * Math.atan2(d.y, d.x)) / Math.PI - 90;
          }
        }
      } else {
        this.nView.active = !1;
      }
    } else {
      this.nView.active = !1;
    }
  }
};
e.prototype.initView = function () {
  const t = $battleMgr.default.instance.getCurScene();
  this._exitPos = t.level.playerExitPos;
  this.nView.active = !1;
  this._isInit = !0;
  this._isInView = !1;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nView = null;
  e._exitPos = null;
  e._isInit = !1;
  e._isInView = !1;
  return e;
}
export default m;
