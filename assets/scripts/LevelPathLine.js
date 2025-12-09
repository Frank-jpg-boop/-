var $mathUtil = require("./MathUtil");
var o = (function () {
    function t() {
        this._point1 = null;
        this._point2 = null;
        this._point1Pos = null;
        this._point2Pos = null;
        this._dir = null;
        this._lineId = "";
        this._len = 0;
        this._roomId = 0;
    }
    Object.defineProperty(t.prototype, "lineId", {
        get: function () {
            return this._lineId;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "reverseLineId", {
        get: function () {
            return this._lineId.split("|").reverse().join("|");
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dir", {
        get: function () {
            return this._dir;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "len", {
        get: function () {
            return this._len;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "startPoint", {
        get: function () {
            return this._point1;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "endPoint", {
        get: function () {
            return this._point2;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "startPos", {
        get: function () {
            return this._point1Pos.clone();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "endPos", {
        get: function () {
            return this._point2Pos.clone();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "roomId", {
        get: function () {
            return this._roomId;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "maxX", {
        get: function () {
            return Math.max(this._point1Pos.x, this._point2Pos.x);
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "minX", {
        get: function () {
            return Math.min(this._point1Pos.x, this._point2Pos.x);
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.init = function (t, e, n) {
        this._lineId = t;
        this._point1 = e;
        this._point2 = n;
        this._roomId = Math.min(e.roomId, n.roomId);
        this._point1Pos = e.pos;
        this._point2Pos = n.pos;
        var o = this._point2Pos.sub(this._point1Pos);
        this._len = o.len();
        this._dir = o.normalize();
        $mathUtil.MathUtil.vec2Fixed(this._dir);
        if (Math.abs(this._dir.x) + Math.abs(this._dir.y) != 1) {
            console.error("eroor dir:", this.lineId);
        }
    };
    t.prototype.isPosInLineSegment = function (t, e) {
        if (void 0 === e) {
            e = 8;
        }
        if (!this.isPointInBoundingBox(t, e)) {
            return !1;
        }
        if (Math.abs(this._point1Pos.x - this._point2Pos.x) < e) {
            return Math.abs(t.x - this._point1Pos.x) < e;
        }
        if (Math.abs(this._point1Pos.y - this._point2Pos.y) < e) {
            return Math.abs(t.y - this._point1Pos.y) < e;
        }
        var n = (this._point2Pos.y - this._point1Pos.y) / (this._point2Pos.x - this._point1Pos.x);
        var i = (t.y - this._point1Pos.y) / (t.x - this._point1Pos.x);
        if (Math.abs(n - i) > 0.1) {
            return !1;
        }
        var o =
            ((t.x - this._point1Pos.x) * (this._point2Pos.x - this._point1Pos.x) +
                (t.y - this._point1Pos.y) * (this._point2Pos.y - this._point1Pos.y)) /
            ((this._point2Pos.x - this._point1Pos.x) * (this._point2Pos.x - this._point1Pos.x) +
                (this._point2Pos.y - this._point1Pos.y) * (this._point2Pos.y - this._point1Pos.y));
        return o > -e && o < 1 + e;
    };
    t.prototype.isPointInBoundingBox = function (t, e) {
        if (void 0 === e) {
            e = 0.01;
        }
        var n = Math.min(this._point1Pos.x, this._point2Pos.x) - e;
        var i = Math.max(this._point1Pos.x, this._point2Pos.x) + e;
        var o = Math.min(this._point1Pos.y, this._point2Pos.y) - e;
        var r = Math.max(this._point1Pos.y, this._point2Pos.y) + e;
        return t.x >= n && t.x <= i && t.y >= o && t.y <= r;
    };
    return t;
})();
exports.default = o;
