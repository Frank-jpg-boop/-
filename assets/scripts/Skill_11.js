import $audioUtil from './AudioUtil';
import $battleMgr from './BattleMgr';
import $bullet11 from './Bullet11';
import $bulletMgr from './BulletMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $effectMgr from './EffectMgr';
import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
import $weapon11 from './Weapon11';
let i;
exports.Skill_11 = void 0;
e.prototype.onRemove = function () {
  this._weapon.remove();
  this._weapon = null;
  t.prototype.onRemove.call(this);
};
e.prototype.getHurtOption = function () {
  const e = t.prototype.getHurtOption.call(this);
  e.critRate += this._critAdd;
  e.critHurt += this.getAttribute(
    $attrEnum.E_SkillAttrType.EXTRA_ATTR_5,
  ).value;
  e.rate += this._hurtAdd;
  return e;
};
e.prototype.shootSurroundBullet = function (t) {
  const e = this;
  const n =
    this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value *
    this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value;
  const i = this._owner.node.getPosition().add(this._weaponCentrePos);
  const o = this._attackTarget.getBeHurtPos().sub(i).normalize();
  this._weaponTargetOffsetPos = o.mul(this._weaponRadio);
  $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_ShouQiang");
  this._weapon.playShootAnim(
    function () {
      for (
        const t = e._owner.node.getPosition().add(cc.v2(0, 50)), n = $battleMgr.default.instance.getCurScene(), i = e.getHurtOption(), o = 0;
        o < 12;
        ++o
      ) {
        for (
          const r = cc.v2(
                    Math.cos((30 * o * Math.PI) / 180),
                    Math.sin((30 * o * Math.PI) / 180),
                  ),
                l = r.mul(50),
                u = t.add(l),
                p = t.add(r.mul(e._cfg.edge)),
                f = cc.v2(-r.y, r.x),
                d = e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value,
                m = d >> 1,
                y = function (t) {
                  const o = f.mul(15 * (t - m));
                  const r = u.add(o);
                  const a = p.add(o);
                  $bulletMgr.default.instance.createBullet({
                    parent: n.bulletParent,
                    prefabName: "Bullet11",
                    initPos: r,
                    iconPath: "",
                    bulletClass: $bullet11.default,
                    onCreated: function (t) {
                      t.shoot(e._owner, a, e, i);
                    },
                  });
                },
                _ = 0;
          _ < d;
          ++_
        ) {
          y(_);
        }
      }
    },
    n,
    o,
    function (n) {
      e._attackCD = n;
      if (t) {
        t();
      }
    },
  );
};
e.prototype.shootCommonBullet = function (t) {
  const e = this;
  const n =
    this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value *
    this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value;
  const i = this._owner.node.getPosition().add(this._weaponCentrePos);
  const o = null;
  if (this._attackTarget.rightHeight > this._weaponCentrePos.y) {
    o = this._attackTarget.node.getPosition().add(this._weaponCentrePos);
  } else {
    o = this._attackTarget.getBeHurtPos();
  }
  const l = null;
  if (this._attackTarget.moveDir) {
    l = this._attackTarget.moveDir.clone();
  } else {
    l = null;
  }
  if (l) {
    const u = this._attackTarget.getAttribute($attrEnum.E_AttrType.SPEED).value;
    o.addSelf(l.mul(u * this._dt * 10));
  }
  const p = o.sub(i).normalize();
  this._weaponTargetOffsetPos = p.mul(this._weaponRadio);
  $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_ShouQiang");
  this._weapon.playShootAnim(
    function () {
      for (
        const t = $battleMgr.default.instance.getCurScene(),
              n = cc.v2(-p.y, p.x),
              i = e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value,
              o = i >> 1,
              r = e._weapon.shootPos,
              l = e.getHurtOption(),
              u = function (i) {
                const a = n.mul(15 * (i - o));
                const u = r.add(a);
                const h = u.add(p.mul(e._cfg.edge));
                $bulletMgr.default.instance.createBullet({
                  parent: t.bulletParent,
                  prefabName: "Bullet11",
                  initPos: u,
                  iconPath: "",
                  bulletClass: $bullet11.default,
                  onCreated: function (t) {
                    t.shoot(e._owner, h, e, l);
                  },
                });
              },
              f = 0;
        f < i;
        ++f
      ) {
        u(f);
      }
    },
    n,
    p,
    function (n) {
      e._attackCD = n;
      if (t) {
        t();
      }
    },
  );
};
e.prototype.shootBullet = function (t) {
  this._critAdd += this.getAttribute(
    $attrEnum.E_SkillAttrType.EXTRA_ATTR_6,
  ).value;
  this._hurtAdd += this.getAttribute(
    $attrEnum.E_SkillAttrType.EXTRA_ATTR_8,
  ).value;
  if (
    1 == this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_7).value &&
    this.duration <= this._durationTimer - 5
  ) {
    this.shootSurroundBullet(t);
  } else {
    this.shootCommonBullet(t);
  }
};
e.prototype.searchTarget = function () {
  for (
    const t = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(
              this._owner.node.getPosition(),
              this._cfg.edge,
            ),
          e = [],
          n = 0,
          i = t;
    n < i.length;
    n++
  ) {
    const o = i[n];
    $gridAreaDivisionMgr.default.instance
      .getAreaObjectList(o, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
      .forEach(function (t) {
        if (e.includes(t)) {
          //
        } else {
          e.push(t);
        }
      });
  }
  for (
    const r = null, a = Number.MAX_VALUE, s = this._owner.node.position, c = 0, u = e;
    c < u.length;
    c++
  ) {
    const p = u[c];
    if (p.canBeSearch()) {
      const h = cc.Vec3.squaredDistance(s, p.node.position);
      if (h < a || !r) {
        a = h;
        r = p;
      }
    }
  }
  return r;
};
e.prototype.enterCD = function () {
  this._skillCDTimer = Math.max(
    this.getAttribute($attrEnum.E_SkillAttrType.SKILL_CD).value,
    0.1,
  );
  this.skillCD = this._skillCDTimer;
};
e.prototype.onUpdate = function (t) {
  const e = this;
  if (this._weapon) {
    this._weaponOffsetPos.lerp(
      this._weaponTargetOffsetPos,
      0.25,
      this._weaponOffsetPos,
    );
    this._weapon.node.x = this._weaponCentrePos.x + this._weaponOffsetPos.x;
    this._weapon.node.y = this._weaponCentrePos.y + this._weaponOffsetPos.y;
    this._dt = t;
    if (this.skillCD > 0) {
      this.skillCD -= t;
      if (this.skillCD <= 0) {
        this.skillCD = 0;
        this._durationTimer = this.getAttribute(
          $attrEnum.E_SkillAttrType.EXTRA_ATTR_2,
        ).value;
        this.duration = this._durationTimer;
        this._attackCD =
          this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value *
          this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value;
        this._critAdd = 0;
        this._hurtAdd = 0;
      }
      this.resetWeapon();
      const n = (this.skillCDTimer - this.skillCD) / this.skillCDTimer;
      this._weapon.updateProgressCd(n);
    } else {
      if (this._cfg.isStay > 0) {
        if (this._owner.curState != $actorEnum.EActorStateType.IDLE) {
          this._waitCD = 0;
          return void this.resetWeapon();
        }
        this._waitCD += t;
        if (this._waitCD < this._cfg.isStay) {
          return;
        }
      }
      if (this._attackCD > 0) {
        this._attackCD -= t;
        return void (this._attackCD < 0 && (this._attackCD = 0));
      }
      if (!this._weapon.isShooting && this.duration > 0) {
        this._attackTarget = this.searchTarget();
        if (!this._attackTarget) {
          return void this.resetWeapon();
        }
        this.shootBullet(function () {
          e.duration--;
          if (e.duration <= 0) {
            e.enterCD();
            e.resetWeapon();
            e._weapon.updateProgressCd(1);
          }
        });
      }
    }
  }
};
e.prototype.resetWeapon = function () {
  this._weaponOffsetInitPos.x =
    Math.abs(this._weaponOffsetInitPos.x) * this._owner.dirX;
  this._weaponTargetOffsetPos = this._weaponOffsetInitPos.clone();
  this._weapon.reset(this._owner.dirX);
};
e.prototype.createWeapon = function () {
  const t = this;
  this._weaponOffsetInitPos.x =
    Math.abs(this._weaponOffsetInitPos.x) * this._owner.dirX;
  this._weaponOffsetPos = this._weaponOffsetInitPos.clone();
  this._weaponTargetOffsetPos = this._weaponOffsetPos.clone();
  $effectMgr.default.instance.createEffect({
    parent: this._owner.node,
    prefabName: "Weapon11",
    effectClass: $weapon11.default,
    initPos: this._weaponCentrePos.add(this._weaponOffsetPos),
    onCreated: function (e) {
      t._weapon = e;
      t._weapon.reset(t._owner.dirX);
    },
  });
};
e.prototype.onInit = function () {
  t.prototype.onInit.call(this);
  this._durationTimer = this.getAttribute(
    $attrEnum.E_SkillAttrType.EXTRA_ATTR_2,
  ).value;
  this.duration = this._durationTimer;
  this._critAdd = 0;
  this._hurtAdd = 0;
  this.createWeapon();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e._attackCD = 0;
  e._critAdd = 0;
  e._hurtAdd = 0;
  e._dt = 0;
  e._attackTarget = null;
  e._weapon = null;
  e._weaponOffsetPos = cc.v2(0, 0);
  e._weaponCentrePos = cc.v2(0, 40);
  e._weaponRadio = 50;
  e._weaponOffsetInitPos = cc.v2(35, 0);
  e._weaponTargetOffsetPos = cc.v2(0, 0);
  return e;
}
const d = e;
exports.Skill_11 = d;
