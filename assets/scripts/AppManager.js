exports.AppManager = void 0;
var $appProxy = require("./AppProxy");
var $timeUtil = require("./TimeUtil");
var $eventManager = require("./EventManager");
var a = (function () {
    function t() {
        this._endTime = 0;
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == t._instance) {
                t._instance = new t();
            }
            return t._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.checkEndTime = function () {
        var t = $timeUtil.TimeUtil.getTime();
        if (0 === this._endTime) {
            this._endTime = $timeUtil.TimeUtil.getDayEndTime(t);
        }
        if (t > this._endTime) {
            this._endTime = $timeUtil.TimeUtil.getDayEndTime(t);
            $eventManager.EventManager.instance.emit($appProxy.AppEvent.DAY_UPDATE);
        }
        setTimeout(this.checkEndTime.bind(this), 6e4);
    };
    t._instance = null;
    return t;
})();
exports.AppManager = a;
