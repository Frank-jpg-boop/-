import $eventManager from './EventManager';
import $popupBase from './PopupBase';
import $homeEnum from './HomeEnum';
let i;
const l = cc._decorator;
const u = l.ccclass;
const p =
  (l.property,
  (function (t) {
    function e() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    e.prototype.onClickBtnGotoBuild = function () {
      this.removeUI();
      $eventManager.EventManager.instance.emit(
        $homeEnum.EHomeEvent.GOTO_PAGE,
        1,
      );
    };
    e.prototype.onClickBtnGotoShop = function () {
      this.removeUI();
      $eventManager.EventManager.instance.emit(
        $homeEnum.EHomeEvent.GOTO_PAGE,
        0,
      );
    };
    e.prototype.onClickBtnGotoBattle = function () {
      this.removeUI();
      $eventManager.EventManager.instance.emit(
        $homeEnum.EHomeEvent.GOTO_PAGE,
        2,
      );
    };
    e.prototype.onClickBtnClose = function () {
      this.removeUI();
    };
  })($popupBase.PopupBase));
exports.default = p;
