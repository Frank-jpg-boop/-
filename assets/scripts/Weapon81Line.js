import $battleHurtFormulaMgr from './BattleHurtFormulaMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $simplyRectCollider from './SimplyRectCollider';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $spAnimEffect from './SpAnimEffect';
import $attrEnum from './AttrEnum';
let i;
const h = cc._decorator;
const f = h.ccclass;
const d = h.property;
e.prototype.onRemove = function () {
  const e = this;
  this.fideOut(function () {
    t.prototype.onRemove.call(e);
  });
};
e.prototype.checkCollision = function (t) {
  for (
    const e = this, n = this._ownerSkill.cfg.edge, i = this.node.getPosition(), o = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(i, n), r = [], c = 0, u = o;
    c < u.length;
    c++
  ) {
    const p = u[c];
    const h = $gridAreaDivisionMgr.default.instance.getAreaObjectList(
      p,
      $gridAreaDivisionMgr.E_AreaObjectType.ENEMY,
    );
    r.push.apply(
      r,
      h.filter(function (t) {
        return !r.includes(t);
      }),
    );
  }
  this._hurtTargetDataMap.forEach(function (t) {
    if (
      r.some(function (e) {
        return e.unitId == t.id;
      })
    ) {
      //
    } else {
      e._hurtTargetDataMap.delete(t.id);
    }
  });
  for (const f = 0; f < r.length; f++) {
    const d = r[f];
    if (
      $simplyCollisionDetector.default.isCollisionRectToRect(
        this.collider.rect,
        d.hurtColliderRect,
      )
    ) {
      const m = this._hurtTargetDataMap.get(d.unitId);
      if (m) {
        //
      } else {
        m = {
          id: d.unitId,
          hurtCd: 0,
        };
        this._hurtTargetDataMap.set(d.unitId, m);
      }
      m.hurtCd -= t;
      if (m.hurtCd <= 0) {
        m.hurtCd = this._hurtDirCdTime;
        const y = $battleHurtFormulaMgr.default.instance.skillHurt(
          this._ownerSkill.getLineHurtOption(),
          d,
        );
        d.beHurt(y);
      }
    }
  }
};
e.prototype.onUpdate = function (t) {
  if (this._isCheck) {
    this.checkCollision(t);
  }
};
e.prototype.createLine = function (t, e, n) {
  const i = this;
  this._hurtDirCdTime =
    1 / n.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_8).value;
  this._ownerSkill = n;
  const o = e.sub(t);
  const r = o.mag() / this.nView.width;
  this.nView.scaleX = r;
  const a = (180 * cc.Vec2.RIGHT_R.signAngle(o.normalize())) / Math.PI;
  this.nView.angle = a;
  this.collider.node.width = r * this.nView.width;
  this.playDefaultAnim("guangxian", 1, !0);
  this.fideIn(function () {
    i._isCheck = !0;
  });
};
e.prototype.onInit = function () {
  t.prototype.onInit.call(this);
  this.nView.scaleX = 1;
  this.collider.node.width = this.nView.width;
  this._hurtTargetDataMap = new Map();
  this.node.opacity = 0;
  this._isCheck = !1;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nView = null;
  e.collider = null;
  e._ownerSkill = null;
  e._hurtTargetDataMap = null;
  e._hurtDirCdTime = 0.2;
  e._isCheck = !1;
  return e;
}
exports.default = m;
