exports.SkillBase = void 0;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $playerDataProxy = require("./PlayerDataProxy");
var $numericData = require("./NumericData");
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $skillEnum = require("./SkillEnum");
var u = (function () {
    function t() {
        this._owner = null;
        this._cfg = null;
        this._attr = null;
        this._skillCDItme = null;
        this._skillCD = 0;
        this._skillCDTimer = 0;
        this._duration = 0;
        this._durationTimer = 0;
        this._waitCD = 0;
        this._isInit = !1;
        this._lv = 0;
        this._extraDamage = 0;
    }
    Object.defineProperty(t.prototype, "cfg", {
        get: function () {
            return this._cfg;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "skillCD", {
        get: function () {
            return this._skillCD;
        },
        set: function (t) {
            this._skillCD = t;
            if (this._skillCDTimer > 0 && this._skillCDItme) {
                var e = this._skillCD / this._skillCDTimer;
                this._skillCDItme.updateCd(e);
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (t) {
            this._duration = t;
            if (this._durationTimer > 0 && this._skillCDItme) {
                var e = this._duration / this._durationTimer;
                this._skillCDItme.updateDuration(e);
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "skillCDTimer", {
        get: function () {
            return this._skillCDTimer;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "extraDamage", {
        get: function () {
            return this._extraDamage;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.init = function (t, e) {
        this._owner = t;
        this._cfg = $cfg.default.instance.dataSkill.getById(e);
        this._lv = $playerDataProxy.playerDataProxy.getArtifactLv(e);
        this._extraDamage = this._cfg.dmg.split("|").map(Number)[this._lv - 1];
        $eventManager.EventManager.instance.on(
            $skillEnum.ESkillEvent.SELECT_SKILL_EX + e,
            this.onEventSelectSkillEx,
            this
        );
        this.initAttribute();
        this.onInit();
        this._isInit = !0;
    };
    t.prototype.onInit = function () {
        this._skillCDTimer = this.getAttribute($attrEnum.E_SkillAttrType.SKILL_CD).value;
    };
    t.prototype.initAttribute = function () {
        this._attr = new $numericData.NumericData();
        this._attr.init($attrEnum.E_SkillAttrType);
        for (var t = 1; t <= 2; ++t) {
            var e = this._cfg["main" + t];
            this.getAttribute(t).setFixBase(e);
        }
        for (t = 1; t <= 9; ++t) {
            e = Number(this._cfg["val" + t]);
            this.getAttribute(110 + t).setFixBase(e);
        }
    };
    t.prototype.bindCDItem = function (t) {
        this._skillCDItme = t;
        this.skillCD = this.skillCD;
        this.duration = this.duration;
    };
    t.prototype.update = function (t) {
        if (this._isInit && !this._owner.isDead()) {
            this.onUpdate(t);
        }
    };
    t.prototype.onUpdate = function () {};
    t.prototype.enterCD = function () {
        this._skillCDTimer = this.getAttribute($attrEnum.E_SkillAttrType.SKILL_CD).value;
        this.skillCD = this._skillCDTimer;
    };
    t.prototype.getAttribute = function (t) {
        return this._attr.getNumeric(t);
    };
    t.prototype.remove = function () {
        $eventManager.EventManager.instance.off(
            $skillEnum.ESkillEvent.SELECT_SKILL_EX + this._cfg.id,
            this.onEventSelectSkillEx,
            this
        );
        if (this._skillCDItme) {
            this._skillCDItme.destroy();
            this._skillCDItme = null;
        }
        this.onRemove();
    };
    t.prototype.onRemove = function () {};
    t.prototype.onEventSelectSkillEx = function (t) {
        this.addSkillEx(t);
    };
    t.prototype.addSkillEx = function (t) {
        var e = $cfg.default.instance.dataChoose.getById(t);
        if (
            11 ===
            (e.baseVal1 > 0 &&
                this.getAttribute($attrEnum.E_SkillAttrType.CORE_ATTR_RATE).changePercentAdd(100 * e.baseVal1),
            e.baseVal2 > 0 && this.getAttribute($attrEnum.E_SkillAttrType.SKILL_CD).changePercentAdd(100 * -e.baseVal2),
            e.type)
        ) {
            var n = 110 + Number(e.val1);
            this.getAttribute(n).changeAddBaseValue(Number(e.val2) * (1 == Number(e.val3) ? 1 : -1));
        }
        this.onSelectSkillEx(t);
    };
    t.prototype.onSelectSkillEx = function () {};
    t.prototype.getHurtOption = function () {
        return {
            attacker: this._owner,
            baseValue: this._owner.getAttribute($attrEnum.E_AttrType.ATK).value,
            rate: this.getAttribute($attrEnum.E_SkillAttrType.CORE_ATTR_RATE).value,
            critRate: this._owner.getAttribute($attrEnum.E_AttrType.CRIT_RATE).value,
            critHurt: this._owner.getAttribute($attrEnum.E_AttrType.CRIT_HURT).value,
            hurtSourceType: $battleEnum.EHurtSourceType.SKILL_HURT,
            extraDamage: this._extraDamage,
            option: {
                skillId: this._cfg.id
            }
        };
    };
    return t;
})();
exports.SkillBase = u;
