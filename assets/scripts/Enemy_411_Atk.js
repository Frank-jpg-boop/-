import $state from './State';
import $actorEnum from './ActorEnum';
import $door from './Door';
let i;
export const Enemy_411_Atk = void 0;
e.prototype.end = function () {};
e.prototype.update = function () {};
e.prototype.begin = function (t) {
  const e = this;
  this._context.setDirX(t.x > this._context.node.x);
  if (t && t.isValid) {
    const n = t.getComponent($door.default);
    if (n && n.state != $door.EDoorState.DESTROY) {
      return void this._context.playAnimAttack(
        function () {
          e._context.attackHit(t);
        },
        function () {
          e._context.changeState($actorEnum.EActorStateType.IDLE);
        },
        t,
      );
    }
  }
  if (this._context.canSkill(t)) {
    this._context.playAnimSkill(
      function () {
        e._context.changeState($actorEnum.EActorStateType.IDLE);
      },
      function () {
        e._context.attackHit(t, !0);
      },
      t,
    );
  } else {
    this._context.playAnimAttack(
      function () {
        e._context.attackHit(t);
      },
      function () {
        e._context.changeState($actorEnum.EActorStateType.IDLE);
      },
      t,
    );
  }
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.ATTACK;
  return n;
}
const c = e;
export const Enemy_411_Atk = c;
