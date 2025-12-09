var i;
var $cfg = require("./Cfg");
var $globalEnum = require("./GlobalEnum");
var $itemEnum = require("./ItemEnum");
var $autoPopupCtrl = require("./AutoPopupCtrl");
var $flyItemAnimCtrl = require("./FlyItemAnimCtrl");
var $appBase = require("./AppBase");
var $blockInputManager = require("./BlockInputManager");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $mathUtil = require("./MathUtil");
var $frameEnum = require("./FrameEnum");
var $appProxy = require("./AppProxy");
var $sceneBase = require("./SceneBase");
var $sceneManager = require("./SceneManager");
var $nodeUtil = require("./NodeUtil");
var $gameEnum = require("./GameEnum");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $guideMgr = require("./GuideMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $itemDataProxy = require("./ItemDataProxy");
var $localDataProxy = require("./LocalDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var $signDataProxy = require("./SignDataProxy");
var $stageDataProxy = require("./StageDataProxy");
var $homeEnum = require("./HomeEnum");
var T = cc._decorator;
var B = T.ccclass;
var O = T.property;
var x = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mDownBtns = null;
        e.mBattleView = null;
        e.mCampsiteView = null;
        e.mArtifactView = null;
        e.mShopView = null;
        e.mInstanceView = null;
        e.mGoldNum = null;
        e.mDiamondNum = null;
        e.mSurvive = null;
        e.autoPopupCtrl = null;
        e._isCanClick = !0;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        var e = this;
        if ($stageDataProxy.stageDataProxy.isUnlockNewStage) {
            $blockInputManager.BlockInputManager.instance.netBlockInputNum++;
        }
        cc.director.getScene().name = "home";
        t.prototype.onLoad.call(this);
        $eventManager.EventManager.instance.on($homeEnum.EHomeEvent.GOTO_PAGE, this.gotoPageView, this);
        $eventManager.EventManager.instance.on(
            $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE + $itemEnum.E_ItemId.GOLD,
            this.updateGoldNum,
            this
        );
        $eventManager.EventManager.instance.on(
            $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE + $itemEnum.E_ItemId.DIAMOND,
            this.updateDiamondNum,
            this
        );
        $eventManager.EventManager.instance.on(
            $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE + $itemEnum.E_ItemId.SURVIVOR,
            this.updateSurviveNum,
            this
        );
        $eventManager.EventManager.instance.on(
            $playerDataProxy.EPlayDataEvent.GM_PASS_STAGE,
            this.onUpdateBtnState,
            this
        );
        $eventManager.EventManager.instance.on(
            $itemDataProxy.EItemDataEvent.ITEM_ADD_COMMMON_UI_NOTICE,
            this.onAddItem,
            this
        );
        this.updateGoldNum();
        this.updateDiamondNum();
        this.updateSurviveNum();
        this.scheduleOnce(function () {
            e.initFlyItemAnim();
        }, 1);
        $eventManager.EventManager.instance.emit($appProxy.AppEvent.BGM_CHANGED, $globalEnum.Global.EBgmType.HOME);
        if (
            -1 != $guideMgr.GuideMgr.instance.cfgGuideStepId &&
            $guideMgr.GuideMgr.instance.cfgGuideStepId <= $guideDataProxy.EGuideStepId.G_27
        ) {
            $blockInputManager.BlockInputManager.instance.netBlockInputNum++;
        }
        this.onUpdateBtnState();
    };
    e.prototype.start = function () {
        t.prototype.start.call(this);
        this.updateAutoPopup();
    };
    e.prototype.updateAutoPopup = function () {
        if (
            $guideDataProxy.guideDataProxy.isComplete &&
            0 ==
                $localDataProxy.localDataProxy.getDailyRefreshValue(
                    $gameEnum.Game.EDailyRefreshDataKey.SHOW_GENTLE_TIPS
                )
        ) {
            $localDataProxy.localDataProxy.setDailyRefreshValue(
                $gameEnum.Game.EDailyRefreshDataKey.SHOW_GENTLE_TIPS,
                1
            );
            this.autoPopupCtrl.pushPopup(
                "GentleTipsPopup",
                "popups/GentleTipsPopup",
                {},
                !0,
                $frameEnum.Frame.EBundleName.RES
            );
        }
        if ($guideDataProxy.guideDataProxy.isComplete && $signDataProxy.signDataProxy.canSevenSign()) {
            this.autoPopupCtrl.pushPopup("SevenSignPopup", "popups/SevenSignPopup", {}, !0);
        }
        if (
            $guideDataProxy.guideDataProxy.isComplete &&
            $stageDataProxy.stageDataProxy.isUnlockNewStage &&
            0 != $stageDataProxy.stageDataProxy.unlockSkillId
        ) {
            this.autoPopupCtrl.pushPopup(
                "UnlockArtifactPopup",
                "popups/UnlockArtifactPopup",
                {
                    skillId: $stageDataProxy.stageDataProxy.unlockSkillId
                },
                !0,
                $frameEnum.Frame.EBundleName.HOME,
                2
            );
        }
        if (
            $guideDataProxy.guideDataProxy.isComplete &&
            $stageDataProxy.stageDataProxy.isBackBattleFail &&
            Math.random() < Number($cfg.default.instance.dataCons.getById(31).val)
        ) {
            $stageDataProxy.stageDataProxy.isBackBattleFail = !1;
            this.autoPopupCtrl.pushPopup(
                "IntensifyPopup",
                "popups/IntensifyPopup",
                {},
                !1,
                $frameEnum.Frame.EBundleName.HOME
            );
        }
    };
    e.prototype.onUpdateBtnState = function () {
        var t = $stageDataProxy.stageDataProxy.passStageId >= 1;
        var e = this.mDownBtns.getChildByName("BtnShop");
        e.getChildByName("lockIcon").active = !t;
        if (t) {
            n = e.getChildByName("icon");
            $nodeUtil.default.setSpriteNormalMaterial(n);
        } else {
            var n = e.getChildByName("icon");
            $nodeUtil.default.setSpriteGrayMaterial(n);
        }
        var i = this.mDownBtns.getChildByName("BtnCampsite");
        var o = i.getChildByName("lockIcon");
        var r = $stageDataProxy.stageDataProxy.passStageId >= 1;
        o.active = !r;
        if (r) {
            n = i.getChildByName("icon");
            $nodeUtil.default.setSpriteNormalMaterial(n);
        } else {
            n = i.getChildByName("icon");
            $nodeUtil.default.setSpriteGrayMaterial(n);
        }
    };
    e.prototype.initFlyItemAnim = function () {
        for (
            var t = this.node.getChildByName("Fly"),
                e = t.getComponent($flyItemAnimCtrl.default),
                n = new Map([
                    [0, t],
                    [1, $appBase.rootNode]
                ]),
                i = new Map([
                    [
                        $itemEnum.E_ItemId.GOLD,
                        $nodeUtil.default.nodeWorldPos(cc.find("topUI/btns/BtnGold/Gold", this.node))
                    ],
                    [
                        $itemEnum.E_ItemId.DIAMOND,
                        $nodeUtil.default.nodeWorldPos(cc.find("topUI/btns/BtnDiamond/Diamond", this.node))
                    ]
                ]),
                o = $cfg.default.instance.dataItem.queryAll(function (t) {
                    return 2 == t.type;
                }),
                r = $nodeUtil.default.nodeWorldPos(cc.find("downUI/btns/BtnArtifact", this.node)),
                s = 0;
            s < o.length;
            s++
        ) {
            var l = o[s];
            i.set(l.id, r);
        }
        e.init(n, i);
    };
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off($homeEnum.EHomeEvent.GOTO_PAGE, this.gotoPageView, this);
        $eventManager.EventManager.instance.off(
            $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE + $itemEnum.E_ItemId.GOLD,
            this.updateGoldNum,
            this
        );
        $eventManager.EventManager.instance.off(
            $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE + $itemEnum.E_ItemId.DIAMOND,
            this.updateDiamondNum,
            this
        );
        $eventManager.EventManager.instance.off(
            $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE + $itemEnum.E_ItemId.SURVIVOR,
            this.updateSurviveNum,
            this
        );
        $eventManager.EventManager.instance.off(
            $playerDataProxy.EPlayDataEvent.GM_PASS_STAGE,
            this.onUpdateBtnState,
            this
        );
        $eventManager.EventManager.instance.off(
            $itemDataProxy.EItemDataEvent.ITEM_ADD_COMMMON_UI_NOTICE,
            this.onAddItem,
            this
        );
    };
    e.prototype.onEnable = function () {
        $sceneManager.SceneManager.instance.hideSceneLoading(null, !0);
    };
    e.prototype.updateGoldNum = function () {
        this.mGoldNum.string = $mathUtil.MathUtil.formatValue(
            $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.GOLD)
        );
    };
    e.prototype.updateDiamondNum = function () {
        this.mDiamondNum.string = $mathUtil.MathUtil.formatValue(
            $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.DIAMOND)
        );
    };
    e.prototype.updateSurviveNum = function () {
        this.mSurvive.string = $mathUtil.MathUtil.formatValue(
            $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.SURVIVOR)
        );
    };
    e.prototype.onBtnShop = function (t) {
        var e = this;
        if (this._isCanClick) {
            if ($stageDataProxy.stageDataProxy.passStageId < 1) {
                $globalPopupMgr.default.instance.showTips("通过第一章解锁");
            } else {
                this.updateDownBtnState(t),
                    this.mArtifactView && (this.mArtifactView.active = !1),
                    (this.mBattleView.active = !1),
                    this.mCampsiteView && (this.mCampsiteView.active = !1),
                    this.mInstanceView && (this.mInstanceView.active = !1),
                    this.mShopView
                        ? (this.mShopView.active = !0)
                        : this.addHomeView("ShopView", function (t) {
                              e.mShopView = t;
                          });
            }
        }
    };
    e.prototype.onBtnCampsite = function (t) {
        var e = this;
        if (this._isCanClick) {
            if ($stageDataProxy.stageDataProxy.passStageId < 1) {
                $globalPopupMgr.default.instance.showTips("通过第一章解锁");
            } else {
                this.updateDownBtnState(t),
                    (this.mBattleView.active = !1),
                    this.mCampsiteView
                        ? (this.mCampsiteView.active = !0)
                        : this.addHomeView("CampsiteView", function (t) {
                              e.mCampsiteView = t;
                          }),
                    this.mArtifactView && (this.mArtifactView.active = !1),
                    this.mShopView && (this.mShopView.active = !1),
                    this.mInstanceView && (this.mInstanceView.active = !1);
            }
        }
    };
    e.prototype.onBtnBattle = function (t) {
        if (this._isCanClick) {
            if ($guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_26) {
                $eventManager.EventManager.instance.emit(
                    $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                    $guideDataProxy.EGuideStepId.G_26
                );
            }
            this.updateDownBtnState(t);
            this.mBattleView.active = !0;
            if (this.mCampsiteView) {
                this.mCampsiteView.active = !1;
            }
            if (this.mArtifactView) {
                this.mArtifactView.active = !1;
            }
            if (this.mShopView) {
                this.mShopView.active = !1;
            }
            if (this.mInstanceView) {
                this.mInstanceView.active = !1;
            }
        }
    };
    e.prototype.onBtnArtifact = function (t) {
        var e = this;
        if (this._isCanClick) {
            if ($guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_23) {
                $eventManager.EventManager.instance.emit(
                    $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                    $guideDataProxy.EGuideStepId.G_23
                );
            }
            this.updateDownBtnState(t);
            this.mBattleView.active = !1;
            if (this.mCampsiteView) {
                this.mCampsiteView.active = !1;
            }
            if (this.mArtifactView) {
                this.mArtifactView.active = !0;
            } else {
                this.addHomeView("ArtifactView", function (t) {
                    e.mArtifactView = t;
                });
            }
            if (this.mShopView) {
                this.mShopView.active = !1;
            }
            if (this.mInstanceView) {
                this.mInstanceView.active = !1;
            }
        }
    };
    e.prototype.onBtnInstance = function () {
        if (this._isCanClick) {
            $globalPopupMgr.default.instance.showTips("暂未解锁");
        }
    };
    e.prototype.addHomeView = function (t, e) {
        var n = this;
        this._isCanClick = !1;
        $resLoader.ResLoader.loadAsset({
            path: "uis/homeView/" + t,
            type: cc.Prefab,
            bundleName: "home"
        })
            .then(function (t) {
                n._isCanClick = !0;
                var i = cc.instantiate(t);
                n.mBattleView.parent.addChild(i, 3);
                if (e) {
                    e(i);
                }
            })
            .catch(function (t) {
                console.log("error:", t);
            });
    };
    e.prototype.updateDownBtnState = function (t) {
        for (
            var e = t.target, n = ["BtnShop", "BtnCampsite", "BtnBattle", "BtnArtifact", "BtnInstance"], i = 0;
            i < n.length;
            ++i
        ) {
            var o = n[i];
            var r = this.mDownBtns.getChildByName(o);
            r.getChildByName("selectBg").active = o == e.name;
            r.getChildByName("lab").active = o == e.name;
            if (o == e.name) {
                r.getChildByName("icon").y = 42;
            } else {
                r.getChildByName("icon").y = 4;
            }
        }
    };
    e.prototype.gotoPageView = function (t) {
        var e = this;
        if (
            (0 == t && $stageDataProxy.stageDataProxy.passStageId < 1) ||
            (1 == t && $stageDataProxy.stageDataProxy.passStageId < 1)
        ) {
            $globalPopupMgr.default.instance.showTips("通过第一章解锁");
        } else {
            if (4 != t) {
                this.updateDownBtnState({
                    target: {
                        name: ["BtnShop", "BtnCampsite", "BtnBattle", "BtnArtifact", "BtnInstance"][t]
                    }
                }),
                    (this.mBattleView.active = 2 == t),
                    0 == t
                        ? this.mShopView
                            ? (this.mShopView.active = !0)
                            : this.addHomeView("ShopView", function (t) {
                                  e.mShopView = t;
                                  e.mShopView.active = !0;
                              })
                        : this.mShopView && (this.mShopView.active = !1),
                    1 == t
                        ? this.mCampsiteView
                            ? (this.mCampsiteView.active = !0)
                            : this.addHomeView("CampsiteView", function (t) {
                                  e.mCampsiteView = t;
                                  e.mCampsiteView.active = !0;
                              })
                        : this.mCampsiteView && (this.mCampsiteView.active = !1),
                    3 == t
                        ? this.mArtifactView
                            ? (this.mArtifactView.active = !0)
                            : this.addHomeView("ArtifactView", function (t) {
                                  e.mArtifactView = t;
                                  e.mArtifactView.active = !0;
                              })
                        : this.mArtifactView && (this.mArtifactView.active = !1),
                    4 == t
                        ? this.mInstanceView
                            ? (this.mInstanceView.active = !0)
                            : this.addHomeView("InstanceView", function (t) {
                                  e.mInstanceView = t;
                                  e.mInstanceView.active = !0;
                              })
                        : this.mInstanceView && (this.mInstanceView.active = !1);
            } else {
                $globalPopupMgr.default.instance.showTips("暂未解锁");
            }
        }
    };
    e.prototype.onBtnSet = function () {
        $globalPopupMgr.default.instance.showHomeSetingPopup();
    };
    e.prototype.onAddItem = function (t) {
        if (!t || t.length <= 0) {
            //
        } else {
            $globalPopupMgr.default.instance.showAwardNotice(t);
        }
    };
    __decorate([O(cc.Node)], e.prototype, "mDownBtns", void 0);
    __decorate([O(cc.Node)], e.prototype, "mBattleView", void 0);
    __decorate([O(cc.Label)], e.prototype, "mGoldNum", void 0);
    __decorate([O(cc.Label)], e.prototype, "mDiamondNum", void 0);
    __decorate([O(cc.Label)], e.prototype, "mSurvive", void 0);
    __decorate([O($autoPopupCtrl.default)], e.prototype, "autoPopupCtrl", void 0);
    return __decorate([B], e);
})($sceneBase.SceneBase);
exports.default = x;
