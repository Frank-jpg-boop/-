let i;
const a = cc._decorator;
const s = a.ccclass;
const c = a.property;
e.prototype.updateView = function (t, e) {
  const n = [200, 201, 81, 82, 83];
  const i = this.nIconView.childrenCount;
  this.nIconView.children.forEach(function (e, o) {
    if (n.includes(t)) {
      e.active = t == n[o];
    } else {
      e.active = o == i - 1;
    }
  });
  this.lValue.node.active = n.includes(t);
  if (0 != e) {
    this.lValue.string = e.toString();
  }
};
e.prototype.hide = function () {
  this.node.active = !1;
};
e.prototype.show = function () {
  this.node.active = !0;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nIconView = null;
  e.lValue = null;
  return e;
}
exports.default = l;
