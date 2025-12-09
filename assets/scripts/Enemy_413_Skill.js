var i;
exports.Enemy_413_Skill = void 0;
var $battleMgr = require("./BattleMgr");
var $state = require("./State");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $actorMgr = require("./ActorMgr");
var p = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._moveDir = null;
        n._roomRangeRect = null;
        n._radius = 50;
        n._touchGroundCount = 0;
        n._groundY = 0;
        n._atkCollisionIds = [];
        n._isCheckHurt = !1;
        n._stateType = $actorEnum.EActorStateType.SKILL;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function (t) {
        var e = this;
        var n = $battleMgr.default.instance.getCurScene();
        this._context.node.parent = n.effectParent;
        this._touchGroundCount = 0;
        this._atkCollisionIds = [];
        this._isCheckHurt = !1;
        this._context.node.getChildByName("Body").getChildByName("Shade").active = !1;
        this._moveDir = null;
        this._context.setDirX(t.x > this._context.node.x);
        var i = n.level.getRoomById(this._context.roomId);
        this._roomRangeRect = i.rangeRect.clone();
        this._groundY = i.getGroundY();
        this._context.spAnimCtrl.playAnim("skill_start", 1, !1, function () {
            e._isCheckHurt = !0;
            e._context.spAnimCtrl.playAnim("skill_stand", 1, !0);
        });
        cc.tween(this._context.node)
            .delay(0.5)
            .call(function () {
                var t = null;
                if (e._context.dirX > 0) {
                    t = 45;
                } else {
                    t = 135;
                }
                e._moveDir = cc.v2(Math.cos((t * Math.PI) / 180), Math.sin((t * Math.PI) / 180));
            })
            .start();
    };
    e.prototype.update = function (t) {
        var e = this;
        this._context.updatePos();
        if (this._moveDir) {
            var n = this._context.getAttribute($attrEnum.E_AttrType.SPEED).value + Number(this._context.cfg.val2);
            var i = this._context.node.getPosition();
            var o = this._moveDir.mul(n * t);
            var r = i.add(o);
            if (r.x >= this._roomRangeRect.xMax - this._radius) {
                r.x = this._roomRangeRect.xMax - this._radius - 10;
                this._moveDir.x = -Math.abs(this._moveDir.x);
            } else {
                if (r.x <= this._roomRangeRect.xMin + this._radius) {
                    (r.x = this._roomRangeRect.xMin + this._radius + 10), (this._moveDir.x = Math.abs(this._moveDir.x));
                } else {
                    if (r.y >= this._roomRangeRect.yMax - 2 * this._radius) {
                        (r.y = this._roomRangeRect.yMax - 2 * this._radius - 10),
                            (this._moveDir.y = -Math.abs(this._moveDir.y));
                    } else {
                        r.y <= this._roomRangeRect.yMin + 10 &&
                            ((r.y = this._roomRangeRect.yMin + 20),
                            (this._moveDir.y = Math.abs(this._moveDir.y)),
                            this._touchGroundCount++);
                    }
                }
            }
            if (this._touchGroundCount >= 3) {
                this._moveDir = null;
                r.y = this._groundY;
                this._isCheckHurt = !1;
                this._context.spAnimCtrl.playAnim("skill_over", 1, !1, function () {
                    e._context.changeState($actorEnum.EActorStateType.IDLE);
                });
            }
            this._context.setPos(r);
        }
        if (this._isCheckHurt) {
            this.checkHurt();
        }
    };
    e.prototype.end = function () {
        var t = $battleMgr.default.instance.getCurScene();
        this._context.node.parent = t.actorParent;
        this._context.node.getChildByName("Body").getChildByName("Shade").active = !0;
        cc.Tween.stopAllByTarget(this._context.node);
        var e = this._context.node.getPosition();
        e.y = this._groundY;
        this._context.setPos(e);
        this._context.enterAttackCd();
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
                    $simplyCollisionDetector.default.isCollisionRectToCircle(
                        e.hurtColliderRect,
                        t._context.skillHurtCollider.circle
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
exports.Enemy_413_Skill = p;
