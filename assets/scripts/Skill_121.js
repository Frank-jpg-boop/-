import $cfg from './Cfg';
import $eventManager from './EventManager';
import $effectMgr from './EffectMgr';
import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
import $battleEnum from './BattleEnum';
import $weapon121Shield from './Weapon121Shield';
let i;
exports.Skill_121 = void 0;
e.prototype.onRemove = function () {
  $eventManager.EventManager.instance.off(
    $actorEnum.EActorEvent.BEFORE_BE_HURT + this._owner.unitId,
    this.onOwnerBeforeBeHurt,
    this,
  );
  t.prototype.onRemove.call(this);
};
e.prototype.onSelectSkillEx = function (t) {
  const e = $cfg.default.instance.dataChoose.getById(t);
  if (11 == e.type && 5 === Number(e.val1) && this._effect) {
    this._owner
      .getAttribute($attrEnum.E_AttrType.CRIT_RATE)
      .changeAddValue(Number(e.val2));
  }
};
e.prototype.getShieldMax = function () {
  const t =
    this._owner.getAttribute($attrEnum.E_AttrType.HP).value *
    this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value;
  return Math.floor(t);
};
e.prototype.onOwnerBeforeBeHurt = function (t) {
  if (this._shield > 0) {
    if (this._shield >= t.damage) {
      ((this._shield -= t.damage), (t.damage = 0));
    } else {
      ((t.damage -= this._shield), (this._shield = 0));
    }
    if (this._shield <= 0) {
      this._effect.remove();
      this._effect = null;
    }
  }
  const e = this.getShieldMax();
  this._owner.head.updateShield(this._shield, e);
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
      skillId: this._cfg.id,
    },
  };
};
e.prototype.addShield = function () {
  const t = this;
  const e = this.getShieldMax();
  if (!(this._shield >= e)) {
    const n = Math.floor(
      this._owner.getAttribute($attrEnum.E_AttrType.HP).value *
        this.getAttribute($attrEnum.E_SkillAttrType.CORE_ATTR_RATE).value,
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
        },
      });
    }
  }
};
e.prototype.onUpdate = function (t) {
  if (this.skillCD > 0) {
    this.skillCD -= t;
    return void (this.skillCD <= 0 && (this.skillCD = 0));
  }
  this.addShield();
};
e.prototype.onInit = function () {
  $eventManager.EventManager.instance.on(
    $actorEnum.EActorEvent.BEFORE_BE_HURT + this._owner.unitId,
    this.onOwnerBeforeBeHurt,
    this,
  );
  this._shield = 0;
  t.prototype.onInit.call(this);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e._shield = 0;
  e._effect = null;
  return e;
}
const h = e;
exports.Skill_121 = h;
