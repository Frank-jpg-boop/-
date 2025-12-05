var i;
exports.E_AreaColliderType = exports.E_AreaObjectType = void 0;
(function (t) {
    t[(t.DEFAULT = 0)] = "DEFAULT";
    t[(t.PLAYER = 1)] = "PLAYER";
    t[(t.ENEMY = 2)] = "ENEMY";
    t[(t.DOOR = 3)] = "DOOR";
    t[(t.LADDER = 4)] = "LADDER";
    t[(t.GOOD = 5)] = "GOOD";
    t[(t.ROOM_UNLOCK_AREA = 6)] = "ROOM_UNLOCK_AREA";
    t[(t.SEARCH_POINT = 7)] = "SEARCH_POINT";
    t[(t.SURVIVOR = 8)] = "SURVIVOR";
    t[(t.EVACUATION_EXIT = 9)] = "EVACUATION_EXIT";
})((i = exports.E_AreaObjectType || (exports.E_AreaObjectType = {})));
(function (t) {
    t[(t.POINT = 0)] = "POINT";
    t[(t.RECT = 1)] = "RECT";
})(exports.E_AreaColliderType || (exports.E_AreaColliderType = {}));
var o = (function () {
    function t() {
        this.gridSize = 100;
        this._areaSize = 5e3;
        this._gridAreaObject = null;
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (this._instance) {
                //
            } else {
                this._instance = new t();
            }
            return this._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.init = function (t, e) {
        this._gridAreaObject = new Map();
        for (
            var n = Math.ceil(e / this.gridSize),
                o = Math.ceil(t / this.gridSize),
                r = -t / 2 + this.gridSize / 2,
                a = -e / 2 + this.gridSize / 2,
                s = 0;
            s < n;
            ++s
        ) {
            for (var c = 0; c < o; ++c) {
                var l = this.getAreaKeyInfo(r + c * this.gridSize, a + s * this.gridSize).key;
                var u = new Map();
                for (var p in i)
                    if (isNaN(Number(p))) {
                        //
                    } else {
                        u.set(Number(p), []);
                    }
                this._gridAreaObject.set(l, u);
            }
        }
    };
    t.prototype.insertAreaObject = function (t, e, n) {
        var i = this.getAreaKeyInfo(n.x, n.y).key;
        if (!this._gridAreaObject.has(i)) {
            return "";
        }
        if (i == e) {
            return i;
        }
        var o = this._gridAreaObject.get(i);
        var r = this._gridAreaObject.get(e);
        if (r) {
            var a = r.get(t.areaType);
            if (a) {
                var s = a.indexOf(t);
                if (-1 != s) {
                    a.splice(s, 1);
                }
            }
        }
        var c = o.get(t.areaType);
        if (c) {
            c.push(t);
        }
        return i;
    };
    t.prototype.removeAreaObject = function (t, e) {
        var n = this._gridAreaObject.get(e);
        if (n) {
            var i = n.get(t.areaType);
            if (i) {
                var o = i.indexOf(t);
                if (-1 != o) {
                    i.splice(o, 1);
                }
            }
        }
    };
    t.prototype.getAreaKeyInfo = function (t, e) {
        t += this._areaSize / 2;
        e += this._areaSize / 2;
        var n = Math.floor(e / this.gridSize);
        var i = Math.floor(t / this.gridSize);
        return {
            key: n + "|" + i,
            row: n,
            col: i
        };
    };
    t.prototype.getAreaObjectList = function (t, e) {
        if (this._gridAreaObject.has(t)) {
            var n = this._gridAreaObject.get(t);
            if (n.has(e)) {
                return n.get(e);
            }
        }
        return [];
    };
    t.prototype.getCiclerAreaKeys = function (e, n) {
        for (var i = [], o = e.x - n, r = e.x + n; ; o += t.instance.gridSize) {
            if (o > r) {
                o = r;
            }
            for (var a = e.y - n, s = e.y + n; ; a += t.instance.gridSize) {
                if (a > s) {
                    a = s;
                }
                var c = t.instance.getAreaKeyInfo(o, a).key;
                if (i.includes(c)) {
                    //
                } else {
                    i.push(c);
                }
                if (a >= s) {
                    break;
                }
            }
            if (o >= r) {
                break;
            }
        }
        return i;
    };
    t.prototype.getRectAreaKeys = function (e) {
        for (var n = [], i = e.x, o = e.xMax; ; i += t.instance.gridSize) {
            if (i > o) {
                i = o;
            }
            for (var r = e.y, a = e.yMax; ; r += t.instance.gridSize) {
                if (r > a) {
                    r = a;
                }
                var s = t.instance.getAreaKeyInfo(i, r).key;
                if (n.includes(s)) {
                    //
                } else {
                    n.push(s);
                }
                if (r >= a) {
                    break;
                }
            }
            if (i >= o) {
                break;
            }
        }
        return n;
    };
    return t;
})();
exports.default = o;
