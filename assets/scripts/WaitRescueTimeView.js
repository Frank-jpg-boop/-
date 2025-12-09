var i;
var $battleMgr = require("./BattleMgr");
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lRedTime = null;
        e.lGreenTime = null;
        e._currentTime = 0;
        e._isAnimating = !1;
        e.SHOW_TIME = 0.8;
        e.FADE_TIME = 0.2;
        e._lTime = null;
        return e;
    }
    __extends(e, t);
    e.prototype.update = function () {
        var t = $battleMgr.default.instance.getCurScene();
        if (t && !t.isResult) {
            this._currentTime = t.rescueWaitTime;
            this.updateDisplay();
            this.updateAnimation();
        } else {
            this.node.active = !1;
        }
    };
    e.prototype.updateAnimation = function () {
        var t = Math.ceil(this._currentTime) - this._currentTime;
        if (t < this.SHOW_TIME) {
            this._lTime.node.opacity = 255;
            if (this._currentTime <= 10) {
                var e = 0.1 * Math.sin(10 * t);
                this._lTime.node.scale = 1 + e;
            } else {
                this._lTime.node.scale = 1;
            }
        } else {
            var n = (t - this.SHOW_TIME) / this.FADE_TIME;
            this._lTime.node.opacity = 255 * (1 - n);
            this._lTime.node.scale = 1 - 0.5 * n;
        }
    };
    e.prototype.updateDisplay = function () {
        this.lGreenTime.node.active = this._currentTime > 10;
        this.lRedTime.node.active = this._currentTime <= 10;
        if (this._currentTime <= 10) {
            this._lTime = this.lRedTime;
        } else {
            this._lTime = this.lGreenTime;
        }
        var t = Math.ceil(this._currentTime).toString();
        this._lTime.string = t;
    };
    __decorate([l(cc.Label)], e.prototype, "lRedTime", void 0);
    __decorate([l(cc.Label)], e.prototype, "lGreenTime", void 0);
    return __decorate([c], e);
})(cc.Component);
exports.default = u;
