var i;
var a = cc._decorator;
var s = a.ccclass;
var c = (a.property, a.menu);
var l = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        this.node.scale = cc.view.getVisibleSize().width / this.node.width;
    };
    return __decorate([s, c("自定义组件/等比适配")], e);
})(cc.Component);
exports.default = l;
