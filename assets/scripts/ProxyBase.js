exports.ProxyBase = void 0;
var i = (function () {
    function t(t) {
        this._data = null;
        this._data = new t();
    }
    t.prototype.init = function (t) {
        if (t) {
            for (var e in t) this._data[e] = t[e];
            this.initData();
        }
    };
    t.prototype.initData = function () {};
    return t;
})();
exports.ProxyBase = i;
