import $redPointPathConfig from './RedPointPathConfig';
import $redPointMgr from './RedPointMgr';
import $animUtils from './AnimUtils';
let i;
let a;
const u = cc._decorator;
const p = u.ccclass;
const h = u.property;
!(function (t) {
  t[(t.BREATHE = 0)] = "BREATHE";
  t[(t.FLOAT = 1)] = "FLOAT";
})(a || (a = {}));
e.prototype.onDestroy = function () {
  $redPointMgr.default.instance.unRegisterRedPointChange(
    this.redPointType,
    this,
  );
};
e.prototype.onEnable = function () {
  const t = this;
  switch (t.redPointAnimType) {
    case a.BREATHE:
      t.node.scale = t._initScale;
      $animUtils.AnimUtil.breathAnim(this.node);
      break;
    case a.FLOAT:
      t.node.y = t._initY;
      $animUtils.AnimUtil.floatAnim(this.node, 0.5, 10);
  }
};
e.prototype.onLoad = function () {
  const t = this;
  t._initScale = t.node.scale;
  t._initY = t.node.y;
  t.node.active = !1;
  $redPointMgr.default.instance.registerRedPointChange(
    t.redPointType,
    function (e) {
      t.node.active = e.redPointNum > 0;
      const n = t.node.getChildByName("Num");
      if (n && n.active) {
        n.active = !0;
        n.getComponent(cc.Label).string = "" + e.redPointNum;
      }
    },
    this,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.redPointType = $redPointPathConfig.ERedPointPathName.GAME;
  e.redPointAnimType = a.BREATHE;
  e._initScale = 0;
  e._initY = 0;
  return e;
}
exports.default = f;
