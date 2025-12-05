var i;
var $audioManager = require("./AudioManager");
var $basicsProxy = require("./BasicsProxy");
var $popupBase = require("./PopupBase");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $userCenterMgr = require("./UserCenterMgr");
var $userDataProxy = require("./UserDataProxy");
var $userSetDataProxy = require("./UserSetDataProxy");
var f = cc._decorator;
var d = f.ccclass;
var m = f.property;
var y = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
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
    __extends(e, t);
    e.prototype.init = function () {
        this._clickSetCount = 0;
        this.updateView();
    };
    e.prototype.updateView = function () {
        this.uid.string = "UID: " + $userDataProxy.userDataProxy.data.uid;
        this.versions.string = "版本号: " + yzll.gameConfig.v;
        this.sliderMusicVolume.progress = $basicsProxy.basicsProxy.bgmVolume;
        this.musicVolumePro.fillRange = $basicsProxy.basicsProxy.bgmVolume;
        this.sliderEffectVolume.progress = $basicsProxy.basicsProxy.effectVolume;
        this.effectVolumePro.fillRange = $basicsProxy.basicsProxy.effectVolume;
        var t = $userSetDataProxy.userSetDataProxy.isVibration;
        this.nGm.active = yzll.gameConfig.isGM;
        this.nShake.getChildByName("BtnSwitch").getChildByName("Open").active = t;
        this.nShake.getChildByName("BtnSwitch").getChildByName("Close").active = !t;
    };
    e.prototype.onSliderMusicVolumeChanged = function (t) {
        this.sliderMusicVolume.progress = t.progress;
        this.musicVolumePro.fillRange = t.progress;
        $audioManager.AudioManager.instance.setBgmVolume(t.progress);
        $userSetDataProxy.userSetDataProxy.setMusicVolume(t.progress);
    };
    e.prototype.onSliderEffectVolumeChanged = function (t) {
        this.sliderEffectVolume.progress = t.progress;
        this.effectVolumePro.fillRange = t.progress;
        $audioManager.AudioManager.instance.setEffectVolume(t.progress);
        $userSetDataProxy.userSetDataProxy.setEffectVolume(t.progress);
    };
    e.prototype.onClickBtnVibration = function () {
        var t = $userSetDataProxy.userSetDataProxy.isVibration;
        $userSetDataProxy.userSetDataProxy.setVibration(!t);
        this.updateView();
    };
    e.prototype.onBtnGm = function () {
        $globalPopupMgr.default.instance.showHomeTestPopup();
    };
    e.prototype.onBtnCdKey = function () {
        var t = this;
        $userCenterMgr.UserCenterMgr.instance.cdkey(
            {
                value: this.eGiftCode.string
            },
            function () {
                t.nGm.active = yzll.gameConfig.isGM;
            }
        );
    };
    e.prototype.onClickBtnSet = function () {
        this._clickSetCount++;
        if (this._clickSetCount >= 10) {
            this._clickSetCount = 0;
            $globalPopupMgr.default.instance.showCopyright();
        }
    };
    __decorate([m(cc.Node)], e.prototype, "nShake", void 0);
    __decorate([m(cc.Slider)], e.prototype, "sliderMusicVolume", void 0);
    __decorate([m(cc.Slider)], e.prototype, "sliderEffectVolume", void 0);
    __decorate([m(cc.Sprite)], e.prototype, "musicVolumePro", void 0);
    __decorate([m(cc.Sprite)], e.prototype, "effectVolumePro", void 0);
    __decorate([m(cc.EditBox)], e.prototype, "eGiftCode", void 0);
    __decorate([m(cc.Label)], e.prototype, "uid", void 0);
    __decorate([m(cc.Label)], e.prototype, "versions", void 0);
    __decorate([m(cc.Node)], e.prototype, "nGm", void 0);
    return __decorate([d], e);
})($popupBase.PopupBase);
exports.default = y;
