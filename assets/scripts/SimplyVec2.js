var i = (function () {
    function t(t, e) {
        if (void 0 === t) {
            t = 0;
        }
        if (void 0 === e) {
            e = 0;
        }
        this.x = 0;
        this.y = 0;
        this.x = t;
        this.y = e;
    }
    t.ccVec2To = function (e) {
        return new t(e.x, e.y);
    };
    t.dot = function (t, e) {
        return t.x * e.x + t.y * e.y;
    };
    t.subtract = function (t, e, n) {
        t.x = e.x - n.x;
        t.y = e.y - n.y;
        return t;
    };
    t.distance = function (t, e) {
        var n = e.x - t.x;
        var i = e.y - t.y;
        return Math.sqrt(n * n + i * i);
    };
    t.squaredDistance = function (t, e) {
        var n = e.x - t.x;
        var i = e.y - t.y;
        return n * n + i * i;
    };
    t.prototype.set = function (t, e) {
        this.x = t;
        this.y = e;
        return this;
    };
    t.prototype.add = function (e, n) {
        (n = n || new t()).x = this.x + e.x;
        n.y = this.y + e.y;
        return n;
    };
    t.prototype.sub = function (e, n) {
        return t.subtract(n || new t(), this, e);
    };
    t.prototype.lengthSqr = function () {
        return this.x * this.x + this.y * this.y;
    };
    t.prototype.rotate = function (e, n) {
        (n = n || new t()).x = this.x;
        n.y = this.y;
        return n.rotateSelf(e);
    };
    t.prototype.rotateSelf = function (t) {
        var e = Math.sin(t);
        var n = Math.cos(t);
        var i = this.x;
        this.x = n * i - e * this.y;
        this.y = e * i + n * this.y;
        return this;
    };
    t.prototype.clone = function () {
        return new t(this.x, this.y);
    };
    return t;
})();
exports.default = i;
