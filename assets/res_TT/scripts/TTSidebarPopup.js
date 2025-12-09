import $cfg from '../../scripts/Cfg';
import $eventManager from '../../scripts/EventManager';
import $mathUtil from '../../scripts/MathUtil';
import $appProxy from '../../scripts/AppProxy';
import $popupBase from '../../scripts/PopupBase';
import $gameEnum from '../../scripts/GameEnum';
import $dataMgr from '../../scripts/DataMgr';
import $itemDataProxy from '../../scripts/ItemDataProxy';
import $localDataProxy from '../../scripts/LocalDataProxy';
import $tTSidebarItem from './TTSidebarItem';
let n;
const v = cc._decorator;
const E = v.ccclass;
const _ = v.property;
const T = (function (e) {
    function t() {
        const t = (null !== e && e.apply(this, arguments)) || this;
        t.nBtnReceive = null;
        t.nBtnTarget = null;
        t.nComplete = null;
        t.lName = null;
        return t;
    }
    t.prototype.onDisable = function () {
        $eventManager.EventManager.instance.off($appProxy.AppEvent.GAME_SHOW, this.updateView, this);
    };
    t.prototype.init = function () {
        this.lName.string = yzll.gameConfig.gameName;
        this.nBtnReceive.active = this.nBtnTarget.active = !1;
        $eventManager.EventManager.instance.on($appProxy.AppEvent.GAME_SHOW, this.updateView, this);
        const e = $cfg.default.instance.dataCons.getById(18).val.split("_").map(Number);
        const t = (e[0], e[1]);
        this.node.getChildByName("quality").getChildByName("num").getComponent(cc.Label).string =
            "x" + $mathUtil.MathUtil.formatValue(t);
        this.updateView();
    };
    t.prototype.updateView = function () {
        const e =
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
            const e = $cfg.default.instance.dataCons.getById(18).val.split("_").map(Number);
            const t = [
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
        const e = this;
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
})($popupBase.PopupBase);
exports.default = T;
