var i;
var $cfg = require("./Cfg");
var $componentBase = require("./ComponentBase");
var $eventManager = require("./EventManager");
var $nodePoolManager = require("./NodePoolManager");
var $resLoader = require("./ResLoader");
var $randomUtil = require("./RandomUtil");
var $frameEnum = require("./FrameEnum");
var $popupManager = require("./PopupManager");
var $sceneManager = require("./SceneManager");
var $nodeUtil = require("./NodeUtil");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $guideMgr = require("./GuideMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $localDataProxy = require("./LocalDataProxy");
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $joystick = require("./Joystick");
var $spAnimCtrl = require("./SpAnimCtrl");
var $battleEnum = require("./BattleEnum");
var $actorMgr = require("./ActorMgr");
var $unitMgr = require("./UnitMgr");
var $levelBattleData = require("./LevelBattleData");
var $gameEnum = require("./GameEnum");
var $electricItem = require("./ElectricItem");
var $bossHpView = require("./BossHpView");
var $exitPointArrowView = require("./ExitPointArrowView");
var $gameInfoView = require("./GameInfoView");
var $killBossView = require("./KillBossView");
var $popBagInfoView = require("./PopBagInfoView");
var k = cc._decorator;
var N = k.ccclass;
var L = k.property;
var j = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.joystick = null;
        e.gameInfoView = null;
        e.nGameFlyGood = null;
        e.nGold = null;
        e.nGameUILayer = null;
        e.nFly = null;
        e.nBag = null;
        e.electricItem = null;
        e.nTouchLock = null;
        e.exitPointArrowView = null;
        e.bossHpView = null;
        e.killBossView = null;
        e.spCtrlGuide = null;
        e.popBagInfoView = null;
        e._isShowJoystickGuide = !1;
        e._isPopupBack = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        t.prototype.onLoad.call(this);
        this.nTouchLock.active = !0;
        $eventManager.EventManager.instance.on(
            $battleEnum.EBattleEvent.PICKUP_FLY_ITEM,
            this.onEventPickupFlyGood,
            this
        );
        $eventManager.EventManager.instance.on(
            $battleEnum.EBattleEvent.CONSUME_FLY_ITEM,
            this.onEventConsumeFlyGood,
            this
        );
        $eventManager.EventManager.instance.on($battleEnum.EBattleEvent.UPDATE_BAG_UI, this.onEventUpdateBag, this);
        $eventManager.EventManager.instance.on($battleEnum.EBattleEvent.GAEM_START_INFORM, this.onEventGameStart, this);
        $eventManager.EventManager.instance.on(
            $battleEnum.EBattleEvent.SET_FULL_BAG_UI,
            this.onEventSetFullBagState,
            this
        );
        $eventManager.EventManager.instance.on($guideMgr.EGuideEvent.GUIDE_CHANGE, this.onGuideChange, this);
        $eventManager.EventManager.instance.on(
            $levelBattleData.ELevelBattleDataEvent.ELECTRIC_CHANGE,
            this.onEventUpdateElectric,
            this
        );
    };
    e.prototype.onDestroy = function () {
        t.prototype.onDestroy.call(this);
        $eventManager.EventManager.instance.off(
            $battleEnum.EBattleEvent.PICKUP_FLY_ITEM,
            this.onEventPickupFlyGood,
            this
        );
        $eventManager.EventManager.instance.off(
            $battleEnum.EBattleEvent.CONSUME_FLY_ITEM,
            this.onEventConsumeFlyGood,
            this
        );
        $eventManager.EventManager.instance.off($battleEnum.EBattleEvent.UPDATE_BAG_UI, this.onEventUpdateBag, this);
        $eventManager.EventManager.instance.off(
            $battleEnum.EBattleEvent.GAEM_START_INFORM,
            this.onEventGameStart,
            this
        );
        $eventManager.EventManager.instance.off(
            $battleEnum.EBattleEvent.SET_FULL_BAG_UI,
            this.onEventSetFullBagState,
            this
        );
        $eventManager.EventManager.instance.off($guideMgr.EGuideEvent.GUIDE_CHANGE, this.onGuideChange, this);
        $eventManager.EventManager.instance.off(
            $levelBattleData.ELevelBattleDataEvent.ELECTRIC_CHANGE,
            this.onEventUpdateElectric,
            this
        );
    };
    e.prototype.start = function () {
        var t = this;
        this._isPopupBack = !1;
        $battleMgr.default.instance.switchScene($battleEnum.EBattleSceneType.LEVEL, function () {
            $sceneManager.SceneManager.instance.hideSceneLoading(null, !0);
            $battleMgr.default.instance.getCurScene().uiNode = t.node;
            t.initView();
        });
    };
    e.prototype.initView = function () {
        this.gameInfoView.initView();
        this.exitPointArrowView.initView();
        this.bossHpView.initView();
        this.killBossView.initView();
        this.electricItem.init();
        this.updateBagView();
        this.initGuideView();
    };
    e.prototype.initGuideView = function () {
        if (0 == $levelBattleData.levelBattleData.cfgStage.id) {
            this.nBag.active = !1;
            this.electricItem.node.active = !1;
        }
    };
    e.prototype.showJoystickGuide = function (t) {
        var e = this;
        this._isShowJoystickGuide = !0;
        this.spCtrlGuide.node.active = !0;
        this.spCtrlGuide.playAnim("appear", 1, !1, function () {
            e.spCtrlGuide.playAnim(t, 1, !0);
        });
    };
    e.prototype.hideJoystickGuide = function () {
        var t = this;
        this._isShowJoystickGuide = !1;
        this.spCtrlGuide.playAnim("over", 1, !1, function () {
            t.spCtrlGuide.node.active = !1;
        });
    };
    e.prototype.update = function (t) {
        var e = $battleMgr.default.instance.getCurScene();
        if (e && e.isInit && e.isPlay && !e.isResult) {
            this.joystick.updateKeyCode(t);
        }
    };
    e.prototype.showBagItemInfo = function (t) {
        if ("" != $cfg.default.instance.dataReward.getById(t).boxObj) {
            this.popBagInfoView.pushReward(t);
        }
    };
    e.prototype.onEventGameStart = function (t) {
        var e = this;
        this.node.getComponent(cc.Animation).once(
            cc.Animation.EventType.FINISHED,
            function () {
                e.nTouchLock.active = !1;
                if (t) {
                    t();
                }
                e.electricItem.onStart();
            },
            this
        );
        this.node.getComponent(cc.Animation).play("GameUIPlay", 0);
    };
    e.prototype.onEventPickupFlyGood = function (t, e, n) {
        if (1 != t) {
            if (900 != t) {
                "" == $cfg.default.instance.dataReward.getById(t).boxObj || this.pickupFlyBagCommon(t, e, n);
            } else {
                this.pickupFlyElectric(n);
            }
        } else {
            this.pickupFlyGold(e, n);
        }
    };
    e.prototype.pickupFlyGold = function (t, e) {
        for (
            var n = this,
                i = Math.min(5, t),
                o = Math.floor(t / i),
                r = t % i,
                s = function (t) {
                    var s = t;
                    f.scheduleOnce(function () {
                        var t = $battleMgr.default.instance.getCurScene();
                        if (t) {
                            var f = $nodePoolManager.default.instance.getNode(n.nGameFlyGood);
                            f.parent = n.nFly;
                            $nodeUtil.default.setGroup(f, "default");
                            var d = $cfg.default.instance.dataReward.getById(1);
                            $resLoader.ResLoader.setSpritFrame(
                                f.getChildByName("Icon").getComponent(cc.Sprite),
                                $frameEnum.Frame.EBundleName.RES,
                                "textures/atlas/item_scene/" + d.spr
                            );
                            var v = t.cameraCtrl.gameWorldPosToUiWorldPos(e);
                            f.setPosition(n.nFly.convertToNodeSpaceAR(v));
                            var E = $nodeUtil.default.nodeParentChangeLocalPos(n.nGold, n.nFly);
                            cc.tween(f)
                                .by(
                                    0.2,
                                    {
                                        y: 50
                                    },
                                    {
                                        easing: "quadIn"
                                    }
                                )
                                .by(
                                    0.15,
                                    {
                                        y: -30
                                    },
                                    {
                                        easing: "quadOut"
                                    }
                                )
                                .delay(0.2)
                                .call(function () {
                                    var t = f.getPosition();
                                    var e = E;
                                    var a = t.add(
                                        cc.v2(
                                            $randomUtil.RandomUtil.randomInt(-200, 200),
                                            t.y + $randomUtil.RandomUtil.randomInt(100, 200)
                                        )
                                    );
                                    cc.tween(f)
                                        .bezierTo(0.5, t, a, e)
                                        .call(function () {
                                            var t = o + (s == i - 1 ? r : 0);
                                            $levelBattleData.levelBattleData.updateGold(t);
                                            if (
                                                0 == $levelBattleData.levelBattleData.cfgStage.id &&
                                                $guideMgr.GuideMgr.instance.cfgGuideStepId ==
                                                    $guideDataProxy.EGuideStepId.G_8 &&
                                                $levelBattleData.levelBattleData.gold >= 20
                                            ) {
                                                $eventManager.EventManager.instance.emit(
                                                    $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                                                    $guideDataProxy.EGuideStepId.G_8
                                                );
                                                $globalPopupMgr.default.instance.showTips(
                                                    "【敌人无穷无尽，我们先撤退】"
                                                );
                                            }
                                            f.getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = null;
                                            $nodePoolManager.default.instance.putNode(f);
                                            if (s == i - 1) {
                                                cc.tween(n.nGold)
                                                    .to(0.2, {
                                                        scale: 1.2
                                                    })
                                                    .to(0.1, {
                                                        scale: 1
                                                    })
                                                    .start();
                                            }
                                        })
                                        .start();
                                })
                                .start();
                        }
                    }, 0.15 * t);
                },
                f = this,
                d = 0;
            d < i;
            d++
        ) {
            s(d);
        }
    };
    e.prototype.pickupFlyElectric = function (t) {
        var e = this;
        var n = $nodePoolManager.default.instance.getNode(this.nGameFlyGood);
        n.parent = this.nFly;
        $nodeUtil.default.setGroup(n, "default");
        var i = $cfg.default.instance.dataReward.getById(900);
        $resLoader.ResLoader.setSpritFrame(
            n.getChildByName("Icon").getComponent(cc.Sprite),
            $frameEnum.Frame.EBundleName.RES,
            "textures/atlas/item_scene/" + i.spr
        );
        var o = $battleMgr.default.instance.getCurScene();
        if (o) {
            var r = o.cameraCtrl.gameWorldPosToUiWorldPos(t);
            n.setPosition(this.nFly.convertToNodeSpaceAR(r));
            var s = $nodeUtil.default.nodeParentChangeLocalPos(this.electricItem.node, this.nFly);
            var c = n.getPosition();
            var f = s;
            var d = c.add(
                cc.v2($randomUtil.RandomUtil.randomInt(0, 200), c.y + $randomUtil.RandomUtil.randomInt(100, 200))
            );
            this.electricItem.node.active = !0;
            cc.tween(n)
                .bezierTo(0.6, c, d, f)
                .call(function () {
                    $levelBattleData.levelBattleData.updateElectric(1);
                    n.getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = null;
                    $nodePoolManager.default.instance.putNode(n);
                    cc.tween(e.electricItem.node)
                        .to(0.2, {
                            scale: 1.2
                        })
                        .to(0.1, {
                            scale: 1
                        })
                        .start();
                    if (
                        $levelBattleData.levelBattleData.electric >= $levelBattleData.levelBattleData.electricPowerCount
                    ) {
                        e.showBackConfirm();
                    }
                })
                .start();
        }
    };
    e.prototype.pickupFlyBagCommon = function (t, e, n) {
        for (
            var i = this,
                o = Math.min(5, e),
                r = function (e) {
                    var r = e;
                    s.scheduleOnce(function () {
                        var e = $nodePoolManager.default.instance.getNode(i.nGameFlyGood);
                        e.parent = i.nFly;
                        $nodeUtil.default.setGroup(e, "default");
                        var s = $cfg.default.instance.dataReward.getById(t);
                        $resLoader.ResLoader.setSpritFrame(
                            e.getChildByName("Icon").getComponent(cc.Sprite),
                            $frameEnum.Frame.EBundleName.RES,
                            "textures/atlas/item_scene/" + s.spr
                        );
                        var c = $battleMgr.default.instance.getCurScene().cameraCtrl.gameWorldPosToUiWorldPos(n);
                        e.setPosition(i.nFly.convertToNodeSpaceAR(c));
                        var f = $nodeUtil.default.nodeParentChangeLocalPos(i.nBag, i.nFly);
                        var d = e.getPosition();
                        var y = f;
                        var _ = d.add(
                            cc.v2(
                                $randomUtil.RandomUtil.randomInt(0, 200),
                                d.y + $randomUtil.RandomUtil.randomInt(100, 200)
                            )
                        );
                        i.nBag.active = !0;
                        cc.tween(e)
                            .bezierTo(0.6, d, _, y)
                            .call(function () {
                                e.getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = null;
                                $nodePoolManager.default.instance.putNode(e);
                                if (r == o - 1) {
                                    cc.tween(i.nBag.getChildByName("Icon"))
                                        .to(0.2, {
                                            scale: 1.2
                                        })
                                        .to(0.1, {
                                            scale: 1
                                        })
                                        .start();
                                }
                                if ($levelBattleData.levelBattleData.data.bagItemRecord.has(t)) {
                                    //
                                } else {
                                    $levelBattleData.levelBattleData.data.bagItemRecord.add(t);
                                    i.showBagItemInfo(t);
                                }
                            })
                            .start();
                    }, 0.15 * e);
                },
                s = this,
                c = 0;
            c < o;
            c++
        ) {
            r(c);
        }
    };
    e.prototype.onEventConsumeFlyGood = function (t, e, n, i) {
        if (1 === t) {
            this.consumeFlyGold(e, n, i);
        } else {
            this.concumeFlyBagCommon(t, e, n, i);
        }
    };
    e.prototype.consumeFlyGold = function (t, e, n) {
        for (
            var i = this,
                o = Math.min(5, t),
                r = $battleMgr.default.instance.getCurScene(),
                s = r.popHurtParent,
                c = function (t) {
                    var c = t;
                    p.scheduleOnce(function () {
                        var t = $nodePoolManager.default.instance.getNode(i.nGameFlyGood);
                        t.parent = s;
                        $nodeUtil.default.setGroup(t, "game");
                        var p = $cfg.default.instance.dataReward.getById(1);
                        $resLoader.ResLoader.setSpritFrame(
                            t.getChildByName("Icon").getComponent(cc.Sprite),
                            $frameEnum.Frame.EBundleName.RES,
                            "textures/atlas/item_scene/" + p.spr
                        );
                        var f = i.nGold.convertToWorldSpaceAR(cc.v2());
                        t.setPosition(s.convertToNodeSpaceAR(r.cameraCtrl.uiWorldPosToGameWorldPos(f)));
                        var d = s.convertToNodeSpaceAR(e);
                        cc.tween(t)
                            .to(0.5, {
                                x: d.x,
                                y: d.y
                            })
                            .call(function () {
                                t.getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = null;
                                $nodePoolManager.default.instance.putNode(t);
                                if (c == o - 1 && n) {
                                    n();
                                }
                            })
                            .start();
                    }, 0.15 * t);
                },
                p = this,
                f = 0;
            f < o;
            f++
        ) {
            c(f);
        }
    };
    e.prototype.concumeFlyBagCommon = function (t, e, n, i) {
        var o = $nodePoolManager.default.instance.getNode(this.nGameFlyGood);
        var r = $battleMgr.default.instance.getCurScene();
        var s = r.popHurtParent;
        o.parent = s;
        o.scale = 0.8;
        $nodeUtil.default.setGroup(o, "game");
        var c = $cfg.default.instance.dataReward.getById(t);
        $resLoader.ResLoader.setSpritFrame(
            o.getChildByName("Icon").getComponent(cc.Sprite),
            $frameEnum.Frame.EBundleName.RES,
            "textures/atlas/item_scene/" + c.spr
        );
        var f = this.nBag.convertToWorldSpaceAR(cc.v2());
        o.setPosition(s.convertToNodeSpaceAR(r.cameraCtrl.uiWorldPosToGameWorldPos(f)));
        var d = s.convertToNodeSpaceAR(n);
        var y = o.getPosition();
        var _ = y.add(cc.v2(0, $randomUtil.RandomUtil.randomInt(100, 200)));
        cc.tween(o)
            .bezierTo(0.7, y, _, d)
            .call(function () {
                o.getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = null;
                $nodePoolManager.default.instance.putNode(o);
                if (i) {
                    i();
                }
            })
            .start();
    };
    e.prototype.updateBagView = function () {
        var t = $actorMgr.default.instance.getActor($battleMgr.default.instance.getCurScene().playerId);
        var e = $unitMgr.UnitMgr.instance.queryUnit($gridAreaDivisionMgr.E_AreaObjectType.GOOD).filter(function (e) {
            return e.roomId == t.roomId && e.isBagItem && !e.isPickup;
        });
        this.nBag.getChildByName("Light").active = e.length > 0;
        var n = $levelBattleData.levelBattleData.bagData.bagEquipDatas.length;
        this.nBag.getChildByName("Point").getChildByName("Value").getComponent(cc.Label).string = n.toString();
    };
    e.prototype.onEventUpdateBag = function () {
        this.updateBagView();
    };
    e.prototype.onEventSetFullBagState = function (t) {
        var e = this.nBag.getChildByName("Full");
        if (e.active != t && ((e.active = t), t)) {
            var n = e.getChildByName("PopupFull");
            n.scale = 0;
            cc.tween(n)
                .to(0.2, {
                    scale: 1
                })
                .call(function () {})
                .start();
            n.getChildByName("BtnEx").active = !$levelBattleData.levelBattleData.bagData.isUnlock;
        }
    };
    e.prototype.showBackConfirm = function () {
        if (
            1 !=
                $localDataProxy.localDataProxy.getDailyRefreshValue(
                    $gameEnum.Game.EDailyRefreshDataKey.POWER_FULL_NOT_POPUP
                ) &&
            0 != $levelBattleData.levelBattleData.cfgStage.id
        ) {
            var t = $battleMgr.default.instance.getCurScene();
            if (t) {
                var e = $actorMgr.default.instance.getActor(t.playerId);
                if (e && !(t.isWaitRescue || t.isRescue || e.isDead() || this._isPopupBack)) {
                    this._isPopupBack = !0;
                    var n = $battleMgr.default.instance.getCurScene().isPlay;
                    $battleMgr.default.instance.getCurScene().pause();
                    $popupManager.PopupManager.instance.show({
                        bundleName: $frameEnum.Frame.EBundleName.GAME,
                        path: "popups/LevelBackConfirmPopup",
                        keep: !0,
                        params: {
                            battlePlayState: n
                        }
                    });
                }
            }
        }
    };
    e.prototype.onEventUpdateElectric = function () {};
    e.prototype.onClickBtnBagEx = function () {
        if (0 != $levelBattleData.levelBattleData.cfgStage.id) {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "popups/LevelBagPopup",
                keep: !0
            });
        } else {
            $globalPopupMgr.default.instance.showTips("完成引导关卡后可使用");
        }
    };
    e.prototype.onClickBtnBag = function () {
        if (0 != $levelBattleData.levelBattleData.cfgStage.id) {
            $battleMgr.default.instance.getCurScene().pause();
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "popups/LevelBagPopup",
                keep: !0
            });
        } else {
            $globalPopupMgr.default.instance.showTips("完成引导关卡后可使用");
        }
    };
    e.prototype.onClickBtnSet = function () {
        $globalPopupMgr.default.instance.showLevelSet($battleMgr.default.instance.getCurScene().isPlay);
    };
    e.prototype.onGuideChange = function () {};
    __decorate([L($joystick.default)], e.prototype, "joystick", void 0);
    __decorate([L($gameInfoView.default)], e.prototype, "gameInfoView", void 0);
    __decorate([L(cc.Prefab)], e.prototype, "nGameFlyGood", void 0);
    __decorate([L(cc.Node)], e.prototype, "nGold", void 0);
    __decorate([L(cc.Node)], e.prototype, "nGameUILayer", void 0);
    __decorate([L(cc.Node)], e.prototype, "nFly", void 0);
    __decorate([L(cc.Node)], e.prototype, "nBag", void 0);
    __decorate([L($electricItem.default)], e.prototype, "electricItem", void 0);
    __decorate([L(cc.Node)], e.prototype, "nTouchLock", void 0);
    __decorate([L($exitPointArrowView.default)], e.prototype, "exitPointArrowView", void 0);
    __decorate([L($bossHpView.default)], e.prototype, "bossHpView", void 0);
    __decorate([L($killBossView.default)], e.prototype, "killBossView", void 0);
    __decorate([L($spAnimCtrl.default)], e.prototype, "spCtrlGuide", void 0);
    __decorate([L($popBagInfoView.default)], e.prototype, "popBagInfoView", void 0);
    return __decorate([N], e);
})($componentBase.ComponentBase);
exports.default = j;
