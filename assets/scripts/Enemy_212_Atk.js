import $state from './State';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $actorEnum from './ActorEnum';
import $door from './Door';
import $actorMgr from './ActorMgr';
let i;
exports.Enemy_212_Atk = void 0;
e.prototype.checkHurt = function () {
  const t = this;
  $actorMgr.default.instance
    .queryActorByCamp($actorEnum.ETeamType.PLAYER)
    .forEach(function (e) {
      const n = t._atkCollisionIds.indexOf(e.unitId);
      if (e.isDead()) {
        if (-1 != n) {
          t._atkCollisionIds.splice(n, 1);
        }
      } else {
        if (
          $simplyCollisionDetector.default.isCollisionRectToRect(
            t._context.hurtColliderRect,
            e.hurtColliderRect,
          )
        ) {
          -1 == n &&
            (e.beHurt(t._context.getHurt()),
            t._atkCollisionIds.push(e.unitId));
        } else {
          -1 != n && t._atkCollisionIds.splice(n, 1);
        }
      }
    });
};
e.prototype.end = function () {
  cc.Tween.stopAllByTarget(this._context.node);
  this._context.setPos(this._context.node.getPosition());
};
e.prototype.update = function () {
  if (this._isSprint) {
    this.checkHurt();
  }
};
e.prototype.begin = function (t) {
  const e = this;
  this._atkCollisionIds = [];
  this._isSprint = !1;
  this._context.setDirX(t.x > this._context.node.x);
  if (t && t.isValid) {
    const n = t.getComponent($door.default);
    if (n && n.state != $door.EDoorState.DESTROY) {
      return void this._context.playAnimAttack(
        null,
        function () {
          e._context.attackHit(t);
          e._context.changeState($actorEnum.EActorStateType.IDLE);
        },
        t,
      );
    }
  }
  this._isSprint = !0;
  const i = this._context.attackMovePos;
  if (i) {
    cc.tween(this._context.node)
      .to(this._context.attackAnimDuration, {
        x: i.x,
        y: i.y,
      })
      .call(function () {
        e._context.setPos(i);
        e._context.updatePathData();
        e._context.attackMovePos = null;
      })
      .start();
  }
  this._context.playAnimAttack(
    null,
    function () {
      e._context.changeState($actorEnum.EActorStateType.IDLE);
    },
    t,
  );
};
function e(e) {
  const n = t.call(this, e) || this;
  n._atkCollisionIds = [];
  n._isSprint = !1;
  n._stateType = $actorEnum.EActorStateType.ATTACK;
  return n;
}
const u = e;
exports.Enemy_212_Atk = u;
