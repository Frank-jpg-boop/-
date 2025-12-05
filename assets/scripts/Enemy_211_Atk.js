var i;
exports.Enemy_211_Atk = void 0;
var $battleMgr = require("./BattleMgr");
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var $door = require("./Door");
var $actorBase = require("./ActorBase");
var u = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._target = null;
        n._dragPos = null;
        n._isHit = !1;
        n._stateType = $actorEnum.EActorStateType.ATTACK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function (t) {
        var e = this;
        this._isHit = !1;
        this._context.setDirX(t.x > this._context.node.x);
        this._context.spCtrl.registerFrameEvent(this.onSpAnimFrameEvent, this);
        this._context.playAnimAttack(
            null,
            function () {
                e._context.attackHit(t);
                if (e.checkHit(t)) {
                    e._context.scheduleOnce(function () {
                        e.drag(t);
                    });
                } else {
                    e._context.changeState($actorEnum.EActorStateType.IDLE);
                }
            },
            t
        );
    };
    e.prototype.checkHit = function (t) {
        if (!t || t.getComponent($door.default)) {
            return !1;
        }
        var e = $battleMgr.default.instance.getCurScene();
        var n = t.getComponent($actorBase.default);
        if (!n || n.isDead() || n.curState == $actorEnum.EActorStateType.EXTEND_1 || n.unitId != e.playerId) {
            return !1;
        }
        if ("" == this._context.pathLineId) {
            return !1;
        }
        var i = this._context.pathPos;
        i.x += 20 * this._context.dirX;
        if (e) {
            var o = e.level.path.getLine(this._context.pathLineId);
            if (o && 1 == o.dir.y) {
                return !1;
            }
            if (!o.isPosInLineSegment(i)) {
                return !1;
            }
        }
        this._dragPos = i;
        return !0;
    };
    e.prototype.drag = function (t) {
        var e = this;
        this._target = t.getComponent($actorBase.default);
        this._context.spCtrl.playAnim("atk2_ready", 1, !1, function () {
            if (e._target.isDead()) {
                //
            } else {
                e._target.changeState($actorEnum.EActorStateType.EXTEND_1, e._dragPos, Number(e._context.cfg.val2));
                e._context.spCtrl.playAnim("atk2_stand", 1, !0);
                e._isHit = !0;
            }
        });
    };
    e.prototype.update = function () {
        if (
            this._target &&
            this._isHit &&
            (this._target.isDead() || this._target.curState != $actorEnum.EActorStateType.EXTEND_1)
        ) {
            this._context.changeState($actorEnum.EActorStateType.IDLE);
        }
    };
    e.prototype.onSpAnimFrameEvent = function (t, e) {
        if ("atk" == e && this._target) {
            var n = this._context.getHurt();
            n.isNotInvincible = !0;
            n.damage *= Number(this._context.cfg.val3);
            n.damage = Math.floor(n.damage);
            this._target.beHurt(n);
        }
    };
    e.prototype.end = function () {
        this._context.spCtrl.unregisterFrameEvent(this);
        this._context.enterAttackCd();
        if (this._isHit && this._target && this._target.curState == $actorEnum.EActorStateType.EXTEND_1) {
            this._target.changeState($actorEnum.EActorStateType.IDLE);
        }
    };
    return e;
})($state.State);
exports.Enemy_211_Atk = u;
