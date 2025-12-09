import $mathUtil from './MathUtil';
import $battleHurtFormulaMgr from './BattleHurtFormulaMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $simplyCircleCollider from './SimplyCircleCollider';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $attrEnum from './AttrEnum';
import $bulletBase from './BulletBase';
let i;
const f = cc._decorator;
const d = f.ccclass;
const m = f.property;
e.prototype.checkCollision = function (t) {
  const e = this;
  const n = this.circleCollider.node.getBoundingBox();
  n.x += this.node.x;
  n.y += this.node.y;
  for (const i = [], o = n.x, r = n.xMax; ; o += $gridAreaDivisionMgr.default.instance.gridSize) {
    if (o > r) {
      o = r;
    }
    for (const a = n.y, l = a + n.height; ; a += $gridAreaDivisionMgr.default.instance.gridSize) {
      if (a > l) {
        a = l;
      }
      const h = $gridAreaDivisionMgr.default.instance.getAreaKeyInfo(o, a).key;
      if (i.includes(h)) {
        //
      } else {
        i.push(h);
      }
      if (a >= l) {
        break;
      }
    }
    if (o >= r) {
      break;
    }
  }
  for (const f = [], d = 0, m = i; d < m.length; d++) {
    const y = m[d];
    const _ = $gridAreaDivisionMgr.default.instance.getAreaObjectList(
      y,
      $gridAreaDivisionMgr.E_AreaObjectType.ENEMY,
    );
    f.push.apply(
      f,
      _.filter(function (t) {
        return !f.includes(t);
      }),
    );
  }
  this._collisionDataMap.forEach(function (t) {
    if (
      f.some(function (e) {
        return e.unitId == t.id;
      })
    ) {
      //
    } else {
      e._collisionDataMap.delete(t.id);
    }
  });
  for (const g = 0; g < f.length; g++) {
    const v = f[g];
    if (
      v.canBeHurt() &&
      $simplyCollisionDetector.default.isCollisionRectToCircle(
        v.hurtColliderRect,
        this.circleCollider.circle,
      )
    ) {
      if (this._collisionDataMap.has(v.unitId)) {
        const b = this._collisionDataMap.get(v.unitId);
        b.time += t;
        if (
          b.time >=
          1 / this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value
        ) {
          b.time = 0;
          this._collisionDataMap.delete(v.unitId);
        }
      } else {
        this._collisionDataMap.set(v.unitId, {
          id: v.unitId,
          time: 0,
        });
        const E = $battleHurtFormulaMgr.default.instance.skillHurt(
          this._ownerSkill.getHurtOption(),
          v,
        );
        v.beHurt(E);
      }
    }
  }
};
e.prototype.onUpdate = function (t) {
  if (this._isPlayComplete) {
    this.checkCollision(t);
  }
};
e.prototype.onShoot = function (t, e, n, i) {
  const o = this;
  if (void 0 === n) {
    n = 1;
  }
  if (void 0 === i) {
    i = 0;
  }
  this.spIcon.node.angle = 0;
  this.spIcon.node.opacity = 0;
  this._ownerSkill = e;
  this._collisionDataMap = new Map();
  const r = this.node.getPosition();
  this.nView.scale = n;
  this.circleCollider.node.scale = n;
  const s = t.sub(r).normalizeSelf();
  this.node.angle = $mathUtil.MathUtil.radians2Angle(cc.Vec2.RIGHT.signAngle(s));
  this.animBullet.once(
    cc.Animation.EventType.FINISHED,
    function () {
      o._isPlayComplete = !0;
      const e = o.node.getPosition();
      const n = t.sub(e).len() / 500;
      o.tweenTo(
        e,
        t,
        n,
        !0,
        function () {
          if (i > 0) {
            o.animBullet.play('Bullet31Loop');
            o.scheduleOnce(function () {
              o.remove();
            }, i);
          }
        },
        '',
        i <= 0,
      );
    },
    this,
  );
  this.animBullet.play();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.circleCollider = null;
  e.nView = null;
  e.animBullet = null;
  e._ownerSkill = null;
  e._isPlayComplete = !1;
  e._collisionDataMap = null;
  return e;
}
export default y;
