import $eventManager from './EventManager';
import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
let i;
exports.SpeedUp = void 0;
e.prototype.onRemove = function () {
  t.prototype.onRemove.call(this);
  this._buffData.parentActor
    .getAttribute($attrEnum.E_AttrType.SPEED)
    .changeAddValue(-this._addSpeed);
  $eventManager.EventManager.instance.emit(
    $actorEnum.EActorEvent.SPEED_CHANGE + this._buffData.parentActor.unitId,
  );
};
e.prototype.onUpdate = function () {
  if (this._effects[0]) {
    this._effects[0].node.active =
      this._buffData.parentActor.curState == $actorEnum.EActorStateType.WALK;
  }
};
e.prototype.onTrigger = function (t) {
  this._addSpeed = t;
  this._buffData.parentActor
    .getAttribute($attrEnum.E_AttrType.SPEED)
    .changeAddValue(t);
  $eventManager.EventManager.instance.emit(
    $actorEnum.EActorEvent.SPEED_CHANGE + this._buffData.parentActor.unitId,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e._addSpeed = 0;
  return e;
}
const c = e;
exports.SpeedUp = c;
