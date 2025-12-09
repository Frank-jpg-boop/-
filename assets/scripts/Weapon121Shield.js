import $audioUtil from './AudioUtil';
import $nodeUtil from './NodeUtil';
import $battleHurtFormulaMgr from './BattleHurtFormulaMgr';
import $battleMgr from './BattleMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $simplyCircleCollider from './SimplyCircleCollider';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $spAnimEffect from './SpAnimEffect';
import $attrEnum from './AttrEnum';
import $buffEnum from './BuffEnum';
let i;
const y = cc._decorator;
const _ = y.ccclass;
const g = y.property;
e.prototype.onRemove = function () {
  const e = this;
  this._ownerSkill.owner
    .getAttribute($attrEnum.E_AttrType.CRIT_RATE)
    .changeAddValue(-this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value);
  this.spAnimCtrls[0].clearAnim();
  this.spAnimCtrls[0].spAnim.setToSetupPose();
  this.spAnimCtrls[2].clearAnim();
  this.spAnimCtrls[2].spAnim.setToSetupPose();
  const n = $battleMgr.default.instance.getCurScene();
  const i = $nodeUtil.default.nodeParentChangeLocalPos(
    this.node,
    this._ownerSkill.owner.node.parent,
  );
  this.node.parent = n.actorTopParent;
  this.node.setPosition(i);
  const o = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value;
  if (o > 0) {
    this._ownerSkill.owner.buff.add(
      {
        buffId: $buffEnum.EBuffId.SPEED_UP,
        buffType: $buffEnum.EBuffType.SPEED_UP,
        isDebuff: !1,
        isSuperposition: !1,
        duration: this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_7).value,
        agentActor: this._ownerSkill.owner,
        parentActor: this._ownerSkill.owner,
        onRemove: null,
      },
      o,
    );
  }
  this.spAnimCtrls[1].playAnim('over', 1, !1, function () {
    e.fideOut(function () {
      t.prototype.onRemove.call(e);
    });
  });
};
e.prototype.onDefaultAnimFrameEvent = function (t, e) {
  if ('atk' == t && 'atk' == e) {
    for (
      const n = $nodeUtil.default.nodeParentChangeLocalPos(
          this.node,
          this._ownerSkill.owner.node.parent,
        ),
        i = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(n, this.collider.radius),
        o = [],
        r = 0,
        a = i;
      r < a.length;
      r++
    ) {
      const l = a[r];
      const p = $gridAreaDivisionMgr.default.instance
        .getAreaObjectList(l, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
        .filter(function (t) {
          return !o.includes(t);
        });
      if (p) {
        o.push.apply(o, p);
      }
    }
    for (const f = 0, d = o; f < d.length; f++) {
      const m = d[f];
      if (
        m.canBeHurt() &&
        !m.isDead() &&
        $simplyCollisionDetector.default.isCollisionRectToCircle(
          m.hurtColliderRect,
          this.collider.circle,
        )
      ) {
        const y = $battleHurtFormulaMgr.default.instance.skillHurt(
          this._ownerSkill.getHurtOption(),
          m,
        );
        m.beHurt(y);
      }
    }
  }
};
e.prototype.playShieldAnim = function (t) {
  this.spAnimCtrls[2].clearAnim();
  $audioUtil.AudioUtil.playEffect('sounds/lmtw_yx_MianZhao');
  this.spAnimCtrls[2].playAnim('start', 1, !1, function () {
    if (t) {
      t();
    }
  });
};
e.prototype.play = function (t) {
  const e = this;
  this._ownerSkill = t;
  const n = t.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value;
  this.collider.node.scale = n;
  this.node.getChildByName('View').scale = n;
  this.playShieldAnim(function () {
    e.spAnimCtrls[1].playAnim('stand', 1, !0);
    e.playDefaultAnim('atk', 1, !0);
  });
  this._ownerSkill.owner
    .getAttribute($attrEnum.E_AttrType.CRIT_RATE)
    .changeAddValue(t.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.collider = null;
  e._ownerSkill = null;
  return e;
}
export default v;
