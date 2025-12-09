import $eventManager from './EventManager';
import $randomUtil from './RandomUtil';
import $battleMgr from './BattleMgr';
import $bulletMgr from './BulletMgr';
import $commonEnemyBullet from './CommonEnemyBullet';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $effectMgr from './EffectMgr';
import $spAnimEffect from './SpAnimEffect';
import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
import $battleEnum from './BattleEnum';
import $door from './Door';
import $unitMgr from './UnitMgr';
import $actorBase from './ActorBase';
import $actorMgr from './ActorMgr';
import $enemyBase from './EnemyBase';
import $boss_421_Atk from './Boss_421_Atk';
let i;
const P = cc._decorator;
const A = P.ccclass;
const w =
  (P.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e.attackMovePos = null;
      e._isShowBossTag = !1;
      return e;
    }
    Object.defineProperty(e.prototype, 'spAnimCtrl', {
      get: function () {
        return this._spCtrl;
      },
      enumerable: !1,
      configurable: !0,
    });
    e.prototype.initType = function () {
      this._actorType = $actorEnum.EActorType.BOSS;
    };
    e.prototype.registerState = function () {
      t.prototype.registerState.call(this);
      this._sm.addState($actorEnum.EActorStateType.ATTACK, new $boss_421_Atk.Boss_421_Atk(this));
    };
    e.prototype.canReleaseSkillTarget = function (e) {
      if (t.prototype.canAttackTarget.call(this, e)) {
        const n = $battleMgr.default.instance.getCurScene();
        this.updatePathData();
        if (e.pathPos.x == this.pathPos.x) {
          const i = cc.v2(0, e.pathPos.y > this.pathPos.y ? 1 : -1);
          const o = null;
          if ('' != this._pathPointId) {
            o = n.level.path.getPoint(this._pathPointId).getDirLine(i);
          } else {
            if ('' != this._pathLineId) {
              o = this._pathLineId;
            }
          }
          if (!o) {
            return !1;
          }
          if ((s = n.level.path.getLine(o)).dir.equals(i)) {
            //
          } else {
            s = n.level.path.getLine(s.reverseLineId);
          }
          if (!s) {
            return !1;
          }
          const r = s.dir;
          const a = this.pathPos.add(r.mul(3e3));
          if (s.isPosInLineSegment(a)) {
            //
          } else {
            a = s.endPos;
          }
          this.attackMovePos = a;
          return !0;
        }
        if (e.pathPos.y == this.pathPos.y) {
          let s;
          i = cc.v2(e.pathPos.x > this.pathPos.x ? 1 : -1, 0);
          o = null;
          if ('' != this._pathPointId) {
            o = n.level.path.getPoint(this._pathPointId).getDirLine(i);
          } else {
            if ('' != this._pathLineId) {
              o = this._pathLineId;
            }
          }
          if (!o) {
            return !1;
          }
          if ((s = n.level.path.getLine(o)).dir.equals(i)) {
            //
          } else {
            s = n.level.path.getLine(s.reverseLineId);
          }
          if (!s) {
            return !1;
          }
          r = s.dir;
          const l = this.pathPos.add(r.mul(3e3));
          for (a = l.clone(); s && !s.isPosInLineSegment(l); ) {
            if (null == (o = s.endPoint.getDirLine(r))) {
              a = s.endPos;
              break;
            }
            s = n.level.path.getLine(o);
          }
          const u = this.findMoveDoor(this.pathPos.x, a.x, this.pathPos.y, r.x);
          if (u) {
            a.x = u.node.x;
          }
          if (a.x >= n.level.node.width / 2) {
            a.x = n.level.node.width / 2;
          }
          if (a.x <= -n.level.node.width / 2) {
            a.x = -n.level.node.width / 2;
          }
          this.attackMovePos = a;
          return !0;
        }
        return !1;
      }
      return !1;
    };
    e.prototype.enterAttackCd = function () {
      this._attackCD = this._cfg.arkWait;
    };
    e.prototype.findMoveDoor = function (t, e, n, i) {
      for (
        const o = 0,
          r = $unitMgr.UnitMgr.instance.queryUnit($gridAreaDivisionMgr.E_AreaObjectType.DOOR);
        o < r.length;
        o++
      ) {
        const a = r[o];
        if (a.state == $door.EDoorState.CLOSE && Math.abs(a.node.y - n) < 20) {
          if (i > 0 && a.node.x >= t && a.node.x <= e) {
            return a;
          }
          if (i < 0 && a.node.x <= t && a.node.x >= e) {
            return a;
          }
        }
      }
      return null;
    };
    e.prototype.onUpdate = function (e) {
      t.prototype.onUpdate.call(this, e);
      if (!this._isShowBossTag && this._isTrigger) {
        const n = this.node.convertToWorldSpaceAR(cc.v2());
        if ($battleMgr.default.instance.isScreenOut(n, 60, 100)) {
          //
        } else {
          this._isShowBossTag = !0;
          this.changeState($actorEnum.EActorStateType.IDLE);
          this.enterAttackCd();
          $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.LOOKAT_BOSS, n);
        }
      }
    };
    e.prototype.attackHit = function (t) {
      for (const e = this, n = [], i = 1; i < arguments.length; i++) {
        n[i - 1] = arguments[i];
      }
      if (t && t.isValid) {
        const o = t.getComponent($door.default);
        if (o && o.state != $door.EDoorState.DESTROY) {
          o.beHurt(this.getAttribute($attrEnum.E_AttrType.ATK).value);
        } else {
          const r = t.getComponent($actorBase.default);
          if (r) {
            for (
              const a = r.getBeHurtPos(),
                p = Number(this._cfg.val3),
                d = function () {
                  const t = a.clone();
                  t.x += $randomUtil.RandomUtil.randomInt(-100, 100);
                  $bulletMgr.default.instance.createBullet({
                    parent: $battleMgr.default.instance.getCurScene().bulletParent,
                    prefabName: 'CommonEnemyBullet',
                    initPos: y.shootPos,
                    iconPath:
                      'textures/bullet/BOSS421_zidan' + $randomUtil.RandomUtil.randomInt(1, 4),
                    bulletClass: $commonEnemyBullet.default,
                    onCreated: function (n) {
                      n.shoot(e, t, {
                        bulletType: 3,
                        bezierHeight: $randomUtil.RandomUtil.randomInt(200, 300),
                        time: 0.5,
                        onRemove: function (t) {
                          if ('' != e._cfg.hitAni) {
                            const n = $battleMgr.default.instance.getCurScene();
                            $effectMgr.default.instance.createEffect({
                              parent: n.effectParent,
                              prefabName: e._cfg.hitAni,
                              initPos: t,
                              effectClass: $spAnimEffect.default,
                              onCreated: function (t) {
                                t.playOnceAllAnim();
                              },
                            });
                          }
                        },
                      });
                    },
                  });
                },
                y = this,
                g = 0;
              g < p;
              ++g
            ) {
              d();
            }
          }
        }
      }
    };
    e.prototype.onBossTrigger = function () {
      const e = $battleMgr.default.instance.getCurScene().level.getRoomById(451);
      if (e) {
        const n = cc.v2(e.node.x + e.node.width / 2, e.getGroundY());
        n.x += $randomUtil.RandomUtil.randomInt(-200, 200);
        this.updateRoomId(451);
        this.setPos(n);
        this.enterAttackCd();
        t.prototype.onBossTrigger.call(this);
      }
    };
    e.prototype.searchTarget = function () {
      for (
        const t = $actorMgr.default.instance.queryActorByCamp($actorEnum.ETeamType.PLAYER),
          e = this.node.getPosition(),
          n = $battleMgr.default.instance.getCurScene(),
          i = Number.MAX_VALUE,
          o = null,
          r = 0;
        r < t.length;
        r++
      ) {
        const a = t[r];
        const s = n.level.getRoomById(a.roomId);
        if (!s) {
          return null;
        }
        const l = n.level.getRoomById(this.roomId);
        if (!l) {
          return null;
        }
        if (!a.isDead() && a.canBeSearch() && s.layer == l.layer) {
          const u = cc.Vec2.squaredDistance(a.node.getPosition(), e);
          if (null == o || u < i) {
            i = u;
            o = a;
          }
        }
      }
      return o;
    };
  })($enemyBase.default));
export default w;
