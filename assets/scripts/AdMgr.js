exports.AdMgr = void 0;
var $playerDataProxy = require("./PlayerDataProxy");
var $reportMgr = require("./ReportMgr");
var r = (function () {
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
    t.prototype.showVideoAd = function (t) {
        var e = {
            id: t.id,
            eventId: t.eventId,
            success: function () {
                $playerDataProxy.playerDataProxy.addVideoNum();
                $reportMgr.ReportMgr.instance.reportEvent(t.eventId, t.eventData ? t.eventData : {});
                if (t.success) {
                    t.success();
                }
            },
            fail: t.fail,
            error: t.error
        };
        if (yzll.gameConfig.isGM || yzll.gameConfig.isZB) {
            if (e.success) {
                e.success();
            }
        } else {
            mm.platform.showVideoAds(e);
        }
    };
    t._instance = null;
    return t;
})();
exports.AdMgr = r;
