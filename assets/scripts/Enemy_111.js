var i;
var $randomUtil = require("./RandomUtil");
var $battleMgr = require("./BattleMgr");
var $stateMachine = require("./StateMachine");
var $effectMgr = require("./EffectMgr");
var $spAnimEffect = require("./SpAnimEffect");
var $actorEnum = require("./ActorEnum");
var $actorMgr = require("./ActorMgr");
var $enemyBase = require("./EnemyBase");
var $enemy_111_Atk = require("./Enemy_111_Atk");
var $enemy_111_Die = require("./Enemy_111_Die");
var $enemy_111_Idle = require("./Enemy_111_Idle");
var $enemy_111_Summon = require("./Enemy_111_Summon");
var $enemy_111_Walk = require("./Enemy_111_Walk");
var $enemyStopState = require("./EnemyStopState");
var b = cc._decorator;
var E = b.ccclass;
var S =
    (b.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._rangeRect = null;
            e._summonCD = 0;
            e._moveCD = 0;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "rangeRect", {
            get: function () {
                return this._rangeRect;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.registerState = function () {
            this._sm = new $stateMachine.StateMachine(new $enemy_111_Idle.Enemy_111_Idle(this));
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $enemy_111_Atk.Enemy_111_Atk(this));
            this._sm.addState($actorEnum.EActorStateType.DEAD, new $enemy_111_Die.Enemy_111_Die(this));
            this._sm.addState($actorEnum.EActorStateType.WALK, new $enemy_111_Walk.Enemy_111_Walk(this));
            this._sm.addState($actorEnum.EActorStateType.EXTEND_1, new $enemy_111_Summon.Enemy_111_Summon(this));
            this._sm.addState($actorEnum.EActorStateType.STOP, new $enemyStopState.EnemyStopState(this));
        };
        e.prototype.initPos = function () {
            var t = this._initParam.roomId;
            if (t) {
                var e = $battleMgr.default.instance.getCurScene().level.getRoomById(t);
                this._rangeRect = new cc.Rect(e.node.x + 200, e.node.y + 100, e.node.width - 200, e.node.height - 200);
                var n = cc.v2(
                    $randomUtil.RandomUtil.randomInt(this._rangeRect.xMin, this._rangeRect.xMax),
                    $randomUtil.RandomUtil.randomInt(this._rangeRect.yMin, this._rangeRect.yMax)
                );
                this.node.setPosition(n);
            }
        };
        e.prototype.onUpdate = function (e) {
            t.prototype.onUpdate.call(this, e);
            if (this._summonCD > 0) {
                this._summonCD -= e;
                if (this._summonCD <= 0) {
                    this._summonCD = 0;
                }
            }
            if (this._moveCD > 0) {
                this._moveCD -= e;
                if (this._moveCD <= 0) {
                    this._moveCD = 0;
                }
            }
        };
        e.prototype.canSummon = function () {
            return this._summonCD <= 0;
        };
        e.prototype.summon = function () {
            var t = this;
            this._summonCD = Number(this._cfg.val1);
            var e = Number(this._cfg.val2);
            var n = 0;
            var i = $battleMgr.default.instance.getCurScene();
            if (i) {
                for (; n < e; ) {
                    n++;
                    this.scheduleOnce(function () {
                        var e = t.shootPos;
                        $actorMgr.default.instance.createActor({
                            id: i.getCreateActorId(),
                            cfgId: 102,
                            camp: $actorEnum.ETeamType.ENEMY,
                            parent: i.actorParent,
                            prefabName: "Enemy_102",
                            initPos: e,
                            actorClass: $actorMgr.default.instance.getActorClassName(102, $actorEnum.ETeamType.ENEMY),
                            onCreated: null,
                            initParam: {
                                rewardMap: new Map(),
                                lv: t._initParam.lv,
                                showAnim: function (n, o) {
                                    var r = i.level.getRoomById(t._roomId).getGroundY();
                                    var s = e.x + $randomUtil.RandomUtil.randomInt(-50, 50);
                                    cc.tween(n.node)
                                        .to(
                                            0.2,
                                            {
                                                y: r,
                                                x: s
                                            },
                                            {
                                                easing: "sineIn"
                                            }
                                        )
                                        .call(function () {
                                            if (o) {
                                                o();
                                            }
                                        })
                                        .start();
                                }
                            }
                        });
                    }, 0.3 * n);
                }
            }
        };
        e.prototype.playAnimSummom = function (t, e) {
            var n = this;
            this._spCtrl.playAnim(
                this._atkAnimName,
                1,
                !1,
                function () {
                    if (e) {
                        e();
                    }
                },
                function (e, i) {
                    if (e == n._atkAnimName && "atk" == i && t) {
                        t();
                    }
                }
            );
        };
        e.prototype.attackHit = function (t) {
            if (t && t.isValid) {
                this.shootCommonBullet(t, 3, function (t) {
                    var e = $battleMgr.default.instance.getCurScene();
                    $effectMgr.default.instance.createEffect({
                        parent: e.effectParent,
                        prefabName: "EEnemyHit_1",
                        initPos: t,
                        effectClass: $spAnimEffect.default,
                        onCreated: function (t) {
                            t.playOnceAllAnim();
                        }
                    });
                });
            }
        };
        e.prototype.canMove = function () {
            return this._moveCD <= 0;
        };
        e.prototype.move = function () {
            this._moveCD = Number(this._cfg.val3);
        };
        e.prototype.randomPos = function () {
            return cc.v2(
                $randomUtil.RandomUtil.randomInt(this._rangeRect.xMin, this._rangeRect.xMax),
                $randomUtil.RandomUtil.randomInt(this._rangeRect.yMin, this._rangeRect.yMax)
            );
        };
        e.prototype.searchTarget = function () {
            var t = $actorMgr.default.instance.queryActorByCamp($actorEnum.ETeamType.PLAYER);
            if (0 == t.length) {
                return null;
            }
            for (var e = 0; e < t.length; e++) {
                var n = t[e];
                if (!n.isDead() && n.canBeSearch() && n.roomId == this._roomId) {
                    return n;
                }
            }
            return null;
        };
        e.prototype.onDie = function () {
            t.prototype.onDie.call(this);
            var e = this._initParam.roomId;
            if (e) {
                var n = $battleMgr.default.instance.getCurScene().level.getRoomById(e);
                if (n) {
                    n.destroyCobweb();
                }
            }
        };
        return __decorate([E], e);
    })($enemyBase.default));
exports.default = S;
