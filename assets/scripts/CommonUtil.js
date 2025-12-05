exports.CommonUtil = void 0;
var i = (function () {
    function t() {}
    t.print = function (t, e) {
        if (yzll.gameConfig.debug) {
            console.log(t, e);
        }
    };
    t.zeroVal = function (t, e) {
        if (this.isEmpty(e[t])) {
            e[t] = 0;
        }
    };
    t.isEmpty = function (t) {
        return null == t || "undefined" === t || "" === t;
    };
    t.isObjEmpty = function (t) {
        return Object.keys(t).length <= 0;
    };
    return t;
})();
exports.CommonUtil = i;
