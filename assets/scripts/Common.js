exports.RVOMath = exports.KeyValuePair = exports.Line = exports.Obstacle = exports.Vector2 = void 0;
var i = (function () {
    function t(t, e) {
        this.x = 0;
        this.y = 0;
        this.x = t;
        this.y = e;
    }
    t.prototype.plus = function (e) {
        return new t(this.x + e.x, this.y + e.y);
    };
    t.prototype.minus = function (e) {
        return new t(this.x - e.x, this.y - e.y);
    };
    t.prototype.multiply = function (t) {
        return this.x * t.x + this.y * t.y;
    };
    t.prototype.scale = function (e) {
        return new t(this.x * e, this.y * e);
    };
    t.prototype.copy = function (t) {
        this.x = t.x;
        this.y = t.y;
        return this;
    };
    t.prototype.clone = function () {
        return new t(this.x, this.y);
    };
    t.prototype.substract = function (t, e) {
        t.x -= e.x;
        t.y -= e.y;
        return t;
    };
    t.prototype.lengthSqr = function () {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    };
    return t;
})();
exports.Vector2 = i;
exports.Obstacle = function () {};
exports.Line = function () {};
exports.KeyValuePair = function (t, e) {
    this.key = t;
    this.value = e;
};
var o = (function () {
    function t() {}
    t.absSq = function (t) {
        return t.multiply(t);
    };
    t.normalize = function (e) {
        return e.scale(1 / t.abs(e));
    };
    t.distSqPointLineSegment = function (e, n, i) {
        var o = i.minus(e);
        var r = n.minus(e);
        var a = o.multiply(r) / t.absSq(r);
        if (a < 0) {
            return t.absSq(o);
        } else {
            if (a > 1) {
                return t.absSq(i.minus(n));
            } else {
                return t.absSq(i.minus(e.plus(r.scale(a))));
            }
        }
    };
    t.sqr = function (t) {
        return t * t;
    };
    t.det = function (t, e) {
        return t.x * e.y - t.y * e.x;
    };
    t.abs = function (e) {
        return Math.sqrt(t.absSq(e));
    };
    t.leftOf = function (e, n, i) {
        return t.det(e.minus(i), n.minus(e));
    };
    t.RVO_EPSILON = 80;
    return t;
})();
exports.RVOMath = o;
