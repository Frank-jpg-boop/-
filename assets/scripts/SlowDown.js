import $attrEnum from './AttrEnum';
let i;
export const SlowDown = void 0;
e.prototype.onRemove = function () {
  t.prototype.onRemove.call(this);
  this._buffData.parentActor
    .getAttribute($attrEnum.E_AttrType.SPEED)
    .changePercentAdd(100 * this._subSpeed);
};
e.prototype.onTrigger = function (t) {
  this._subSpeed = t;
  this._buffData.parentActor.getAttribute($attrEnum.E_AttrType.SPEED).changePercentAdd(100 * -t);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e._subSpeed = 0;
  return e;
}
const a = e;
export const SlowDown = a;
