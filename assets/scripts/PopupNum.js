var i;
var $nodePoolManager = require("./NodePoolManager");
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lValue = null;
        e.anim = null;
        return e;
    }
    __extends(e, t);
    e.prototype.popup = function (t) {
        var e = this;
        this.lValue.string = t;
        this.anim.stop();
        this.anim.play();
        this.anim.once(
            cc.Animation.EventType.FINISHED,
            function () {
                $nodePoolManager.default.instance.putNode(e.node);
            },
            this
        );
    };
    __decorate([l(cc.Label)], e.prototype, "lValue", void 0);
    __decorate([l(cc.Animation)], e.prototype, "anim", void 0);
    return __decorate([c], e);
})(cc.Component);
exports.default = u;
