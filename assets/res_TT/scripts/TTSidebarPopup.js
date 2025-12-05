var n;
var $cfg = require("../../scripts/Cfg");
var $eventManager = require("../../scripts/EventManager");
var $mathUtil = require("../../scripts/MathUtil");
var $appProxy = require("../../scripts/AppProxy");
var $popupBase = require("../../scripts/PopupBase");
var $gameEnum = require("../../scripts/GameEnum");
var $dataMgr = require("../../scripts/DataMgr");
var $itemDataProxy = require("../../scripts/ItemDataProxy");
var $localDataProxy = require("../../scripts/LocalDataProxy");
var $tTSidebarItem = require("./TTSidebarItem");
var v = cc._decorator;
var E = v.ccclass;
var _ = v.property;
var T = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.nBtnReceive = null;
        t.nBtnTarget = null;
        t.nComplete = null;
        t.lName = null;
        return t;
    }
    __extends(t, e);
    t.prototype.onDisable = function () {
        $eventManager.EventManager.instance.off($appProxy.AppEvent.GAME_SHOW, this.updateView, this);
    };
    t.prototype.init = function () {
        this.lName.string = yzll.gameConfig.gameName;
        this.nBtnReceive.active = this.nBtnTarget.active = !1;
        $eventManager.EventManager.instance.on($appProxy.AppEvent.GAME_SHOW, this.updateView, this);
        var e = $cfg.default.instance.dataCons.getById(18).val.split("_").map(Number);
        var t = (e[0], e[1]);
        this.node.getChildByName("quality").getChildByName("num").getComponent(cc.Label).string =
            "x" + $mathUtil.MathUtil.formatValue(t);
        this.updateView();
    };
    t.prototype.updateView = function () {
        var e =
            $localDataProxy.localDataProxy.getDailyRefreshValue($gameEnum.Game.EDailyRefreshDataKey.TT_SIDEBAR_REWARD) >
            0;
        this.nBtnReceive.active = $dataMgr.DataMgr.isSidebarCardInGameForTT && !e;
        this.nBtnTarget.active = !e && !this.nBtnReceive.active;
        this.nComplete.active = e;
    };
    t.prototype.onClickBtnReward = function () {
        if (
            !(
                $localDataProxy.localDataProxy.getDailyRefreshValue(
                    $gameEnum.Game.EDailyRefreshDataKey.TT_SIDEBAR_REWARD
                ) > 0
            )
        ) {
            $localDataProxy.localDataProxy.setDailyRefreshValue(
                $gameEnum.Game.EDailyRefreshDataKey.TT_SIDEBAR_REWARD,
                1
            );
            $dataMgr.DataMgr.isSidebarCardInGameForTT = !1;
            var e = $cfg.default.instance.dataCons.getById(18).val.split("_").map(Number);
            var t = [
                {
                    itemId: e[0],
                    itemNum: e[1]
                }
            ];
            $eventManager.EventManager.instance.emit($itemDataProxy.EItemDataEvent.ITEM_ADD_COMMMON_UI_NOTICE, t);
            $eventManager.EventManager.instance.emit($tTSidebarItem.ETTSidebarItemEvent.UPDATE_REDPOINT);
            this.removeUI();
        }
    };
    t.prototype.onClickBtnClose = function () {
        this.removeUI();
    };
    t.prototype.onClickBtnGoto = function () {
        var e = this;
        if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
            tt.navigateToScene({
                scene: "sidebar",
                success: function () {
                    console.log("navigate to scene success");
                    $dataMgr.DataMgr.isSidebarCardInGameForTT = !0;
                    e.updateView();
                    $eventManager.EventManager.instance.emit($tTSidebarItem.ETTSidebarItemEvent.UPDATE_REDPOINT);
                },
                fail: function (e) {
                    console.log("navigate to scene fail: ", e);
                }
            });
        } else {
            if (cc.sys.isBrowser) {
                $dataMgr.DataMgr.isSidebarCardInGameForTT = !0;
                $eventManager.EventManager.instance.emit($tTSidebarItem.ETTSidebarItemEvent.UPDATE_REDPOINT);
                this.updateView();
            }
        }
    };
    __decorate([_(cc.Node)], t.prototype, "nBtnReceive", void 0);
    __decorate([_(cc.Node)], t.prototype, "nBtnTarget", void 0);
    __decorate([_(cc.Node)], t.prototype, "nComplete", void 0);
    __decorate([_(cc.Label)], t.prototype, "lName", void 0);
    return __decorate([E], t);
})($popupBase.PopupBase);
exports.default = T;
