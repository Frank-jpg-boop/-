var i;
var $frameEnum = require("./FrameEnum");
var $popupBase = require("./PopupBase");
var $popupManager = require("./PopupManager");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $localDataProxy = require("./LocalDataProxy");
var $battleMgr = require("./BattleMgr");
var $actorMgr = require("./ActorMgr");
var $gameEnum = require("./GameEnum");
var d = cc._decorator;
var m = d.ccclass;
var y = d.property;
var _ = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.toggle = null;
        e._battlePlayState = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        this._battlePlayState = t.battlePlayState;
        this.toggle.isChecked = !1;
    };
    e.prototype.onClickBtnOk = function () {
        var t = $battleMgr.default.instance.getCurScene();
        if (t) {
            var e = $actorMgr.default.instance.getActor(t.playerId);
            if (!e || e.isDead()) {
                return void $globalPopupMgr.default.instance.showTips("玩家已死亡，无法撤离");
            }
            this.removeUI();
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "popups/LevelBackPopup",
                keep: !0
            });
        }
    };
    e.prototype.onClickBtnCancel = function () {
        if (this._battlePlayState) {
            $battleMgr.default.instance.getCurScene().resume();
        }
        this.removeUI();
    };
    e.prototype.onToggleChange = function () {
        $localDataProxy.localDataProxy.setDailyRefreshValue(
            $gameEnum.Game.EDailyRefreshDataKey.POWER_FULL_NOT_POPUP,
            this.toggle.isChecked ? 1 : 0
        );
    };
    __decorate([y(cc.Toggle)], e.prototype, "toggle", void 0);
    return __decorate([m], e);
})($popupBase.PopupBase);
exports.default = _;
