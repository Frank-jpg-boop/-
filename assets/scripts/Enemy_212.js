var i;
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $actorEnum = require("./ActorEnum");
var $door = require("./Door");
var $unitMgr = require("./UnitMgr");
var $enemyBase = require("./EnemyBase");
var $enemy_212_Atk = require("./Enemy_212_Atk");
var f = cc._decorator;
var d = f.ccclass;
var m =
    (f.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.attackMovePos = null;
            e.attackAnimDuration = 0;
            return e;
        }
        __extends(e, t);
        e.prototype.registerState = function () {
            t.prototype.registerState.call(this);
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $enemy_212_Atk.Enemy_212_Atk(this));
        };
        e.prototype.onInit = function () {
            this.attackAnimDuration = this._spCtrl.spAnim.findAnimation("atk").duration;
            t.prototype.onInit.call(this);
        };
        e.prototype.canAttackTarget = function (e) {
            if (t.prototype.canAttackTarget.call(this, e)) {
                var n = $battleMgr.default.instance.getCurScene();
                this.updatePathData();
                if (e.pathPos.x == this.pathPos.x) {
                    var i = cc.v2(0, e.pathPos.y > this.pathPos.y ? 1 : -1);
                    var o = null;
                    if ("" != this._pathPointId) {
                        o = n.level.path.getPoint(this._pathPointId).getDirLine(i);
                    } else {
                        if ("" != this._pathLineId) {
                            o = this._pathLineId;
                        }
                    }
                    if (!o) {
                        return !1;
                    }
                    if ((c = n.level.path.getLine(o)).dir.equals(i)) {
                        //
                    } else {
                        c = n.level.path.getLine(c.reverseLineId);
                    }
                    if (!c) {
                        return !1;
                    }
                    var r = c.dir;
                    var s = this.pathPos.add(r.mul(Number(this._cfg.val1)));
                    if (c.isPosInLineSegment(s)) {
                        //
                    } else {
                        s = c.endPos;
                    }
                    this.attackMovePos = s;
                    return !0;
                }
                if (e.pathPos.y == this.pathPos.y) {
                    var c;
                    i = cc.v2(e.pathPos.x > this.pathPos.x ? 1 : -1, 0);
                    o = null;
                    if ("" != this._pathPointId) {
                        o = n.level.path.getPoint(this._pathPointId).getDirLine(i);
                    } else {
                        if ("" != this._pathLineId) {
                            o = this._pathLineId;
                        }
                    }
                    if (!o) {
                        return !1;
                    }
                    if ((c = n.level.path.getLine(o)).dir.equals(i)) {
                        //
                    } else {
                        c = n.level.path.getLine(c.reverseLineId);
                    }
                    if (!c) {
                        return !1;
                    }
                    r = c.dir;
                    var l = this.pathPos.add(r.mul(Number(this._cfg.val1)));
                    for (s = l.clone(); c && !c.isPosInLineSegment(l); ) {
                        if (null == (o = c.endPoint.getDirLine(r))) {
                            s = c.endPos;
                            break;
                        }
                        c = n.level.path.getLine(o);
                    }
                    var u = this.findMoveDoor(this.pathPos.x, s.x, this.pathPos.y, r.x);
                    if (u) {
                        s.x = u.node.x;
                    }
                    this.attackMovePos = s;
                    return !0;
                }
                return !1;
            }
            return !1;
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
        return __decorate([d], e);
    })($enemyBase.default));
exports.default = m;
