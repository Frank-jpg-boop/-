var i;
var a = cc._decorator;
var s = a.ccclass;
var c = a.property;
var l = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.isDrawCollider = !1;
        e.graphics = null;
        return e;
    }
    __extends(e, t);
    e.prototype.start = function () {
        if (this.isDrawCollider) {
            var t = new cc.Node("DrawNode");
            t.zIndex = cc.macro.MAX_ZINDEX;
            this.node.addChild(t);
            this.graphics = t.addComponent(cc.Graphics);
            this.graphics.lineWidth = 5;
            this.graphics.strokeColor = cc.Color.RED;
            this.drawCollider();
        }
    };
    e.prototype.update = function () {
        if (this.isDrawCollider) {
            this.drawCollider();
        }
    };
    e.prototype.drawCollider = function () {};
    __decorate([c()], e.prototype, "isDrawCollider", void 0);
    return __decorate([s], e);
})(cc.Component);
exports.default = l;
