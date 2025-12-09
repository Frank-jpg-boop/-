import $battleMgr from './BattleMgr';
import $state from './State';
import $actorEnum from './ActorEnum';
import $actorMgr from './ActorMgr';
let i;
exports.Boss_321_Idle = void 0;
e.prototype.checkAtk = function () {
  const t = $battleMgr.default.instance.getCurScene();
  if (t) {
    const e = $actorMgr.default.instance.getActor(t.playerId);
    if (e) {
      const n = e.node.getPosition();
      const i = this._context.node.getPosition();
      if (Math.abs(n.x - i.x) < 100 && i.y + 250 > n.y) {
        return !0;
      }
    }
  }
  return !1;
};
e.prototype.update = function () {
  if (this._context.isTrigger) {
    if (this._context.waitTime <= 0) {
      this._context.changeState($actorEnum.EActorStateType.ATTACK);
    } else {
      this.checkAtk() &&
        this._context.changeState($actorEnum.EActorStateType.ATTACK, !0);
    }
  }
};
e.prototype.begin = function () {
  this._context.playAnimIdle();
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.IDLE;
  return n;
}
const l = e;
exports.Boss_321_Idle = l;
