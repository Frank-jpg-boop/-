import $simplyRectCollider from './SimplyRectCollider';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $actorEnum from './ActorEnum';
import $actorMgr from './ActorMgr';
import $spAnimEffect from './SpAnimEffect';
let i;
const p = cc._decorator;
const h = p.ccclass;
const f = p.property;
e.prototype.checkHurt = function () {
  for (
    const t = 0,
          e = $actorMgr.default.instance.queryActorByCamp(
            $actorEnum.ETeamType.PLAYER,
          );
    t < e.length;
    t++
  ) {
    const n = e[t];
    if (
      n.canBeHurt() &&
      !n.isDead() &&
      $simplyCollisionDetector.default.isCollisionRectToRect(
        this.collider.rect,
        n.hurtColliderRect,
      )
    ) {
      n.beHurt(this._owner.getHurt());
    }
  }
};
e.prototype.onDefaultAnimFrameEvent = function (t, e) {
  if ("atk" == e) {
    this.checkHurt();
  }
};
e.prototype.play = function (t, e) {
  this._owner = t;
  this.playDefaultAnim("atk", 1, !1, function () {
    if (e) {
      e();
    }
  });
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.collider = null;
  e._owner = null;
  return e;
}
exports.default = d;
