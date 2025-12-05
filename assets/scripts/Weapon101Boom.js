var i;
var $battleHurtFormulaMgr = require("./BattleHurtFormulaMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $simplyCircleCollider = require("./SimplyCircleCollider");
var $spAnimEffect = require("./SpAnimEffect");
var $attrEnum = require("./AttrEnum");
var $buffEnum = require("./BuffEnum");
var $enemyBase = require("./EnemyBase");
var f = cc._decorator;
var d = f.ccclass;
var m = f.property;
var y = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.collider = null;
        e._ownerSkill = null;
        return e;
    }
    __extends(e, t);
    e.prototype.play = function (t, e) {
        var n = this;
        this._ownerSkill = t;
        var i = t.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value;
        this.node.getChildByName("View").scale = i;
        this.collider.node.scale = i;
        this.playDefaultAnim(e ? "atk" : "atk2", 1, !1);
        this.scheduleOnce(function () {
            n.checkBlastHurt(n.node.getPosition(), n.collider.radius);
        }, 0.1);
    };
    e.prototype.checkBlastHurt = function (t, e) {
        for (
            var n = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(t, e), i = [], o = 0, r = n;
            o < r.length;
            o++
        ) {
            var c = r[o];
            var l = $gridAreaDivisionMgr.default.instance
                .getAreaObjectList(c, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
                .filter(function (t) {
                    return !i.includes(t);
                });
            if (l) {
                i.push.apply(i, l);
            }
        }
        for (var f = 0, d = i; f < d.length; f++) {
            var m = d[f];
            if (m.canBeHurt() && !m.isDead() && cc.Vec2.squaredDistance(t, m.node.getPosition()) <= e * e) {
                var y = $battleHurtFormulaMgr.default.instance.skillHurt(this._ownerSkill.getHurtOption(), m);
                m.beHurt(y);
                var _ = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value;
                var g = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value;
                if (_ > 0) {
                    m.buff.add(
                        {
                            buffId: $buffEnum.EBuffId.SLOW_DOWN,
                            buffType: $buffEnum.EBuffType.SLOW_DOWN,
                            isDebuff: !0,
                            isSuperposition: !1,
                            duration: _,
                            parentActor: m,
                            agentActor: this._ownerSkill.owner,
                            onRemove: null
                        },
                        g
                    );
                }
                if (
                    Math.random() < this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value &&
                    m instanceof $enemyBase.default
                ) {
                    m.buff.add(
                        {
                            buffId: $buffEnum.EBuffId.FROZEN,
                            buffType: $buffEnum.EBuffType.FROZEN,
                            isDebuff: !0,
                            isSuperposition: !1,
                            duration: this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_8).value,
                            parentActor: m,
                            agentActor: this._ownerSkill.owner,
                            onRemove: null
                        },
                        this._ownerSkill
                    );
                }
            }
        }
    };
    __decorate([m($simplyCircleCollider.default)], e.prototype, "collider", void 0);
    return __decorate([d], e);
})($spAnimEffect.default);
exports.default = y;
