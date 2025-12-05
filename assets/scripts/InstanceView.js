var i;
var a = cc._decorator;
var s = a.ccclass;
var c = a.property;
var l = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mItemContent = null;
        return e;
    }
    __extends(e, t);
    __decorate([c(cc.Node)], e.prototype, "mItemContent", void 0);
    return __decorate([s], e);
})(cc.Component);
exports.default = l;
