import $popupBase from './PopupBase';
import $battleMgr from './BattleMgr';
import $bagView from './BagView';
let i;
const l = cc._decorator;
const u = l.ccclass;
const p = l.property;
e.prototype.onClickBtnClose = function () {
  this.removeUI();
};
e.prototype.onHide = function () {
  $battleMgr.default.instance.getCurScene().resume();
};
e.prototype.onShow = function () {
  this.bagView.node.active = !0;
  this.bagView.init();
};
e.prototype.init = function () {
  $battleMgr.default.instance.getCurScene().pause();
  this.bagView.node.active = !1;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.bagView = null;
  return e;
}
exports.default = h;
