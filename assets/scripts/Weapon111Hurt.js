import $nodeUtil from './NodeUtil';
import $battleHurtFormulaMgr from './BattleHurtFormulaMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $simplyRectCollider from './SimplyRectCollider';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $spAnimEffect from './SpAnimEffect';
import $attrEnum from './AttrEnum';
import $buffEnum from './BuffEnum';
let i;
const d = cc._decorator;
const m = d.ccclass;
const y = d.property;
e.prototype.onRemove = function () {
  const e = this;
  this.fideOut(function () {
    t.prototype.onRemove.call(e);
  });
};
e.prototype.checkCollision = function (t) {
  for (
    const e = $nodeUtil.default.nodeParentChangeLocalPos(this.collider.node, this.node.parent),
      n = new cc.Rect(
        e.x - this.collider.node.width / 2,
        e.y - this.collider.node.height / 2,
        this.collider.node.width,
        this.collider.node.height,
      ),
      i = $gridAreaDivisionMgr.default.instance.getRectAreaKeys(n),
      o = [],
      r = 0,
      l = i;
    r < l.length;
    r++
  ) {
    const p = l[r];
    const d = $gridAreaDivisionMgr.default.instance
      .getAreaObjectList(p, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
      .filter(function (t) {
        return !o.includes(t);
      });
    if (d) {
      o.push.apply(o, d);
    }
  }
  for (const m = 0, y = o; m < y.length; m++) {
    const _ = y[m];
    if (
      _.canBeHurt() &&
      !_.isDead() &&
      $simplyCollisionDetector.default.isCollisionRectToRect(this.collider.rect, _.hurtColliderRect)
    ) {
      const g = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_7).value;
      if (t) {
        const v = $battleHurtFormulaMgr.default.instance.skillHurt(
          this._ownerSkill.getHurtOption(),
          _,
        );
        _.beHurt(v);
        if (_.isDead() && g > 0) {
          const b = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value;
          this._ownerSkill.owner.beRecover(b * g);
        }
      }
      const E = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_8).value;
      const S =
        this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value *
        this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value;
      if (E > 0) {
        _.buff.add(
          {
            buffId: $buffEnum.EBuffId.POISON,
            buffType: $buffEnum.EBuffType.POISON,
            isDebuff: !0,
            isSuperposition: !1,
            duration: E,
            parentActor: _,
            agentActor: this._ownerSkill.owner,
            onRemove: null,
          },
          S,
          g,
        );
      }
    }
  }
};
e.prototype.onUpdate = function (t) {
  if (this._isCheck) {
    this._duration -= t;
    if (this._duration <= 0) {
      return void this.remove();
    }
    if (this._addRangeSpeed > 0) {
      this.node.getChildByName('View').scaleX += this._addRangeSpeed * t;
      this.updateCollider();
    }
    this._checkTime -= t;
    if (this._checkTime <= 0) {
      this._checkTime = 0.1;
      this.checkCollision(!1);
    }
  }
};
e.prototype.updateCollider = function () {
  const t = this.node.getChildByName('View');
  this.collider.node.width = t.scaleX * t.width;
  this.collider.node.height = t.scaleY * t.height;
};
e.prototype.play = function (t) {
  const e = this;
  this._ownerSkill = t;
  this.node.getChildByName('View').scaleX = t.getAttribute(
    $attrEnum.E_SkillAttrType.EXTRA_ATTR_4,
  ).value;
  this._addRangeSpeed = t.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value;
  this.updateCollider();
  this._duration = t.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value;
  this.scheduleOnce(function () {
    e.checkCollision(!0);
  }, 0.1);
  this.playDefaultAnim(
    'atk',
    1,
    !1,
    function () {
      e.playDefaultAnim('atk_stand', 1, !0);
      e._isCheck = !0;
    },
    !1,
  );
};
e.prototype.onInit = function () {
  t.prototype.onInit.call(this);
  this.node.getChildByName('View').scale = 1;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.collider = null;
  e._ownerSkill = null;
  e._duration = 0;
  e._isCheck = !1;
  e._checkTime = 0;
  e._addRangeSpeed = 0;
  return e;
}
export default _;
