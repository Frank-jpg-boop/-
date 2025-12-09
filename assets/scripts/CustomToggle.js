var i;
exports.CustomToggle = void 0;
(function () {
    if (cc.Toggle) {
        var t = cc.Toggle.prototype._updateCheckMark;
        cc.Toggle.prototype._updateCheckMark = function () {
            var e;
            t.call(this);
            var n = null;
            if (null === (e = this.node) || void 0 === e) {
                n = void 0;
            } else {
                n = e.getComponent("CustomToggle");
            }
            if (n) {
                n.updateCheckMark(this);
            }
        };
    }
})();
var $componentBase = require("./ComponentBase");
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = s.menu;
var p = s.requireComponent;
var h = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.unCheckMark = null;
        return e;
    }
    __extends(e, t);
    e.prototype.updateCheckMark = function (t) {
        if (this.unCheckMark) {
            this.unCheckMark.active = !t.isChecked;
        }
    };
    __decorate(
        [
            l({
                type: cc.Node
            })
        ],
        e.prototype,
        "unCheckMark",
        void 0
    );
    return __decorate([c, p(cc.Toggle), u("自定义组件/Toggle")], e);
})($componentBase.ComponentBase);
exports.CustomToggle = h;
