var i;
var $simplyCircle = require("./SimplyCircle");
var $baseSimplyCollider = require("./BaseSimplyCollider");
var c = cc._decorator;
var l = c.ccclass;
var u = c.property;
var p = c.menu;
var h = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.vec2Offset = cc.Vec2.ZERO;
        e.radius = 0;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "offset", {
        set: function (t) {
            this.vec2Offset = t;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "circle", {
        get: function () {
            var t = this.node.convertToWorldSpaceAR(this.vec2Offset);
            return new $simplyCircle.default(t.x, t.y, this.radius * this.node.scale);
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.drawCollider = function () {
        this.graphics.clear();
        this.graphics.circle(this.vec2Offset.x, this.vec2Offset.y, this.radius);
        this.graphics.stroke();
    };
    __decorate([u(cc.Vec2)], e.prototype, "vec2Offset", void 0);
    __decorate(
        [
            u({
                type: cc.Integer
            })
        ],
        e.prototype,
        "radius",
        void 0
    );
    return __decorate([l, p("SimplyCollider/SimplyCircleCollider")], e);
})($baseSimplyCollider.default);
exports.default = h;
