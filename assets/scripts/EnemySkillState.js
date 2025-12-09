import $state from './State';
import $actorEnum from './ActorEnum';
let i;
exports.EnemySkillState = void 0;
e.prototype.update = function () {};
e.prototype.begin = function () {
  const t = this;
  this._context.playAnimSkill(function () {
    t._context.changeState($actorEnum.EActorStateType.IDLE);
  });
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.SKILL;
  return n;
}
const s = e;
exports.EnemySkillState = s;
