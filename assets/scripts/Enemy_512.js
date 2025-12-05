var i;
var $randomUtil = require("./RandomUtil");
var $animUtils = require("./AnimUtils");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $actorEnum = require("./ActorEnum");
var $levelBattleData = require("./LevelBattleData");
var $unitMgr = require("./UnitMgr");
var $enemyBase = require("./EnemyBase");
var $enemy_512_Idle = require("./Enemy_512_Idle");
var $enemy_512_Trans = require("./Enemy_512_Trans");
var $enemy_512_Walk = require("./Enemy_512_Walk");
var g = cc._decorator;
var v = g.ccclass;
var b =
    (g.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._nItem = null;
            e._itemKeys = [];
            e._isNullItem = !1;
            e._consumeGold = 0;
            e._worldPos = null;
            e._consumeTime = 0;
            e._consumeTimer = 0.2;
            e._isShowTips = !1;
            e._isLockConsume = !1;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "isNullItem", {
            get: function () {
                return this._isNullItem;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onLoad = function () {
            t.prototype.onLoad.call(this);
            this._nItem = this.node.getChildByName("Item");
            this._nItem.active = !1;
        };
        e.prototype.registerState = function () {
            t.prototype.registerState.call(this);
            this._sm.addState($actorEnum.EActorStateType.IDLE, new $enemy_512_Idle.Enemy_512_Idle(this));
            this._sm.addState($actorEnum.EActorStateType.WALK, new $enemy_512_Walk.Enemy_512_Walk(this));
            this._sm.addState($actorEnum.EActorStateType.EXTEND_1, new $enemy_512_Trans.Enemy_512_Trans(this));
        };
        e.prototype.onInit = function () {
            t.prototype.onInit.call(this);
            this._isLockConsume = !1;
            this._itemKeys = this._cfg.val1.split("|");
            this._isNullItem = 0 == this._itemKeys.length;
            this._worldPos = this.node.convertToWorldSpaceAR(cc.v2());
            if (this._itemKeys.length > 0) {
                this._consumeGold = this._itemKeys[0].split("_").map(Number)[0];
            } else {
                this._consumeGold = 0;
            }
            $animUtils.AnimUtil.swingAnim(this._nItem, 15, 0, 0.5, 1);
            this.updateItemView();
        };
        e.prototype.updateItemView = function () {
            this._nItem.active = !this._isNullItem;
            if (this._nItem.active) {
                this._nItem.getChildByName("View").getChildByName("Value").getComponent(cc.Label).string =
                    this._consumeGold.toString();
            }
        };
        e.prototype.canBeHurt = function () {
            return t.prototype.canBeHurt.call(this) && this._isNullItem;
        };
        e.prototype.canBeSearch = function () {
            return t.prototype.canBeSearch.call(this) && this._isNullItem;
        };
        e.prototype.canAttack = function () {
            return !1;
        };
        e.prototype.checkPlayerCollision = function (t, e) {
            return (
                !this._isNullItem &&
                this.curState == $actorEnum.EActorStateType.IDLE &&
                t.roomId == this._roomId &&
                Math.abs(this._worldPos.x - e.x) < 50
            );
        };
        e.prototype.playerCollisionEnter = function () {
            this._consumeTime = 0;
            this._isShowTips = !1;
        };
        e.prototype.playerCollisionStay = function (t, e) {
            if (
                t.curState != $actorEnum.EActorStateType.WALK &&
                this.curState == $actorEnum.EActorStateType.IDLE &&
                !this._isLockConsume &&
                ((this._consumeTime -= e), this._consumeTime < 0)
            ) {
                this._consumeTime = this._consumeTimer;
                if (1 == this._itemKeys.length) {
                    $levelBattleData.levelBattleData.updateGold(-this._itemKeys[0].split("_").map(Number)[0]);
                    this._consumeGold = 0;
                } else {
                    if ($levelBattleData.levelBattleData.gold <= 0) {
                        return void (
                            this._isShowTips ||
                            ((this._isShowTips = !0), $globalPopupMgr.default.instance.showTips("元宝不足"))
                        );
                    }
                    $levelBattleData.levelBattleData.updateGold(-1);
                    this._consumeGold--;
                }
                this.updateItemView();
                if (this._consumeGold <= 0) {
                    var n = $battleMgr.default.instance.getCurScene().level.getRoomById(this.roomId);
                    this.dropReward(n.getGroundY());
                }
            }
        };
        e.prototype.playerCollisionExit = function () {
            this._consumeTime = this._consumeTimer;
            this._isShowTips = !1;
        };
        e.prototype.showItemBubble = function (t, e) {
            var n = this;
            if (void 0 === t) {
                t = null;
            }
            if (void 0 === e) {
                e = !1;
            }
            if (e) {
                this._isLockConsume = !0;
                return void cc
                    .tween(this._nItem)
                    .to(0.2, {
                        scale: 0
                    })
                    .call(function () {
                        n._nItem.active = !1;
                        if (t) {
                            t();
                        }
                    })
                    .start();
            }
            this._isLockConsume = !0;
            cc.tween(this._nItem)
                .to(0.2, {
                    scale: 0
                })
                .to(
                    0.3,
                    {
                        scale: 1.5
                    },
                    {
                        easing: "backOut"
                    }
                )
                .to(0.1, {
                    scale: 1
                })
                .delay(0.5)
                .call(function () {
                    $animUtils.AnimUtil.swingAnim(n._nItem, 15, 0, 0.5, 1);
                    n._isLockConsume = !1;
                    if (t) {
                        t();
                    }
                })
                .start();
        };
        e.prototype.dropReward = function (t) {
            var e = this;
            var n = this._itemKeys[0].split("_").map(Number)[1];
            this.createReward(t, n);
            this._itemKeys.shift();
            if (0 == this._itemKeys.length) {
                this.showItemBubble(function () {
                    e.changeState($actorEnum.EActorStateType.EXTEND_1);
                }, !0);
            } else {
                if (1 == this._itemKeys.length) {
                    this._consumeGold = this._cfg.val1.split("_").map(Number)[0];
                } else {
                    this._consumeGold = this._itemKeys[0].split("_").map(Number)[0];
                }
                this.updateItemView();
                this.showItemBubble(function () {
                    e._consumeTime = e._consumeTimer;
                });
            }
        };
        e.prototype.createReward = function (t, e) {
            var n = this;
            var i = $battleMgr.default.instance.getCurScene();
            var o = this.node.getPosition();
            var r = $randomUtil.RandomUtil.randomInt(-100, 100);
            $unitMgr.UnitMgr.instance.createUnit({
                areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.GOOD,
                areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
                parent: i.unitParent,
                prefabName: "SceneGood",
                unitClass: "SceneGood",
                initPos: o,
                initParam: {
                    rewardId: e,
                    rewardNum: 1
                },
                onCreated: function (i) {
                    if (1 == e) {
                        i.scheduleOnce(function () {
                            i.updateRoomId(n.roomId);
                            i.drop(t, r, 0.3, 40, 0.2);
                        }, $randomUtil.RandomUtil.random(0, 0.5));
                    } else {
                        i.updateRoomId(n.roomId);
                        i.drop(t, r, 0.3, 40, 0.2);
                    }
                }
            });
        };
        e.prototype.onBeHurt = function (e) {
            t.prototype.onBeHurt.call(this, e);
            if (this._isNullItem) {
                for (
                    var n = $battleMgr.default.instance.getCurScene().level.findLayerByPos(this.node.getPosition()),
                        i = $battleMgr.default.instance.getCurScene().level.getLayerPosY(n),
                        o = 0;
                    o < Number(this._cfg.val3);
                    o++
                ) {
                    this.createReward(i, 1);
                }
            }
        };
        e.prototype.playAnimTrans = function (t) {
            var e = this;
            this._spCtrl.playAnim("transform", 1, !1, function () {
                e._isNullItem = !0;
                if (t) {
                    t();
                }
            });
        };
        return __decorate([v], e);
    })($enemyBase.default));
exports.default = b;
