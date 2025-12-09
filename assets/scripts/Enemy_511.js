import $attrEnum from './AttrEnum';
import $battleEnum from './BattleEnum';
import $enemyBase from './EnemyBase';
let i;
const l = cc._decorator;
const u = l.ccclass;
const p =
  (l.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._isAttackSkill = !1;
      return e;
    }
    e.prototype.playAnimAttack = function (t, e) {
      const n = this;
      this._isAttackSkill = Math.random() < Number(this._cfg.val1);
      this._spCtrl.playAnim(
        this._isAttackSkill ? "skill" : "atk",
        1,
        !1,
        function () {
          n._attackCD = n._cfg.arkWait;
          n._isAttackSkill = !1;
          if (e) {
            e();
          }
        },
        function () {
          if (t) {
            t();
          }
        },
      );
    };
    e.prototype.getHurt = function () {
      const t = this.getAttribute($attrEnum.E_AttrType.ATK).value;
      const e =
        Math.random() < this.getAttribute($attrEnum.E_AttrType.CRIT_RATE).value;
      if (e) {
        t *= this.getAttribute($attrEnum.E_AttrType.CRIT_HURT).value;
      }
      if (this._isAttackSkill) {
        t *= Number(this._cfg.val2);
      }
      return {
        damage: (t = Math.floor(t)),
        isCrit: e,
        attacker: this,
        hurtSource: $battleEnum.EHurtSourceType.COMMON_ATTACK,
        isNotInvincible: this._isAttackSkill,
      };
    };
  })($enemyBase.default));
exports.default = p;
