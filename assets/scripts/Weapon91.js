import $audioUtil from './AudioUtil';
import $nodeUtil from './NodeUtil';
import $effectMgr from './EffectMgr';
import $spAnimEffect from './SpAnimEffect';
import $attrEnum from './AttrEnum';
import $weapon91Fire from './Weapon91Fire';
let i;
const h = cc._decorator;
const f = h.ccclass;
const d =
  (h.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._ownerSkill = null;
      e._onRemoveFunc = null;
      e._isPlay = !1;
      e._fires = [];
      return e;
    }
    e.prototype.onInit = function () {
      t.prototype.onInit.call(this);
      this._isPlay = !1;
    };
    e.prototype.play = function (t, e, n) {
      const i = this;
      this._ownerSkill = t;
      this._onRemoveFunc = n;
      this.playDefaultAnim("stand", 1, !0);
      $audioUtil.AudioUtil.playLimitEffect("sounds/lmtw_yx_YanYanZhuoStart");
      const o = e
        .sub(
          $nodeUtil.default.nodeParentChangeLocalPos(
            this.node,
            this._ownerSkill.owner.node.parent,
          ),
        )
        .normalize();
      this.fideIn(function () {
        i._isPlay = !0;
        i.fire(o);
      });
    };
    e.prototype.fire = function (t) {
      const e = this;
      $audioUtil.AudioUtil.playLimitEffect(
        "sounds/lmtw_yx_YanYanZhuoAtk",
        3,
        !0,
      );
      for (
        const n = this._ownerSkill.getAttribute(
                  $attrEnum.E_SkillAttrType.EXTRA_ATTR_6,
                ).value,
              i = (180 * Math.atan2(t.y, t.x)) / Math.PI,
              o = n >> 1,
              r = function (t) {
                const n = i + 10 * (t - o);
                const r = cc.v2(
                  Math.cos((n * Math.PI) / 180),
                  Math.sin((n * Math.PI) / 180),
                );
                $effectMgr.default.instance.createEffect({
                  parent: s.node,
                  prefabName: "Weapon91Fire",
                  initPos: cc.v2(0, 0).add(r.mul(30)),
                  effectClass: $weapon91Fire.default,
                  onCreated: function (t) {
                    t.node.setSiblingIndex(0);
                    if (e._isRemove) {
                      t.remove();
                    } else {
                      t.play(e._ownerSkill, r);
                      e._fires.push(t);
                    }
                  },
                });
              },
              s = this,
              l = 0;
        l < n;
        l++
      ) {
        r(l);
      }
    };
    e.prototype.onRemove = function () {
      const e = this;
      $audioUtil.AudioUtil.stopEffect("lmtw_yx_YanYanZhuoAtk");
      $audioUtil.AudioUtil.playLimitEffect("sounds/lmtw_yx_YanYanZhuoOver");
      this._fires.forEach(function (t) {
        t.remove();
      });
      this._fires = [];
      if (this._onRemoveFunc) {
        this._onRemoveFunc();
      }
      this.fideOut(function () {
        t.prototype.onRemove.call(e);
      });
    };
  })($spAnimEffect.default));
exports.default = d;
