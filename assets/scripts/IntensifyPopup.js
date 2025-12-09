var i;
var $eventManager = require("./EventManager");
var $popupBase = require("./PopupBase");
var $homeEnum = require("./HomeEnum");
var l = cc._decorator;
var u = l.ccclass;
var p =
    (l.property,
    (function (t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        __extends(e, t);
        e.prototype.onClickBtnGotoBuild = function () {
            this.removeUI();
            $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 1);
        };
        e.prototype.onClickBtnGotoShop = function () {
            this.removeUI();
            $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 0);
        };
        e.prototype.onClickBtnGotoBattle = function () {
            this.removeUI();
            $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 2);
        };
        e.prototype.onClickBtnClose = function () {
            this.removeUI();
        };
        return __decorate([u], e);
    })($popupBase.PopupBase));
exports.default = p;
