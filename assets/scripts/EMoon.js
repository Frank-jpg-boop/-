import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $levelBattleData from './LevelBattleData';
import $effectBase from './EffectBase';
let i;
const p = cc._decorator;
const h = p.ccclass;
const f = p.property;
e.prototype.onRemove = function () {
  t.prototype.onRemove.call(this);
  $eventManager.EventManager.instance.off(
    $levelBattleData.ELevelBattleDataEvent.ENEMY_LEVEL_UPDATE,
    this.onEventEnemyLevelUpdate,
    this,
  );
};
e.prototype.onEventEnemyLevelUpdate = function () {
  this.updateIcon();
};
e.prototype.updateIcon = function () {
  const t = $levelBattleData.levelBattleData.moonLvIndex;
  $resLoader.ResLoader.setSpritFrame(
    this.spIcon,
    $frameEnum.Frame.EBundleName.GAME,
    'textures/scene/common/moon_' + t,
  );
};
e.prototype.onUpdate = function () {
  if (this._owner) {
    const t = cc.v2(this._owner.node.x + this._offsetPos.x, this._owner.node.y + this._offsetPos.y);
    this.node.setPosition(t);
  }
};
e.prototype.play = function (t) {
  this._owner = t;
  const e = cc.v2(this._owner.node.x + this._offsetPos.x, this._owner.node.y + this._offsetPos.y);
  this.node.setPosition(e);
  this.updateIcon();
};
e.prototype.onInit = function () {
  t.prototype.onInit.call(this);
  $eventManager.EventManager.instance.on(
    $levelBattleData.ELevelBattleDataEvent.ENEMY_LEVEL_UPDATE,
    this.onEventEnemyLevelUpdate,
    this,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.spIcon = null;
  e._owner = null;
  e._offsetPos = cc.v2(-100, 150);
  return e;
}
export default d;
