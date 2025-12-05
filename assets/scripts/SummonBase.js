var i;
var $mathUtil = require("./MathUtil");
var $battleMgr = require("./BattleMgr");
var $stateMachine = require("./StateMachine");
var $actorEnum = require("./ActorEnum");
var $actorBase = require("./ActorBase");
var $summonAttackState = require("./SummonAttackState");
var $summonDeadState = require("./SummonDeadState");
var $summonIdleState = require("./SummonIdleState");
var $summonWalkState = require("./SummonWalkState");
var m = cc._decorator;
var y = m.ccclass;
var _ =
    (m.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.moveDir = null;
            return e;
        }
        __extends(e, t);
        e.prototype.onInit = function () {
            this._pathPos = this.node.getPosition();
            t.prototype.onInit.call(this);
        };
        e.prototype.registerState = function () {
            this._sm = new $stateMachine.StateMachine(new $summonIdleState.SummonIdleState(this));
            this._sm.addState($actorEnum.EActorStateType.WALK, new $summonWalkState.SummonWalkState(this));
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $summonAttackState.SummonAttackState(this));
            this._sm.addState($actorEnum.EActorStateType.DEAD, new $summonDeadState.SummonDeadState(this));
        };
        e.prototype.playAnimIdle = function () {};
        e.prototype.playAnimWalk = function () {};
        e.prototype.playAnimAttack = function (t, e) {
            if (t) {
                t();
            }
            if (e) {
                e();
            }
        };
        e.prototype.playAnimDie = function (t) {
            if (t) {
                t();
            }
        };
        e.prototype.attackHit = function (t) {
            if (t && t.isValid) {
                this.onAttackHit(t);
            }
        };
        e.prototype.onAttackHit = function () {};
        e.prototype.checkAttackTargetValid = function (t) {
            return !(!t || !t.isValid || t.isDead());
        };
        e.prototype.updatePathData = function () {
            for (
                var t = $mathUtil.MathUtil.vec2Fixed(this._pathPos),
                    e = $battleMgr.default.instance.getCurScene().level.path;
                ;

            ) {
                var n = e.findPathPointByPos(t);
                if ("" != n) {
                    this._pathPointId = n;
                    this._pathLineId = "";
                    break;
                }
                var i = e.findPathLineByPos(t);
                if ("" != i) {
                    this._pathLineId = i;
                    this._pathPointId = "";
                    break;
                }
                if ("" == i && "" == n) {
                    console.error('pathLineId == "" && pathPointId == ""');
                }
                break;
            }
            this.updateRoomId();
        };
        return __decorate([y], e);
    })($actorBase.default));
exports.default = _;
