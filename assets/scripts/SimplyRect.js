var $simplyVec2 = require("./SimplyVec2");
var o = (function () {
    function t(t, e, n, i, o) {
        if (void 0 === o) {
            o = 0;
        }
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.rotation = 0;
        this.x = t;
        this.y = e;
        this.width = n;
        this.height = i;
        this.rotation = o;
    }
    Object.defineProperty(t.prototype, "center", {
        get: function () {
            return new $simplyVec2.default(this.x, this.y);
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "a1", {
        get: function () {
            return new $simplyVec2.default(this.x - this.width / 2, this.y - this.height / 2);
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "a2", {
        get: function () {
            return new $simplyVec2.default(this.x + this.width / 2, this.y - this.height / 2);
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "a3", {
        get: function () {
            return new $simplyVec2.default(this.x + this.width / 2, this.y + this.height / 2);
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "a4", {
        get: function () {
            return new $simplyVec2.default(this.x - this.width / 2, this.y + this.height / 2);
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "axisX", {
        get: function () {
            return new $simplyVec2.default(1, 0);
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "axisY", {
        get: function () {
            return new $simplyVec2.default(0, 1);
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "rA1", {
        get: function () {
            if (this.rotation % 360 == 0) {
                return this.a1;
            } else {
                return this.center.add(this.a1.sub(this.center).rotate(this.radian));
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "rA2", {
        get: function () {
            if (this.rotation % 360 == 0) {
                return this.a2;
            } else {
                return this.center.add(this.a2.sub(this.center).rotate(this.radian));
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "rA3", {
        get: function () {
            if (this.rotation % 360 == 0) {
                return this.a3;
            } else {
                return this.center.add(this.a3.sub(this.center).rotate(this.radian));
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "rA4", {
        get: function () {
            if (this.rotation % 360 == 0) {
                return this.a4;
            } else {
                return this.center.add(this.a4.sub(this.center).rotate(this.radian));
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "rAxisX", {
        get: function () {
            if (this.rotation % 360 == 0) {
                return this.axisX;
            } else {
                return this.axisX.rotate(this.radian);
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "rAxisY", {
        get: function () {
            if (this.rotation % 360 == 0) {
                return this.axisY;
            } else {
                return this.axisY.rotate(this.radian);
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "vertexs", {
        get: function () {
            return [this.a1, this.a2, this.a3, this.a4];
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "rVertexs", {
        get: function () {
            return [this.rA1, this.rA2, this.rA3, this.rA4];
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "radian", {
        get: function () {
            return (this.rotation * Math.PI) / 180;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "xMin", {
        get: function () {
            return this.x - this.width / 2;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "xMax", {
        get: function () {
            return this.x + this.width / 2;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "yMin", {
        get: function () {
            return this.y - this.height / 2;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "yMax", {
        get: function () {
            return this.y + this.height / 2;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.intersects = function (t) {
        return !(this.xMax < t.xMin || t.xMax < this.xMin || this.yMax < t.yMin || t.yMax < this.yMin);
    };
    t.prototype.containsRect = function (t) {
        return this.xMin <= t.xMin && this.xMax >= t.xMax && this.yMin <= t.yMin && this.yMax >= t.yMax;
    };
    t.prototype.contains = function (t) {
        return this.xMin <= t.x && this.xMax >= t.x && this.yMin <= t.y && this.yMax >= t.y;
    };
    return t;
})();
exports.default = o;
