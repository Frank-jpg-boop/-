import $battleEnum from './BattleEnum';
import $buffEnum from './BuffEnum';
t._instance = null;
t.prototype.otherHurt = function (t, e, n) {
  if (n && t && !n.isDead()) {
    return {
      attacker: e,
      damage: (t = Math.floor(t)),
      isCrit: !1,
      hurtSource: $battleEnum.EHurtSourceType.OTHER,
    };
  } else {
    return null;
  }
};
t.prototype.skillHurt = function (t, e) {
  if (!e || !t || e.isDead()) {
    return null;
  }
  const n = t.baseValue * t.rate;
  if (e.buff.has($buffEnum.EBuffId.PALSY)) {
    t.critRate = 1;
  }
  const i = Math.random() < t.critRate;
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
    skillId: t.option.skillId,
  };
};
Object.defineProperty(t, "instance", {
  get: function () {
    if (null == t._instance) {
      t._instance = new t();
    }
    return t._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {}
const r = t;
exports.default = r;
