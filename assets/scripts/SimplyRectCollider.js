var i;
var $simplyRect = require("./SimplyRect");
var $baseSimplyCollider = require("./BaseSimplyCollider");
var c = cc._decorator;
var l = c.ccclass;
var u = (c.property, c.menu);
var p = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "rect", {
        get: function () {
            var t = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
            var e = (this.node.angle * Math.PI) / 180;
            var n = this.node.width * this.node.scaleX;
            var i = this.node.height * this.node.scaleY;
            var o = t.clone().add(cc.v2((0.5 - this.node.anchorX) * n, (0.5 - this.node.anchorY) * i));
            t = t.clone().addSelf(o.sub(t).rotate(e));
            return new $simplyRect.default(t.x, t.y, n, i, this.node.angle);
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.drawCollider = function () {
        var t = this.rect;
        this.graphics.clear();
        this.graphics.rect(-this.node.anchorX * t.width, -this.node.anchorY * t.height, t.width, t.height);
        this.graphics.stroke();
    };
    return __decorate([l, u("SimplyCollider/SimplyRectCollider")], e);
})($baseSimplyCollider.default);
exports.default = p;
