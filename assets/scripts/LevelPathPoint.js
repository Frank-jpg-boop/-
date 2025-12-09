var $battleMgr = require("./BattleMgr");
var o = (function () {
    function t() {
        this._cfg = null;
        this._lineIds = [];
        this._dijstraMap = new Map();
    }
    Object.defineProperty(t.prototype, "roomId", {
        get: function () {
            return this._cfg.roomId;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "pointId", {
        get: function () {
            return this._cfg.id;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "linkIds", {
        get: function () {
            return this._cfg.links.slice();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "lineIds", {
        get: function () {
            return this._lineIds.slice();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "pos", {
        get: function () {
            return cc.v2(this._cfg.pos.x, this._cfg.pos.y);
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dijstraObjMap", {
        get: function () {
            return this._dijstraMap;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.init = function (t) {
        this._cfg = t;
        this._lineIds = [];
        this._dijstraMap.clear();
    };
    t.prototype.addDijstraObj = function (t, e) {
        this._dijstraMap.set(t, e);
    };
    t.prototype.addLine = function (t) {
        this._lineIds.push(t);
    };
    t.prototype.isInPoint = function (t, e) {
        if (void 0 === e) {
            e = 3;
        }
        return cc.Vec2.squaredDistance(this.pos, t) <= e * e;
    };
    t.prototype.getDirLine = function (t) {
        var e = $battleMgr.default.instance.getCurScene();
        return this._lineIds.find(function (n) {
            var i = e.level.path.getLine(n);
            return i.dir.x == t.x && i.dir.y == t.y;
        });
    };
    return t;
})();
exports.default = o;
