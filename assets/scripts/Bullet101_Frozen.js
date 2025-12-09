import $battleHurtFormulaMgr from './BattleHurtFormulaMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $simplyVec2 from './SimplyVec2';
import $bulletBase from './BulletBase';
let i;
const p = cc._decorator;
const h = p.ccclass;
const f =
  (p.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._ownerSkill = null;
      e._eliminateEnemyId = 0;
      e._hurtIds = [];
      return e;
    }
    e.prototype.onShoot = function (t, e, n) {
      this._hurtIds = [];
      this._ownerSkill = e;
      this._eliminateEnemyId = n;
      const i = this.node.getPosition();
      const o = t.sub(i).len() / 600;
      this.tweenTo(i, t, o, !0, null);
    };
    e.prototype.onUpdate = function () {
      this.checkCollision();
    };
    e.prototype.checkCollision = function () {
      for (
        const t = this.node.getPosition(),
              e = $gridAreaDivisionMgr.default.instance.getAreaKeyInfo(t.x, t.y),
              n = $gridAreaDivisionMgr.default.instance.getAreaObjectList(
                e.key,
                $gridAreaDivisionMgr.E_AreaObjectType.ENEMY,
              ),
              i = this.node.convertToWorldSpaceAR(cc.v2()),
              o = 0;
        o < n.length;
        o++
      ) {
        const r = n[o];
        if (
          r.canBeHurt() &&
          !this._hurtIds.includes(r.unitId) &&
          !r.isDead() &&
          r.unitId != this._eliminateEnemyId &&
          $simplyCollisionDetector.default.isCollisionPointToRect(
            new $simplyVec2.default(i.x, i.y),
            r.hurtColliderRect,
          )
        ) {
          this._hurtIds.push(r.unitId);
          const u = $battleHurtFormulaMgr.default.instance.skillHurt(
            this._ownerSkill.getFrozenHurtOption(),
            r,
          );
          r.beHurt(u);
          break;
        }
      }
    };
  })($bulletBase.default));
exports.default = f;
