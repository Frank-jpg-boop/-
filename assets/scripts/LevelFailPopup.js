var i;
var $eventManager = require("./EventManager");
var $popupBase = require("./PopupBase");
var $util = require("./Util");
var $adMgr = require("./AdMgr");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $reportMgr = require("./ReportMgr");
var $localDataProxy = require("./LocalDataProxy");
var $stageDataProxy = require("./StageDataProxy");
var $battleMgr = require("./BattleMgr");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var $gameEnum = require("./GameEnum");
var $electricItem = require("./ElectricItem");
var $resultBagView = require("./ResultBagView");
var b = cc._decorator;
var E = b.ccclass;
var S = b.property;
var P = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.resultBagView = null;
        e.nBtnResurgence = null;
        e.electric = null;
        e.nBtnBack = null;
        e.nTips = null;
        e._battlePlayState = !1;
        e._isLockClick = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        this.electric.init(!0);
        this._isLockClick = !1;
        this._battlePlayState = t.battlePlayState;
        $battleMgr.default.instance.getCurScene().pause();
        this.nBtnResurgence.active =
            $levelBattleData.levelBattleData.data.resurgenceCount < $levelBattleData.levelBattleData.maxResurgenceCount;
        if (this.nBtnResurgence.active) {
            var e = this.nBtnResurgence.getChildByName("Layout").getChildByName("Share");
            var n = this.nBtnResurgence.getChildByName("Layout").getChildByName("Ad");
            var i = this.getCurResurgenceType();
            e.active = 2 == i;
            n.active = 1 == i;
            this.nBtnResurgence.getChildByName("Layout").getChildByName("Count").getComponent(cc.Label).string =
                "(" +
                ($levelBattleData.levelBattleData.maxResurgenceCount -
                    $levelBattleData.levelBattleData.data.resurgenceCount) +
                "/" +
                $levelBattleData.levelBattleData.maxResurgenceCount +
                ")";
        }
        var o = $levelBattleData.levelBattleData.electric >= $levelBattleData.levelBattleData.electricPowerCount;
        this.nTips.active = !1;
        if (o) {
            this.nBtnBack.getChildByName("Desc").getComponent(cc.Label).string = "紧急撤离";
        } else {
            this.nBtnBack.getChildByName("Desc").getComponent(cc.Label).string = "放弃";
        }
        if (o) {
            this.nBtnBack.getChildByName("Tips").getComponent(cc.Label).string = "电池已足够";
        } else {
            this.nBtnBack.getChildByName("Tips").getComponent(cc.Label).string = "电池不足以紧急撤离";
        }
        $stageDataProxy.stageDataProxy.updateExploreValue(
            $levelBattleData.levelBattleData.cfgStage.id,
            $levelBattleData.levelBattleData.data.exploreValue
        );
    };
    e.prototype.onShow = function () {
        this.resultBagView.init($levelBattleData.levelBattleData.bagData.bagEquipDatas, !1);
    };
    e.prototype.resurgence = function (t) {
        var e;
        if (void 0 === t) {
            t = !1;
        }
        if (t) {
            //
        } else {
            $levelBattleData.levelBattleData.data.resurgenceCount++;
        }
        this.removeUI();
        if (this._battlePlayState) {
            if (null === (e = $battleMgr.default.instance.getCurScene()) || void 0 === e) {
                //
            } else {
                e.resume();
            }
        }
        $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.REVIVE_PLAYER);
    };
    e.prototype.onClickBtnBack = function () {
        var t = $localDataProxy.localDataProxy.getDailyRefreshValue(
            $gameEnum.Game.EDailyRefreshDataKey.LOSE_ADD_HEIGHT_RATE
        );
        $localDataProxy.localDataProxy.setDailyRefreshValue(
            $gameEnum.Game.EDailyRefreshDataKey.LOSE_ADD_HEIGHT_RATE,
            t + $levelBattleData.levelBattleData.cfgStage.getLose
        );
        $reportMgr.ReportMgr.instance.reportEvent("BA_StageLose", {
            userA: "" + $levelBattleData.levelBattleData.cfgStage.id
        });
        return $levelBattleData.levelBattleData.electric >= $levelBattleData.levelBattleData.electricPowerCount
            ? (this.removeUI(),
              $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.REVIVE_PLAYER, !0),
              void $battleMgr.default.instance.getCurScene().scheduleWin())
            : (($stageDataProxy.stageDataProxy.isBackBattleFail = !0),
              $stageDataProxy.stageDataProxy.checkOver()
                  ? (this.removeUI(), void $globalPopupMgr.default.instance.showLevelOver())
                  : void $battleMgr.default.instance.exitLevelScene());
    };
    e.prototype.onClickBtnResurgence = function () {
        var t = this;
        if (!this._isLockClick) {
            this._isLockClick = !0;
            if ($battleMgr.default.instance.gm_InfiniteResurrection) {
                this.resurgence(!0);
            } else {
                switch (this.getCurResurgenceType()) {
                    case 0:
                        this.resurgence();
                        break;
                    case 1:
                        $adMgr.AdMgr.instance.showVideoAd({
                            id: 1,
                            eventId: "AD_Rebirth",
                            eventData: {
                                userA: "" + $levelBattleData.levelBattleData.cfgStage.id
                            },
                            success: function () {
                                t.resurgence();
                            },
                            fail: function () {
                                t._isLockClick = !1;
                            },
                            error: function (e) {
                                cc.log(e);
                                t._isLockClick = !1;
                            }
                        });
                        break;
                    case 2:
                        mm.platform.shareAppMessage({
                            success: function () {
                                t.resurgence();
                            },
                            fail: function () {
                                t._isLockClick = !1;
                            }
                        });
                }
                $util.default.delay(
                    1,
                    function () {
                        t._isLockClick = !1;
                    },
                    this
                );
            }
        }
    };
    e.prototype.getCurResurgenceType = function () {
        for (var t = $levelBattleData.levelBattleData.data.resurgenceCount, e = []; ; ) {
            if (1 == $levelBattleData.levelBattleData.cfgStage.id) {
                e = [0, 1, 1];
                break;
            }
            var n = $localDataProxy.localDataProxy.getPlayGameDay() + 1;
            if (1 == n) {
                e = [2, 1, 1];
                break;
            }
            if (n >= 2 && n <= 7) {
                e = [1, 1, 1];
                break;
            }
            e = [1, 1, 1];
            break;
        }
        return e[t];
    };
    __decorate([S($resultBagView.default)], e.prototype, "resultBagView", void 0);
    __decorate([S(cc.Node)], e.prototype, "nBtnResurgence", void 0);
    __decorate([S($electricItem.default)], e.prototype, "electric", void 0);
    __decorate([S(cc.Node)], e.prototype, "nBtnBack", void 0);
    __decorate([S(cc.Node)], e.prototype, "nTips", void 0);
    return __decorate([E], e);
})($popupBase.PopupBase);
exports.default = P;
