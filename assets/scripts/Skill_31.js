import $audioUtil from './AudioUtil';
import $battleMgr from './BattleMgr';
import $bullet31 from './Bullet31';
import $bulletMgr from './BulletMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $effectMgr from './EffectMgr';
import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
import $weapon31 from './Weapon31';
import $weapon31Atk from './Weapon31Atk';
let i;
exports.Skill_31 = void 0;
e.prototype.onRemove = function () {
  this._weapon.remove();
  this._weapon = null;
  t.prototype.onRemove.call(this);
};
e.prototype.checkTarget = function (t) {
  const e = this._owner.node.getPosition();
  const n =
    this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value >= 1;
  const i = null;
  if (n) {
    i = 2 * this._cfg.edge;
  } else {
    i = this._cfg.edge;
  }
  const o = e.x;
  if (t < 0 || n) {
    o -= this._cfg.edge;
  }
  for (
    const r = new cc.Rect(o, e.y - 25, i, 50), a = $gridAreaDivisionMgr.default.instance.getRectAreaKeys(r), s = [], c = 0, u = a;
    c < u.length;
    c++
  ) {
    const p = u[c];
    const f = $gridAreaDivisionMgr.default.instance
      .getAreaObjectList(p, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
      .filter(function (t) {
        return !s.includes(t);
      });
    if (f) {
      s.push.apply(s, f);
    }
  }
  for (const d = 0, m = s; d < m.length; d++) {
    const y = m[d];
    if (y.canBeSearch() && r.contains(y.node.getPosition())) {
      return !0;
    }
  }
  return !1;
};
e.prototype.shootBullet = function (t) {
  const e = this;
  const n = $battleMgr.default.instance.getCurScene();
  this._weapon.hide();
  this._isReleasing = !0;
  const i = function (t, i, o) {
    if (void 0 === o) {
      o = null;
    }
    const a = e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value > 0;
    const l = e._owner.node
      .getPosition()
      .add(cc.v2(30 * (t.x > 0 ? 1 : -1), 50));
    $effectMgr.default.instance.createEffect({
      parent: n.effectParent,
      prefabName: "Weapon31Atk",
      initPos: l,
      effectClass: $weapon31Atk.default,
      onCreated: function (u) {
        const p = e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value;
        const f = e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value;
        const d = null;
        if (1 == Math.abs(t.x)) {
          d = t.x;
        } else {
          d = t.y;
        }
        u.node.scaleX = Math.abs(u.node.scaleX) * (d > 0 ? 1 : -1);
        u.node.angle = (180 * cc.v2(d, 0).signAngle(t)) / Math.PI;
        $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_ZhanYaoDao");
        u.play(
          function () {
            for (const i = 0; i < f; i++) {
              n.scheduleOnce(function () {
                const i = t.clone();
                const o = l.add(i.mul(p));
                const r = l.add(i.mul(10));
                $bulletMgr.default.instance.createBullet({
                  parent: n.bulletParent,
                  prefabName: "Bullet31",
                  initPos: r,
                  iconPath: a
                    ? "textures/bullet/pic_wuqi3_daoguang"
                    : "textures/bullet/pic_wuqi3_daoguang2",
                  bulletClass: $bullet31.default,
                  onCreated: function (t) {
                    t.shoot(
                      e._owner,
                      o,
                      e,
                      e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2)
                        .value,
                      e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4)
                        .value,
                    );
                  },
                });
              }, 0.1 * i);
            }
          },
          function () {
            if (i) {
              //
            } else {
              e._weapon.show();
            }
            if (o) {
              o();
            }
          },
        );
      },
    });
  };
  const o = this._owner.prevMoveDir;
  i(o, !1, function () {
    e._isReleasing = !1;
    if (t) {
      t();
    }
  });
  if (this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value >= 1) {
    i(o.mul(-1), !0);
  }
};
e.prototype.onUpdate = function (t) {
  const e = this;
  if (this._weapon) {
    this._weaponOffsetPos.x =
      Math.abs(this._weaponOffsetPos.x) * -this._owner.dirX;
    this._weapon.node.setPosition(
      this._weaponCentrePos.add(this._weaponOffsetPos),
    );
    this._weapon.node.scaleX =
      Math.abs(this._weapon.node.scaleX) * this._owner.dirX;
    if (this.skillCD > 0) {
      this.skillCD -= t;
      if (this.skillCD < 0) {
        this.skillCD = 0;
      }
      return void this._weapon.updateProgressCd(
        (this.skillCDTimer - this.skillCD) / this.skillCDTimer,
      );
    }
    if (this._cfg.isStay > 0) {
      if (this._owner.curState != $actorEnum.EActorStateType.IDLE) {
        return void (this._waitCD = 0);
      }
      this._waitCD += t;
      if (this._waitCD < this._cfg.isStay) {
        return;
      }
    }
    if (!this._isReleasing) {
      const n = this._owner.prevMoveDir;
      if (0 != n.x && this.checkTarget(n.x)) {
        this.shootBullet(function () {
          e.enterCD();
          e._weapon.updateProgressCd(1);
        });
      }
    }
  }
};
e.prototype.createWeapon = function () {
  const t = this;
  this._weaponOffsetPos = cc.v2(40 * -this._owner.dirX, 0);
  $effectMgr.default.instance.createEffect({
    parent: this._owner.node,
    prefabName: "Weapon31",
    effectClass: $weapon31.default,
    initPos: this._weaponCentrePos.add(this._weaponOffsetPos),
    onCreated: function (e) {
      t._weapon = e;
      t._weapon.init();
      t._weapon.show();
    },
  });
};
e.prototype.onInit = function () {
  t.prototype.onInit.call(this);
  this._isReleasing = !1;
  this.createWeapon();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e._weapon = null;
  e._weaponOffsetPos = cc.v2(0, 0);
  e._weaponCentrePos = cc.v2(0, 55);
  e._isReleasing = !1;
  return e;
}
const m = e;
exports.Skill_31 = m;
