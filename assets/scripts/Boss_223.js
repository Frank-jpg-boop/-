import $audioUtil from './AudioUtil';
import $eventManager from './EventManager';
import $basicsProxy from './BasicsProxy';
import $battleMgr from './BattleMgr';
import $actorEnum from './ActorEnum';
import $battleEnum from './BattleEnum';
import $enemyRefreshMgr from './EnemyRefreshMgr';
import $door from './Door';
import $actorBase from './ActorBase';
import $actorMgr from './ActorMgr';
import $enemyBase from './EnemyBase';
let i;
const _ = cc._decorator;
const g = _.ccclass;
const v =
  (_.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._sound = null;
      e._isShowBossTag = !1;
      return e;
    }
    e.prototype.onLoad = function () {
      t.prototype.onLoad.call(this);
      this._sound = this.node.getComponent(cc.AudioSource);
    };
    e.prototype.initType = function () {
      this._actorType = $actorEnum.EActorType.BOSS;
    };
    e.prototype.playAnimAttack = function (t, e, n) {
      const i = !1;
      if (n) {
        const o = n.getComponent($door.default);
        if (o && o.state != $door.EDoorState.DESTROY) {
          i = !0;
        }
      }
      this._spCtrl.playAnim(
        i ? 'atk2' : 'atk1',
        1,
        !1,
        function () {
          if (e) {
            e();
          }
        },
        function (e, n) {
          if (t) {
            t(n);
          }
        },
      );
    };
    e.prototype.attackHit = function (t) {
      $audioUtil.AudioUtil.playEffect('sounds/lmtw_yx_TriangleHeadAtk');
      if (t && t.isValid) {
        const e = t.getComponent($door.default);
        if (e && e.state != $door.EDoorState.DESTROY) {
          e.beHurt(e.hp);
        } else {
          const n = t.getComponent($actorBase.default);
          if (n) {
            n.beHurt(this.getHurt());
          }
        }
      }
    };
    e.prototype.onUpdate = function (e) {
      t.prototype.onUpdate.call(this, e);
      const n = $actorMgr.default.instance.getActor(
        $battleMgr.default.instance.getCurScene().playerId,
      );
      if (0 != $basicsProxy.basicsProxy.effectVolume && this._isTrigger && n && !n.isDead()) {
        const i = Math.max(0, 1 - this.node.position.sub(n.node.position).mag() / 1e3);
        i = Math.min(1, i);
        this._sound.volume = i;
      } else {
        this._sound.volume = 0;
      }
      if (!this._isShowBossTag && this._isTrigger) {
        const o = this.node.convertToWorldSpaceAR(cc.v2());
        if ($battleMgr.default.instance.isScreenOut(o, 60, 100)) {
          //
        } else {
          this._isShowBossTag = !0;
          $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.LOOKAT_BOSS, o);
        }
      }
    };
    e.prototype.onBeforeHurt = function (e) {
      t.prototype.onBeforeHurt.call(this, e);
      const n = Number(this._cfg.val1);
      if (e.damage > n) {
        e.damage = n;
      }
    };
    e.prototype.onBossTrigger = function () {
      const e = $enemyRefreshMgr.EnemyRefreshMgr.instance.randomRefreshPoint();
      this.setPos(e.pos);
      t.prototype.onBossTrigger.call(this);
    };
  })($enemyBase.default));
export default v;
