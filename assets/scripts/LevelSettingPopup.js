var i;
var $audioManager = require("./AudioManager");
var $basicsProxy = require("./BasicsProxy");
var $popupBase = require("./PopupBase");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $stageDataProxy = require("./StageDataProxy");
var $userSetDataProxy = require("./UserSetDataProxy");
var $battleMgr = require("./BattleMgr");
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
        e.nGm = null;
        e._battlePlayState = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        this.nGm.active = yzll.gameConfig.isGM || yzll.gameConfig.isGameTest;
        this._battlePlayState = t.battlePlayState;
        $battleMgr.default.instance.getCurScene().pause();
        this.updateView();
    };
    e.prototype.updateView = function () {
        this.sliderMusicVolume.progress = $basicsProxy.basicsProxy.bgmVolume;
        this.musicVolumePro.fillRange = $basicsProxy.basicsProxy.bgmVolume;
        this.sliderEffectVolume.progress = $basicsProxy.basicsProxy.effectVolume;
        this.effectVolumePro.fillRange = $basicsProxy.basicsProxy.effectVolume;
        var t = $userSetDataProxy.userSetDataProxy.isVibration;
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
    e.prototype.onClickBtnClose = function () {
        if (this._battlePlayState) {
            $battleMgr.default.instance.getCurScene().resume();
        }
        this.removeUI();
    };
    e.prototype.onClickBtnRestart = function () {
        if ($stageDataProxy.stageDataProxy.checkOver()) {
            this.removeUI();
            return void $globalPopupMgr.default.instance.showLevelOver();
        }
        $battleMgr.default.instance.restartLevelScene();
    };
    e.prototype.onClickBtnBack = function () {
        $stageDataProxy.stageDataProxy.isBackBattleFail = !0;
        if ($stageDataProxy.stageDataProxy.checkOver()) {
            this.removeUI();
            return void $globalPopupMgr.default.instance.showLevelOver();
        }
        $battleMgr.default.instance.exitLevelScene();
    };
    e.prototype.onClickBtnGM = function () {
        $globalPopupMgr.default.instance.showBattleGM();
    };
    __decorate([m(cc.Node)], e.prototype, "nShake", void 0);
    __decorate([m(cc.Slider)], e.prototype, "sliderMusicVolume", void 0);
    __decorate([m(cc.Slider)], e.prototype, "sliderEffectVolume", void 0);
    __decorate([m(cc.Sprite)], e.prototype, "musicVolumePro", void 0);
    __decorate([m(cc.Sprite)], e.prototype, "effectVolumePro", void 0);
    __decorate([m(cc.Node)], e.prototype, "nGm", void 0);
    return __decorate([d], e);
})($popupBase.PopupBase);
exports.default = y;
