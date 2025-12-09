var i;
var $mathUtil = require("./MathUtil");
var $battleHurtFormulaMgr = require("./BattleHurtFormulaMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $simplyCircleCollider = require("./SimplyCircleCollider");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $attrEnum = require("./AttrEnum");
var $bulletBase = require("./BulletBase");
var f = cc._decorator;
var d = f.ccclass;
var m = f.property;
var y = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.circleCollider = null;
        e.nView = null;
        e.animBullet = null;
        e._ownerSkill = null;
        e._isPlayComplete = !1;
        e._collisionDataMap = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onShoot = function (t, e, n, i) {
        var o = this;
        if (void 0 === n) {
            n = 1;
        }
        if (void 0 === i) {
            i = 0;
        }
        this.spIcon.node.angle = 0;
        this.spIcon.node.opacity = 0;
        this._ownerSkill = e;
        this._collisionDataMap = new Map();
        var r = this.node.getPosition();
        this.nView.scale = n;
        this.circleCollider.node.scale = n;
        var s = t.sub(r).normalizeSelf();
        this.node.angle = $mathUtil.MathUtil.radians2Angle(cc.Vec2.RIGHT.signAngle(s));
        this.animBullet.once(
            cc.Animation.EventType.FINISHED,
            function () {
                o._isPlayComplete = !0;
                var e = o.node.getPosition();
                var n = t.sub(e).len() / 500;
                o.tweenTo(
                    e,
                    t,
                    n,
                    !0,
                    function () {
                        if (i > 0) {
                            o.animBullet.play("Bullet31Loop");
                            o.scheduleOnce(function () {
                                o.remove();
                            }, i);
                        }
                    },
                    "",
                    i <= 0
                );
            },
            this
        );
        this.animBullet.play();
    };
    e.prototype.onUpdate = function (t) {
        if (this._isPlayComplete) {
            this.checkCollision(t);
        }
    };
    e.prototype.checkCollision = function (t) {
        var e = this;
        var n = this.circleCollider.node.getBoundingBox();
        n.x += this.node.x;
        n.y += this.node.y;
        for (var i = [], o = n.x, r = n.xMax; ; o += $gridAreaDivisionMgr.default.instance.gridSize) {
            if (o > r) {
                o = r;
            }
            for (var a = n.y, l = a + n.height; ; a += $gridAreaDivisionMgr.default.instance.gridSize) {
                if (a > l) {
                    a = l;
                }
                var h = $gridAreaDivisionMgr.default.instance.getAreaKeyInfo(o, a).key;
                if (i.includes(h)) {
                    //
                } else {
                    i.push(h);
                }
                if (a >= l) {
                    break;
                }
            }
            if (o >= r) {
                break;
            }
        }
        for (var f = [], d = 0, m = i; d < m.length; d++) {
            var y = m[d];
            var _ = $gridAreaDivisionMgr.default.instance.getAreaObjectList(
                y,
                $gridAreaDivisionMgr.E_AreaObjectType.ENEMY
            );
            f.push.apply(
                f,
                _.filter(function (t) {
                    return !f.includes(t);
                })
            );
        }
        this._collisionDataMap.forEach(function (t) {
            if (
                f.some(function (e) {
                    return e.unitId == t.id;
                })
            ) {
                //
            } else {
                e._collisionDataMap.delete(t.id);
            }
        });
        for (var g = 0; g < f.length; g++) {
            var v = f[g];
            if (
                v.canBeHurt() &&
                $simplyCollisionDetector.default.isCollisionRectToCircle(v.hurtColliderRect, this.circleCollider.circle)
            ) {
                if (this._collisionDataMap.has(v.unitId)) {
                    var b = this._collisionDataMap.get(v.unitId);
                    b.time += t;
                    if (b.time >= 1 / this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value) {
                        b.time = 0;
                        this._collisionDataMap.delete(v.unitId);
                    }
                } else {
                    this._collisionDataMap.set(v.unitId, {
                        id: v.unitId,
                        time: 0
                    });
                    var E = $battleHurtFormulaMgr.default.instance.skillHurt(this._ownerSkill.getHurtOption(), v);
                    v.beHurt(E);
                }
            }
        }
    };
    __decorate([m($simplyCircleCollider.default)], e.prototype, "circleCollider", void 0);
    __decorate([m(cc.Node)], e.prototype, "nView", void 0);
    __decorate([m(cc.Animation)], e.prototype, "animBullet", void 0);
    return __decorate([d], e);
})($bulletBase.default);
exports.default = y;
