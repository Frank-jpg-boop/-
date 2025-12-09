import $audioUtil from './AudioUtil';
import $battleMgr from './BattleMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $effectMgr from './EffectMgr';
import $attrEnum from './AttrEnum';
import $weapon71Atk from './Weapon71Atk';
let i;
exports.Skill_71 = void 0;
e.prototype.searchTargets = function () {
  for (
    const t = this,
          e = this._owner.node.getPosition(),
          n = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(
            e,
            this._cfg.edge,
          ),
          i = [],
          o = 0,
          r = n;
    o < r.length;
    o++
  ) {
    const a = r[o];
    const c = $gridAreaDivisionMgr.default.instance
      .getAreaObjectList(a, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
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
  return l.map(function (t) {
    return t.actor;
  });
};
e.prototype.playAttack = function (t) {
  const e = this;
  const n = $battleMgr.default.instance.getCurScene();
  $effectMgr.default.instance.createEffect({
    parent: n.actorTopParent,
    prefabName: "Weapon71Atk",
    initPos: t,
    effectClass: $weapon71Atk.default,
    onCreated: function (n) {
      n.play(e, function () {
        if (
          Math.random() <
          e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value
        ) {
          e.playAttack(t);
        }
      });
    },
  });
};
e.prototype.attack = function (t) {
  $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_ShiZiJia");
  for (
    const e = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value, n = 0;
    n < e;
    n++
  ) {
    const i = null;
    if (n >= t.length) {
      i = null;
    } else {
      i = t[n];
    }
    if (!i) {
      return;
    }
    const o = i.node.getPosition();
    this.playAttack(o);
  }
};
e.prototype.onUpdate = function (t) {
  if (this.skillCD > 0) {
    this.skillCD -= t;
    return void (this.skillCD <= 0 && (this.skillCD = 0));
  }
  const e = this.searchTargets();
  if (e.length > 0) {
    this.enterCD();
    this.attack(e);
  }
};
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const p = e;
exports.Skill_71 = p;
