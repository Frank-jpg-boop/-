exports.ReportMgr = void 0;
var i = (function () {
    function t() {}
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == this._instance) {
                this._instance = new t();
            }
            return this._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.reportEvent = function (t, e) {
        if (void 0 === e) {
            e = {};
        }
        if (e.userA) {
            //
        } else {
            e.userA = "";
        }
        mm.platform.umaTrackEvent(t, e);
    };
    t._instance = null;
    return t;
})();
exports.ReportMgr = i;
