import $buffEnum from './BuffEnum';
import $dizziness from './Dizziness';
import $easyHurt from './EasyHurt';
import $fire from './Fire';
import $frozen from './Frozen';
import $palsy from './Palsy';
import $poison from './Poison';
import $slowDown from './SlowDown';
import $speedUp from './SpeedUp';
t._instance = null;
t.prototype.createBuff = function (t) {
  const e = null;
  switch (t.buffType) {
    case $buffEnum.EBuffType.EASY_HURT:
      e = new $easyHurt.EasyHurt();
      break;
    case $buffEnum.EBuffType.DIZZINESS:
      e = new $dizziness.Dizziness();
      break;
    case $buffEnum.EBuffType.PALSY:
      e = new $palsy.Palsy();
      break;
    case $buffEnum.EBuffType.FIRE:
      e = new $fire.Fire();
      break;
    case $buffEnum.EBuffType.SLOW_DOWN:
      e = new $slowDown.SlowDown();
      break;
    case $buffEnum.EBuffType.FROZEN:
      e = new $frozen.Frozen();
      break;
    case $buffEnum.EBuffType.POISON:
      e = new $poison.Poison();
      break;
    case $buffEnum.EBuffType.SPEED_UP:
      e = new $speedUp.SpeedUp();
      break;
    default:
      console.error('BuffMgr --> buffType error buffType = ' + t.buffType);
      return null;
  }
  e.init(t);
  return e;
};
Object.defineProperty(t, 'instance', {
  get: function () {
    if (null == t._instance) {
      t._instance = new t();
    }
    return t._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {}
const h = t;
export default h;
