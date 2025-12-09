import $nodePoolManager from './NodePoolManager';
import $animUtils from './AnimUtils';
let i;
const c = cc._decorator;
const l = c.ccclass;
const u = c.property;
e.prototype.remove = function () {
  $nodePoolManager.default.instance.putNode(this.node);
};
e.prototype.hide = function () {
  const t = this;
  cc.tween(this.node)
    .to(0.5, {
      opacity: 0,
    })
    .call(function () {
      t.remove();
    })
    .start();
};
e.prototype.show = function (t) {
  this.lDesc.string = t;
  this.node.opacity = 0;
  cc.tween(this.node)
    .to(0.5, {
      opacity: 255,
    })
    .start();
  const e = this.node.getChildByName('View');
  e.y = 0;
  $animUtils.AnimUtil.floatAnim(e, 1, 15);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lDesc = null;
  return e;
}
export default p;
