import $audioManager from './AudioManager';
import $basicsProxy from './BasicsProxy';
import $popupBase from './PopupBase';
import $globalPopupMgr from './GlobalPopupMgr';
import $stageDataProxy from './StageDataProxy';
import $userSetDataProxy from './UserSetDataProxy';
import $battleMgr from './BattleMgr';
let i;
const f = cc._decorator;
const d = f.ccclass;
const m = f.property;
e.prototype.onClickBtnGM = function () {
  $globalPopupMgr.default.instance.showBattleGM();
};
e.prototype.onClickBtnBack = function () {
  $stageDataProxy.stageDataProxy.isBackBattleFail = !0;
  if ($stageDataProxy.stageDataProxy.checkOver()) {
    this.removeUI();
    return void $globalPopupMgr.default.instance.showLevelOver();
  }
  $battleMgr.default.instance.exitLevelScene();
};
e.prototype.onClickBtnRestart = function () {
  if ($stageDataProxy.stageDataProxy.checkOver()) {
    this.removeUI();
    return void $globalPopupMgr.default.instance.showLevelOver();
  }
  $battleMgr.default.instance.restartLevelScene();
};
e.prototype.onClickBtnClose = function () {
  if (this._battlePlayState) {
    $battleMgr.default.instance.getCurScene().resume();
  }
  this.removeUI();
};
e.prototype.onClickBtnVibration = function () {
  const t = $userSetDataProxy.userSetDataProxy.isVibration;
  $userSetDataProxy.userSetDataProxy.setVibration(!t);
  this.updateView();
};
e.prototype.onSliderEffectVolumeChanged = function (t) {
  this.sliderEffectVolume.progress = t.progress;
  this.effectVolumePro.fillRange = t.progress;
  $audioManager.AudioManager.instance.setEffectVolume(t.progress);
  $userSetDataProxy.userSetDataProxy.setEffectVolume(t.progress);
};
e.prototype.onSliderMusicVolumeChanged = function (t) {
  this.sliderMusicVolume.progress = t.progress;
  this.musicVolumePro.fillRange = t.progress;
  $audioManager.AudioManager.instance.setBgmVolume(t.progress);
  $userSetDataProxy.userSetDataProxy.setMusicVolume(t.progress);
};
e.prototype.updateView = function () {
  this.sliderMusicVolume.progress = $basicsProxy.basicsProxy.bgmVolume;
  this.musicVolumePro.fillRange = $basicsProxy.basicsProxy.bgmVolume;
  this.sliderEffectVolume.progress = $basicsProxy.basicsProxy.effectVolume;
  this.effectVolumePro.fillRange = $basicsProxy.basicsProxy.effectVolume;
  const t = $userSetDataProxy.userSetDataProxy.isVibration;
  this.nShake.getChildByName('BtnSwitch').getChildByName('Open').active = t;
  this.nShake.getChildByName('BtnSwitch').getChildByName('Close').active = !t;
};
e.prototype.init = function (t) {
  this.nGm.active = yzll.gameConfig.isGM || yzll.gameConfig.isGameTest;
  this._battlePlayState = t.battlePlayState;
  $battleMgr.default.instance.getCurScene().pause();
  this.updateView();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nShake = null;
  e.sliderMusicVolume = null;
  e.sliderEffectVolume = null;
  e.musicVolumePro = null;
  e.effectVolumePro = null;
  e.nGm = null;
  e._battlePlayState = !1;
  return e;
}
export default y;
