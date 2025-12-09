import $appProxy from './AppProxy';
import $timeUtil from './TimeUtil';
import $eventManager from './EventManager';
exports.AppManager = void 0;
t._instance = null;
t.prototype.checkEndTime = function () {
  const t = $timeUtil.TimeUtil.getTime();
  if (0 === this._endTime) {
    this._endTime = $timeUtil.TimeUtil.getDayEndTime(t);
  }
  if (t > this._endTime) {
    this._endTime = $timeUtil.TimeUtil.getDayEndTime(t);
    $eventManager.EventManager.instance.emit($appProxy.AppEvent.DAY_UPDATE);
  }
  setTimeout(this.checkEndTime.bind(this), 6e4);
};
Object.defineProperty(t, "instance", {
  get: function () {
    if (null == t._instance) {
      t._instance = new t();
    }
    return t._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this._endTime = 0;
}
const a = t;
exports.AppManager = a;
