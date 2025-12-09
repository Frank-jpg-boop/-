import $state from './State';
import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
let i;
exports.Enemy_111_Walk = void 0;
e.prototype.update = function (t) {
  const e = this._context.searchTarget();
  if (e) {
    if (this._context.canSummon()) {
      this._context.changeState($actorEnum.EActorStateType.EXTEND_1);
    } else if (this._context.canAttack()) {
      this._context.changeState($actorEnum.EActorStateType.ATTACK, e.node);
    } else if (this._moveTagrtPos) {
      const n = this._context.node.getPosition();
      if (this._moveTagrtPos.fuzzyEquals(n, 5)) {
        this._context.changeState($actorEnum.EActorStateType.IDLE);
      } else {
        const i = this._moveTagrtPos.sub(n).normalize();
        const o = this._context.getAttribute($attrEnum.E_AttrType.SPEED).value;
        const r = i.mul(o * t);
        this._context.setDirX(i.x > 0);
        this._context.setPos(n.add(r));
      }
    }
  } else {
    this._context.changeState($actorEnum.EActorStateType.IDLE);
  }
};
e.prototype.begin = function () {
  this._context.move();
  this._moveTagrtPos = this._context.randomPos();
  this._context.playAnimWalk();
};
function e(e) {
  const n = t.call(this, e) || this;
  n._moveTagrtPos = null;
  n._stateType = $actorEnum.EActorStateType.WALK;
  return n;
}
const c = e;
exports.Enemy_111_Walk = c;
