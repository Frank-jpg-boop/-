import $randomUtil from './RandomUtil';
import $state from './State';
import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
let i;
exports.Enemy_112_Walk = void 0;
e.prototype.update = function (t) {
  const e = this._context.searchTarget();
  if (e && this._context.canAttackTarget(e)) {
    if (this._context.canAttack()) {
      return void this._context.changeState(
        $actorEnum.EActorStateType.ATTACK,
        e.node,
      );
    } else {
      return void this._context.changeState($actorEnum.EActorStateType.IDLE);
    }
  }
  this._targetPosRefreshTime -= t;
  if (this._targetPosRefreshTime <= 0) {
    this.updateTargetPos();
  }
  if (this._targetPos) {
    const n = this._context.node.getPosition();
    if (this._targetPos.fuzzyEquals(n, 5)) {
      return void this._context.changeState($actorEnum.EActorStateType.IDLE);
    }
    const i = this._targetPos.sub(n).normalize();
    const o = this._context.getAttribute($attrEnum.E_AttrType.SPEED).value;
    const r = i.mul(o * t);
    this._context.setPos(n.add(r));
    this._context.setDirX(i.x > 0);
  }
};
e.prototype.updateTargetPos = function () {
  const t = this._context.searchTarget();
  if (t) {
    const e = $randomUtil.RandomUtil.randomInt(
      Number(this._context.cfg.val1),
      Number(this._context.cfg.val2),
    );
    const n = $randomUtil.RandomUtil.randomInt(0, 2);
    const i =
      ($randomUtil.RandomUtil.randomInt(
        this._context.rangeAngles[2 * n],
        this._context.rangeAngles[2 * n + 1],
      ) *
        Math.PI) /
      180;
    const o = t.node.getPosition();
    this._targetPos = cc.v2(o.x + e * Math.cos(i), o.y + e * Math.sin(i));
    this._targetPosRefreshTime = this._targetPosRefreshInterval;
  }
};
e.prototype.begin = function () {
  this._context.playAnimWalk();
  this.updateTargetPos();
};
function e(e) {
  const n = t.call(this, e) || this;
  n._targetPos = null;
  n._targetPosRefreshTime = 0;
  n._targetPosRefreshInterval = 2;
  n._stateType = $actorEnum.EActorStateType.WALK;
  return n;
}
const l = e;
exports.Enemy_112_Walk = l;
