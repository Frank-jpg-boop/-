import $appBase from './AppBase';
import $componentBase from './ComponentBase';
let i;
exports.CustomWidget = void 0;
const c = cc._decorator;
const l = c.ccclass;
const u = c.property;
const p = c.menu;
const h = c.requireComponent;
e.prototype.setWidget = function () {
  const t = this.node.getComponent(cc.Widget);
  const e = cc.view.getFrameSize();
  if (e.height / e.width > 1) {
    t.top = this._borderMargin;
  } else {
    t.left = this._borderMargin;
  }
  t.updateAlignment();
};
e.prototype.onEnable = function () {
  t.prototype.onEnable.call(this);
  if (this.bar) {
    if (this.delay) {
      this.scheduleOnce(this.setWidget, this.delayTime);
    } else {
      this.setWidget();
    }
  }
};
e.prototype.onLoad = function () {
  t.prototype.onLoad.call(this);
  const e = cc.view.getFrameSize();
  const n = this.node.getComponent(cc.Widget);
  const i = e.height / e.width;
  if (i > 1) {
    this._borderMargin = n.top;
  } else {
    this._borderMargin = n.left;
  }
  if (this.bar && (i > 2 || i < 0.5)) {
    const o = $appBase.AppBase.getSystemInfoSync();
    const r = o.safeArea;
    const s = o.statusBarHeight;
    if (0 === s && r) {
      s = r.top || r.left;
    }
    let c;
    const l = cc.winSize;
    if (i > 1) {
      c = (s / e.height) * l.height;
    } else {
      c = (s / e.width) * l.width;
    }
    if (this.customMargin) {
      this._borderMargin = this.margin + c;
    } else {
      this._borderMargin += c;
    }
    this.setWidget();
  } else {
    this.bar = !1;
  }
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.bar = !1;
  e.customMargin = !1;
  e.margin = 0;
  e.delay = !1;
  e.delayTime = 1;
  e._borderMargin = 0;
  return e;
}
exports.CustomWidget = f;
