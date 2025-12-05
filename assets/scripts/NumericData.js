exports.NumericData = void 0;
var $numeric = require("./Numeric");
var o = (function () {
    function t() {
        this.propertyMap = new Map();
    }
    t.prototype.init = function (t) {
        for (var e in t)
            if (isNaN(e)) {
                //
            } else {
                this.propertyMap.set(Number(e), new $numeric.default());
            }
    };
    t.prototype.getNumeric = function (t) {
        if (this.propertyMap.has(t)) {
            return this.propertyMap.get(t);
        } else {
            return null;
        }
    };
    t.prototype.clear = function () {
        this.propertyMap.forEach(function (t) {
            t.clear();
        });
        this.propertyMap.clear();
    };
    return t;
})();
exports.NumericData = o;
