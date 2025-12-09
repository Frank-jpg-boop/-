var i;
exports.Skill_121 = void 0;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $effectMgr = require("./EffectMgr");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $weapon121Shield = require("./Weapon121Shield");
var h = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._shield = 0;
        e._effect = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        $eventManager.EventManager.instance.on(
            $actorEnum.EActorEvent.BEFORE_BE_HURT + this._owner.unitId,
            this.onOwnerBeforeBeHurt,
            this
        );
        this._shield = 0;
        t.prototype.onInit.call(this);
    };
    e.prototype.onUpdate = function (t) {
        if (this.skillCD > 0) {
            this.skillCD -= t;
            return void (this.skillCD <= 0 && (this.skillCD = 0));
        }
        this.addShield();
    };
    e.prototype.addShield = function () {
        var t = this;
        var e = this.getShieldMax();
        if (!(this._shield >= e)) {
            var n = Math.floor(
                this._owner.getAttribute($attrEnum.E_AttrType.HP).value *
                    this.getAttribute($attrEnum.E_SkillAttrType.CORE_ATTR_RATE).value
            );
            this._shield = Math.min(e, this._shield + n);
            this.enterCD();
            this._owner.head.updateShield(this._shield, e);
            if (this._effect) {
                this._effect.playShieldAnim(null);
            } else {
                $effectMgr.default.instance.createEffect({
                    parent: this._owner.node,
                    prefabName: "Weapon121Shield",
                    initPos: cc.v2(0, 0),
                    effectClass: $weapon121Shield.default,
                    onCreated: function (e) {
                        t._effect = e;
                        t._effect.play(t);
                    }
                });
            }
        }
    };
    e.prototype.getHurtOption = function () {
        return {
            attacker: this._owner,
            baseValue: this._owner.getAttribute($attrEnum.E_AttrType.ATK).value,
            rate:
                this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value *
                this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value,
            critRate: this._owner.getAttribute($attrEnum.E_AttrType.CRIT_RATE).value,
            critHurt: this._owner.getAttribute($attrEnum.E_AttrType.CRIT_HURT).value,
            hurtSourceType: $battleEnum.EHurtSourceType.SKILL_HURT,
            extraDamage: this._extraDamage,
            option: {
                skillId: this._cfg.id
            }
        };
    };
    e.prototype.onOwnerBeforeBeHurt = function (t) {
        if (this._shield > 0) {
            if (this._shield >= t.damage) {
                (this._shield -= t.damage), (t.damage = 0);
            } else {
                (t.damage -= this._shield), (this._shield = 0);
            }
            if (this._shield <= 0) {
                this._effect.remove();
                this._effect = null;
            }
        }
        var e = this.getShieldMax();
        this._owner.head.updateShield(this._shield, e);
    };
    e.prototype.getShieldMax = function () {
        var t =
            this._owner.getAttribute($attrEnum.E_AttrType.HP).value *
            this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value;
        return Math.floor(t);
    };
    e.prototype.onSelectSkillEx = function (t) {
        var e = $cfg.default.instance.dataChoose.getById(t);
        if (11 == e.type && 5 === Number(e.val1) && this._effect) {
            this._owner.getAttribute($attrEnum.E_AttrType.CRIT_RATE).changeAddValue(Number(e.val2));
        }
    };
    e.prototype.onRemove = function () {
        $eventManager.EventManager.instance.off(
            $actorEnum.EActorEvent.BEFORE_BE_HURT + this._owner.unitId,
            this.onOwnerBeforeBeHurt,
            this
        );
        t.prototype.onRemove.call(this);
    };
    return e;
})(require("./SkillBase").SkillBase);
exports.Skill_121 = h;
