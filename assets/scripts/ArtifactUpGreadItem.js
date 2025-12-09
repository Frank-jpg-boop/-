let i;
const a = cc._decorator;
const s = a.ccclass;
const c = a.property;
e.prototype.play = function (t) {
  this._callback = t;
  this.mUpGreadSp.setAnimation(0, "animation", !1);
};
e.prototype.start = function () {
  const t = this;
  this.mUpGreadSp.setCompleteListener(function () {
    if (t._callback) {
      t._callback();
    }
    t.node.destroy();
    t.node.removeFromParent();
  });
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.mUpGreadSp = null;
  e._callback = null;
  return e;
}
exports.default = l;
