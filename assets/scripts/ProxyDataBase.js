exports.ProxyDataBase = void 0;
var i = (function () {
    function t(t) {
        var e = this;
        this.localData = null;
        this.localData = this.createInitData();
        if (t) {
            Object.keys(t).forEach(function (n) {
                e.localData[n] = t[n];
            });
        }
    }
    t.prototype.resetData = function () {
        var t = this;
        var e = this.createInitData();
        Object.keys(e).forEach(function (n) {
            t.localData[n] = e[n];
        });
    };
    return t;
})();
exports.ProxyDataBase = i;
