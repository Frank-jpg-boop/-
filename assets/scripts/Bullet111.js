import $audioUtil from './AudioUtil';
import $randomUtil from './RandomUtil';
import $battleMgr from './BattleMgr';
import $effectMgr from './EffectMgr';
import $weapon111Hurt from './Weapon111Hurt';
import $bulletBase from './BulletBase';
let i;
const h = cc._decorator;
const f = h.ccclass;
const d =
  (h.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._ownerSkill = null;
      return e;
    }
    e.prototype.onShoot = function (t, e) {
      const n = this;
      this._ownerSkill = t;
      const i = this.node.getPosition();
      const o = e.clone();
      const r = cc.v2(
        i.x + 0.4 * (o.x - i.x),
        i.y + $randomUtil.RandomUtil.randomInt(180, 250),
      );
      this.bezierTo(i, r, o, 0.4, !0, function () {
        n.blast();
      });
    };
    e.prototype.blast = function () {
      const t = this;
      $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_ShenBei");
      const e = $battleMgr.default.instance.getCurScene();
      $effectMgr.default.instance.createEffect({
        parent: e.lowEffectParent,
        prefabName: "Weapon111Hurt",
        initPos: this.node.getPosition(),
        effectClass: $weapon111Hurt.default,
        onCreated: function (e) {
          e.play(t._ownerSkill);
        },
      });
    };
  })($bulletBase.default));
exports.default = d;
