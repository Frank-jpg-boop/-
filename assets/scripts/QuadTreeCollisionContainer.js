var i;
exports.EQuadTreeCollisionGroup = void 0;
var a;
var $quadTree = require("./QuadTree");
!(function (t) {
    t[(t.WeaponBullet = 1)] = "WeaponBullet";
    t[(t.Enemy = 2)] = "Enemy";
})((a = exports.EQuadTreeCollisionGroup || (exports.EQuadTreeCollisionGroup = {})));
var c = cc._decorator;
var l = c.ccclass;
var u = c.property;
var p = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.isGraphicsItemRect = !1;
        e.graphics = null;
        e._rect = null;
        e.items = null;
        e.quadTree = null;
        e.updateCount = 0;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "rect", {
        get: function () {
            return this._rect;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onLoad = function () {
        this.items = [];
        if (this.isGraphicsItemRect) {
            this.graphics = this.node.addComponent(cc.Graphics);
        }
    };
    e.prototype.update = function () {};
    e.prototype.init = function () {
        var t = this;
        this.items = [];
        t._rect = t.node.getBoundingBoxToWorld();
        t.canCollisionMap = new Map();
        t.quadTree = new $quadTree.QuadTree.QuadTree(t._rect);
        t.canCollisionMap.set(a.WeaponBullet, [a.Enemy]);
        t.canCollisionMap.set(a.Enemy, [a.WeaponBullet]);
    };
    e.prototype.addItem = function (t) {
        this.items.push(t);
    };
    e.prototype.removeItem = function (t) {
        var e = this.items.indexOf(t);
        if (-1 != e) {
            this.items.splice(e, 1);
        }
    };
    e.prototype.updateQuadTree = function () {
        var t = this;
        if (t.quadTree && (t.updateCount++, !(t.updateCount <= 3))) {
            t.updateCount = 0;
            t.quadTree.clear();
            if (t.isGraphicsItemRect) {
                t.graphics.clear();
                t.graphics.strokeColor = cc.color(255, 0, 0, 150);
            }
            for (var e = 0, n = t.items.length; e < n; ++e) {
                var i = t.items[e].itemRect;
                t.quadTree.insert(i);
                if (t.isGraphicsItemRect) {
                    t.graphics.rect(i.x, i.y, i.width, i.height);
                }
            }
            if (t.isGraphicsItemRect) {
                t.graphics.stroke();
            }
        }
    };
    e.prototype.getCollisionList = function (t) {
        var e = this.canCollisionMap.get(t.group);
        return this.quadTree.retrieve(t.itemRect, e).map(function (t) {
            return t.item;
        });
    };
    e.prototype.clearItem = function () {
        this.items = [];
    };
    __decorate(
        [
            u({
                tooltip: "开启绘制包围盒测试"
            })
        ],
        e.prototype,
        "isGraphicsItemRect",
        void 0
    );
    return __decorate([l], e);
})(cc.Component);
exports.default = p;
