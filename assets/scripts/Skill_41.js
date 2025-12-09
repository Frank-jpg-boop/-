import $cfg from './Cfg';
import $randomUtil from './RandomUtil';
import $battleMgr from './BattleMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $effectMgr from './EffectMgr';
import $attrEnum from './AttrEnum';
import $weapon41 from './Weapon41';
let i;
export const Skill_41 = void 0;
e.prototype.onRemove = function () {
  this.removeWeapon();
  t.prototype.onRemove.call(this);
};
e.prototype.onSelectSkillEx = function (e) {
  t.prototype.onSelectSkillEx.call(this, e);
  const n = $cfg.default.instance.dataChoose.getById(e);
  if (11 == n.type && 4 === Number(n.val1)) {
    this._weapons.forEach(function (t) {
      for (const e = 0; e < Number(n.val2); e++) {
        t.addBullet();
      }
    });
  }
};
e.prototype.checkSummon = function () {
  for (
    const t = this,
      e = this._owner.node.getPosition(),
      n = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(e, this._cfg.edge),
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
        return !i.includes(t) && !t.isDead();
      });
    if (s) {
      i.push.apply(i, s);
    }
  }
  return (
    (i = i.filter(function (e) {
      const n = e.node.getPosition();
      const i = cc.Vec2.distance(n, t._owner.node.getPosition());
      return e.canBeSearch() && i <= t._cfg.edge;
    })).length > 0
  );
};
e.prototype.summonWeapon = function () {
  const t = this;
  this._isReleasing = !0;
  const e = $battleMgr.default.instance.getCurScene();
  const n = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value;
  const i = this._owner.node.getPosition().add(cc.v2(0, 50));
  this._durationTimer = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value + 0.4;
  this.duration = this._durationTimer;
  for (
    const o = function (n) {
        const o =
          i.x +
          (n % 2 == 0 ? -1 : 1) * (15 + 40 * Math.ceil((n + 1) / 2)) +
          $randomUtil.RandomUtil.randomInt(-10, 10);
        $effectMgr.default.instance.createEffect({
          parent: e.bulletParent,
          prefabName: 'Weapon41',
          initPos: i,
          effectClass: $weapon41.default,
          onCreated: function (e) {
            t._weapons.push(e);
            e.show(cc.v2(o, i.y + $randomUtil.RandomUtil.randomInt(100, 150)), t._owner, t);
          },
        });
      },
      r = 0;
    r < n;
    r++
  ) {
    o(r);
  }
};
e.prototype.removeWeapon = function () {
  this._weapons.forEach(function (t) {
    t.remove();
  });
  this._weapons = [];
  this.enterCD();
  this._isReleasing = !1;
};
e.prototype.onUpdate = function (t) {
  if (this.skillCD > 0) {
    return ((this.skillCD -= t), void (this.skillCD <= 0 && (this.skillCD = 0)));
  } else {
    if (this.duration > 0) {
      return (
        (this.duration -= t),
        void (this.duration <= 0 && ((this.duration = 0), this.removeWeapon()))
      );
    } else {
      return void (this._isReleasing || (this.checkSummon() && this.summonWeapon()));
    }
  }
};
e.prototype.onInit = function () {
  t.prototype.onInit.call(this);
  this._durationTimer = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value;
  this._weapons = [];
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e._isReleasing = !1;
  e._weapons = [];
  return e;
}
const h = e;
export const Skill_41 = h;
