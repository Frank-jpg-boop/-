var i;
var $popupBase = require("./PopupBase");
var $battleMgr = require("./BattleMgr");
var c = cc._decorator;
var l = c.ccclass;
var u =
    (c.property,
    (function (t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        __extends(e, t);
        e.prototype.onClickBtnClose = function () {
            $battleMgr.default.instance.resetGame();
        };
        return __decorate([l], e);
    })($popupBase.PopupBase));
exports.default = u;
