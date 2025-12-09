import $randomUtil from './RandomUtil';
import $battleMgr from './BattleMgr';
import $actorEnum from './ActorEnum';
import $actorMgr from './ActorMgr';
import $enemyBase from './EnemyBase';
import $enemy_412_Walk from './Enemy_412_Walk';
let i;
const h = cc._decorator;
const f = h.ccclass;
const d =
  (h.property,
  (function (t) {
    function e() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    e.prototype.registerState = function () {
      t.prototype.registerState.call(this);
      this._sm.addState($actorEnum.EActorStateType.WALK, new $enemy_412_Walk.Enemy_412_Walk(this));
    };
    e.prototype.initAnim = function () {
      this._atkAnimName = 'call';
      return t.prototype.initAnim.call(this);
    };
    e.prototype.canAttackTarget = function (t) {
      if (!t || t.isDead()) {
        return !1;
      }
      const e = cc.Vec2.squaredDistance(t.node.getPosition(), this.node.getPosition());
      const n = Number(this._cfg.val1) * Number(this._cfg.val1);
      const i = Number(this._cfg.val2) * Number(this._cfg.val2);
      return e >= n && e <= i;
    };
    e.prototype.attackHit = function (t) {
      for (const e = [], n = 1; n < arguments.length; n++) {
        e[n - 1] = arguments[n];
      }
      this.summon();
    };
    e.prototype.summon = function () {
      const t = $battleMgr.default.instance.getCurScene();
      if (t) {
        const e = this._cfg.val3.split('|').map(Number);
        const n = e[$randomUtil.RandomUtil.randomInt(0, e.length)];
        const i = this.pathPos;
        this.updatePathData();
        if ('' != this._pathLineId) {
          const o = t.level.path.getLine(this.pathLineId);
          if (0 != o.dir.x) {
            const r = $randomUtil.RandomUtil.randomInt(-50, 50);
            i.x += r;
            if (i.x >= o.maxX) {
              i.x = o.maxX - $randomUtil.RandomUtil.randomInt(0, 50);
            }
            if (i.x <= o.minX) {
              i.x = o.minX + $randomUtil.RandomUtil.randomInt(0, 50);
            }
          }
        }
        $actorMgr.default.instance.createActor({
          id: t.getCreateActorId(),
          cfgId: n,
          camp: $actorEnum.ETeamType.ENEMY,
          parent: t.actorParent,
          prefabName: 'Enemy_' + n,
          initPos: i,
          actorClass: $actorMgr.default.instance.getActorClassName(n, $actorEnum.ETeamType.ENEMY),
          onCreated: null,
          initParam: {
            rewardMap: new Map(),
            lv: this._initParam.lv,
            showAnim: function (t, e) {
              t.node.opacity = 0;
              cc.tween(t.node)
                .to(
                  0.3,
                  {
                    opacity: 255,
                  },
                  {
                    easing: 'sineIn',
                  },
                )
                .call(function () {
                  if (e) {
                    e();
                  }
                })
                .start();
            },
          },
        });
      }
    };
  })($enemyBase.default));
export default d;
