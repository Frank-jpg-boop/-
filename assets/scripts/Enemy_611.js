import $battleMgr from './BattleMgr';
import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
import $door from './Door';
import $actorBase from './ActorBase';
import $actorMgr from './ActorMgr';
import $enemyBase from './EnemyBase';
import $enemy_611_Atk from './Enemy_611_Atk';
let i;
const d = cc._decorator;
const m = d.ccclass;
const y =
  (d.property,
  (function (t) {
    function e() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    e.prototype.registerState = function () {
      t.prototype.registerState.call(this);
      this._sm.addState(
        $actorEnum.EActorStateType.ATTACK,
        new $enemy_611_Atk.Enemy_611_Atk(this),
      );
    };
    e.prototype.onEnable = function () {
      this.node.opacity = 0;
    };
    e.prototype.playShowAnim = function () {
      const t = this;
      return new Promise(function (e) {
        cc.tween(t.node)
          .to(0.3, {
            opacity: 255,
          })
          .call(function () {
            e();
          })
          .start();
      });
    };
    e.prototype.attackHit = function (t) {
      if (t && t.isValid) {
        const e = t.getComponent($door.default);
        if (e && e.state != $door.EDoorState.DESTROY) {
          e.beHurt(this.getAttribute($attrEnum.E_AttrType.ATK).value);
        } else {
          const n = t.getComponent($actorBase.default);
          if (n) {
            const i =
              cc.Vec2.squaredDistance(
                n.node.getPosition(),
                this.node.getPosition(),
              ) <=
              this._attackRange * this._attackRange;
            if (
              ((this.dirX > 0 && n.node.x >= this.node.x) ||
                (this.dirX < 0 && n.node.x <= this.node.x)) &&
              i
            ) {
              n.beHurt(this.getHurt());
            }
          }
        }
      }
    };
    e.prototype.summon = function (t) {
      const e = $battleMgr.default.instance.getCurScene();
      if (
        e &&
        (!this._initParam || !this._initParam.isSummon) &&
        t &&
        !t.getComponent($actorBase.default).isDead() &&
        !(
          this.curHp / this.getAttribute($attrEnum.E_AttrType.HP).value <=
          Number(this._cfg.val1) / 100
        )
      ) {
        const n = this.pathPos;
        const i = n.clone();
        this.updatePathData();
        if ("" == this._pathPointId) {
          const o = e.level.path.getLine(this._pathLineId);
          if (o) {
            if (0 != o.dir.x) {
              i.x += this.dirX * Math.abs(n.x - t.x) * 2;
            } else {
              0 != o.dir.y &&
                (i.y += (n.y > t.y ? -1 : 1) * Math.abs(n.y - t.y) * 2);
            }
            if ("" != e.level.path.findPathLineByPos(i)) {
              this.setHp(Math.floor(this._hp / 2));
              $actorMgr.default.instance.createActor({
                id: e.getCreateActorId(),
                cfgId: this._cfgId,
                camp: $actorEnum.ETeamType.ENEMY,
                parent: e.actorParent,
                prefabName: "Enemy_" + this._cfgId,
                initPos: i,
                actorClass: $actorMgr.default.instance.getActorClassName(
                  this._cfgId,
                  $actorEnum.ETeamType.ENEMY,
                ),
                onCreated: function (e) {
                  e.changeState($actorEnum.EActorStateType.ATTACK, t, !0);
                },
                initParam: {
                  rewardMap: new Map(),
                  lv: this._initParam.lv,
                  initHp: this._hp,
                  isNotReward: !0,
                  isSummon: !0,
                },
              });
            }
          }
        }
      }
    };
  })($enemyBase.default));
exports.default = y;
