import $state from './State';
import $actorEnum from './ActorEnum';
import $door from './Door';
let i;
export const Enemy_611_Atk = void 0;
e.prototype.end = function () {
  this._context.unscheduleAllCallbacks();
};
e.prototype.update = function () {};
e.prototype.begin = function (t, e) {
  const n = this;
  if (void 0 === e) {
    e = !1;
  }
  this._context.setDirX(t.x > this._context.node.x);
  if (t && t.isValid) {
    const i = t.getComponent($door.default);
    if (i && i.state != $door.EDoorState.DESTROY) {
      return void this._context.playAnimAttack(
        function () {
          n._context.attackHit(t);
        },
        function () {
          n._context.changeState($actorEnum.EActorStateType.IDLE);
        },
        t,
      );
    }
  }
  if (!e) {
    this._context.summon(t);
    return void this._context.scheduleOnce(function () {
      n._context.playAnimAttack(
        function () {
          n._context.attackHit(t);
        },
        function () {
          n._context.changeState($actorEnum.EActorStateType.IDLE);
        },
        t,
      );
    }, 0.3);
  }
  this._context.playAnimAttack(
    function () {
      n._context.attackHit(t);
    },
    function () {
      n._context.changeState($actorEnum.EActorStateType.IDLE);
    },
    t,
  );
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.ATTACK;
  return n;
}
const c = e;
export const Enemy_611_Atk = c;
