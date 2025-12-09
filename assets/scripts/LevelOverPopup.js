import $popupBase from './PopupBase';
import $battleMgr from './BattleMgr';
let i;
const c = cc._decorator;
const l = c.ccclass;
const u =
  (c.property,
  (function (t) {
    function e() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    e.prototype.onClickBtnClose = function () {
      $battleMgr.default.instance.resetGame();
    };
  })($popupBase.PopupBase));
export default u;
