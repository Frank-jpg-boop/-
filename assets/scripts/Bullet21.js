import $battleHurtFormulaMgr from './BattleHurtFormulaMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $simplyRectCollider from './SimplyRectCollider';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $attrEnum from './AttrEnum';
import $buffEnum from './BuffEnum';
import $bulletBase from './BulletBase';
let i;
const f = cc._decorator;
const d = f.ccclass;
const m = f.property;
e.prototype.checkCollision = function () {
  const t = this.recktCollider.node.getBoundingBox();
  t.x += this.node.x;
  t.y += this.node.y;
  for (
    const e = $gridAreaDivisionMgr.default.instance.getRectAreaKeys(t), n = [], i = 0, o = e;
    i < o.length;
    i++
  ) {
    const r = o[i];
    const c = $gridAreaDivisionMgr.default.instance.getAreaObjectList(
      r,
      $gridAreaDivisionMgr.E_AreaObjectType.ENEMY,
    );
    n.push.apply(
      n,
      c.filter(function (t) {
        return !n.includes(t);
      }),
    );
  }
  for (
    let h,
      f = function (t) {
        const e = d._collisionIds[t];
        if (
          n.some(function (t) {
            return t.unitId == e;
          })
        ) {
          //
        } else {
          d._collisionIds.splice(t, 1);
          t--;
        }
        h = t;
      },
      d = this,
      m = 0;
    m < this._collisionIds.length;
    ++m
  ) {
    f(m);
    m = h;
  }
  for (m = 0; m < n.length; m++) {
    const y = n[m];
    if (y.canBeHurt()) {
      if (
        $simplyCollisionDetector.default.isCollisionRectToRect(
          this.recktCollider.rect,
          y.hurtColliderRect,
        )
      ) {
        if (!this._collisionIds.includes(y.unitId)) {
          this._collisionIds.push(y.unitId);
          const _ = $battleHurtFormulaMgr.default.instance.skillHurt(
            this._ownerSkill.getHurtOption(),
            y,
          );
          if (_ && _.isCrit) {
            this._ownerSkill.addRotationSpeedBuff();
          }
          y.beHurt(_);
          const g = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value;
          if (g > 0) {
            y.beRepel(this._owner.node.getPosition(), g);
          }
          if (
            this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_7).value > 0 &&
            !y.isDead()
          ) {
            y.buff.add(
              {
                buffId: $buffEnum.EBuffId.EASY,
                buffType: $buffEnum.EBuffType.EASY_HURT,
                duration: -1,
                isSuperposition: !1,
                parentActor: y,
                agentActor: this._owner,
                onRemove: null,
                isDebuff: !0,
              },
              this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value,
            );
          }
        }
      } else {
        if (this._collisionIds.includes(y.unitId)) {
          this._collisionIds.splice(this._collisionIds.indexOf(y.unitId), 1);
        }
      }
    }
  }
};
e.prototype.onUpdate = function () {
  this.checkCollision();
};
e.prototype.updateSize = function () {
  const t = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value;
  this.recktCollider.node.scale = t;
  this.nView.scale = t;
};
e.prototype.updateRotation = function (t) {
  const e = this._angle - t;
  this.setAngle(e);
};
e.prototype.setAngle = function (t) {
  if (this._owner && !this._owner.isDead()) {
    this._angle = t;
    const e = (this._angle * Math.PI) / 180;
    const n = cc.v2(Math.cos(e), Math.sin(e));
    const i = this._owner.node.getPosition().add(cc.v2(0, 50)).add(n.mul(this._radius));
    this.node.setPosition(i);
    this.nView.angle = this._angle;
    this.recktCollider.node.angle = this._angle;
  }
};
e.prototype.onShoot = function (t, e) {
  this._angle = 0;
  this._ownerSkill = t;
  this._radius = e;
  this._collisionIds = [];
  this.updateSize();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.recktCollider = null;
  e.nView = null;
  e._angle = 0;
  e._ownerSkill = null;
  e._radius = 0;
  e._collisionIds = [];
  return e;
}
export default y;
