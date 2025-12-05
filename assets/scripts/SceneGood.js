var i;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $nodePoolManager = require("./NodePoolManager");
var $resLoader = require("./ResLoader");
var $randomUtil = require("./RandomUtil");
var $frameEnum = require("./FrameEnum");
var $animUtils = require("./AnimUtils");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $battleMgr = require("./BattleMgr");
var $simplyCircleCollider = require("./SimplyCircleCollider");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $simplyVec2 = require("./SimplyVec2");
var $spAnimCtrl = require("./SpAnimCtrl");
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var $actorMgr = require("./ActorMgr");
var $levelObjectBase = require("./LevelObjectBase");
var A = cc._decorator;
var w = A.ccclass;
var C = A.property;
var M = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.spIcon = null;
        e.nShade = null;
        e.spAnimLight = null;
        e.collider = null;
        e.nTips = null;
        e._cfg = null;
        e._num = 0;
        e._isDroped = !1;
        e._isDroping = !1;
        e._finalY = 0;
        e._isPickup = !1;
        e._param = null;
        e._showFullHpTipsTime = 0;
        e._showPutupTipsTime = 0;
        e._blickTween = null;
        e._followTargetNode = null;
        e._followTargetOffsetPos = null;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "isBagItem", {
        get: function () {
            return "" != this._cfg.boxObj;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "isPickup", {
        get: function () {
            return this._isPickup;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "rewardId", {
        get: function () {
            return this._cfg.id;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "param", {
        get: function () {
            return this._param;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onInit = function () {
        this._followTargetNode = null;
        this.node.scale = 1;
        this._followTargetOffsetPos = cc.v2(0, 0);
        this.node.opacity = 255;
        this.nShade.y = 0;
        this.spIcon.node.y = 0;
        this.nShade.scale = 1;
        this._showFullHpTipsTime = 0;
        this._showPutupTipsTime = 0;
        this._param = this._initParam.param;
        this._cfg = $cfg.default.instance.dataReward.getById(this._initParam.rewardId);
        this._num = this._initParam.rewardNum;
        this.spIcon.spriteFrame = null;
        $resLoader.ResLoader.setSpritFrame(
            this.spIcon,
            $frameEnum.Frame.EBundleName.RES,
            "textures/atlas/item_scene/" + this._cfg.spr
        );
        this._isDroped = this._initParam && this._initParam.isDroped;
        this._isDroping = !1;
        this._isPickup = !1;
        this.nShade.active = this._isDroped;
        if (this._isDroped) {
            $animUtils.AnimUtil.floatAnim(this.spIcon.node, 1, 10);
            this.updateAreaKey();
        } else {
            this.node.active = !1;
        }
        if (11 == this._cfg.type) {
            this.node.parent = $battleMgr.default.instance.getCurScene().actorTopParent;
        }
        this.hideTips();
        this.showLight();
        if (this.isBagItem) {
            $eventManager.EventManager.instance.on(
                $battleEnum.EBattleEvent.REWARD_LEAVE_BAG_INFORM + this._unitId,
                this.onEventRewardLeaveBag,
                this
            );
            $eventManager.EventManager.instance.on(
                $battleEnum.EBattleEvent.REWARD_PUT_IN_BAG_INFORM + this._unitId,
                this.onEventRewardPutInBag,
                this
            );
            $eventManager.EventManager.instance.on(
                $levelBattleData.ELevelBattleDataEvent.CONSUME_BAG_ITEM,
                this.onEventConsumeBagItem,
                this
            );
            $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.UPDATE_BAG_UI);
        }
    };
    e.prototype.showTips = function () {
        var t = this;
        cc.Tween.stopAllByTarget(this.nTips);
        this.nTips.scale = 0;
        this.nTips.angle = 0;
        this.nTips.active = !0;
        cc.tween(this.nTips)
            .to(
                0.3,
                {
                    scale: 1.2
                },
                {
                    easing: "backOut"
                }
            )
            .to(0.1, {
                scale: 1
            })
            .call(function () {
                $animUtils.AnimUtil.swingAnim(t.nTips, 15, 0, 0.5, 1);
            })
            .start();
    };
    e.prototype.hideTips = function () {
        cc.Tween.stopAllByTarget(this.nTips);
        this.nTips.scale = 0;
        this.nTips.angle = 0;
        this.nTips.active = !1;
    };
    e.prototype.showLight = function () {
        var t = this;
        if (0 != this._cfg.light) {
            this.scheduleOnce(function () {
                t.spAnimLight.node.active = !0;
                t.spAnimLight.clearAnim();
                t.spAnimLight.playAnim(["", "lv", "lan", "zi", "cheng"][t._cfg.light], 1, !0);
            }, 0.2);
        } else {
            this.spAnimLight.node.active = !1;
        }
    };
    e.prototype.hideLight = function () {
        this.spAnimLight.node.active = !1;
        this.spAnimLight.clearAnim();
    };
    e.prototype.drop = function (t, e, n, i, o, r) {
        var a = this;
        if (void 0 === r) {
            r = 0;
        }
        var s = t;
        this._finalY = s;
        var c = this.node.getPosition();
        var l = c.x + e;
        var p = $battleMgr.default.instance.getCurScene().level.getRoomById(this.roomId);
        if (p) {
            l = Math.max(p.node.x + 150, l);
            l = Math.min(p.node.x + p.node.width - 150, l);
        }
        this._isDroping = !0;
        this.nShade.y = s - c.y;
        this.nShade.active = !0;
        this.node.active = !0;
        var f = cc.v2(l, s);
        var m = c;
        var y = cc.v2(m.x + 0.4 * (f.x - m.x), m.y + $randomUtil.RandomUtil.randomInt(100, 150));
        cc.tween(this.node)
            .delay(r)
            .bezierTo(n, m, y, f)
            .call(function () {
                cc.tween(a.node)
                    .to(
                        o,
                        {
                            y: s + i
                        },
                        {
                            easing: "quadOut"
                        }
                    )
                    .to(
                        o,
                        {
                            y: s
                        },
                        {
                            easing: "quadIn"
                        }
                    )
                    .call(function () {
                        cc.tween(a.node)
                            .to(
                                0.5 * o,
                                {
                                    y: s + 0.3 * i
                                },
                                {
                                    easing: "quadOut"
                                }
                            )
                            .to(
                                0.5 * o,
                                {
                                    y: s
                                },
                                {
                                    easing: "quadIn"
                                }
                            )
                            .call(function () {
                                a.updateUnifyPos();
                                a.updateAreaKey();
                                a._isDroped = !0;
                                a._isDroping = !1;
                                if (1 == a._cfg.type || 0 == $levelBattleData.levelBattleData.cfgStage.id) {
                                    a.pickup();
                                } else {
                                    if (14 == a._cfg.type) {
                                        a.flyPlayer();
                                    } else {
                                        (a.nShade.y = 0),
                                            $animUtils.AnimUtil.floatAnim(a.spIcon.node, 1, 10),
                                            a._showPutupTipsTime > 0 &&
                                                (a._blickTween = cc
                                                    .tween(a.spIcon.node)
                                                    .to(0.5, {
                                                        opacity: 100
                                                    })
                                                    .to(0.5, {
                                                        opacity: 255
                                                    })
                                                    .union()
                                                    .repeatForever()
                                                    .start());
                                    }
                                }
                            })
                            .start();
                    })
                    .start();
            })
            .start();
    };
    e.prototype.flyPlayer = function () {
        var t = $battleMgr.default.instance.getCurScene();
        if (t) {
            var e = $actorMgr.default.instance.getActor(t.playerId);
            if (e) {
                this.node.scale = 0.8;
                this._followTargetNode = e.node;
                this._followTargetOffsetPos = cc.v2(0, 30);
                this.nShade.active = !1;
            }
        }
    };
    e.prototype.onUpdate = function (t) {
        if (this._isDroping) {
            this.nShade.y = this._finalY - this.node.y;
            this.nShade.scale = Math.max(0, 1 - Math.abs(this.node.y - this._finalY) / 100);
        }
        if (this._showFullHpTipsTime > 0) {
            this._showFullHpTipsTime -= t;
            if (this._showFullHpTipsTime < 0) {
                this._showFullHpTipsTime = 0;
            }
        }
        if (this._showPutupTipsTime > 0) {
            this._showPutupTipsTime -= t;
            if (this._showPutupTipsTime < 0) {
                this._showPutupTipsTime = 0;
                if (this._blickTween) {
                    this._blickTween.stop();
                    this._blickTween = null;
                    this.spIcon.node.opacity = 255;
                }
            }
        }
        if (this._followTargetNode) {
            var e = this._followTargetNode.getPosition().add(this._followTargetOffsetPos);
            var n = this.node.getPosition();
            n = n.lerp(e, 0.08);
            this.node.setPosition(n);
            this.updateUnifyPos();
            this.updateAreaKey();
        }
    };
    e.prototype.canPickupByPlayer = function (t) {
        return (
            !!$battleMgr.default.instance.getCurScene().isPlay &&
            !(this._showPutupTipsTime > 0) &&
            (11 != this._cfg.type || t.curHp < t.getAttribute($attrEnum.E_AttrType.HP).value)
        );
    };
    e.prototype.pickup = function (t, e) {
        var n = this;
        if (void 0 === t) {
            t = !0;
        }
        if (void 0 === e) {
            e = !0;
        }
        if (this._isDroped && !this._isPickup && !this._isRemove) {
            var i = "";
            if (this.isBagItem && e && "" == (i = $levelBattleData.levelBattleData.findBagPutRowCol(this._cfg.id))) {
                this._showPutupTipsTime = 5;
                $globalPopupMgr.default.instance.showTips("背包已满，请整理");
                return void $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.SET_FULL_BAG_UI, !0);
            }
            this.unscheduleAllCallbacks();
            this._isPickup = !0;
            var o = this.node.convertToWorldSpaceAR(cc.v2(0, 20));
            var r = $battleMgr.default.instance.getCurScene().isPlay;
            switch (this._cfg.type) {
                case 1:
                    $eventManager.EventManager.instance.emit(
                        $battleEnum.EBattleEvent.PICKUP_FLY_ITEM,
                        this._cfg.id,
                        this._num * this._cfg.changeID,
                        o
                    );
                    break;
                case 11:
                    var a = $actorMgr.default.instance.getActor($battleMgr.default.instance.getCurScene().playerId);
                    if (a && !a.isDead()) {
                        a.beRecover(a.getAttribute($attrEnum.E_AttrType.HP).value * Number(this._cfg.actNum));
                    }
                    break;
                case 12:
                    $globalPopupMgr.default.instance.showLevelSkillEx(0, r, 0);
                    break;
                case 13:
                    $globalPopupMgr.default.instance.showLevelSkillEx(1, r, 1);
                    break;
                case 14:
                    $globalPopupMgr.default.instance.showLevelSkill(r);
                    break;
                case 15:
                    $globalPopupMgr.default.instance.showLevelSkillEx(3, r, 2);
                    break;
                case 90:
                    $eventManager.EventManager.instance.emit(
                        $battleEnum.EBattleEvent.PICKUP_FLY_ITEM,
                        this._cfg.id,
                        1,
                        o
                    );
                    break;
                default:
                    if (
                        -1 ==
                        $levelBattleData.levelBattleData.bagData.bagEquipDatas.findIndex(function (t) {
                            return t.unitId == n.unitId;
                        })
                    ) {
                        $levelBattleData.levelBattleData.bagData.bagEquipDatas.push({
                            unitId: this.unitId,
                            rewardId: this._cfg.id,
                            rowCol: i,
                            param: this.param
                        });
                    }
                    $eventManager.EventManager.instance.emit(
                        $battleEnum.EBattleEvent.PICKUP_FLY_ITEM,
                        this._cfg.id,
                        1,
                        o
                    );
                    $eventManager.EventManager.instance.emit($levelBattleData.ELevelBattleDataEvent.BAG_ITEM_CHANGE);
                    if (999 == this._cfg.id) {
                        $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.SURVIVOR_UPDATE_INFORM, !0);
                    }
                    $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.UPDATE_BAG_UI);
            }
            if (t) {
                this.remove();
            } else {
                this.node.active = !1;
            }
        }
    };
    e.prototype.discard = function () {
        if (this._isPickup) {
            cc.Tween.stopAllByTarget(this.spIcon.node);
            this.nShade.y = 0;
            this.spIcon.node.y = 0;
            this.nShade.scale = 1;
            this._showPutupTipsTime = 10;
            this._isDroped = !1;
            this._isDroping = !1;
            this._isPickup = !1;
            var t = $battleMgr.default.instance.getCurScene();
            var e = $actorMgr.default.instance.getActor(t.playerId);
            var n = e.node.getPosition().add(cc.v2(0, 120));
            this.node.setPosition(n);
            this.updateAreaKey();
            this.node.active = !0;
            var i = t.level.getRoomById(e.roomId).getGroundY();
            this.updateRoomId(e.roomId);
            var o = $randomUtil.RandomUtil.randomInt(-100, 100);
            this.drop(i, o, 0.3, 20, 0.1);
        }
    };
    e.prototype.remove = function () {
        var t = this;
        if (this._isRemove) {
            //
        } else {
            this._isDroping = !1;
            this._isPickup = !1;
            this._isRemove = !0;
            this.nShade.y = 0;
            cc.Tween.stopAllByTarget(this.spIcon.node);
            this.onRemove();
            cc.tween(this.node)
                .to(0.2, {
                    opacity: 0
                })
                .call(function () {
                    $nodePoolManager.default.instance.putNode(t.node);
                })
                .start();
        }
    };
    e.prototype.onRemove = function () {
        this._followTargetNode = null;
        if (this.isBagItem) {
            $eventManager.EventManager.instance.off(
                $battleEnum.EBattleEvent.REWARD_LEAVE_BAG_INFORM + this._unitId,
                this.onEventRewardLeaveBag,
                this
            );
            $eventManager.EventManager.instance.off(
                $battleEnum.EBattleEvent.REWARD_PUT_IN_BAG_INFORM + this._unitId,
                this.onEventRewardPutInBag,
                this
            );
            $eventManager.EventManager.instance.off(
                $levelBattleData.ELevelBattleDataEvent.CONSUME_BAG_ITEM,
                this.onEventConsumeBagItem,
                this
            );
        }
        t.prototype.onRemove.call(this);
    };
    e.prototype.onEventRewardPutInBag = function () {
        this.pickup(!1, !1);
    };
    e.prototype.onEventRewardLeaveBag = function () {
        this.discard();
    };
    e.prototype.onEventConsumeBagItem = function (t) {
        if (t.unitId === this._unitId) {
            this.remove();
        }
    };
    e.prototype.checkPlayerCollision = function (t, e) {
        return (
            this._isDroped &&
            $simplyCollisionDetector.default.isCollisionPointToCircle(
                new $simplyVec2.default(e.x, e.y),
                this.collider.circle
            )
        );
    };
    e.prototype.onPlayerCollisionEnter = function (t) {
        if (11 == this._cfg.type && t.curHp >= t.getAttribute($attrEnum.E_AttrType.HP).value) {
            this.showTips();
        }
    };
    e.prototype.onPlayerCollisionStay = function (t) {
        if (11 == this._cfg.type && t.curHp >= t.getAttribute($attrEnum.E_AttrType.HP).value) {
            //
        } else {
            if (this.canPickupByPlayer(t)) {
                this.pickup(!this.isBagItem);
            }
        }
    };
    e.prototype.onPlayerCollisionExit = function () {
        if (11 == this._cfg.type) {
            this.hideTips();
        }
        $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.SET_FULL_BAG_UI, !1);
    };
    __decorate([C(cc.Sprite)], e.prototype, "spIcon", void 0);
    __decorate([C(cc.Node)], e.prototype, "nShade", void 0);
    __decorate([C($spAnimCtrl.default)], e.prototype, "spAnimLight", void 0);
    __decorate([C($simplyCircleCollider.default)], e.prototype, "collider", void 0);
    __decorate([C(cc.Node)], e.prototype, "nTips", void 0);
    return __decorate([w], e);
})($levelObjectBase.default);
exports.default = M;
