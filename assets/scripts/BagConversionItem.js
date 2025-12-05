var i;
var a = cc._decorator;
var s = a.ccclass;
var c = a.property;
var l = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nIconView = null;
        e.lValue = null;
        return e;
    }
    __extends(e, t);
    e.prototype.show = function () {
        this.node.active = !0;
    };
    e.prototype.hide = function () {
        this.node.active = !1;
    };
    e.prototype.updateView = function (t, e) {
        var n = [200, 201, 81, 82, 83];
        var i = this.nIconView.childrenCount;
        this.nIconView.children.forEach(function (e, o) {
            if (n.includes(t)) {
                e.active = t == n[o];
            } else {
                e.active = o == i - 1;
            }
        });
        this.lValue.node.active = n.includes(t);
        if (0 != e) {
            this.lValue.string = e.toString();
        }
    };
    __decorate([c(cc.Node)], e.prototype, "nIconView", void 0);
    __decorate([c(cc.Label)], e.prototype, "lValue", void 0);
    return __decorate([s], e);
})(cc.Component);
exports.default = l;
