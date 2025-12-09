var i;
var a = cc._decorator;
var s = a.ccclass;
var c =
    (a.property,
    (function (t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        __extends(e, t);
        e.prototype.show = function () {
            var t = this;
            this.node.opacity = 0;
            cc.Tween.stopAllByTarget(this.node);
            var e = (Math.floor(1e3 * Math.random()) % 91) - 45;
            this.node.angle = e;
            cc.tween(this.node)
                .to(1, {
                    opacity: 255
                })
                .delay(1)
                .to(1, {
                    opacity: 0
                })
                .call(function () {
                    t.node.destroy();
                    t.node.removeFromParent();
                })
                .start();
        };
        return __decorate([s], e);
    })(cc.Component));
exports.default = c;
