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
        e.prototype.setDialogueMsg = function (t) {
            this.node.getChildByName("des").getComponent(cc.Label).string = t;
        };
        return __decorate([s], e);
    })(cc.Component));
exports.default = c;
