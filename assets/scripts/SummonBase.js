import $mathUtil from './MathUtil';
import $battleMgr from './BattleMgr';
import $stateMachine from './StateMachine';
import $actorEnum from './ActorEnum';
import $actorBase from './ActorBase';
import $summonAttackState from './SummonAttackState';
import $summonDeadState from './SummonDeadState';
import $summonIdleState from './SummonIdleState';
import $summonWalkState from './SummonWalkState';
let i;
const m = cc._decorator;
const y = m.ccclass;
const _ =
  (m.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e.moveDir = null;
      return e;
    }
    e.prototype.onInit = function () {
      this._pathPos = this.node.getPosition();
      t.prototype.onInit.call(this);
    };
    e.prototype.registerState = function () {
      this._sm = new $stateMachine.StateMachine(new $summonIdleState.SummonIdleState(this));
      this._sm.addState(
        $actorEnum.EActorStateType.WALK,
        new $summonWalkState.SummonWalkState(this),
      );
      this._sm.addState(
        $actorEnum.EActorStateType.ATTACK,
        new $summonAttackState.SummonAttackState(this),
      );
      this._sm.addState(
        $actorEnum.EActorStateType.DEAD,
        new $summonDeadState.SummonDeadState(this),
      );
    };
    e.prototype.playAnimIdle = function () {};
    e.prototype.playAnimWalk = function () {};
    e.prototype.playAnimAttack = function (t, e) {
      if (t) {
        t();
      }
      if (e) {
        e();
      }
    };
    e.prototype.playAnimDie = function (t) {
      if (t) {
        t();
      }
    };
    e.prototype.attackHit = function (t) {
      if (t && t.isValid) {
        this.onAttackHit(t);
      }
    };
    e.prototype.onAttackHit = function () {};
    e.prototype.checkAttackTargetValid = function (t) {
      return !(!t || !t.isValid || t.isDead());
    };
    e.prototype.updatePathData = function () {
      for (
        const t = $mathUtil.MathUtil.vec2Fixed(this._pathPos),
          e = $battleMgr.default.instance.getCurScene().level.path;
        ;
      ) {
        const n = e.findPathPointByPos(t);
        if ('' != n) {
          this._pathPointId = n;
          this._pathLineId = '';
          break;
        }
        const i = e.findPathLineByPos(t);
        if ('' != i) {
          this._pathLineId = i;
          this._pathPointId = '';
          break;
        }
        if ('' == i && '' == n) {
          console.error('pathLineId == "" && pathPointId == ""');
        }
        break;
      }
      this.updateRoomId();
    };
  })($actorBase.default));
export default _;
