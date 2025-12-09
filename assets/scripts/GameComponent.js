import $componentBase from './ComponentBase';
import $timeUtil from './TimeUtil';
import $appBase from './AppBase';
let i;
exports.GameComponent = void 0;
const l = (require("./CommonUtil"), cc._decorator);
const u = l.ccclass;
const p = l.property;
e.prototype.showDebugInfo = function () {
  const t = $timeUtil.TimeUtil.getTime();
  if (0 != this.multiTouchTime && t - this.multiTouchTime > 1e3) {
    this.multiTouchCount = 0;
  }
  this.multiTouchTime = t;
  this.multiTouchCount++;
  if (this.multiTouchCount < 10) {
    //
  } else {
    this.multiTouchCount = 0;
  }
};
e.prototype.onHide = function () {};
e.prototype.onShow = function () {};
e.prototype.onDestroy = function () {
  $appBase.AppBase.offShow(this.onShow);
  $appBase.AppBase.offHide(this.onHide);
  t.prototype.onDestroy.call(this);
};
e.prototype.start = function () {
  t.prototype.start.call(this);
  this.clickRect = cc.rect(
    0,
    cc.winSize.height - this.debugArea,
    cc.winSize.width,
    this.debugArea,
  );
};
e.prototype.onLoad = function () {
  t.prototype.onLoad.call(this);
  cc.game.addPersistRootNode(this.node);
  this.schedule(function () {}, 1);
  $appBase.AppBase.onShow(this.onShow);
  $appBase.AppBase.onHide(this.onHide);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.debugArea = 200;
  e.multiTouchCount = 0;
  e.multiTouchTime = 0;
  e.clickRect = null;
  return e;
}
exports.GameComponent = h;
