var i;
var $audioUtil = require("./AudioUtil");
var $nodeUtil = require("./NodeUtil");
var $battleHurtFormulaMgr = require("./BattleHurtFormulaMgr");
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $simplyCircleCollider = require("./SimplyCircleCollider");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $spAnimEffect = require("./SpAnimEffect");
var $attrEnum = require("./AttrEnum");
var $buffEnum = require("./BuffEnum");
var y = cc._decorator;
var _ = y.ccclass;
var g = y.property;
var v = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.collider = null;
        e._ownerSkill = null;
        return e;
    }
    __extends(e, t);
    e.prototype.play = function (t) {
        var e = this;
        this._ownerSkill = t;
        var n = t.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value;
        this.collider.node.scale = n;
        this.node.getChildByName("View").scale = n;
        this.playShieldAnim(function () {
            e.spAnimCtrls[1].playAnim("stand", 1, !0);
            e.playDefaultAnim("atk", 1, !0);
        });
        this._ownerSkill.owner
            .getAttribute($attrEnum.E_AttrType.CRIT_RATE)
            .changeAddValue(t.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value);
    };
    e.prototype.playShieldAnim = function (t) {
        this.spAnimCtrls[2].clearAnim();
        $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_MianZhao");
        this.spAnimCtrls[2].playAnim("start", 1, !1, function () {
            if (t) {
                t();
            }
        });
    };
    e.prototype.onDefaultAnimFrameEvent = function (t, e) {
        if ("atk" == t && "atk" == e) {
            for (
                var n = $nodeUtil.default.nodeParentChangeLocalPos(this.node, this._ownerSkill.owner.node.parent),
                    i = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(n, this.collider.radius),
                    o = [],
                    r = 0,
                    a = i;
                r < a.length;
                r++
            ) {
                var l = a[r];
                var p = $gridAreaDivisionMgr.default.instance
                    .getAreaObjectList(l, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
                    .filter(function (t) {
                        return !o.includes(t);
                    });
                if (p) {
                    o.push.apply(o, p);
                }
            }
            for (var f = 0, d = o; f < d.length; f++) {
                var m = d[f];
                if (
                    m.canBeHurt() &&
                    !m.isDead() &&
                    $simplyCollisionDetector.default.isCollisionRectToCircle(m.hurtColliderRect, this.collider.circle)
                ) {
                    var y = $battleHurtFormulaMgr.default.instance.skillHurt(this._ownerSkill.getHurtOption(), m);
                    m.beHurt(y);
                }
            }
        }
    };
    e.prototype.onRemove = function () {
        var e = this;
        this._ownerSkill.owner
            .getAttribute($attrEnum.E_AttrType.CRIT_RATE)
            .changeAddValue(-this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value);
        this.spAnimCtrls[0].clearAnim();
        this.spAnimCtrls[0].spAnim.setToSetupPose();
        this.spAnimCtrls[2].clearAnim();
        this.spAnimCtrls[2].spAnim.setToSetupPose();
        var n = $battleMgr.default.instance.getCurScene();
        var i = $nodeUtil.default.nodeParentChangeLocalPos(this.node, this._ownerSkill.owner.node.parent);
        this.node.parent = n.actorTopParent;
        this.node.setPosition(i);
        var o = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value;
        if (o > 0) {
            this._ownerSkill.owner.buff.add(
                {
                    buffId: $buffEnum.EBuffId.SPEED_UP,
                    buffType: $buffEnum.EBuffType.SPEED_UP,
                    isDebuff: !1,
                    isSuperposition: !1,
                    duration: this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_7).value,
                    agentActor: this._ownerSkill.owner,
                    parentActor: this._ownerSkill.owner,
                    onRemove: null
                },
                o
            );
        }
        this.spAnimCtrls[1].playAnim("over", 1, !1, function () {
            e.fideOut(function () {
                t.prototype.onRemove.call(e);
            });
        });
    };
    __decorate([g($simplyCircleCollider.default)], e.prototype, "collider", void 0);
    return __decorate([_], e);
})($spAnimEffect.default);
exports.default = v;
