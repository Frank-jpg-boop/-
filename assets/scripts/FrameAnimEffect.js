var i;
var $effectBase = require("./EffectBase");
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.frameAnim = null;
        e._isCompleteRemove = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        this.frameAnim.on(cc.Animation.EventType.FINISHED, this.onEffectAnimCompleteEvent, this);
    };
    e.prototype.playOnceAllAnim = function (t, e) {
        if (void 0 === t) {
            t = null;
        }
        this._onAnimComplete = t;
        this._isCompleteRemove = e;
        this.frameAnim.play(this.frameAnim.defaultClip.name, 0);
    };
    e.prototype.onRemove = function () {
        this.frameAnim.off(cc.Animation.EventType.FINISHED, this.onEffectAnimCompleteEvent, this);
        t.prototype.onRemove.call(this);
    };
    e.prototype.onEffectAnimCompleteEvent = function () {
        for (var t = [], e = 0; e < arguments.length; e++) {
            t[e] = arguments[e];
        }
        if (this._onAnimComplete) {
            this._onAnimComplete();
        }
        if (this._isCompleteRemove) {
            this.remove();
        }
    };
    __decorate([l(cc.Animation)], e.prototype, "frameAnim", void 0);
    return __decorate([c], e);
})($effectBase.default);
exports.default = u;
