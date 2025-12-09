import $battleHurtFormulaMgr from './BattleHurtFormulaMgr';
let i;
export const Fire = void 0;
e.prototype.onUpdate = function (t) {
  this._hurtDis -= t;
  if (this._hurtDis <= 0) {
    this._hurtDis = 1;
    this._buffData.parentActor.beHurt(
      $battleHurtFormulaMgr.default.instance.otherHurt(
        this._hurtValue,
        this._buffData.agentActor,
        this._buffData.parentActor,
      ),
    );
  }
};
e.prototype.onTrigger = function (t) {
  this._hurtDis = 0;
  this._hurtValue = t;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e._hurtDis = 0;
  e._hurtValue = 0;
  return e;
}
const a = e;
export const Fire = a;
