var i;
var $nodePoolManager = require("./NodePoolManager");
var $animUtils = require("./AnimUtils");
var c = cc._decorator;
var l = c.ccclass;
var u = c.property;
var p = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lDesc = null;
        return e;
    }
    __extends(e, t);
    e.prototype.show = function (t) {
        this.lDesc.string = t;
        this.node.opacity = 0;
        cc.tween(this.node)
            .to(0.5, {
                opacity: 255
            })
            .start();
        var e = this.node.getChildByName("View");
        e.y = 0;
        $animUtils.AnimUtil.floatAnim(e, 1, 15);
    };
    e.prototype.hide = function () {
        var t = this;
        cc.tween(this.node)
            .to(0.5, {
                opacity: 0
            })
            .call(function () {
                t.remove();
            })
            .start();
    };
    e.prototype.remove = function () {
        $nodePoolManager.default.instance.putNode(this.node);
    };
    __decorate([u(cc.Label)], e.prototype, "lDesc", void 0);
    return __decorate([l], e);
})(cc.Component);
exports.default = p;
