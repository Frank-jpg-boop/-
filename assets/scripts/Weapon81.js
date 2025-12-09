var i;
var $audioUtil = require("./AudioUtil");
var $battleHurtFormulaMgr = require("./BattleHurtFormulaMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $simplyCircleCollider = require("./SimplyCircleCollider");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $spAnimEffect = require("./SpAnimEffect");
var $attrEnum = require("./AttrEnum");
var f = cc._decorator;
var d = f.ccclass;
var m = f.property;
var y = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.collider = null;
        e._ownerSkill = null;
        e._durationTime = 0;
        e._isPlay = !1;
        e._weaponId = 0;
        e._radiusAddSpeed = 0;
        e._radiusMax = 0;
        e._initMaxRadius = 100;
        e._collisionIds = [];
        e._animDuration = 0;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "weaponId", {
        get: function () {
            return this._weaponId;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onInit = function () {
        t.prototype.onInit.call(this);
        this._isPlay = !1;
        this._radiusMax = this._initMaxRadius;
        this.collider.radius = 0;
        this.spAnimCtrls[1].node.scale = 0;
    };
    e.prototype.play = function (t, e) {
        var n = this;
        this._weaponId = e;
        this._ownerSkill = t;
        this._animDuration = this.spAnimCtrls[1].spAnim.findAnimation("atk").duration;
        this.updateRange();
        this.playDefaultAnim("stand", 1, !1);
        cc.tween(this.spAnimCtrls[1].node)
            .to(
                0.2,
                {
                    scale: 1
                },
                {
                    easing: "backOut"
                }
            )
            .call(function () {
                n.playDefaultAnim("stand", 1, !1, function () {
                    n._isPlay = !0;
                });
            })
            .start();
        this._durationTime = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value;
    };
    e.prototype.updateRange = function () {
        var t = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value;
        this._radiusMax = t * this._initMaxRadius;
        this.node.getChildByName("View").scale = t;
        this._radiusAddSpeed = (this._radiusMax / this._animDuration) * 1.2;
    };
    e.prototype.onUpdate = function (t) {
        if (this._isPlay) {
            this.updateRange();
            this.collider.radius += this._radiusAddSpeed * t;
            if (this.collider.radius >= this._radiusMax) {
                this.collider.radius = this._radiusMax;
            }
            this.checkHurt();
            this._durationTime -= t;
            if (this._durationTime <= 0) {
                this.remove();
            }
        }
    };
    e.prototype.checkHurt = function () {
        for (
            var t = this,
                e = this.node.getPosition(),
                n = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(e, this.collider.radius),
                i = [],
                o = 0,
                r = n;
            o < r.length;
            o++
        ) {
            var a = r[o];
            var l = $gridAreaDivisionMgr.default.instance
                .getAreaObjectList(a, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
                .filter(function (t) {
                    return !i.includes(t) && !t.isDead();
                });
            if (l) {
                i.push.apply(i, l);
            }
        }
        i.forEach(function (e) {
            if (
                !e.isDead() &&
                !t._collisionIds.includes(e.unitId) &&
                $simplyCollisionDetector.default.isCollisionRectToCircle(e.hurtColliderRect, t.collider.circle)
            ) {
                var n = $battleHurtFormulaMgr.default.instance.skillHurt(t._ownerSkill.getHurtOption(), e);
                e.beHurt(n);
                t._collisionIds.push(e.unitId);
            }
        });
    };
    e.prototype.onRemove = function () {
        var e = this;
        this._ownerSkill.removeWeapon(this);
        this.fideOut(function () {
            t.prototype.onRemove.call(e);
        });
    };
    e.prototype.onEffectAnimCompleteEvent = function (t) {
        if (this._onAnimComplete) {
            this._onAnimComplete();
        }
        if ("stand" == t.animation.name) {
            this.playDefaultAnim("stand", 1, !1);
            if (!this._isPlay) {
                return;
            }
            this.playAtk();
        }
    };
    e.prototype.playAtk = function () {
        this._collisionIds = [];
        this.collider.radius = 0;
        this.spAnimCtrls[1].clearAnim();
        this.spAnimCtrls[1].playAnim("atk", 1, !1);
        $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_ShenLeLin");
    };
    __decorate([m($simplyCircleCollider.default)], e.prototype, "collider", void 0);
    return __decorate([d], e);
})($spAnimEffect.default);
exports.default = y;
