export const ReportMgr = void 0;
t._instance = null;
t.prototype.reportEvent = function (t, e) {
  if (void 0 === e) {
    e = {};
  }
  if (e.userA) {
    //
  } else {
    e.userA = '';
  }
  mm.platform.umaTrackEvent(t, e);
};
Object.defineProperty(t, 'instance', {
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
const i = t;
export const ReportMgr = i;
