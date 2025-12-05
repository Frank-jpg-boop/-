var i;
var $eventManager = require("./EventManager");
var $battleMgr = require("./BattleMgr");
var $stateMachine = require("./StateMachine");
var $actorEnum = require("./ActorEnum");
var $battleEnum = require("./BattleEnum");
var $actorMgr = require("./ActorMgr");
var $enemyBase = require("./EnemyBase");
var $boss_521_Atk = require("./Boss_521_Atk");
var $boss_521_Awake = require("./Boss_521_Awake");
var $boss_521_Idle = require("./Boss_521_Idle");
var $enemyDeadState = require("./EnemyDeadState");
var _ = cc._decorator;
var g = _.ccclass;
var v =
    (_.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._isShowBossTag = !1;
            return e;
        }
        __extends(e, t);
        e.prototype.initPos = function () {
            this.dropMinOffsetX = 0;
            this._initParam.roomId = 501;
            var t = $battleMgr.default.instance.getCurScene().level.getRoomById(501);
            var e = cc.v2(t.node.x + 150, t.getGroundY());
            this.node.setPosition(e);
        };
        e.prototype.initType = function () {
            this._actorType = $actorEnum.EActorType.BOSS;
        };
        e.prototype.registerState = function () {
            this._sm = new $stateMachine.StateMachine();
            this._sm.addState($actorEnum.EActorStateType.IDLE, new $boss_521_Idle.Boss_521_Idle(this));
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $boss_521_Atk.Boss_521_Atk(this));
            this._sm.addState($actorEnum.EActorStateType.EXTEND_1, new $boss_521_Awake.Boss_521_Awake(this));
            this._sm.addState($actorEnum.EActorStateType.DEAD, new $enemyDeadState.EnemyDeadState(this));
        };
        e.prototype.playAnimAwake = function (t) {
            this._spCtrl.playAnim("wake", 1, !1, function () {
                if (t) {
                    t();
                }
            });
        };
        e.prototype.playAnimAttack = function (t, e) {
            this._spCtrl.playAnim(
                this._atkAnimName,
                1,
                !1,
                function () {
                    if (e) {
                        e();
                    }
                },
                function (e, n) {
                    if (t) {
                        t(n);
                    }
                }
            );
        };
        e.prototype.enterAttackCd = function () {
            this._attackCD = this._cfg.arkWait;
        };
        e.prototype.canBeSearch = function () {
            if (t.prototype.canBeSearch.call(this)) {
                var e = $battleMgr.default.instance.getCurScene();
                var n = $actorMgr.default.instance.getActor(e.playerId);
                return !!n && e.level.getRoomById(this.roomId).layer == e.level.getRoomById(n.roomId).layer;
            }
            return !1;
        };
        e.prototype.onBossTrigger = function () {
            var e = this;
            var n = $battleMgr.default.instance.getCurScene().level.getRoomById(this.roomId);
            n.unlock();
            n.openLight();
            $eventManager.EventManager.instance.emit(
                $battleEnum.EBattleEvent.LOOKAT_BOSS,
                this.node.convertToWorldSpaceAR(cc.v2())
            );
            this._sm.changeState($actorEnum.EActorStateType.EXTEND_1, function () {
                e._standAnimName = "wake_stand";
                t.prototype.onBossTrigger.call(e);
            });
        };
        e.prototype.searchTarget = function () {
            var t = $battleMgr.default.instance.getCurScene();
            var e = $actorMgr.default.instance.queryActorByCamp($actorEnum.ETeamType.PLAYER);
            var n = this.node.getPosition();
            var i = t.level.getRoomById(this.roomId);
            if (!i) {
                return null;
            }
            for (var o = i.layer, r = Number.MAX_VALUE, a = null, c = 0; c < e.length; c++) {
                var u = e[c];
                if (!u.isDead() && u.canBeSearch()) {
                    var h = t.level.getRoomById(u.roomId);
                    if (h && o == h.layer) {
                        var f = cc.Vec2.squaredDistance(u.node.getPosition(), n);
                        if (null == a || f < r) {
                            r = f;
                            a = u;
                        }
                    }
                }
            }
            return a;
        };
        return __decorate([g], e);
    })($enemyBase.default));
exports.default = v;
