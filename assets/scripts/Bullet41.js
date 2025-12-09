import $nodePoolManager from './NodePoolManager';
import $nodeUtil from './NodeUtil';
import $battleHurtFormulaMgr from './BattleHurtFormulaMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $simplyRectCollider from './SimplyRectCollider';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $spAnimCtrl from './SpAnimCtrl';
import $attrEnum from './AttrEnum';
import $bulletBase from './BulletBase';
let i;
const m = cc._decorator;
const y = m.ccclass;
const _ = m.property;
e.prototype.remove = function () {
  const t = this;
  if (this._isRemove) {
    //
  } else {
    this._isRemove = !0;
    this.hide(function () {
      t.onRemove();
      t._owner = null;
      t.unscheduleAllCallbacks();
      $nodePoolManager.default.instance.putNode(t.node, !0);
    });
  }
};
e.prototype.hide = function (t) {
  const e = this;
  if (void 0 === t) {
    t = null;
  }
  if (this._isShow) {
    this._parentBullet || this._hurtTargetDataMap.clear();
    this._isShow = !1;
    this._isUpdate = !1;
    this._ownerWeapon.reset();
    cc.tween(this.nView)
      .to(0.1, {
        opacity: 0,
      })
      .call(function () {
        e.nView.active = !1;
        e._isUpdate = !0;
        if (t) {
          t();
        }
      })
      .start();
  } else {
    if (t) {
      t();
    }
  }
};
e.prototype.show = function () {
  if (this._isShow) {
    //
  } else {
    this._isShow = !0;
    this.nView.active = !0;
    this._isUpdate = !0;
    cc.Tween.stopAllByTarget(this.nView);
    this.nView.opacity = 255;
  }
};
e.prototype.searchTarget = function (t) {
  for (
    const e = this._ownerWeapon.ownerSkill.cfg.edge,
          n = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(
            this.node.getPosition(),
            e,
          ),
          i = [],
          o = 0,
          r = n;
    o < r.length;
    o++
  ) {
    const a = r[o];
    const s = $gridAreaDivisionMgr.default.instance
      .getAreaObjectList(a, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
      .filter(function (t) {
        return !i.includes(t);
      });
    if (s) {
      i.push.apply(i, s);
    }
  }
  for (
    const c = null, u = 0, p = this._owner.node.position, h = 0, f = i;
    h < f.length;
    h++
  ) {
    const d = f[h];
    if (d.canBeSearch() && !d.isDead() && t != d) {
      const m = cc.Vec3.squaredDistance(p, d.node.position);
      if (t && m < 400) {
        //
      } else {
        if (m < e * e && (m > u || !c)) {
          u = m;
          c = d;
        }
      }
    }
  }
  return c;
};
e.prototype.updateTarget = function () {
  if (this._attackTarget && !this._attackTarget.isDead()) {
    const t = this.node.getPosition();
    const e = cc.Vec2.squaredDistance(t, this._attackTargetPos);
    if (
      e <
        this._ownerWeapon.ownerSkill.cfg.edge *
          this._ownerWeapon.ownerSkill.cfg.edge &&
      e > 100
    ) {
      return;
    }
  }
  this._attackTarget = this.searchTarget(
    this._parentBullet ? this._parentBullet.attackTarget : null,
  );
};
e.prototype.setPos = function (t) {
  this.node.setPosition(t);
  this.updateTarget();
  if (this._attackTarget) {
    const e = this._attackTarget.getBeHurtPos();
    this._attackTargetPos = e;
    const n = e.sub(t);
    const i = n.normalize();
    if (0 != i.x || 0 != i.y) {
      const o = n.mag();
      const r = this.nView.width;
      const a = o / r;
      const s = (180 * cc.Vec2.RIGHT_R.signAngle(i)) / Math.PI;
      this.nView.angle = s;
      this.nView.scaleX = a;
      this.nView.getChildByName("Hit").scaleY =
        (1 * this._initHitAnimScaleY) / a;
      if (this._parentBullet) {
        //
      } else {
        this._ownerWeapon.node.angle = s + 90;
      }
      this.collider.node.angle = s;
      this.collider.node.width = r * a;
      this.show();
    } else {
      this.hide();
    }
  } else {
    this.hide();
  }
};
e.prototype.targetBeHurt = function (t, e) {
  if (t) {
    const n = this._hurtTargetDataMap.get(t.unitId);
    if (n) {
      //
    } else {
      n = {
        id: t.unitId,
        hurtCd: 0,
        hurtTime: 0,
        hurtAdd: 0,
      };
      this._hurtTargetDataMap.set(t.unitId, n);
    }
    n.hurtCd -= e;
    n.hurtTime += e;
    n.hurtAdd =
      Math.floor(n.hurtTime) *
      this._ownerWeapon.ownerSkill.getAttribute(
        $attrEnum.E_SkillAttrType.EXTRA_ATTR_3,
      ).value;
    if (n.hurtCd <= 0) {
      n.hurtCd = this._hurtDirCdTime;
      const i = $battleHurtFormulaMgr.default.instance.skillHurt(
        this._ownerWeapon.ownerSkill.getHurtOption(),
        t,
      );
      i.damage *= 1 + n.hurtAdd;
      t.beHurt(i);
    }
  }
};
e.prototype.checkCollision = function (t) {
  for (
    const e = this, n = this._ownerWeapon.ownerSkill.cfg.edge, i = this.node.getPosition(), o = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(i, n), r = [], a = 0, s = o;
    a < s.length;
    a++
  ) {
    const c = s[a];
    const u = $gridAreaDivisionMgr.default.instance.getAreaObjectList(
      c,
      $gridAreaDivisionMgr.E_AreaObjectType.ENEMY,
    );
    r.push.apply(
      r,
      u.filter(function (t) {
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
  for (const h = 0; h < r.length; h++) {
    const f = r[h];
    if (f.canBeHurt()) {
      if (this._attackTarget && this._attackTarget.unitId == f.unitId) {
        //
      } else {
        if (
          $simplyCollisionDetector.default.isCollisionRectToRect(
            this.collider.rect,
            f.hurtColliderRect,
          )
        ) {
          this.targetBeHurt(f, t);
        }
      }
    }
  }
};
e.prototype.checkHurt = function (t) {
  if (this._attackTarget) {
    this.targetBeHurt(this._attackTarget, t);
  }
  if (
    this._ownerWeapon.ownerSkill.getAttribute(
      $attrEnum.E_SkillAttrType.EXTRA_ATTR_6,
    ).value > 0
  ) {
    this.checkCollision(t);
  }
};
e.prototype.onUpdate = function (t) {
  if (this._parentBullet) {
    if (
      !this._parentBullet.attackTarget ||
      this._parentBullet.attackTarget.isDead()
    ) {
      return void this.hide();
    }
    const e = this._parentBullet.attackTargetPos;
    if (!e) {
      return void this.hide();
    }
    this.setPos(e);
  } else {
    this.setPos(
      $nodeUtil.default.nodeParentChangeLocalPos(
        this._ownerWeapon.nShootPos,
        this.node.parent,
      ),
    );
  }
  if (this._isShow) {
    this.checkHurt(t);
  }
};
e.prototype.onShoot = function (t, e) {
  this._ownerWeapon = t;
  this._parentBullet = e;
  this._hurtTargetDataMap = new Map();
  this._hurtDirCdTime =
    1 /
    this._ownerWeapon.ownerSkill.getAttribute(
      $attrEnum.E_SkillAttrType.EXTRA_ATTR_5,
    ).value;
};
e.prototype.onInit = function () {
  t.prototype.onInit.call(this);
  this.nView.active = !0;
  this.nView.opacity = 0;
  this._initHitAnimScaleY = 0.5;
};
Object.defineProperty(e.prototype, "attackTargetPos", {
  get: function () {
    return this._attackTargetPos;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "attackTarget", {
  get: function () {
    return this._attackTarget;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.spAnim = null;
  e.collider = null;
  e.nView = null;
  e._ownerWeapon = null;
  e._attackTarget = null;
  e._parentBullet = null;
  e._attackTargetPos = null;
  e._initHitAnimScaleY = 0;
  e._hurtDirCdTime = 0;
  e._isShow = !1;
  e._isUpdate = !0;
  e._hurtTargetDataMap = null;
  return e;
}
exports.default = g;
