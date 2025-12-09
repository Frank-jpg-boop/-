var i;
var $mathUtil = require("./MathUtil");
var $randomUtil = require("./RandomUtil");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $battleMgr = require("./BattleMgr");
var $stateMachine = require("./StateMachine");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $spAnimCtrl = require("./SpAnimCtrl");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $levelBattleData = require("./LevelBattleData");
var $unitMgr = require("./UnitMgr");
var $actorMgr = require("./ActorMgr");
var $enemyBase = require("./EnemyBase");
var $enemy_513_Idle = require("./Enemy_513_Idle");
var $enemyDeadState = require("./EnemyDeadState");
var E = cc._decorator;
var S = E.ccclass;
var P =
    (E.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._nDice = null;
            e._nSmallView = null;
            e._nBigView = null;
            e._curDice = 0;
            e._smallGold = 0;
            e._bigGold = 0;
            e._waveGold = 0;
            e._playerBetResult = 0;
            e._result = 0;
            e._consumeTime = 0;
            e._consumeTimer = 0;
            e.timerMin = 0.02;
            e.timerMax = 0.4;
            e._isLockConsume = !1;
            e._isDownSmall = !1;
            e._isDownBig = !1;
            e._isShowTips = !1;
            return e;
        }
        __extends(e, t);
        e.prototype.onLoad = function () {
            t.prototype.onLoad.call(this);
            this._nDice = this.node.getChildByName("Body").getChildByName("Dice");
            this._nSmallView = this.node.getChildByName("Body").getChildByName("SmallView");
            this._nBigView = this.node.getChildByName("Body").getChildByName("BigView");
            this._nDice.active = !1;
        };
        e.prototype.registerState = function () {
            this._sm = new $stateMachine.StateMachine();
            this._sm.addState($actorEnum.EActorStateType.IDLE, new $enemy_513_Idle.Enemy_513_Idle(this));
            this._sm.addState($actorEnum.EActorStateType.DEAD, new $enemyDeadState.EnemyDeadState(this));
        };
        e.prototype.initPos = function () {
            var t = $battleMgr.default.instance.getCurScene().level.getRoomById(this._initParam.roomId);
            var e = cc.v2(t.node.x + t.node.width / 2, t.getGroundY());
            this.node.setPosition(e);
        };
        e.prototype.onInit = function () {
            t.prototype.onInit.call(this);
            this._waveGold = Number(this._cfg.val1);
            this._smallGold = this._waveGold;
            this._bigGold = this._waveGold;
            this._isDownBig = !1;
            this._isDownSmall = !1;
            this.fixedZIndex = cc.macro.MIN_ZINDEX;
            this.waitBottomPour();
        };
        e.prototype.canBeHurt = function () {
            return !1;
        };
        e.prototype.canBeSearch = function () {
            return !1;
        };
        e.prototype.updateItemView = function () {
            this._nSmallView
                .getChildByName("Item")
                .getChildByName("View")
                .getChildByName("Value")
                .getComponent(cc.Label).string = this._smallGold.toString();
            this._nBigView
                .getChildByName("Item")
                .getChildByName("View")
                .getChildByName("Value")
                .getComponent(cc.Label).string = this._bigGold.toString();
        };
        e.prototype.waitBottomPour = function () {
            this._nDice.active = !1;
            this._nSmallView.getChildByName("SpAnim").getComponent($spAnimCtrl.default).playAnim("xiao_stand", 1, !0);
            this._nSmallView.getChildByName("Item").active = !0;
            this._nBigView.getChildByName("SpAnim").getComponent($spAnimCtrl.default).playAnim("da_stand", 1, !0);
            this._nBigView.getChildByName("Item").active = !0;
            this.updateItemView();
        };
        e.prototype.bottomPour = function (t) {
            if (0 == t) {
                this._smallGold -= 1;
            } else {
                if (1 == t) {
                    this._bigGold -= 1;
                }
            }
            this.updateItemView();
            if (0 != this._smallGold && 0 != this._bigGold) {
                //
            } else {
                if (0 == this._smallGold) {
                    this._playerBetResult = 0;
                } else {
                    this._playerBetResult = 1;
                }
                this._isLockConsume = !0;
                this.drawLottery();
            }
        };
        e.prototype.drawLottery = function () {
            var t = this;
            this._nSmallView.getChildByName("Item").active = !1;
            this._nBigView.getChildByName("Item").active = !1;
            this._spCtrl.playAnim("rolling_start", 1, !1, function () {
                t._spCtrl.playAnim("rolling_stand", 1, !0);
                t._nDice.active = !0;
                t.lotteryDice(function () {
                    t._spCtrl.playAnim("rolling_over", 1, !1, function () {
                        t._spCtrl.playAnim("rolling_over_stand", 1, !0);
                    });
                    if (t._curDice > 3) {
                        t._result = 1;
                    } else {
                        t._result = 0;
                    }
                    t.lotteryResult();
                });
            });
        };
        e.prototype.lotteryResult = function () {
            var t = this;
            this._spCtrl.playAnim("call", 1, !1, function () {
                t._spCtrl.playAnim("call_stand", 1, !0);
                var e = null;
                if (0 == t._result) {
                    e = t._nSmallView;
                } else {
                    e = t._nBigView;
                }
                var n = e.getChildByName("SpAnim").getComponent($spAnimCtrl.default);
                n.playAnim(0 == t._result ? "xiao_choice" : "da_choice", 1, !1, function () {
                    n.playAnim(0 == t._result ? "xiao_stand" : "da_stand", 1, !0);
                    t._nDice.active = !1;
                    if (t._playerBetResult == t._result) {
                        t.win(e);
                    } else {
                        t.lose(e);
                    }
                });
            });
        };
        e.prototype.win = function (t) {
            var e = $battleMgr.default.instance.getCurScene().level.getRoomById(this._initParam.roomId);
            this.dropReward(this.node.x + this.dirX * t.x, e.getGroundY());
            var n = this.getAttribute($attrEnum.E_AttrType.HP).value;
            this._hp -= n * Number(this._cfg.val3);
            if (this._head) {
                this._head.updateHP(this._hp, n);
            }
            if (this._hp <= 0) {
                this.changeState($actorEnum.EActorStateType.DEAD);
            } else {
                this._spCtrl.playAnim("stand", 1, !0);
                this._waveGold *= 2;
                this._smallGold = this._waveGold;
                this._bigGold = this._waveGold;
                this._consumeTimer = this.timerMax;
                this._consumeTime = this._consumeTimer;
                this.waitBottomPour();
                this._isLockConsume = !1;
            }
        };
        e.prototype.lose = function (t) {
            var e = $battleMgr.default.instance.getCurScene().level.getRoomById(this._initParam.roomId);
            var n = this.node.getPosition();
            n.x += this.dirX * t.x;
            n.y = e.getGroundY();
            var i = this._cfg.val2.split("_").map(Number);
            var o = i[0];
            var r = i[1];
            this.createEnemy(r, o, n);
            this._spCtrl.playAnim("stand", 1, !0);
            this._waveGold *= 2;
            this._smallGold = this._waveGold;
            this._bigGold = this._waveGold;
            this._consumeTimer = this.timerMax;
            this._consumeTime = this._consumeTimer;
            this._isLockConsume = !1;
            this.waitBottomPour();
        };
        e.prototype.lotteryDice = function (t) {
            var e = this;
            if (void 0 === t) {
                t = null;
            }
            var n = 0;
            this.schedule(
                function () {
                    e._curDice = $randomUtil.RandomUtil.randomInt(1, 7);
                    e._nDice.children.forEach(function (t, n) {
                        t.active = n + 1 == e._curDice;
                    });
                    if (++n >= 10 && t) {
                        t();
                    }
                },
                0.2,
                10
            );
        };
        e.prototype.createEnemy = function (t, e, n) {
            for (var i = this, o = $battleMgr.default.instance.getCurScene(), r = 0; r < e; r++) {
                n.clone().x += $randomUtil.RandomUtil.randomInt(-20, 20);
                this.scheduleOnce(function () {
                    $actorMgr.default.instance.createActor({
                        id: o.getCreateActorId(),
                        cfgId: t,
                        camp: $actorEnum.ETeamType.ENEMY,
                        parent: o.actorParent,
                        prefabName: "Enemy_" + t,
                        initPos: n,
                        actorClass: $actorMgr.default.instance.getActorClassName(t, $actorEnum.ETeamType.ENEMY),
                        onCreated: null,
                        initParam: {
                            rewardMap: new Map(),
                            lv: i._initParam.lv
                        }
                    });
                }, 0.2 * r);
            }
        };
        e.prototype.dropReward = function (t, e) {
            var n = Math.floor(this._waveGold * Number(this._cfg.val4));
            if (n > 20) {
                var i = n - 20;
                $levelBattleData.levelBattleData.updateGold(i);
                n = 20;
            }
            for (var o = 0; o < n; o++) {
                this.createReward(t, e, 1);
            }
            this.createReward(t, e, 111);
        };
        e.prototype.createReward = function (t, e, n) {
            var i = this;
            var o = $battleMgr.default.instance.getCurScene();
            var r = this.node.getPosition();
            r.y += 50;
            r.x = t;
            var a = $randomUtil.RandomUtil.randomInt(-100, 100);
            $unitMgr.UnitMgr.instance.createUnit({
                areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.GOOD,
                areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
                parent: o.unitParent,
                prefabName: "SceneGood",
                unitClass: "SceneGood",
                initPos: r,
                initParam: {
                    rewardId: n,
                    rewardNum: 1
                },
                onCreated: function (t) {
                    t.scheduleOnce(function () {
                        t.updateRoomId(i.roomId);
                        t.drop(e, a, 0.3, 40, 0.2);
                    }, $randomUtil.RandomUtil.random(0, 0.5));
                }
            });
        };
        e.prototype.checkPlayerCollision = function (t) {
            return !this._isLockConsume && t.roomId == this._roomId;
        };
        e.prototype.playerCollisionEnter = function () {
            this._consumeTimer = this.timerMax;
            this._consumeTime = this._consumeTimer;
            this._isShowTips = !1;
        };
        e.prototype.playerCollisionStay = function (t, e) {
            if (!this._isLockConsume) {
                if (t.curState == $actorEnum.EActorStateType.WALK) {
                    this._consumeTimer = this.timerMax;
                    return void (this._consumeTime = this._consumeTimer);
                }
                if (this.checkSmallRange(t)) {
                    this._isDownSmall = !0;
                    this._isDownBig &&
                        ((this._isDownBig = !1),
                        (this._consumeTimer = this.timerMax),
                        (this._consumeTime = this._consumeTimer));
                } else {
                    this._isDownSmall = !1;
                }
                if (this.checkBigRange(t)) {
                    this._isDownBig = !0;
                    this._isDownSmall &&
                        ((this._isDownSmall = !1),
                        (this._consumeTimer = this.timerMax),
                        (this._consumeTime = this._consumeTimer));
                } else {
                    this._isDownBig = !1;
                }
                if ((this._isDownSmall || this._isDownBig) && ((this._consumeTime -= e), this._consumeTime < 0)) {
                    this._consumeTimer = $mathUtil.MathUtil.lerp(this._consumeTimer, this.timerMin, 0.1);
                    this._consumeTime = this._consumeTimer;
                    if ($levelBattleData.levelBattleData.gold <= 0) {
                        return void (
                            this._isShowTips ||
                            ((this._isShowTips = !0), $globalPopupMgr.default.instance.showTips("元宝不足"))
                        );
                    }
                    $levelBattleData.levelBattleData.updateGold(-1);
                    if (this._isDownSmall) {
                        this.bottomPour(0);
                    } else {
                        this.bottomPour(1);
                    }
                }
            }
        };
        e.prototype.checkSmallRange = function (t) {
            var e = this.node.x + this.dirX * this._nSmallView.x - this._nSmallView.width / 2;
            var n = this.node.x + this.dirX * this._nSmallView.x + this._nSmallView.width / 2;
            return t.node.x >= e && t.node.x <= n;
        };
        e.prototype.checkBigRange = function (t) {
            var e = this.node.x + this.dirX * this._nBigView.x - this._nBigView.width / 2;
            var n = this.node.x + this.dirX * this._nBigView.x + this._nBigView.width / 2;
            return t.node.x >= e && t.node.x <= n;
        };
        e.prototype.playerCollisionExit = function () {
            this._consumeTimer = this.timerMax;
            this._consumeTime = this._consumeTimer;
            this._isShowTips = !1;
        };
        return __decorate([S], e);
    })($enemyBase.default));
exports.default = P;
