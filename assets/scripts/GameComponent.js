var i;
exports.GameComponent = void 0;
var $componentBase = require("./ComponentBase");
var $timeUtil = require("./TimeUtil");
var $appBase = require("./AppBase");
var l = (require("./CommonUtil"), cc._decorator);
var u = l.ccclass;
var p = l.property;
var h = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.debugArea = 200;
        e.multiTouchCount = 0;
        e.multiTouchTime = 0;
        e.clickRect = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        t.prototype.onLoad.call(this);
        cc.game.addPersistRootNode(this.node);
        this.schedule(function () {}, 1);
        $appBase.AppBase.onShow(this.onShow);
        $appBase.AppBase.onHide(this.onHide);
    };
    e.prototype.start = function () {
        t.prototype.start.call(this);
        this.clickRect = cc.rect(0, cc.winSize.height - this.debugArea, cc.winSize.width, this.debugArea);
    };
    e.prototype.onDestroy = function () {
        $appBase.AppBase.offShow(this.onShow);
        $appBase.AppBase.offHide(this.onHide);
        t.prototype.onDestroy.call(this);
    };
    e.prototype.onShow = function () {};
    e.prototype.onHide = function () {};
    e.prototype.showDebugInfo = function () {
        var t = $timeUtil.TimeUtil.getTime();
        if (0 != this.multiTouchTime && t - this.multiTouchTime > 1e3) {
            this.multiTouchCount = 0;
        }
        this.multiTouchTime = t;
        this.multiTouchCount++;
        if (this.multiTouchCount < 10) {
            //
        } else {
            this.multiTouchCount = 0;
        }
    };
    __decorate([p()], e.prototype, "debugArea", void 0);
    return __decorate([u], e);
})($componentBase.ComponentBase);
exports.GameComponent = h;
