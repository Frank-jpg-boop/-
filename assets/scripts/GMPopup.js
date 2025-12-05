var i;
var $popupBase = require("./PopupBase");
var s = cc._decorator;
var c = s.ccclass;
var l =
    (s.property,
    (function (t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        __extends(e, t);
        e.prototype.init = function () {};
        return __decorate([c], e);
    })($popupBase.PopupBase));
exports.default = l;
