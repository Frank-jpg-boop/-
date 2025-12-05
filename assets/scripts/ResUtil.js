exports.ResUtil = void 0;
var $resKeeper = require("./ResKeeper");
var o = (function () {
    function t() {}
    t.getResKeeper = function (e, n) {
        if (e) {
            return (
                e.getComponent($resKeeper.ResKeeper) ||
                (n ? e.addComponent($resKeeper.ResKeeper) : t.getResKeeper(e.parent, n))
            );
        } else {
            return null;
        }
    };
    t.assignWith = function (e, n, i) {
        var o = t.getResKeeper(n, i);
        if (o && e instanceof cc.Asset) {
            return o.cacheAsset(e), e;
        } else {
            return console.error("assignWith " + e + " to " + n + " faile"), null;
        }
    };
    t.instantiate = function (e) {
        var n = cc.instantiate(e);
        var i = t.getResKeeper(n, !0);
        if (i) {
            i.cacheAsset(e);
        }
        return n;
    };
    return t;
})();
exports.ResUtil = o;
