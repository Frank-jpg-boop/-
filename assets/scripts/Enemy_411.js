var i;
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $door = require("./Door");
var $unitMgr = require("./UnitMgr");
var $actorBase = require("./ActorBase");
var $enemyBase = require("./EnemyBase");
var $enemy_411_Atk = require("./Enemy_411_Atk");
var m = cc._decorator;
var y = m.ccclass;
var _ =
    (m.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.skillMovePos = null;
            return e;
        }
        __extends(e, t);
        e.prototype.registerState = function () {
            t.prototype.registerState.call(this);
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $enemy_411_Atk.Enemy_411_Atk(this));
        };
        e.prototype.canSkill = function (t) {
            var e = Math.random() < Number(this._cfg.val1);
            var n = t.getComponent($actorBase.default);
            if (e && n && !n.isDead()) {
                var i = $battleMgr.default.instance.getCurScene();
                this.updatePathData();
                if (n.pathPos.x == this.pathPos.x) {
                    return !1;
                }
                if (n.pathPos.y == this.pathPos.y) {
                    var o = cc.v2(n.pathPos.x > this.pathPos.x ? 1 : -1, 0);
                    var r = null;
                    if ("" != this._pathPointId) {
                        r = i.level.path.getPoint(this._pathPointId).getDirLine(o);
                    } else {
                        if ("" != this._pathLineId) {
                            r = this._pathLineId;
                        }
                    }
                    if (!r) {
                        return !1;
                    }
                    var s = i.level.path.getLine(r);
                    if (s.dir.equals(o)) {
                        //
                    } else {
                        s = i.level.path.getLine(s.reverseLineId);
                    }
                    if (!s) {
                        return !1;
                    }
                    for (
                        var c = s.dir, l = this.pathPos.add(c.mul(200)), u = l.clone();
                        s && !s.isPosInLineSegment(l);

                    ) {
                        if (null == (r = s.endPoint.getDirLine(c))) {
                            u = s.endPos;
                            break;
                        }
                        s = i.level.path.getLine(r);
                    }
                    var p = this.findMoveDoor(this.pathPos.x, u.x, this.pathPos.y, c.x);
                    if (p) {
                        u.x = p.node.x;
                    }
                    this.skillMovePos = u;
                    return !0;
                }
                return !1;
            }
            return !1;
        };
        e.prototype.playAnimSkill = function (t, e, n) {
            var i = this;
            this._spCtrl.playAnim("salute_start", 1, !1, function () {
                i._spCtrl.playAnim("salute_stand", 1, !0);
                cc.tween(i.node)
                    .delay(Number(i._cfg.val3))
                    .call(function () {
                        if (i.canAttackTarget(n.getComponent($actorBase.default))) {
                            i.skillMovePos &&
                                cc
                                    .tween(i.node)
                                    .delay(0.4)
                                    .to(0.1, {
                                        x: i.skillMovePos.x,
                                        y: i.skillMovePos.y
                                    })
                                    .call(function () {
                                        i.setPos(i.skillMovePos);
                                        i.updatePathData();
                                        i.skillMovePos = null;
                                    })
                                    .start();
                            i._spCtrl.playAnim(
                                "skill",
                                1,
                                !1,
                                function () {
                                    if (t) {
                                        t();
                                    }
                                },
                                function () {
                                    if (e) {
                                        e();
                                    }
                                }
                            );
                        } else {
                            i._spCtrl.playAnim("salute_over", 1, !1, function () {
                                if (t) {
                                    t();
                                }
                            });
                        }
                    })
                    .start();
            });
        };
        e.prototype.attackHit = function (t, e) {
            if (void 0 === e) {
                e = !1;
            }
            if (t && t.isValid) {
                var n = t.getComponent($door.default);
                if (n && n.state != $door.EDoorState.DESTROY) {
                    n.beHurt(this.getAttribute($attrEnum.E_AttrType.ATK).value);
                } else {
                    var i = t.getComponent($actorBase.default);
                    if (i) {
                        var o = this.getHurt();
                        if (e) {
                            o.damage *= Number(this._cfg.val2);
                        }
                        i.beHurt(o);
                    }
                }
            }
        };
        e.prototype.findMoveDoor = function (t, e, n, i) {
            for (
                var o = 0, r = $unitMgr.UnitMgr.instance.queryUnit($gridAreaDivisionMgr.E_AreaObjectType.DOOR);
                o < r.length;
                o++
            ) {
                var a = r[o];
                if (a.state == $door.EDoorState.CLOSE && Math.abs(a.node.y - n) < 20) {
                    if (i > 0 && a.node.x >= t && a.node.x <= e) {
                        return a;
                    }
                    if (i < 0 && a.node.x <= t && a.node.x >= e) {
                        return a;
                    }
                }
            }
            return null;
        };
        return __decorate([y], e);
    })($enemyBase.default));
exports.default = _;
