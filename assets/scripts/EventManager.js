exports.EventManager = void 0;
var i = (function () {
    function t() {}
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == t._instance) {
                t._instance = new cc.EventTarget();
            }
            return t._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    t._instance = null;
    return t;
})();
exports.EventManager = i;
