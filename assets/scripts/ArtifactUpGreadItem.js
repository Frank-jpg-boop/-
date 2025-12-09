var i;
var a = cc._decorator;
var s = a.ccclass;
var c = a.property;
var l = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mUpGreadSp = null;
        e._callback = null;
        return e;
    }
    __extends(e, t);
    e.prototype.start = function () {
        var t = this;
        this.mUpGreadSp.setCompleteListener(function () {
            if (t._callback) {
                t._callback();
            }
            t.node.destroy();
            t.node.removeFromParent();
        });
    };
    e.prototype.play = function (t) {
        this._callback = t;
        this.mUpGreadSp.setAnimation(0, "animation", !1);
    };
    __decorate([c(sp.Skeleton)], e.prototype, "mUpGreadSp", void 0);
    return __decorate([s], e);
})(cc.Component);
exports.default = l;
