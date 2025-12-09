import $audioManager from './AudioManager';
import $basicsProxy from './BasicsProxy';
import $popupBase from './PopupBase';
import $globalPopupMgr from './GlobalPopupMgr';
import $userCenterMgr from './UserCenterMgr';
import $userDataProxy from './UserDataProxy';
import $userSetDataProxy from './UserSetDataProxy';
let i;
const f = cc._decorator;
const d = f.ccclass;
const m = f.property;
e.prototype.onClickBtnSet = function () {
  this._clickSetCount++;
  if (this._clickSetCount >= 10) {
    this._clickSetCount = 0;
    $globalPopupMgr.default.instance.showCopyright();
  }
};
e.prototype.onBtnCdKey = function () {
  const t = this;
  $userCenterMgr.UserCenterMgr.instance.cdkey(
    {
      value: this.eGiftCode.string,
    },
    function () {
      t.nGm.active = yzll.gameConfig.isGM;
    },
  );
};
e.prototype.onBtnGm = function () {
  $globalPopupMgr.default.instance.showHomeTestPopup();
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
  this.uid.string = 'UID: ' + $userDataProxy.userDataProxy.data.uid;
  this.versions.string = '版本号: ' + yzll.gameConfig.v;
  this.sliderMusicVolume.progress = $basicsProxy.basicsProxy.bgmVolume;
  this.musicVolumePro.fillRange = $basicsProxy.basicsProxy.bgmVolume;
  this.sliderEffectVolume.progress = $basicsProxy.basicsProxy.effectVolume;
  this.effectVolumePro.fillRange = $basicsProxy.basicsProxy.effectVolume;
  const t = $userSetDataProxy.userSetDataProxy.isVibration;
  this.nGm.active = yzll.gameConfig.isGM;
  this.nShake.getChildByName('BtnSwitch').getChildByName('Open').active = t;
  this.nShake.getChildByName('BtnSwitch').getChildByName('Close').active = !t;
};
e.prototype.init = function () {
  this._clickSetCount = 0;
  this.updateView();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nShake = null;
  e.sliderMusicVolume = null;
  e.sliderEffectVolume = null;
  e.musicVolumePro = null;
  e.effectVolumePro = null;
  e.eGiftCode = null;
  e.uid = null;
  e.versions = null;
  e.nGm = null;
  e._clickSetCount = 0;
  return e;
}
export default y;
