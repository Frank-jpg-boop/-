exports.C_Base = void 0;
var i = (function () {
    function t() {
        this._name = null;
        this._dict = null;
    }
    Object.defineProperty(t.prototype, "size", {
        get: function () {
            return this._dict.size;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.initByMap = function (t) {
        for (var e in ((this._dict = new Map()), t)) {
            var n = t[e];
            this._dict.set(n.id, n);
        }
    };
    t.prototype.getById = function (t) {
        if (this._dict.has(t)) {
            return this._dict.get(t);
        } else {
            return null;
        }
    };
    t.prototype.sheet = function () {
        return Array.from(this._dict.values());
    };
    t.prototype.queryAll = function (t, e) {
        for (var n, i = new Array(), o = this._dict.values(); !(n = o.next()).done; ) {
            var r = n.value;
            if (t(r) && (i.push(r), e && i.length >= e)) {
                break;
            }
        }
        return i;
    };
    t.prototype.queryOne = function (t) {
        for (var e, n = this._dict.values(); !(e = n.next()).done; ) {
            var i = e.value;
            if (t(i)) {
                return i;
            }
        }
        return null;
    };
    return t;
})();
exports.C_Base = i;
