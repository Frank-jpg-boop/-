import $playerDataProxy from './PlayerDataProxy';
import $reportMgr from './ReportMgr';
exports.AdMgr = void 0;
t._instance = null;
t.prototype.showVideoAd = function (t) {
  const e = {
    id: t.id,
    eventId: t.eventId,
    success: function () {
      $playerDataProxy.playerDataProxy.addVideoNum();
      $reportMgr.ReportMgr.instance.reportEvent(
        t.eventId,
        t.eventData ? t.eventData : {},
      );
      if (t.success) {
        t.success();
      }
    },
    fail: t.fail,
    error: t.error,
  };
  if (yzll.gameConfig.isGM || yzll.gameConfig.isZB) {
    if (e.success) {
      e.success();
    }
  } else {
    mm.platform.showVideoAds(e);
  }
};
Object.defineProperty(t, "instance", {
  get: function () {
    if (null == this._instance) {
      this._instance = new t();
    }
    return this._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {}
const r = t;
exports.AdMgr = r;
