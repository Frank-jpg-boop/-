import $nodePoolManager from './NodePoolManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
let i;
const l = cc._decorator;
const u = l.ccclass;
const p = l.property;
e.prototype.remove = function () {
  $nodePoolManager.default.instance.putNode(this.node);
};
e.prototype.updateProgress = function (t) {
  if (t < 0) {
    t = 0;
  }
  if (t > 1) {
    t = 1;
  }
  this.spBar.fillRange = -t;
};
e.prototype.hide = function () {
  this.node.active = !1;
};
e.prototype.show = function () {
  this.node.active = !0;
};
e.prototype.init = function (t, e) {
  if (void 0 === t) {
    t = 1;
  }
  if (void 0 === e) {
    e = !0;
  }
  if (e) {
    $resLoader.ResLoader.setSpritFrame(
      this.spBar,
      $frameEnum.Frame.EBundleName.GAME,
      "textures/quality/quality_progress_" + t,
    );
  }
  this.spBar.fillRange = 0;
  this.node.active = !1;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.spBar = null;
  return e;
}
exports.default = h;
