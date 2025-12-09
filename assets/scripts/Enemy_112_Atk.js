import $randomUtil from './RandomUtil';
import $state from './State';
import $actorEnum from './ActorEnum';
let i;
export const Enemy_112_Atk = void 0;
e.prototype.update = function () {};
e.prototype.attack = function (t) {
  const e = this;
  this._context.setDirX(t.x > this._context.node.x);
  const n = t.getPosition();
  n.y += $randomUtil.RandomUtil.randomInt(30, 60);
  n.x += $randomUtil.RandomUtil.randomInt(-50, 50);
  this._context.playAnimAttack(
    function (i) {
      if ('chong' == i) {
        cc.tween(e._context.node)
          .to(
            0.3,
            {
              x: n.x,
              y: n.y,
            },
            {
              easing: 'sineIn',
              onUpdate: function () {
                e._context.setPos(e._context.node.getPosition());
              },
            },
          )
          .start();
      }
      if ('atk' == i) {
        e._context.attackHit(t);
      }
    },
    function () {
      e._context.changeState($actorEnum.EActorStateType.IDLE);
    },
  );
};
e.prototype.begin = function (t) {
  this.attack(t);
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.ATTACK;
  return n;
}
const c = e;
export const Enemy_112_Atk = c;
