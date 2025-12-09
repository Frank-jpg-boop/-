var i;
var a = cc._decorator;
var s = a.ccclass;
var c =
    (a.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._spBg = null;
            return e;
        }
        __extends(e, t);
        e.prototype.onLoad = function () {
            this._spBg = this.node.getChildByName("Bg").getComponent(cc.Sprite);
        };
        e.prototype.init = function () {};
        e.prototype.update = function (t) {
            this.updateMove(t);
        };
        e.prototype.updateMove = function () {};
        return __decorate([s], e);
    })(cc.Component));
exports.default = c;
