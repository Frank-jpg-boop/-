import $stateMachine from './StateMachine';
import $actorEnum from './ActorEnum';
import $actorBase from './ActorBase';
import $enemyItem_Dead from './EnemyItem_Dead';
import $enemyItem_Idle from './EnemyItem_Idle';
let i;
const p = cc._decorator;
const h = p.ccclass;
const f =
  (p.property,
  (function (t) {
    function e() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    e.prototype.initType = function () {
      this._actorType = $actorEnum.EActorType.ENEMY;
    };
    e.prototype.registerState = function () {
      this._sm = new $stateMachine.StateMachine();
      this._sm.addState(
        $actorEnum.EActorStateType.IDLE,
        new $enemyItem_Idle.EnemyItem_Idle(this),
      );
      this._sm.addState(
        $actorEnum.EActorStateType.DEAD,
        new $enemyItem_Dead.EnemyItem_Dead(this),
      );
    };
    e.prototype.playAnimIdle = function () {};
    e.prototype.fadeIn = function (t, e) {
      if (void 0 === t) {
        t = 0.3;
      }
      this.node.opacity = 0;
      cc.tween(this.node)
        .to(t, {
          opacity: 255,
        })
        .call(function () {
          if (e) {
            e();
          }
        })
        .start();
    };
    e.prototype.fadeOut = function (t, e) {
      if (void 0 === t) {
        t = 0.3;
      }
      cc.tween(this.node)
        .to(t, {
          opacity: 0,
        })
        .call(function () {
          if (e) {
            e();
          }
        })
        .start();
    };
  })($actorBase.default));
exports.default = f;
