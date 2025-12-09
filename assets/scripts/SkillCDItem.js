import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
let i;
const c = cc._decorator;
const l = c.ccclass;
const u = c.property;
e.prototype.updateDuration = function (t) {
  this.spDuration.node.active = t > 0;
  this.spDuration.fillRange = t;
};
e.prototype.updateCd = function (t) {
  this.spCd.node.active = t > 0;
  this.spCd.fillRange = t;
};
e.prototype.init = function (t) {
  const e = Math.floor(t / 10);
  $resLoader.ResLoader.setSpritFrame(
    this.spIcon,
    $frameEnum.Frame.EBundleName.GAME,
    "textures/skill/IconM_ski" + e,
  );
  this.spCd.node.active = !1;
  this.spDuration.node.active = !1;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.spIcon = null;
  e.spCd = null;
  e.spDuration = null;
  return e;
}
exports.default = p;
