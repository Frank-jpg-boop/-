import $componentBase from './ComponentBase';
export const ZSFullFitType = {
  ALL: 0,
  WIDTH: 1,
  HEIGHT: 2
};
let a = ZSFullFitType;
const c = cc._decorator;
const l = c.ccclass;
const u = c.property;
const p = c.menu;
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
export const BgFit = h;;
