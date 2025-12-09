import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $effectMgr from './EffectMgr';
import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
import $weapon91 from './Weapon91';
let i;
exports.Skill_91 = void 0;
e.prototype.onRemove = function () {
  if (this._weapon) {
    this._weapon.remove();
    this._weapon = null;
  }
  t.prototype.onRemove.call(this);
};
e.prototype.searchTarget = function () {
  for (
    const t = this,
          e = this._owner.node.getPosition(),
          n = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(
            e,
            this._cfg.edge,
          ),
          i = [],
          o = 0,
          a = n;
    o < a.length;
    o++
  ) {
    const s = a[o];
    const c = $gridAreaDivisionMgr.default.instance
      .getAreaObjectList(s, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
      .filter(function (t) {
        return !i.includes(t) && !t.isDead();
      });
    if (c) {
      i.push.apply(i, c);
    }
  }
  const l = [];
  i.forEach(function (e) {
    if (e.canBeSearch()) {
      const n = e.node.getPosition();
      const i = cc.Vec2.squaredDistance(n, t._owner.node.getPosition());
      if (i < t._cfg.edge * t._cfg.edge) {
        l.push({
          actor: e,
          sqrDis: i,
        });
      }
    }
  });
  l.sort(function (t, e) {
    return t.sqrDis - e.sqrDis;
  });
  return l.length > 0 ? l[0].actor : null;
};
e.prototype.removeWeapon = function () {
  if (this._weapon) {
    this._weapon.remove();
    this._weapon = null;
  }
};
e.prototype.release = function (t) {
  const e = this;
  this._isReleased = !0;
  const n = cc.v2(0, 0.3 * this._owner.rightHeight);
  const i = t.getBeHurtPos();
  $effectMgr.default.instance.createEffect({
    parent: this._owner.node,
    prefabName: "Weapon91",
    initPos: n,
    effectClass: $weapon91.default,
    onCreated: function (t) {
      e._weapon = t;
      e._durationTimer = e.getAttribute(
        $attrEnum.E_SkillAttrType.EXTRA_ATTR_1,
      ).value;
      e.duration = e._durationTimer;
      t.play(e, i, function () {
        e._isReleased = !1;
        e.enterCD();
      });
    },
  });
};
e.prototype.onUpdate = function (t) {
  if (this.skillCD > 0) {
    this.skillCD -= t;
    if (this.skillCD < 0) {
      this.skillCD = 0;
    }
  }
  if (this.duration > 0 && ((this.duration -= t), this.duration < 0)) {
    this.duration = 0;
    return void this.removeWeapon();
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
  if (!(this._isReleased || this.skillCD > 0)) {
    const e = this.searchTarget();
    if (e) {
      this.release(e);
    }
  }
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e._isReleased = !1;
  e._weapon = null;
  return e;
}
const u = e;
exports.Skill_91 = u;
