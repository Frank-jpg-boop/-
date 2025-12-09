import $eventManager from './EventManager';
import $levelBattleData from './LevelBattleData';
let i;
const c = cc._decorator;
const l = c.ccclass;
const u = c.property;
e.prototype.updateItem = function () {
  this.lValue.string = $levelBattleData.levelBattleData.gold.toString();
};
e.prototype.onDestroy = function () {
  $eventManager.EventManager.instance.off(
    $levelBattleData.ELevelBattleDataEvent.GOLD_CHANGE,
    this.updateItem,
    this,
  );
};
e.prototype.onLoad = function () {
  $eventManager.EventManager.instance.on(
    $levelBattleData.ELevelBattleDataEvent.GOLD_CHANGE,
    this.updateItem,
    this,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lValue = null;
  return e;
}
exports.default = p;
