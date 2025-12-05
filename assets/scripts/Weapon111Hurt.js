var i;
var $nodeUtil = require("./NodeUtil");
var $battleHurtFormulaMgr = require("./BattleHurtFormulaMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $simplyRectCollider = require("./SimplyRectCollider");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $spAnimEffect = require("./SpAnimEffect");
var $attrEnum = require("./AttrEnum");
var $buffEnum = require("./BuffEnum");
var d = cc._decorator;
var m = d.ccclass;
var y = d.property;
var _ = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.collider = null;
        e._ownerSkill = null;
        e._duration = 0;
        e._isCheck = !1;
        e._checkTime = 0;
        e._addRangeSpeed = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        t.prototype.onInit.call(this);
        this.node.getChildByName("View").scale = 1;
    };
    e.prototype.play = function (t) {
        var e = this;
        this._ownerSkill = t;
        this.node.getChildByName("View").scaleX = t.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value;
        this._addRangeSpeed = t.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value;
        this.updateCollider();
        this._duration = t.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value;
        this.scheduleOnce(function () {
            e.checkCollision(!0);
        }, 0.1);
        this.playDefaultAnim(
            "atk",
            1,
            !1,
            function () {
                e.playDefaultAnim("atk_stand", 1, !0);
                e._isCheck = !0;
            },
            !1
        );
    };
    e.prototype.updateCollider = function () {
        var t = this.node.getChildByName("View");
        this.collider.node.width = t.scaleX * t.width;
        this.collider.node.height = t.scaleY * t.height;
    };
    e.prototype.onUpdate = function (t) {
        if (this._isCheck) {
            this._duration -= t;
            if (this._duration <= 0) {
                return void this.remove();
            }
            if (this._addRangeSpeed > 0) {
                this.node.getChildByName("View").scaleX += this._addRangeSpeed * t;
                this.updateCollider();
            }
            this._checkTime -= t;
            if (this._checkTime <= 0) {
                this._checkTime = 0.1;
                this.checkCollision(!1);
            }
        }
    };
    e.prototype.checkCollision = function (t) {
        for (
            var e = $nodeUtil.default.nodeParentChangeLocalPos(this.collider.node, this.node.parent),
                n = new cc.Rect(
                    e.x - this.collider.node.width / 2,
                    e.y - this.collider.node.height / 2,
                    this.collider.node.width,
                    this.collider.node.height
                ),
                i = $gridAreaDivisionMgr.default.instance.getRectAreaKeys(n),
                o = [],
                r = 0,
                l = i;
            r < l.length;
            r++
        ) {
            var p = l[r];
            var d = $gridAreaDivisionMgr.default.instance
                .getAreaObjectList(p, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
                .filter(function (t) {
                    return !o.includes(t);
                });
            if (d) {
                o.push.apply(o, d);
            }
        }
        for (var m = 0, y = o; m < y.length; m++) {
            var _ = y[m];
            if (
                _.canBeHurt() &&
                !_.isDead() &&
                $simplyCollisionDetector.default.isCollisionRectToRect(this.collider.rect, _.hurtColliderRect)
            ) {
                var g = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_7).value;
                if (t) {
                    var v = $battleHurtFormulaMgr.default.instance.skillHurt(this._ownerSkill.getHurtOption(), _);
                    _.beHurt(v);
                    if (_.isDead() && g > 0) {
                        var b = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value;
                        this._ownerSkill.owner.beRecover(b * g);
                    }
                }
                var E = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_8).value;
                var S =
                    this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value *
                    this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value;
                if (E > 0) {
                    _.buff.add(
                        {
                            buffId: $buffEnum.EBuffId.POISON,
                            buffType: $buffEnum.EBuffType.POISON,
                            isDebuff: !0,
                            isSuperposition: !1,
                            duration: E,
                            parentActor: _,
                            agentActor: this._ownerSkill.owner,
                            onRemove: null
                        },
                        S,
                        g
                    );
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
    __decorate([y($simplyRectCollider.default)], e.prototype, "collider", void 0);
    return __decorate([m], e);
})($spAnimEffect.default);
exports.default = _;
