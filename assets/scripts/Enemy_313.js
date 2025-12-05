var i;
var $actorEnum = require("./ActorEnum");
var $door = require("./Door");
var $actorMgr = require("./ActorMgr");
var $enemyBase = require("./EnemyBase");
var u = cc._decorator;
var p = u.ccclass;
var h =
    (u.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._isAtk2 = !1;
            return e;
        }
        __extends(e, t);
        e.prototype.plyerAnimSummom = function (t, e) {
            var n = this;
            this._isAtk2 = Math.random() < Number(this._cfg.val1);
            this._spCtrl.playAnim(
                this._isAtk2 ? "atk2" : this._atkAnimName,
                1,
                !1,
                function () {
                    n._attackCD = n._cfg.arkWait;
                    if (e) {
                        e();
                    }
                },
                function (e, n) {
                    if ("atk" == n && t) {
                        t();
                    }
                }
            );
        };
        e.prototype.attackHit = function (e) {
            if (this._isAtk2) {
                if (e && e.isValid) {
                    var n = e.getComponent($door.default);
                    if (n && n.state != $door.EDoorState.DESTROY) {
                        var i = null;
                        if ((h = n.hp) < Number(this._cfg.val3)) {
                            i = h;
                        } else {
                            i = Math.floor(h * Number(this._cfg.val2));
                        }
                        n.beHurt(i);
                    }
                }
                var o = this.node.getPosition();
                o.x += 150 * this.dirX;
                for (
                    var r = $actorMgr.default.instance.queryActorByCamp($actorEnum.ETeamType.PLAYER), l = 0;
                    l < r.length;
                    l++
                ) {
                    var u = r[l];
                    if (!u.isDead()) {
                        var p = u.node.getPosition();
                        if (cc.Vec2.squaredDistance(p, o) <= 22500) {
                            var h = u.curHp;
                            var f = this.getHurt();
                            if (h < Number(this._cfg.val3)) {
                                f.damage = h;
                            } else {
                                f.damage = Math.floor(h * Number(this._cfg.val2));
                            }
                            u.beHurt(f);
                        }
                    }
                }
            } else {
                t.prototype.attackHit.call(this, e);
            }
        };
        return __decorate([p], e);
    })($enemyBase.default));
exports.default = h;
