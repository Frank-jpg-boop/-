var i;
var $popupBase = require("./PopupBase");
var s = cc._decorator;
var c = s.ccclass;
var l =
    (s.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._onClose = null;
            return e;
        }
        __extends(e, t);
        e.prototype.init = function (t) {
            this._onClose = t.onClose;
        };
        e.prototype.onClickBtnClose = function () {
            this.removeUI();
            if (this._onClose) {
                this._onClose();
            }
        };
        return __decorate([c], e);
    })($popupBase.PopupBase));
exports.default = l;
