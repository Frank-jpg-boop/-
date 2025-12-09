import $audioUtil from './AudioUtil';
import $eventManager from './EventManager';
import $randomUtil from './RandomUtil';
import $battleMgr from './BattleMgr';
import $stateMachine from './StateMachine';
import $simplyRectCollider from './SimplyRectCollider';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $actorEnum from './ActorEnum';
import $battleEnum from './BattleEnum';
import $actorMgr from './ActorMgr';
import $enemyBase from './EnemyBase';
import $boss_321_Atk from './Boss_321_Atk';
import $boss_321_die from './Boss_321_die';
import $boss_321_Idle from './Boss_321_Idle';
import $boss_321_IdleEx from './Boss_321_IdleEx';
let i;
const E = cc._decorator;
const S = E.ccclass;
const P =
  (E.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._isFake = !1;
      e._waitTime = 0;
      e._atkCollisionIds = [];
      e._atkCollider = null;
      e._isFade = !1;
      e._isShow = !1;
      return e;
    }
    Object.defineProperty(e.prototype, "isFake", {
      get: function () {
        return this._isFake;
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, "waitTime", {
      get: function () {
        return this._waitTime;
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, "cfg", {
      get: function () {
        return this._cfg;
      },
      enumerable: !1,
      configurable: !0,
    });
    e.prototype.onLoad = function () {
      t.prototype.onLoad.call(this);
      this._nTagParent = cc.find(
        "Body/Anim/ATTACHED_NODE_TREE/ATTACHED_NODE:root/ATTACHED_NODE:bone/Tag",
        this.node,
      );
      this._atkCollider = cc
        .find(
          "Body/Anim/ATTACHED_NODE_TREE/ATTACHED_NODE:root/ATTACHED_NODE:bone/AtkCollider",
          this.node,
        )
        .getComponent($simplyRectCollider.default);
    };
    e.prototype.registerState = function () {
      this._sm = new $stateMachine.StateMachine(
        new $boss_321_Idle.Boss_321_Idle(this),
      );
      this._sm.addState(
        $actorEnum.EActorStateType.ATTACK,
        new $boss_321_Atk.Boss_321_Atk(this),
      );
      this._sm.addState(
        $actorEnum.EActorStateType.DEAD,
        new $boss_321_die.Boss_321_Die(this),
      );
      this._sm.addState(
        $actorEnum.EActorStateType.EXTEND_1,
        new $boss_321_IdleEx.Boss_321_IdleEx(this),
      );
    };
    e.prototype.initHead = function () {};
    e.prototype.initType = function () {
      this._actorType = $actorEnum.EActorType.BOSS;
    };
    e.prototype.setDirX = function (e) {
      t.prototype.setDirX.call(this, e);
      if (e) {
        this._nTagParent.scaleX = -1;
      } else {
        this._nTagParent.scaleX = 1;
      }
    };
    e.prototype.onInit = function () {
      t.prototype.onInit.call(this);
      this._isShow = !1;
      this._waitTime = Number(this._cfg.val2);
      this._isFake = !!this._initParam.isFake;
      this._nTagParent.active = !this._isFake;
      this._isRealBoss = !this._isFake;
      this._isFade = !1;
      this._isTrigger = this._isFake;
      if (this._isFake) {
        this._rewardMap.clear();
      }
      this.setDirX(!0);
    };
    e.prototype.fadeIn = function (t) {
      const e = this;
      this.node.opacity = 0;
      this._isFade = !0;
      cc.tween(this.node)
        .to(0.3, {
          opacity: 255,
        })
        .call(function () {
          e._isFade = !1;
          if (t) {
            t();
          }
        })
        .start();
    };
    e.prototype.fadeOut = function (t) {
      const e = this;
      this._isFade = !0;
      cc.tween(this.node)
        .to(0.3, {
          opacity: 0,
        })
        .call(function () {
          e._isFade = !1;
          if (t) {
            t();
          }
        })
        .start();
    };
    e.prototype.playAnimIdleEx = function () {
      this._spCtrl.playAnim("stand_fall", 1, !0);
    };
    e.prototype.canBeSearch = function () {
      return (
        t.prototype.canBeSearch.call(this) &&
        this.curState == $actorEnum.EActorStateType.EXTEND_1
      );
    };
    e.prototype.canBeHurt = function () {
      return (
        t.prototype.canBeHurt.call(this) &&
        this.curState == $actorEnum.EActorStateType.EXTEND_1 &&
        !this._isFade
      );
    };
    e.prototype.playAnimAttackReady = function () {
      this._spCtrl.playAnim("ready", 1, !0);
    };
    e.prototype.plyerAnimSummom = function (t, e) {
      $audioUtil.AudioUtil.playLimitEffect("sounds/lmtw_yx_FanAtk");
      this._spCtrl.playAnim(
        this._isFake ? "atk" : "atk2",
        1,
        !1,
        function () {
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
    e.prototype.playAnimDie = function (t) {
      if (this._isFake) {
        if (t) {
          t();
        }
      } else {
        this._spCtrl.playAnim(this._dieAnimName, 1, !1, function () {
          if (t) {
            t();
          }
        });
      }
    };
    e.prototype.appear = function () {
      const t = this;
      this._waitTime = Number(this._cfg.val2);
      if (this._isFake) {
        this.fadeIn();
      } else {
        const e = $battleMgr.default.instance.getCurScene();
        if (e) {
          const n = $actorMgr.default.instance.getActor(e.playerId);
          const i = e.level.getRoomById(n.roomId);
          if (i) {
            this.updateRoomId(n.roomId);
            const o = e.level.getRoomsByLayer(i.layer).filter(function (t) {
              return t.cfg.isBase;
            });
            if (o.length > 0) {
              const r = [];
              const a = i.getGroundY();
              o.forEach(function (e) {
                for (const n = e.node.x + 100; n < e.node.x + e.node.width; ) {
                  r.push(cc.v2(n, a));
                  n += Number(t._cfg.val3);
                }
              });
              const s = $randomUtil.RandomUtil.randomInt(0, r.length);
              const u = r[s];
              r.splice(s, 1);
              this.setPos(u);
              this.fadeIn();
              r.forEach(function (e) {
                t.createFake(e);
              });
            }
          }
        }
      }
    };
    e.prototype.createFake = function (t) {
      const e = $battleMgr.default.instance.getCurScene();
      $actorMgr.default.instance.createActor({
        id: e.getCreateActorId(),
        cfgId: this._cfg.id,
        camp: $actorEnum.ETeamType.ENEMY,
        parent: e.actorParent,
        prefabName: "Boss_" + this._cfg.id,
        initPos: t,
        actorClass: $actorMgr.default.instance.getActorClassName(
          this._cfg.id,
          $actorEnum.ETeamType.ENEMY,
        ),
        onCreated: null,
        initParam: {
          rewardMap: new Map(),
          lv: this._initParam.lv,
          isFake: !0,
        },
      });
    };
    e.prototype.onUpdate = function (e) {
      t.prototype.onUpdate.call(this, e);
      if (this._isTrigger) {
        if (
          (this._waitTime > 0 &&
            this.curState == $actorEnum.EActorStateType.IDLE) ||
          this.curState == $actorEnum.EActorStateType.EXTEND_1
        ) {
          this._waitTime -= e;
          if (this._waitTime < 0) {
            this._waitTime = 0;
          }
        }
        this.checkHurt();
      }
    };
    e.prototype.checkHurt = function () {
      const t = this;
      if (this._isFade || this.curState == $actorEnum.EActorStateType.DEAD) {
        //
      } else {
        if (this.curState != $actorEnum.EActorStateType.EXTEND_1) {
          $actorMgr.default.instance
            .queryActorByCamp($actorEnum.ETeamType.PLAYER)
            .forEach(function (e) {
              const n = t._atkCollisionIds.indexOf(e.unitId);
              if (e.isDead()) {
                if (-1 != n) {
                  t._atkCollisionIds.splice(n, 1);
                }
              } else {
                if (
                  $simplyCollisionDetector.default.isCollisionRectToRect(
                    t._atkCollider.rect,
                    e.hurtColliderRect,
                  )
                ) {
                  -1 == n &&
                    (e.beHurt(t.getHurt()), t._atkCollisionIds.push(e.unitId));
                } else {
                  -1 != n && t._atkCollisionIds.splice(n, 1);
                }
              }
            });
        }
      }
    };
    e.prototype.onBossTrigger = function () {
      const e = this;
      this._waitTime = Number(this._cfg.val2);
      this.changeState($actorEnum.EActorStateType.IDLE);
      this.appear();
      this.scheduleOnce(function () {
        $eventManager.EventManager.instance.emit(
          $battleEnum.EBattleEvent.LOOKAT_BOSS,
          e.node.convertToWorldSpaceAR(cc.v2(0, 100)),
        );
      }, 0.2);
      if (this._flagEffect) {
        this._flagEffect.playDefaultAnim("loop", 1, !0);
      }
      this.updateAreaKey();
      t.prototype.onBossTrigger.call(this);
    };
    e.prototype.onDie = function () {
      const e = this;
      t.prototype.onDie.call(this);
      if (this._isFake) {
        //
      } else {
        $actorMgr.default.instance
          .queryActorByCamp($actorEnum.ETeamType.ENEMY)
          .forEach(function (t) {
            if (t.isDead()) {
              //
            } else {
              if (t.cfg.id == e._cfg.id && t.unitId != e._unitId) {
                t.changeState($actorEnum.EActorStateType.DEAD);
              }
            }
          });
      }
    };
  })($enemyBase.default));
exports.default = P;
