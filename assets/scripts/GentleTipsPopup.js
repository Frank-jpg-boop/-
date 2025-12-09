import $popupBase from './PopupBase';
let i;
const s = cc._decorator;
const c = s.ccclass;
const l =
  (s.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._onClose = null;
      return e;
    }
    e.prototype.init = function (t) {
      this._onClose = t.onClose;
    };
    e.prototype.onClickBtnClose = function () {
      this.removeUI();
      if (this._onClose) {
        this._onClose();
      }
    };
  })($popupBase.PopupBase));
exports.default = l;
