import $nodePoolManager from './NodePoolManager';
let i;
const s = cc._decorator;
const c = s.ccclass;
const l = s.property;
e.prototype.popup = function (t) {
  const e = this;
  this.lValue.string = t;
  this.anim.stop();
  this.anim.play();
  this.anim.once(
    cc.Animation.EventType.FINISHED,
    function () {
      $nodePoolManager.default.instance.putNode(e.node);
    },
    this,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lValue = null;
  e.anim = null;
  return e;
}
export default u;
