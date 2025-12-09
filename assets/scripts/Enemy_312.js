import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
import $enemyBase from './EnemyBase';
let i;
const l = cc._decorator;
const u = l.ccclass;
const p =
  (l.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._isTurnHead = !1;
      return e;
    }
    e.prototype.onInit = function () {
      this._isTurnHead = !1;
      t.prototype.onInit.call(this);
    };
    e.prototype.playAnimSkill = function (t) {
      const e = this;
      this._spCtrl.playAnim('diaotou', 1, !1, function () {
        e.turnHead();
        if (t) {
          t();
        }
      });
    };
    e.prototype.turnHead = function () {
      this._isTurnHead = !0;
      this._standAnimName = 'stand_diaotou';
      this._atkAnimName = 'atk_diaotou';
      this._moveAnimName = 'move_diaotou';
      this.getAttribute($attrEnum.E_AttrType.SPEED).changeAddValue(Number(this._cfg.val2));
    };
    e.prototype.onBeHurt = function (e) {
      t.prototype.onBeHurt.call(this, e);
      if (!(this._hp <= 0)) {
        const n = this.getAttribute($attrEnum.E_AttrType.HP).value;
        if (!this._isTurnHead && this._hp / n <= Number(this._cfg.val1)) {
          this.changeState($actorEnum.EActorStateType.SKILL);
        }
      }
    };
  })($enemyBase.default));
export default p;
