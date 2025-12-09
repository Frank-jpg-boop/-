import $frameEnum from './FrameEnum';
import $popupBase from './PopupBase';
import $popupManager from './PopupManager';
import $globalPopupMgr from './GlobalPopupMgr';
import $localDataProxy from './LocalDataProxy';
import $battleMgr from './BattleMgr';
import $actorMgr from './ActorMgr';
import $gameEnum from './GameEnum';
let i;
const d = cc._decorator;
const m = d.ccclass;
const y = d.property;
e.prototype.onToggleChange = function () {
  $localDataProxy.localDataProxy.setDailyRefreshValue(
    $gameEnum.Game.EDailyRefreshDataKey.POWER_FULL_NOT_POPUP,
    this.toggle.isChecked ? 1 : 0,
  );
};
e.prototype.onClickBtnCancel = function () {
  if (this._battlePlayState) {
    $battleMgr.default.instance.getCurScene().resume();
  }
  this.removeUI();
};
e.prototype.onClickBtnOk = function () {
  const t = $battleMgr.default.instance.getCurScene();
  if (t) {
    const e = $actorMgr.default.instance.getActor(t.playerId);
    if (!e || e.isDead()) {
      return void $globalPopupMgr.default.instance.showTips(
        "玩家已死亡，无法撤离",
      );
    }
    this.removeUI();
    $popupManager.PopupManager.instance.show({
      bundleName: $frameEnum.Frame.EBundleName.GAME,
      path: "popups/LevelBackPopup",
      keep: !0,
    });
  }
};
e.prototype.init = function (t) {
  this._battlePlayState = t.battlePlayState;
  this.toggle.isChecked = !1;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.toggle = null;
  e._battlePlayState = !1;
  return e;
}
exports.default = _;
