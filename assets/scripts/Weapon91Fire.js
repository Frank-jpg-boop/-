var i;
var $randomUtil = require("./RandomUtil");
var $nodeUtil = require("./NodeUtil");
var $battleHurtFormulaMgr = require("./BattleHurtFormulaMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $simplyRectCollider = require("./SimplyRectCollider");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $spAnimEffect = require("./SpAnimEffect");
var $attrEnum = require("./AttrEnum");
var $buffEnum = require("./BuffEnum");
var m = cc._decorator;
var y = m.ccclass;
var _ = m.property;
var g = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.collider = null;
        e._ownerSkill = null;
        e._isPlay = !1;
        e._dirDuration = 0;
        e._angleSpeed = 0;
        e._hurtTargetDataMap = null;
        e._hurtDirCdTime = 0.2;
        e._initWidth = 125;
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        t.prototype.onInit.call(this);
        this._isPlay = !1;
        this.node.getChildByName("View").width = this._initWidth;
        this.node.getChildByName("View").scaleX = 0;
        this._hurtTargetDataMap = new Map();
    };
    e.prototype.play = function (t, e) {
        var n = this;
        this._ownerSkill = t;
        this._hurtDirCdTime = 1 / t.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_8).value;
        var i = (180 * Math.atan2(e.y, e.x)) / Math.PI;
        var o = this.node.getChildByName("View");
        o.angle = i;
        this.collider.node.angle = i;
        var r = t.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value;
        this.collider.node.width = this._initWidth * r;
        this._angleSpeed = 25 * ($randomUtil.RandomUtil.randomInt(0, 2) ? -1 : 1);
        this._dirDuration = $randomUtil.RandomUtil.random(0.5, 1.5);
        this.playDefaultAnim("fire", 1, !0);
        cc.tween(o)
            .to(0.2, {
                scaleX: r
            })
            .call(function () {
                n._isPlay = !0;
            })
            .start();
    };
    e.prototype.onUpdate = function (t) {
        if (this._isPlay) {
            if (this._dirDuration > 0) {
                this._dirDuration -= t;
                if (this._dirDuration <= 0) {
                    this._angleSpeed *= -1;
                    this._dirDuration = $randomUtil.RandomUtil.random(0.5, 1.5);
                }
            }
            var e = this.node.getChildByName("View");
            e.angle += this._angleSpeed * t;
            this.collider.node.angle = e.angle;
            this.checkCollision(t);
        }
    };
    e.prototype.checkCollision = function (t) {
        for (
            var e = this,
                n = this._ownerSkill.cfg.edge,
                i = $nodeUtil.default.nodeParentChangeLocalPos(this.node, this._ownerSkill.owner.node.parent),
                o = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(i, n),
                r = [],
                a = 0,
                u = o;
            a < u.length;
            a++
        ) {
            var h = u[a];
            var m = $gridAreaDivisionMgr.default.instance.getAreaObjectList(
                h,
                $gridAreaDivisionMgr.E_AreaObjectType.ENEMY
            );
            r.push.apply(
                r,
                m.filter(function (t) {
                    return !r.includes(t);
                })
            );
        }
        this._hurtTargetDataMap.forEach(function (t) {
            if (
                r.some(function (e) {
                    return e.unitId == t.id;
                })
            ) {
                //
            } else {
                e._hurtTargetDataMap.delete(t.id);
            }
        });
        for (var y = 0; y < r.length; y++) {
            var _ = r[y];
            if ($simplyCollisionDetector.default.isCollisionRectToRect(this.collider.rect, _.hurtColliderRect)) {
                var g = this._hurtTargetDataMap.get(_.unitId);
                if (g) {
                    //
                } else {
                    g = {
                        id: _.unitId,
                        hurtCd: 0
                    };
                    this._hurtTargetDataMap.set(_.unitId, g);
                }
                g.hurtCd -= t;
                if (g.hurtCd <= 0) {
                    g.hurtCd = this._hurtDirCdTime;
                    var v = $battleHurtFormulaMgr.default.instance.skillHurt(this._ownerSkill.getHurtOption(), _);
                    _.beHurt(v);
                    var b = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value;
                    if (b > 0) {
                        _.beRepel(i, b);
                    }
                    if (
                        Math.random() < this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_7).value &&
                        !_.isDead()
                    ) {
                        var E =
                            this._ownerSkill.owner.getAttribute($attrEnum.E_AttrType.ATK).value *
                            this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value;
                        _.buff.add(
                            {
                                buffId: $buffEnum.EBuffId.FIRE,
                                buffType: $buffEnum.EBuffType.FIRE,
                                duration:
                                    5 + this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value,
                                isSuperposition: !1,
                                parentActor: _,
                                agentActor: this._ownerSkill.owner,
                                onRemove: null,
                                isDebuff: !0
                            },
                            E
                        );
                    }
                }
            }
        }
    };
    e.prototype.onRemove = function () {
        var e = this;
        this.fideOut(function () {
            t.prototype.onRemove.call(e);
        });
    };
    __decorate([_($simplyRectCollider.default)], e.prototype, "collider", void 0);
    return __decorate([y], e);
})($spAnimEffect.default);
exports.default = g;
