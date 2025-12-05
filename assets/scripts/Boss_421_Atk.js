var i;
exports.Boss_421_Atk = void 0;
var $state = require("./State");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $actorEnum = require("./ActorEnum");
var $buffEnum = require("./BuffEnum");
var $door = require("./Door");
var $actorBase = require("./ActorBase");
var $actorMgr = require("./ActorMgr");
var h = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._atkCollisionIds = [];
        n._isSprint = !1;
        n._stateType = $actorEnum.EActorStateType.ATTACK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function (t) {
        var e = this;
        this._atkCollisionIds = [];
        this._isSprint = !1;
        this._context.setDirX(t.x > this._context.node.x);
        if (t && t.isValid) {
            var n = t.getComponent($door.default);
            if (n && n.state != $door.EDoorState.DESTROY) {
                return void this._context.playAnimAttack(
                    null,
                    function () {
                        e._context.attackHit(t);
                        e._context.changeState($actorEnum.EActorStateType.IDLE);
                    },
                    t
                );
            }
        }
        if (
            Math.random() < Number(this._context.cfg.val1) &&
            this._context.canReleaseSkillTarget(t.getComponent($actorBase.default))
        ) {
            this._isSprint = !0;
            this._context.spAnimCtrl.playAnim("skill_start", 1, !1, function () {
                e._context.spAnimCtrl.playAnim("skill_stand", 1, !0);
            });
            var i = this._context.attackMovePos;
            var o = cc.Vec2.distance(i, this._context.node.getPosition()) / 1e3;
            if (i) {
                cc.tween(this._context.node)
                    .delay(0.15)
                    .to(o, {
                        x: i.x,
                        y: i.y
                    })
                    .call(function () {
                        e._context.setPos(i);
                        e._context.updatePathData();
                        e._context.attackMovePos = null;
                        e._context.spAnimCtrl.playAnim("skill_over", 1, !1, function () {
                            e._context.buff.add({
                                buffId: $buffEnum.EBuffId.DIZZINESS,
                                buffType: $buffEnum.EBuffType.DIZZINESS,
                                parentActor: e._context,
                                agentActor: e._context,
                                isDebuff: !0,
                                isSuperposition: !1,
                                duration: Number(e._context.cfg.val2),
                                onRemove: function () {
                                    e._context.enterAttackCd();
                                    if (e._context.isDead()) {
                                        //
                                    } else {
                                        e._context.changeState($actorEnum.EActorStateType.IDLE);
                                    }
                                }
                            });
                        });
                    })
                    .start();
            }
        } else {
            this._context.playAnimAttack(
                function () {
                    e._context.attackHit(t);
                },
                function () {
                    e._context.changeState($actorEnum.EActorStateType.IDLE);
                },
                t
            );
        }
    };
    e.prototype.update = function () {
        if (this._isSprint) {
            this.checkHurt();
        }
    };
    e.prototype.end = function () {
        cc.Tween.stopAllByTarget(this._context.node);
        this._context.setPos(this._context.node.getPosition());
    };
    e.prototype.checkHurt = function () {
        var t = this;
        $actorMgr.default.instance.queryActorByCamp($actorEnum.ETeamType.PLAYER).forEach(function (e) {
            var n = t._atkCollisionIds.indexOf(e.unitId);
            if (e.isDead()) {
                if (-1 != n) {
                    t._atkCollisionIds.splice(n, 1);
                }
            } else {
                if (
                    $simplyCollisionDetector.default.isCollisionRectToRect(
                        t._context.hurtColliderRect,
                        e.hurtColliderRect
                    )
                ) {
                    -1 == n && (e.beHurt(t._context.getHurt()), t._atkCollisionIds.push(e.unitId));
                } else {
                    -1 != n && t._atkCollisionIds.splice(n, 1);
                }
            }
        });
    };
    return e;
})($state.State);
exports.Boss_421_Atk = h;
