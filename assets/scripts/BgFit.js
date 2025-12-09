import $componentBase from './ComponentBase';
let i;
exports.BgFit = exports.ZSFullFitType = void 0;
let a;
const c = cc._decorator;
const l = c.ccclass;
const u = c.property;
const p = c.menu;
!(function (t) {
  t[(t.ALL = 0)] = "ALL";
  t[(t.WIDTH = 1)] = "WIDTH";
  t[(t.HEIGHT = 2)] = "HEIGHT";
})((a = exports.ZSFullFitType || (exports.ZSFullFitType = {})));
e.prototype.onLoad = function () {
  const t = cc.winSize;
  const e = 1;
  const n = 1;
  if (a.WIDTH !== this.fitType && a.ALL !== this.fitType) {
    //
  } else {
    e = t.width / this.node.width;
  }
  if (a.HEIGHT !== this.fitType && a.ALL !== this.fitType) {
    //
  } else {
    n = t.height / this.node.height;
  }
  if (this.fit) {
    this.node.scale = Math.max(e, n);
  } else {
    this.node.scaleX = e;
    this.node.scaleY = n;
  }
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.fitType = a.ALL;
  e.fit = !0;
  return e;
}
exports.BgFit = h;
