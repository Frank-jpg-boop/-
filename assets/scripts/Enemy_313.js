import $actorEnum from './ActorEnum';
import $door from './Door';
import $actorMgr from './ActorMgr';
import $enemyBase from './EnemyBase';
let i;
const u = cc._decorator;
const p = u.ccclass;
const h =
  (u.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._isAtk2 = !1;
      return e;
    }
    e.prototype.plyerAnimSummom = function (t, e) {
      const n = this;
      this._isAtk2 = Math.random() < Number(this._cfg.val1);
      this._spCtrl.playAnim(
        this._isAtk2 ? "atk2" : this._atkAnimName,
        1,
        !1,
        function () {
          n._attackCD = n._cfg.arkWait;
          if (e) {
            e();
          }
        },
        function (e, n) {
          if ("atk" == n && t) {
            t();
          }
        },
      );
    };
    e.prototype.attackHit = function (e) {
      if (this._isAtk2) {
        if (e && e.isValid) {
          const n = e.getComponent($door.default);
          if (n && n.state != $door.EDoorState.DESTROY) {
            const i = null;
            if ((h = n.hp) < Number(this._cfg.val3)) {
              i = h;
            } else {
              i = Math.floor(h * Number(this._cfg.val2));
            }
            n.beHurt(i);
          }
        }
        const o = this.node.getPosition();
        o.x += 150 * this.dirX;
        for (
          const r = $actorMgr.default.instance.queryActorByCamp(
                    $actorEnum.ETeamType.PLAYER,
                  ),
                l = 0;
          l < r.length;
          l++
        ) {
          const u = r[l];
          if (!u.isDead()) {
            const p = u.node.getPosition();
            if (cc.Vec2.squaredDistance(p, o) <= 22500) {
              const h = u.curHp;
              const f = this.getHurt();
              if (h < Number(this._cfg.val3)) {
                f.damage = h;
              } else {
                f.damage = Math.floor(h * Number(this._cfg.val2));
              }
              u.beHurt(f);
            }
          }
        }
      } else {
        t.prototype.attackHit.call(this, e);
      }
    };
  })($enemyBase.default));
exports.default = h;
