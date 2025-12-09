import $battleHurtFormulaMgr from './BattleHurtFormulaMgr';
import $battleMgr from './BattleMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $simplyVec2 from './SimplyVec2';
import $effectMgr from './EffectMgr';
import $spAnimEffect from './SpAnimEffect';
import $attrEnum from './AttrEnum';
import $buffEnum from './BuffEnum';
import $enemyBase from './EnemyBase';
import $bulletBase from './BulletBase';
let i;
const _ = cc._decorator;
const g = _.ccclass;
const v =
  (_.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._ownerSkill = null;
      e._collisionIds = [];
      return e;
    }
    e.prototype.onShoot = function (t, e) {
      const n = this;
      this._ownerSkill = e;
      this._collisionIds = [];
      const i = this.node.getPosition();
      const o = t.sub(i).len() / 500;
      this.tweenTo(
        i,
        t,
        o,
        !0,
        function () {
          if (
            n._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5)
              .value > 0
          ) {
            n.blast();
          }
        },
        "sineOut",
      );
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
          !r.isDead() &&
          !this._collisionIds.includes(r.unitId) &&
          $simplyCollisionDetector.default.isCollisionPointToRect(
            new $simplyVec2.default(i.x, i.y),
            r.hurtColliderRect,
          )
        ) {
          const s = $battleHurtFormulaMgr.default.instance.skillHurt(
            this._ownerSkill.getHurtOption(),
            r,
          );
          r.beHurt(s);
          if (
            r instanceof $enemyBase.default &&
            Math.random() <
              this._ownerSkill.getAttribute(
                $attrEnum.E_SkillAttrType.EXTRA_ATTR_4,
              ).value
          ) {
            r.buff.add({
              buffId: $buffEnum.EBuffId.DIZZINESS,
              buffType: $buffEnum.EBuffType.DIZZINESS,
              parentActor: r,
              agentActor: this._ownerSkill.owner,
              isDebuff: !0,
              isSuperposition: !1,
              duration: 1,
              onRemove: null,
            });
          }
          this._collisionIds.push(r.unitId);
        }
      }
    };
    e.prototype.blast = function () {
      const t = this;
      const e = $battleMgr.default.instance.getCurScene();
      const n = this.node.getPosition();
      $effectMgr.default.instance.createEffect({
        parent: e.effectParent,
        prefabName: "Weapon51Boom",
        effectClass: $spAnimEffect.default,
        initPos: n,
        onCreated: function (e) {
          e.scheduleOnce(function () {
            t.checkBlastHurt(n, 40);
          }, 0.1);
          e.playDefaultAnim("baozha", 1, !1, null);
        },
      });
    };
    e.prototype.checkBlastHurt = function (t, e) {
      for (
        const n = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(t, e), i = [], o = 0, r = n;
        o < r.length;
        o++
      ) {
        const s = r[o];
        const l = $gridAreaDivisionMgr.default.instance
          .getAreaObjectList(s, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
          .filter(function (t) {
            return !i.includes(t);
          });
        if (l) {
          i.push.apply(i, l);
        }
      }
      for (const u = 0, p = i; u < p.length; u++) {
        const h = p[u];
        if (
          !h.isDead() &&
          cc.Vec2.squaredDistance(t, h.node.getPosition()) <= e * e
        ) {
          const f = $battleHurtFormulaMgr.default.instance.skillHurt(
            this._ownerSkill.getHurtOption(),
            h,
          );
          h.beHurt(f);
        }
      }
    };
  })($bulletBase.default));
exports.default = v;
