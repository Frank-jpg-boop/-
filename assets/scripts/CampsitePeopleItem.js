var i;
var a = cc._decorator;
var s = a.ccclass;
var c = a.property;
var l = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mRoleSp = null;
        e.mDamond = null;
        e._roomItem = null;
        e._isJoinRoom = !1;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "isJoinRoom", {
        get: function () {
            return this._isJoinRoom;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.joinRoom = function (t, e) {
        var n = this;
        this.mDamond.active = !1;
        this._roomItem = t;
        if (e) {
            cc.Tween.stopAllByTarget(this.node);
            this.node.position = e;
            cc.tween(this.node)
                .to(0.15, {
                    position: cc.v3(e.x, -19)
                })
                .call(function () {
                    n.move();
                })
                .start();
        } else {
            var i = -t.width / 2 + (Math.floor(1e3 * Math.random()) % t.width);
            e = cc.v3(i, -19);
            this.node.position = e;
            this.move();
        }
    };
    e.prototype.move = function () {
        var t = this;
        var e = -this._roomItem.width / 2 + (Math.floor(1e3 * Math.random()) % this._roomItem.width);
        var n = cc.v3(e, this.node.y);
        var i = (this.distance(this.node.position, n) / 100) * 0.5;
        cc.Tween.stopAllByTarget(this.node);
        this.mRoleSp.setAnimation(0, "run", !0);
        var o = (Math.floor(1e4 * Math.random()) % 16) + 5;
        cc.tween(this.node)
            .to(i, {
                position: n
            })
            .call(function () {
                t.mRoleSp.setAnimation(0, "bide", !0);
            })
            .delay(o / 10)
            .call(function () {
                t.move();
            })
            .start();
    };
    e.prototype.distance = function (t, e) {
        var n = t.x - e.x;
        var i = t.y - e.y;
        return Math.sqrt(n * n + i * i);
    };
    __decorate([c(sp.Skeleton)], e.prototype, "mRoleSp", void 0);
    __decorate([c(cc.Node)], e.prototype, "mDamond", void 0);
    return __decorate([s], e);
})(cc.Component);
exports.default = l;
