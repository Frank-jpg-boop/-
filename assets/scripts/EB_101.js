var i;
var $randomUtil = require("./RandomUtil");
var $nodeUtil = require("./NodeUtil");
var $battleMgr = require("./BattleMgr");
var $bullet101_Frozen = require("./Bullet101_Frozen");
var $bulletMgr = require("./BulletMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $attrEnum = require("./AttrEnum");
var $spAnimEffect = require("./SpAnimEffect");
var d = cc._decorator;
var m = d.ccclass;
var y =
    (d.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._ownerSkill = null;
            e._ownerEnemyId = 0;
            return e;
        }
        __extends(e, t);
        e.prototype.play = function (t, e) {
            this._ownerEnemyId = e;
            this._ownerSkill = t;
            this.playDefaultAnim("stand", 1, !0);
        };
        e.prototype.onRemove = function () {
            var e = this;
            var n = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_7).value;
            if (n > 0) {
                this.playDefaultAnim(
                    "break",
                    1,
                    !1,
                    function () {
                        t.prototype.onRemove.call(e);
                    },
                    !1
                );
                this.scheduleOnce(function () {
                    e.shootBullet(n);
                }, 0.15);
            } else {
                this.fideOut(function () {
                    t.prototype.onRemove.call(e);
                });
            }
        };
        e.prototype.searchTargets = function () {
            for (
                var t = this,
                    e = this._ownerSkill.cfg.edge,
                    n = $nodeUtil.default.nodeParentChangeLocalPos(this.node, this._ownerSkill.owner.node.parent),
                    i = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(n, e),
                    o = [],
                    r = 0,
                    a = i;
                r < a.length;
                r++
            ) {
                var c = a[r];
                var l = $gridAreaDivisionMgr.default.instance
                    .getAreaObjectList(c, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
                    .filter(function (t) {
                        return !o.includes(t) && !t.isDead();
                    });
                if (l) {
                    o.push.apply(o, l);
                }
            }
            var u = [];
            o.forEach(function (i) {
                if (!i.isDead() && i.id != t._ownerEnemyId) {
                    var o = i.node.getPosition();
                    var r = cc.Vec2.squaredDistance(o, n);
                    if (r < e * e) {
                        u.push({
                            actor: i,
                            sqrDis: r
                        });
                    }
                }
            });
            u.sort(function (t, e) {
                return t.sqrDis - e.sqrDis;
            });
            return u.map(function (t) {
                return t.actor;
            });
        };
        e.prototype.shootBullet = function (t) {
            var e = this;
            var n = this.searchTargets();
            var i = $nodeUtil.default.nodeParentChangeLocalPos(this.node, this._ownerSkill.owner.node.parent);
            i.y += 60;
            for (
                var o = function (t) {
                        var o = null;
                        if (n.length > t) {
                            o = n[t].node
                                .getPosition()
                                .add(cc.v2(0, $randomUtil.RandomUtil.random(0.2, 0.7) * n[t].rightHeight));
                        } else {
                            var s = ($randomUtil.RandomUtil.randomInt(0, 360) * Math.PI) / 180;
                            o = cc.v2(Math.cos(s), Math.sin(s)).mul(r._ownerSkill.cfg.edge).add(i);
                        }
                        $bulletMgr.default.instance.createBullet({
                            parent: $battleMgr.default.instance.getCurScene().bulletParent,
                            prefabName: "Bullet101_Frozen",
                            initPos: i,
                            iconPath: "",
                            bulletClass: $bullet101_Frozen.default,
                            onCreated: function (t) {
                                t.shoot(e._ownerSkill.owner, o, e._ownerSkill, e._ownerEnemyId);
                            }
                        });
                    },
                    r = this,
                    p = 0;
                p < t;
                ++p
            ) {
                o(p);
            }
        };
        return __decorate([m], e);
    })($spAnimEffect.default));
exports.default = y;
