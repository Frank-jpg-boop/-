var i;
exports.ELevelWinPopupEvent = void 0;
var a;
var $resultBagView = require("./ResultBagView");
var $cfg = require("./Cfg");
var $itemEnum = require("./ItemEnum");
var $eventManager = require("./EventManager");
var $nodePoolManager = require("./NodePoolManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $popupBase = require("./PopupBase");
var $animUtils = require("./AnimUtils");
var $nodeUtil = require("./NodeUtil");
var $stageDataProxy = require("./StageDataProxy");
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $unitMgr = require("./UnitMgr");
var $levelBattleData = require("./LevelBattleData");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $itemDataProxy = require("./ItemDataProxy");
var $guideMgr = require("./GuideMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $reportMgr = require("./ReportMgr");
var $mathUtil = require("./MathUtil");
var I = cc._decorator;
var R = I.ccclass;
var D = I.property;
!(function (t) {
    t.SWITCH_BAG_ITEM_REWARD = "switch_bag_item_reward";
    t.ON_REWARD_SWITCH_COMPLETED = "on_reward_switch_completed";
})((a = exports.ELevelWinPopupEvent || (exports.ELevelWinPopupEvent = {})));
var T = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nWinTitle = null;
        e.nRewardView = null;
        e.nResultBagView = null;
        e.pGameFlyGood = null;
        e.nBottom = null;
        e.lSurvival = null;
        e._rewardItemMap = null;
        e._rescueCount = 0;
        e._typeNums = [];
        e._isPlayTypeAnims = [];
        e._isFinish = !1;
        e._isComplete = !1;
        e._isBackHome = !1;
        e._bagCreateRewardMaps = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        var e = this;
        this._isBackHome = !1;
        $eventManager.EventManager.instance.on(a.SWITCH_BAG_ITEM_REWARD, this.onEventSwitchBagItemReward, this);
        $eventManager.EventManager.instance.on(a.ON_REWARD_SWITCH_COMPLETED, this.onEventRewardSwitchComplete, this);
        this.nBottom.active = !1;
        this._isFinish = t.isFinish;
        this.nWinTitle.getChildByName("Type1").active = t.isFinish;
        this.nWinTitle.getChildByName("Type2").active = !t.isFinish;
        this._rewardItemMap = new Map();
        this._isComplete = !1;
        if (t.isFinish) {
            $levelBattleData.levelBattleData.data.exploreValue = $levelBattleData.levelBattleData.cfgStage.maxRoom;
        }
        if (
            0 == $levelBattleData.levelBattleData.cfgStage.id &&
            $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_14
        ) {
            $eventManager.EventManager.instance.emit(
                $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                $guideDataProxy.EGuideStepId.G_14
            );
        }
        this.prevReward();
        this.initRewardNum();
        $reportMgr.ReportMgr.instance.reportEvent(t.isFinish ? "BA_StageWin" : "BA_StageEnd", {
            userA: "" + $levelBattleData.levelBattleData.cfgStage.id
        });
        this.scheduleOnce(function () {
            e.autoComplete();
        }, 8);
    };
    e.prototype.prevReward = function () {
        var t = this;
        this._bagCreateRewardMaps = [];
        this._rescueCount = 0;
        if (this._isFinish) {
            $unitMgr.UnitMgr.instance.queryUnit($gridAreaDivisionMgr.E_AreaObjectType.SURVIVOR).forEach(function (e) {
                if (e.isRescue) {
                    t._rescueCount++;
                    var n = $stageDataProxy.stageDataProxy.getStageInfo($levelBattleData.levelBattleData.stageId);
                    if (n) {
                        n.survivalKeys.push(e.key);
                    }
                }
            });
            $itemDataProxy.itemDataProxy.updateItemValue($itemEnum.E_ItemId.SURVIVOR, this._rescueCount, !1);
        }
        $levelBattleData.levelBattleData.bagData.bagEquipDatas.forEach(function (e) {
            var n = $cfg.default.instance.dataReward.getById(e.rewardId);
            var i = new Map();
            t._bagCreateRewardMaps.push(i);
            if ([200, 201, 81, 82, 83, 111].includes(n.type)) {
                var o = function (t, e) {
                    if (i.has(t)) {
                        i.set(t, i.get(t) + e);
                    } else {
                        i.set(t, e);
                    }
                };
                switch (n.type) {
                    case 111:
                        var r = n.changeID;
                        o(r, (a = 1));
                        break;
                    case 200:
                        r = $itemEnum.E_ItemId.GOLD;
                        var a = n.changeID;
                        o(r, a);
                        break;
                    case 201:
                        r = $itemEnum.E_ItemId.DIAMOND;
                        a = n.changeID;
                        o(r, a);
                        break;
                    case 81:
                    case 82:
                    case 83:
                        $itemDataProxy.itemDataProxy.randomChip(n.type % 80, n.changeID).forEach(function (t, e) {
                            o(e, t);
                        });
                }
            }
        });
        this._bagCreateRewardMaps.forEach(function (e) {
            e.forEach(function (e, n) {
                if (t._rewardItemMap.has(n)) {
                    t._rewardItemMap.set(n, t._rewardItemMap.get(n) + e);
                } else {
                    t._rewardItemMap.set(n, e);
                }
            });
        });
        if (0 != $levelBattleData.levelBattleData.cfgStage.id || this._rewardItemMap.has(101)) {
            //
        } else {
            this._rewardItemMap.set(101, 10);
        }
        this._rewardItemMap.forEach(function (t, e) {
            $itemDataProxy.itemDataProxy.updateItemValue(e, t, !1);
        });
    };
    e.prototype.initRewardNum = function () {
        var t = [];
        t.push(this._rewardItemMap.get($itemEnum.E_ItemId.GOLD));
        t.push(this._rewardItemMap.get($itemEnum.E_ItemId.DIAMOND));
        t.push(this._rescueCount);
        t.push(this.getChipCount(1));
        t.push(this.getChipCount(2));
        t.push(this.getChipCount(3));
        this._typeNums = t;
        this._isPlayTypeAnims = new Array(t.length).fill(!1);
    };
    e.prototype.playRewardNum = function (t) {
        var e = this;
        if (!this._isPlayTypeAnims[t]) {
            this._isPlayTypeAnims[t] = !0;
            var n = 0;
            var i = this._typeNums[t];
            var o = function () {
                if (n >= i) {
                    e.unschedule(o);
                }
                n++;
                e.nRewardView.children[t].getChildByName("View").getChildByName("Value").getComponent(cc.Label).string =
                    "+" + $mathUtil.MathUtil.formatValue(n);
            };
            this.schedule(o, 0.1);
        }
    };
    e.prototype.updateRewardNum = function () {
        var t = this;
        this.nRewardView.children.forEach(function (e, n) {
            e.getChildByName("View").getChildByName("Value").getComponent(cc.Label).string =
                "+" + $mathUtil.MathUtil.formatValue(t._typeNums[n]);
        });
    };
    e.prototype.onHide = function () {
        $eventManager.EventManager.instance.off(a.SWITCH_BAG_ITEM_REWARD, this.onEventSwitchBagItemReward, this);
        $eventManager.EventManager.instance.off(a.ON_REWARD_SWITCH_COMPLETED, this.onEventRewardSwitchComplete, this);
    };
    e.prototype.onShow = function () {
        this.nResultBagView
            .getComponent($resultBagView.default)
            .init($levelBattleData.levelBattleData.bagData.bagEquipDatas, !0);
    };
    e.prototype.autoComplete = function () {
        if (this._isComplete) {
            //
        } else {
            this.winComplete();
        }
    };
    e.prototype.winComplete = function () {
        if (!this._isComplete) {
            this._isComplete = !0;
            var t = $stageDataProxy.stageDataProxy.passStageId;
            $stageDataProxy.stageDataProxy.passStage(
                $levelBattleData.levelBattleData.cfgStage.id,
                $levelBattleData.levelBattleData.data.exploreValue,
                this._isFinish
            );
            var e = "";
            if (t != $stageDataProxy.stageDataProxy.passStageId) {
                e = "<color=#65CF7C>已解锁新的章节</c>";
            } else if (
                $levelBattleData.levelBattleData.cfgStage.id == t + 1 &&
                t != $stageDataProxy.stageDataProxy.maxStageId
            ) {
                var n = $cfg.default.instance.dataStage.getById($levelBattleData.levelBattleData.cfgStage.id + 1);
                if (n) {
                    e =
                        "还需救出<color=#EC382E>" +
                        (n.need -
                            $stageDataProxy.stageDataProxy.getStageSurvivalCount(
                                $levelBattleData.levelBattleData.cfgStage.id
                            )) +
                        "名幸存者</c>可解锁下一章节";
                }
            }
            this.lSurvival.string = "<b><outline color=#000000 width=3>" + e + "</outline></b>";
            this.unscheduleAllCallbacks();
            this.updateRewardNum();
            var i = [];
            this._rewardItemMap.forEach(function (t, e) {
                if (111 == $cfg.default.instance.dataItem.getById(e).type) {
                    i.push(e);
                }
            });
            if (i.length > 0) {
                this.nBottom.active = !0;
                $globalPopupMgr.default.instance.showUnlockRemainsPopup(i);
            } else {
                this.nBottom.active = !0;
            }
        }
    };
    e.prototype.backHome = function () {
        if (!this._isBackHome) {
            this._isBackHome = !0;
            this.unscheduleAllCallbacks();
            if ($stageDataProxy.stageDataProxy.checkOver()) {
                this.removeUI();
                return void $globalPopupMgr.default.instance.showLevelOver();
            }
            $battleMgr.default.instance.exitLevelScene();
        }
    };
    e.prototype.onEventSwitchBagItemReward = function (t, e, n, i) {
        var o = this;
        var r = this.node.convertToNodeSpaceAR(n);
        var a = function (t, e, n, i, a) {
            var s = [];
            if (n > 40) {
                n = 40;
            }
            for (
                var l = $nodeUtil.default.nodeParentChangeLocalPos(i.children[0].getChildByName("Icon"), o.node), u = 0;
                u < n;
                u++
            ) {
                var d = $nodePoolManager.default.instance.getNode(o.pGameFlyGood);
                d.parent = o.node;
                d.setPosition(r);
                var _ = $cfg.default.instance.dataItem.getById(e);
                if (2 == _.type) {
                    d.getChildByName("Icon").scale = 0.6;
                } else {
                    d.getChildByName("Icon").scale = 1;
                }
                $resLoader.ResLoader.setSpritFrame(
                    d.getChildByName("Icon").getComponent(cc.Sprite),
                    $frameEnum.Frame.EBundleName.RES,
                    "textures/atlas/item/" + _.icon
                );
                s.push(d);
            }
            $animUtils.AnimUtil.flyItemAnim(
                s,
                35,
                r,
                l,
                20,
                function () {
                    s.forEach(function (t) {
                        $nodePoolManager.default.instance.putNode(t);
                    });
                    if (a) {
                        a();
                    }
                },
                function () {
                    o.playRewardNum(t);
                }
            );
        };
        var s = this._bagCreateRewardMaps[t];
        if (!s || s.size <= 0) {
            if (i) {
                i();
            }
        } else {
            var l = s.size;
            s.forEach(function (t, e) {
                var n = 0;
                var r = $cfg.default.instance.dataItem.getById(e);
                if (111 != r.type) {
                    if (2 == r.type) {
                        n = 2 + r.rare;
                    } else {
                        if (1 == r.id) {
                            n = 0;
                        } else {
                            2 == r.id && (n = 1);
                        }
                    }
                    a(n, e, t, o.nRewardView.children[n], function () {
                        if (0 == --l && i) {
                            i();
                        }
                    });
                } else {
                    if (i) {
                        i();
                    }
                }
            });
        }
    };
    e.prototype.onEventRewardSwitchComplete = function () {
        this.unscheduleAllCallbacks();
        this.winComplete();
    };
    e.prototype.getChipCount = function (t) {
        var e = 0;
        this._rewardItemMap.forEach(function (n, i) {
            if ($cfg.default.instance.dataItem.getById(i).rare == t) {
                e += n;
            }
        });
        return e;
    };
    e.prototype.onClickBtnBack = function () {
        this.backHome();
    };
    __decorate([D(cc.Node)], e.prototype, "nWinTitle", void 0);
    __decorate([D(cc.Node)], e.prototype, "nRewardView", void 0);
    __decorate([D(cc.Node)], e.prototype, "nResultBagView", void 0);
    __decorate([D(cc.Prefab)], e.prototype, "pGameFlyGood", void 0);
    __decorate([D(cc.Node)], e.prototype, "nBottom", void 0);
    __decorate([D(cc.RichText)], e.prototype, "lSurvival", void 0);
    return __decorate([R], e);
})($popupBase.PopupBase);
exports.default = T;
