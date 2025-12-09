import $battleMgr from './BattleMgr';
import $effectMgr from './EffectMgr';
import $spAnimEffect from './SpAnimEffect';
import $weapon71Hurt from './Weapon71Hurt';
let i;
const u = cc._decorator;
const p = u.ccclass;
const h =
  (u.property,
  (function (t) {
    function e() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    e.prototype.play = function (t, e) {
      this.playOnceAllAnim(function () {
        if (e) {
          e();
        }
      });
      const n = $battleMgr.default.instance.getCurScene();
      $effectMgr.default.instance.createEffect({
        parent: n.lowEffectParent,
        prefabName: "Weapon71Hurt",
        initPos: this.node.getPosition(),
        effectClass: $weapon71Hurt.default,
        onCreated: function (e) {
          e.play(t);
        },
      });
    };
  })($spAnimEffect.default));
exports.default = h;
