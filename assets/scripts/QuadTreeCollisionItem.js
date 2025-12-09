var i;
var $quadTreeCollisionContainer = require("./QuadTreeCollisionContainer");
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nCollisionBox = null;
        e.group = $quadTreeCollisionContainer.EQuadTreeCollisionGroup.WeaponBullet;
        e._worldRect = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        this._worldRect = new cc.Rect();
        this._worldRect.width = this.nCollisionBox.width;
        this._worldRect.height = this.nCollisionBox.height;
    };
    Object.defineProperty(e.prototype, "itemRect", {
        get: function () {
            var t = this.worldRect;
            return {
                x: t.x,
                y: t.y,
                width: t.width,
                height: t.height,
                group: this.group,
                item: this
            };
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "worldRect", {
        get: function () {
            var t = this.nCollisionBox.convertToWorldSpaceAR(cc.v2());
            this._worldRect.x = t.x;
            this._worldRect.y = t.y;
            return this._worldRect;
        },
        enumerable: !1,
        configurable: !0
    });
    __decorate([l(cc.Node)], e.prototype, "nCollisionBox", void 0);
    __decorate(
        [
            l({
                type: cc.Enum($quadTreeCollisionContainer.EQuadTreeCollisionGroup)
            })
        ],
        e.prototype,
        "group",
        void 0
    );
    return __decorate([c], e);
})(cc.Component);
exports.default = u;
