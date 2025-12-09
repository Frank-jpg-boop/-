import $state from './State';
import $actorEnum from './ActorEnum';
let i;
exports.Boss_321_Atk = void 0;
e.prototype.update = function () {};
e.prototype.attack = function () {
  const t = this;
  this._context.plyerAnimSummom(null, function () {
    if (t._context.isFake) {
      t._context.changeState($actorEnum.EActorStateType.DEAD);
    } else {
      if (t._context.waitTime <= 0) {
        return void t._context.fadeOut(function () {
          t._context.changeState($actorEnum.EActorStateType.IDLE);
          t._context.appear();
        });
      }
      t._context.changeState($actorEnum.EActorStateType.EXTEND_1);
    }
  });
};
e.prototype.begin = function () {
  const t = this;
  this._context.playAnimAttackReady();
  this._context.scheduleOnce(function () {
    t.attack();
  }, Number(this._context.cfg.val1));
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.ATTACK;
  return n;
}
const s = e;
exports.Boss_321_Atk = s;
