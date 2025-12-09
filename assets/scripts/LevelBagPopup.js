var i;
var $popupBase = require("./PopupBase");
var $battleMgr = require("./BattleMgr");
var $bagView = require("./BagView");
var l = cc._decorator;
var u = l.ccclass;
var p = l.property;
var h = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.bagView = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function () {
        $battleMgr.default.instance.getCurScene().pause();
        this.bagView.node.active = !1;
    };
    e.prototype.onShow = function () {
        this.bagView.node.active = !0;
        this.bagView.init();
    };
    e.prototype.onHide = function () {
        $battleMgr.default.instance.getCurScene().resume();
    };
    e.prototype.onClickBtnClose = function () {
        this.removeUI();
    };
    __decorate([p($bagView.default)], e.prototype, "bagView", void 0);
    return __decorate([u], e);
})($popupBase.PopupBase);
exports.default = h;
