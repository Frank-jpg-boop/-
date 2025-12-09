var $simplyVec2 = require("./SimplyVec2");
var o = (function () {
    function t() {}
    t.isCollisionCircleToCircle = function (t, e) {
        return $simplyVec2.default.distance(t.center, e.center) <= t.radius + e.radius;
    };
    t.isCollisionRectToCircle = function (t, e) {
        var n = t.center;
        var o = t.a3;
        var r = t.rotation;
        var a = e.radius;
        var s = e.center;
        if (r % 360 != 0) {
            var c = s.sub(n);
            s = n.add(c.rotate(-1 * t.radian));
        }
        var l = o.sub(n);
        var u = new $simplyVec2.default(Math.abs(s.x - n.x), Math.abs(s.y - n.y));
        return new $simplyVec2.default(Math.max(u.x - l.x, 0), Math.max(u.y - l.y, 0)).lengthSqr() <= a * a;
    };
    t.isCollisionRectToRect = function (e, n) {
        if (e.rotation % 360 != 0 || n.rotation % 360 != 0) {
            return t.isCollisionOBBRectToRect(e, n);
        } else {
            return t.isCollisionAABBRectToRect(e, n);
        }
    };
    t.isCollisionAABBRectToRect = function (t, e) {
        return t.intersects(e) || t.containsRect(e) || e.containsRect(t);
    };
    t.isCollisionOBBRectToRect = function (e, n) {
        var i = e.rAxisX;
        var o = e.rAxisY;
        var r = n.rAxisX;
        var a = n.rAxisY;
        return !!(t.rectCross(e, n, i) && t.rectCross(e, n, o) && t.rectCross(e, n, r) && t.rectCross(e, n, a));
    };
    t.rectCross = function (t, e, n) {
        var o = t.rVertexs
            .map(function (t) {
                return $simplyVec2.default.dot(t, n);
            })
            .sort(function (t, e) {
                return t - e;
            });
        var r = e.rVertexs
            .map(function (t) {
                return $simplyVec2.default.dot(t, n);
            })
            .sort(function (t, e) {
                return t - e;
            });
        var a = o[0];
        var s = o[o.length - 1];
        var c = r[0];
        var l = r[r.length - 1];
        return s >= c && l >= a;
    };
    t.isCollisionPointToCircle = function (t, e) {
        return $simplyVec2.default.squaredDistance(t, e.center) <= e.radius * e.radius;
    };
    t.isCollisionPointToRect = function (t, e) {
        var n = e.center;
        if (e.rotation % 360 != 0) {
            var i = t.sub(n);
            t = n.add(i.rotate(-1 * e.radian));
        }
        return e.contains(t);
    };
    return t;
})();
exports.default = o;
