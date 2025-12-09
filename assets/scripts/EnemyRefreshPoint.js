exports.EnemyRefreshPoint = void 0;
var i = (function () {
    function t(t) {
        this._exData = null;
        this._exData = t;
    }
    Object.defineProperty(t.prototype, "refreshId", {
        get: function () {
            return this._exData.refreshId;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "pos", {
        get: function () {
            return cc.v2(this._exData.pos.x, this._exData.pos.y);
        },
        enumerable: !1,
        configurable: !0
    });
    return t;
})();
exports.EnemyRefreshPoint = i;
