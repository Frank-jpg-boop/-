import $audioUtil from './AudioUtil';
import $randomUtil from './RandomUtil';
import $battleMgr from './BattleMgr';
import $effectMgr from './EffectMgr';
import $attrEnum from './AttrEnum';
import $weapon101Boom from './Weapon101Boom';
import $bulletBase from './BulletBase';
let i;
const f = cc._decorator;
const d = f.ccclass;
const m =
  (f.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._ownerSkill = null;
      e._bounceCount = 0;
      e._maxBounceCount = 0;
      return e;
    }
    e.prototype.onShoot = function (t, e) {
      this._ownerSkill = t;
      this._maxBounceCount = this._ownerSkill.getAttribute(
        $attrEnum.E_SkillAttrType.EXTRA_ATTR_4,
      ).value;
      this._bounceCount = this._maxBounceCount;
      this.bounce(e);
    };
    e.prototype.bounce = function (t) {
      const e = this;
      const n = this.node.getPosition();
      const i = t.clone();
      const o = this._maxBounceCount - this._bounceCount;
      const r = cc.v2(
        n.x + 0.6 * (i.x - n.x),
        n.y + $randomUtil.RandomUtil.randomInt(150, 200) * Math.max(0.2, 1 - 0.2 * o),
      );
      this.bezierTo(
        n,
        r,
        i,
        Math.max(0.1, 0.5 * (1 - 0.2 * o)),
        !1,
        function () {
          e._bounceCount--;
          if (e._bounceCount > 0) {
            t.x += (t.x > n.x ? 1 : -1) * Math.max(0.3, 1 - 0.2 * o) * 100;
            e.bounce(t);
          }
          e.blast(0 == e._bounceCount);
        },
        '',
        null,
        1 == this._bounceCount,
      );
    };
    e.prototype.blast = function (t) {
      const e = this;
      $audioUtil.AudioUtil.playEffect('sounds/lmtw_yx_MuDiaoXiang');
      const n = $battleMgr.default.instance.getCurScene();
      $effectMgr.default.instance.createEffect({
        parent: n.effectParent,
        prefabName: 'Weapon101Boom',
        initPos: this.node.getPosition(),
        effectClass: $weapon101Boom.default,
        onCreated: function (n) {
          n.play(e._ownerSkill, t);
        },
      });
    };
  })($bulletBase.default));
export default m;
