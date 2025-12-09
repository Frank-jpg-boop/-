import $popupBase from './PopupBase';
let i;
const s = cc._decorator;
const c = s.ccclass;
const l = s.property;
e.prototype.onShow = function () {
  this.mBoxSp.setSkin("skin" + this._skinId);
  this.mBoxSp.setAnimation(0, "animation", !1);
};
e.prototype.init = function (t) {
  const e = this;
  this._callbackFunc = t.callback;
  this._skinId = t.skinId;
  this.mBoxSp.setCompleteListener(function () {
    if (e._callbackFunc) {
      e._callbackFunc();
    }
    e.removeUI();
  });
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.mBoxSp = null;
  e._callbackFunc = null;
  e._skinId = 0;
  return e;
}
exports.default = u;
