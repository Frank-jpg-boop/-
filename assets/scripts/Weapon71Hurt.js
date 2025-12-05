var i;
var $battleHurtFormulaMgr = require("./BattleHurtFormulaMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $simplyRectCollider = require("./SimplyRectCollider");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $spAnimEffect = require("./SpAnimEffect");
var $attrEnum = require("./AttrEnum");
var $buffEnum = require("./BuffEnum");
var f = cc._decorator;
var d = f.ccclass;
var m = f.property;
var y = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.collider = null;
        e._ownerSkill = null;
        e.range = 125;
        e.speed = 2;
        e._maxRange = 0;
        e._rangeSpeed = 0;
        e._collisionIds = [];
        return e;
    }
    __extends(e, t);
    e.prototype.play = function (t) {
        this._collisionIds = [];
        this._ownerSkill = t;
        this.collider.node.width = 0;
        var e = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value;
        this._maxRange = e * this.range;
        this.node.getChildByName("View").scale = e;
        var n = this.spAnimCtrls[0].spAnim.findAnimation("dianquan").duration / this.speed;
        this._rangeSpeed = this._maxRange / n;
        this.playDefaultAnim("dianquan", this.speed, !1);
    };
    e.prototype.onUpdate = function (t) {
        if (this._ownerSkill) {
            this.collider.node.width += this._rangeSpeed * t;
            if (this.collider.node.width >= this._maxRange) {
                this.collider.node.width = this._maxRange;
            }
            this.checkHurt();
        }
    };
    e.prototype.checkHurt = function () {
        for (
            var t = this,
                e = this.collider.rect,
                n = this.node.parent.convertToNodeSpaceAR(cc.v2(e.xMin, e.yMin)),
                i = new cc.Rect(n.x, n.y, e.width, e.height),
                o = $gridAreaDivisionMgr.default.instance.getRectAreaKeys(i),
                r = [],
                c = 0,
                u = o;
            c < u.length;
            c++
        ) {
            var f = u[c];
            var d = $gridAreaDivisionMgr.default.instance
                .getAreaObjectList(f, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
                .filter(function (t) {
                    return !r.includes(t) && !t.isDead();
                });
            if (d) {
                r.push.apply(r, d);
            }
        }
        r.forEach(function (n) {
            if (
                !n.isDead() &&
                !t._collisionIds.includes(n.unitId) &&
                $simplyCollisionDetector.default.isCollisionRectToRect(e, n.hurtColliderRect)
            ) {
                var i = $battleHurtFormulaMgr.default.instance.skillHurt(t._ownerSkill.getHurtOption(), n);
                n.beHurt(i);
                if (
                    !n.isDead() &&
                    Math.random() < t._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value
                ) {
                    var o = t._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value;
                    n.buff.add({
                        buffId: $buffEnum.EBuffId.PALSY,
                        buffType: $buffEnum.EBuffType.PALSY,
                        duration: o,
                        isSuperposition: !1,
                        parentActor: n,
                        agentActor: t._ownerSkill.owner,
                        onRemove: null,
                        isDebuff: !0
                    });
                }
                t._collisionIds.push(n.unitId);
            }
        });
    };
    e.prototype.onRemove = function () {
        this._ownerSkill = null;
        this.collider.node.width = 0;
        t.prototype.onRemove.call(this);
    };
    __decorate([m($simplyRectCollider.default)], e.prototype, "collider", void 0);
    return __decorate([d], e);
})($spAnimEffect.default);
exports.default = y;
