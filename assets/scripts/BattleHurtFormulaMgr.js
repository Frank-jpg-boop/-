var $battleEnum = require("./BattleEnum");
var $buffEnum = require("./BuffEnum");
var r = (function () {
    function t() {}
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == t._instance) {
                t._instance = new t();
            }
            return t._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.skillHurt = function (t, e) {
        if (!e || !t || e.isDead()) {
            return null;
        }
        var n = t.baseValue * t.rate;
        if (e.buff.has($buffEnum.EBuffId.PALSY)) {
            t.critRate = 1;
        }
        var i = Math.random() < t.critRate;
        if (i) {
            n *= 1 + t.critHurt;
        }
        n += t.extraDamage;
        n = Math.floor(n);
        return {
            attacker: t.attacker,
            damage: n,
            isCrit: i,
            hurtSource: t.hurtSourceType,
            skillId: t.option.skillId
        };
    };
    t.prototype.otherHurt = function (t, e, n) {
        if (n && t && !n.isDead()) {
            return {
                attacker: e,
                damage: (t = Math.floor(t)),
                isCrit: !1,
                hurtSource: $battleEnum.EHurtSourceType.OTHER
            };
        } else {
            return null;
        }
    };
    t._instance = null;
    return t;
})();
exports.default = r;
