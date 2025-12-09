import $actorEnum from './ActorEnum';
import $enemyBase from './EnemyBase';
import $enemy_211_Atk from './Enemy_211_Atk';
let i;
const l = cc._decorator;
const u = l.ccclass;
const p =
  (l.property,
  (function (t) {
    function e() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    Object.defineProperty(e.prototype, 'spCtrl', {
      get: function () {
        return this._spCtrl;
      },
      enumerable: !1,
      configurable: !0,
    });
    e.prototype.initAnim = function () {
      this._atkAnimName = 'atk1';
      return t.prototype.initAnim.call(this);
    };
    e.prototype.registerState = function () {
      t.prototype.registerState.call(this);
      this._sm.addState($actorEnum.EActorStateType.ATTACK, new $enemy_211_Atk.Enemy_211_Atk(this));
    };
    e.prototype.enterAttackCd = function () {
      this._attackCD = this._cfg.arkWait;
    };
  })($enemyBase.default));
export default p;
