import $battleHurtFormulaMgr from './BattleHurtFormulaMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $simplyCircleCollider from './SimplyCircleCollider';
import $spAnimEffect from './SpAnimEffect';
import $attrEnum from './AttrEnum';
import $buffEnum from './BuffEnum';
import $enemyBase from './EnemyBase';
let i;
const f = cc._decorator;
const d = f.ccclass;
const m = f.property;
e.prototype.checkBlastHurt = function (t, e) {
  for (
    const n = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(t, e), i = [], o = 0, r = n;
    o < r.length;
    o++
  ) {
    const c = r[o];
    const l = $gridAreaDivisionMgr.default.instance
      .getAreaObjectList(c, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
      .filter(function (t) {
        return !i.includes(t);
      });
    if (l) {
      i.push.apply(i, l);
    }
  }
  for (const f = 0, d = i; f < d.length; f++) {
    const m = d[f];
    if (m.canBeHurt() && !m.isDead() && cc.Vec2.squaredDistance(t, m.node.getPosition()) <= e * e) {
      const y = $battleHurtFormulaMgr.default.instance.skillHurt(
        this._ownerSkill.getHurtOption(),
        m,
      );
      m.beHurt(y);
      const _ = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value;
      const g = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value;
      if (_ > 0) {
        m.buff.add(
          {
            buffId: $buffEnum.EBuffId.SLOW_DOWN,
            buffType: $buffEnum.EBuffType.SLOW_DOWN,
            isDebuff: !0,
            isSuperposition: !1,
            duration: _,
            parentActor: m,
            agentActor: this._ownerSkill.owner,
            onRemove: null,
          },
          g,
        );
      }
      if (
        Math.random() <
          this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value &&
        m instanceof $enemyBase.default
      ) {
        m.buff.add(
          {
            buffId: $buffEnum.EBuffId.FROZEN,
            buffType: $buffEnum.EBuffType.FROZEN,
            isDebuff: !0,
            isSuperposition: !1,
            duration: this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_8).value,
            parentActor: m,
            agentActor: this._ownerSkill.owner,
            onRemove: null,
          },
          this._ownerSkill,
        );
      }
    }
  }
};
e.prototype.play = function (t, e) {
  const n = this;
  this._ownerSkill = t;
  const i = t.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value;
  this.node.getChildByName('View').scale = i;
  this.collider.node.scale = i;
  this.playDefaultAnim(e ? 'atk' : 'atk2', 1, !1);
  this.scheduleOnce(function () {
    n.checkBlastHurt(n.node.getPosition(), n.collider.radius);
  }, 0.1);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.collider = null;
  e._ownerSkill = null;
  return e;
}
export default y;
