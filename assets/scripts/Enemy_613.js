import $randomUtil from './RandomUtil';
import $battleMgr from './BattleMgr';
import $actorEnum from './ActorEnum';
import $actorMgr from './ActorMgr';
import $enemyBase from './EnemyBase';
let i;
const p = cc._decorator;
const h = p.ccclass;
const f =
  (p.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._isSummon = !1;
      return e;
    }
    e.prototype.playAnimAttack = function (t, e) {
      const n = this;
      this._isSummon = Math.random() < Number(this._cfg.val1);
      this._spCtrl.playAnim(
        this._isSummon ? 'call' : 'atk',
        1,
        !1,
        function () {
          n._attackCD = n._cfg.arkWait;
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
    e.prototype.attackHit = function (e) {
      if (this._isSummon) {
        this.summon();
      } else {
        t.prototype.attackHit.call(this, e);
      }
    };
    e.prototype.summon = function () {
      const t = this;
      const e = Number(this._cfg.val2);
      const n = 0;
      const i = $battleMgr.default.instance.getCurScene();
      if (i) {
        for (const o = Number(this._cfg.val3); n < e; ) {
          n++;
          this.scheduleOnce(function () {
            const e = t.pathPos;
            t.updatePathData();
            if ('' != t._pathLineId) {
              const n = i.level.path.getLine(t.pathLineId);
              if (0 != n.dir.x) {
                const r = $randomUtil.RandomUtil.randomInt(-50, 50);
                e.x += r;
                if (e.x >= n.maxX) {
                  e.x = n.maxX - $randomUtil.RandomUtil.randomInt(0, 50);
                }
                if (e.x <= n.minX) {
                  e.x = n.minX + $randomUtil.RandomUtil.randomInt(0, 50);
                }
              }
            }
            $actorMgr.default.instance.createActor({
              id: i.getCreateActorId(),
              cfgId: o,
              camp: $actorEnum.ETeamType.ENEMY,
              parent: i.actorParent,
              prefabName: 'Enemy_' + o,
              initPos: e,
              actorClass: $actorMgr.default.instance.getActorClassName(
                o,
                $actorEnum.ETeamType.ENEMY,
              ),
              onCreated: null,
              initParam: {
                rewardMap: new Map(),
                lv: t._initParam.lv,
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
          }, 0.2 * n);
        }
      }
    };
  })($enemyBase.default));
export default f;
