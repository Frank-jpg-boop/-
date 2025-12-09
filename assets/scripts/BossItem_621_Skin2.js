import $randomUtil from './RandomUtil';
import $nodeUtil from './NodeUtil';
import $battleMgr from './BattleMgr';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
import $battleEnum from './BattleEnum';
import $actorMgr from './ActorMgr';
import $enemyItemBase from './EnemyItemBase';
let i;
const m = cc._decorator;
const y = m.ccclass;
const _ =
  (m.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._nShootIcon = null;
      e._nFlyIcon = null;
      e._nBody = null;
      e._isShooted = !1;
      e._isWaitReady = !1;
      e._atkCollisionIds = [];
      return e;
    }
    e.prototype.onEnable = function () {
      this.node.opacity = 0;
    };
    e.prototype.onLoad = function () {
      t.prototype.onLoad.call(this);
      this._nBody = this.node.getChildByName('Body');
      this._nShootIcon = this._nBody.getChildByName('ShootIcon');
      this._nFlyIcon = this._nBody.getChildByName('FlyIcon');
      this._nShootIcon.active = !0;
      this._nFlyIcon.active = !1;
    };
    e.prototype.initAttribute = function () {
      t.prototype.initAttribute.call(this);
      this._actorAttribute.init($attrEnum.E_AttrType);
      this._actorAttribute.getNumeric($attrEnum.E_AttrType.ATK).setFixBase(this._initParam.atk);
      this._actorAttribute.getNumeric($attrEnum.E_AttrType.HP).setFixBase(this._initParam.maxHp);
    };
    e.prototype.playShowAnim = function () {
      const t = this;
      this._nBody.angle = this._initParam.initAngle;
      return new Promise(function (e) {
        t.fadeIn(0.3, function () {
          e();
        });
      });
    };
    e.prototype.onInit = function () {
      this._isWaitReady = !0;
      t.prototype.onInit.call(this);
    };
    e.prototype.shoot = function () {
      const t = this;
      this._isWaitReady = !1;
      this._hurtCollider.node.width = this._nShootIcon.width;
      this._hurtCollider.node.height = this._nShootIcon.height;
      this._hurtCollider.node.angle = this._nBody.angle;
      const e = this.node.getPosition();
      const n = (this._nBody.angle * Math.PI) / 180;
      const i = cc.v2(Math.cos(n), Math.sin(n)).mul(-1);
      const o = e.add(i.mul(100));
      cc.tween(this.node)
        .to(
          0.3,
          {
            x: o.x,
            y: o.y,
          },
          {
            easing: 'sineOut',
          },
        )
        .call(function () {
          const n = $battleMgr.default.instance.getCurScene();
          e = $nodeUtil.default.nodeParentChangeLocalPos(t.node, n.bulletParent);
          t.node.parent = n.bulletParent;
          t.node.setPosition(e);
          const i = $actorMgr.default.instance.getActor(n.playerId);
          const o = i.node.getPosition();
          if (i.moveDir) {
            o.addSelf(i.moveDir.mul((0.5 * i.getAttribute($attrEnum.E_AttrType.SPEED).value) / 60));
          }
          const r = o.sub(e);
          const a = r.normalize();
          const l = (180 * Math.atan2(a.y, a.x)) / Math.PI;
          t._nBody.angle = l;
          t._hurtCollider.node.angle = l;
          const u = e.add(a.mul(r.len() + 300));
          cc.tween(t.node)
            .to(
              0.5,
              {
                x: u.x,
                y: u.y,
              },
              {
                easing: 'sineOut',
                onUpdate: function () {
                  t.updateUnifyPos();
                  t.updateAreaKey();
                },
              },
            )
            .delay(0.3)
            .call(function () {
              t.fly();
            })
            .start();
        })
        .start();
    };
    e.prototype.fly = function () {
      const t = this;
      this._isShooted = !0;
      this._nBody.angle = 0;
      this._hurtCollider.node.angle = 0;
      this._nShootIcon.active = !1;
      this._nFlyIcon.active = !0;
      this._hurtCollider.node.width = this._nFlyIcon.width;
      this._hurtCollider.node.height = this._nFlyIcon.height;
      const e = $randomUtil.RandomUtil.randomInt(30, 50);
      cc.tween(this.node)
        .by(0.3, {
          x: e,
        })
        .by(0.3, {
          x: -e,
        })
        .by(0.3, {
          x: -e,
        })
        .by(0.3, {
          x: e,
        })
        .union()
        .repeatForever()
        .start();
      const n = $randomUtil.RandomUtil.randomInt(300, 500);
      cc.tween(this.node)
        .by(
          2,
          {
            y: n,
          },
          {
            easing: 'sineOut',
          },
        )
        .call(function () {
          cc.Tween.stopAllByTarget(t.node);
          t.changeState($actorEnum.EActorStateType.DEAD);
        })
        .start();
    };
    e.prototype.onUpdate = function (e) {
      t.prototype.onUpdate.call(this, e);
      if (this._isWaitReady) {
        const n = $battleMgr.default.instance.getCurScene();
        const i = $actorMgr.default.instance.getActor(n.playerId).node.getPosition();
        const o = $nodeUtil.default.nodeParentChangeLocalPos(this.node, n.bulletParent);
        const r = i.sub(o).normalize();
        this._nBody.angle = (180 * Math.atan2(r.y, r.x)) / Math.PI;
      } else {
        if ($battleMgr.default.instance.isSceneOut(this.node.getPosition())) {
          this.changeState($actorEnum.EActorStateType.DEAD);
        } else {
          this.updateUnifyPos();
          this.updateAreaKey();
          this.checkHurt();
        }
      }
    };
    e.prototype.checkHurt = function () {
      const t = this;
      if (this.isDead()) {
        //
      } else {
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
                  e.hurtColliderRect,
                  t.hurtColliderRect,
                )
              ) {
                -1 == n && (e.beHurt(t.getHurt()), t._atkCollisionIds.push(e.unitId));
              } else {
                -1 != n && t._atkCollisionIds.splice(n, 1);
              }
            }
          });
      }
    };
    e.prototype.getHurt = function () {
      const t = this.getAttribute($attrEnum.E_AttrType.ATK).value;
      const e = Math.random() < this.getAttribute($attrEnum.E_AttrType.CRIT_RATE).value;
      if (e) {
        t *= this.getAttribute($attrEnum.E_AttrType.CRIT_HURT).value;
      }
      return {
        damage: t,
        isCrit: e,
        attacker: this,
        hurtSource: $battleEnum.EHurtSourceType.COMMON_ATTACK,
      };
    };
    e.prototype.canBeSearch = function () {
      return this._isShooted && t.prototype.canBeSearch.call(this);
    };
    e.prototype.canBeHurt = function () {
      return this._isShooted && t.prototype.canBeHurt.call(this);
    };
  })($enemyItemBase.default));
export default _;
