var i;
var a = cc._decorator;
var s = a.ccclass;
var c = a.property;
var l = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.moveSpeed = -10;
        e.minX = 0;
        e.maxX = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.updateData = function (t, e) {
        this.minX = t;
        this.maxX = e;
    };
    e.prototype.update = function (t) {
        this.updateMove(t);
    };
    e.prototype.updateMove = function (t) {
        this.node.x += this.moveSpeed * t;
        if (this.moveSpeed > 0 && this.node.x > this.maxX) {
            this.node.x = this.minX;
        }
        if (this.moveSpeed < 0 && this.node.x < this.minX) {
            this.node.x = this.maxX;
        }
    };
    __decorate(
        [
            c({
                type: cc.Integer,
                tooltip: "移动速度"
            })
        ],
        e.prototype,
        "moveSpeed",
        void 0
    );
    return __decorate([s], e);
})(cc.Component);
exports.default = l;
