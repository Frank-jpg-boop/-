var i;
var o;
exports.TriggerWay = exports.LONG_PRESS = void 0;
exports.LONG_PRESS = "longpress";
(function (t) {
    t[(t.Immediately = 1)] = "Immediately";
    t[(t.AfterLoosing = 2)] = "AfterLoosing";
    t[(t.Duration = 3)] = "Duration";
})((o = exports.TriggerWay || (exports.TriggerWay = {})));
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = s.menu;
var p = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.triggerTime = 2;
        e.trggerDelayTime = 0.05;
        e.trggerWay = o.Immediately;
        e.longPressEvents = [];
        e.hasAccomplished = !1;
        e._isComplateLongPress = !1;
        e.durationTime = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onEnable = function () {
        this._isComplateLongPress = !1;
        this.registerNodeEvent();
        this.unscheduleAllCallbacks();
    };
    e.prototype.onDisable = function () {
        this._isComplateLongPress = !1;
        this.unregisterNodeEvent();
        this.unscheduleAllCallbacks();
    };
    e.prototype.registerNodeEvent = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    };
    e.prototype.unregisterNodeEvent = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    };
    e.prototype.onTouchStart = function () {
        this.durationTime = 0;
        this.hasAccomplished = !1;
        this._isComplateLongPress = !1;
        this.scheduleOnce(this.onPressAccomplished.bind(this), this.triggerTime);
    };
    e.prototype.onTouchEnd = function () {
        if (this.hasAccomplished) {
            this.hasAccomplished = !1;
            this.trigger();
        }
        this._isComplateLongPress = !1;
        this.unscheduleAllCallbacks();
    };
    e.prototype.onTouchCancel = function () {
        if (this.hasAccomplished) {
            this.hasAccomplished = !1;
            this.trigger();
        }
        this._isComplateLongPress = !1;
        this.unscheduleAllCallbacks();
    };
    e.prototype.update = function (t) {
        if (this._isComplateLongPress && this.trggerWay == o.Duration) {
            this.durationTime -= t;
            if (this.durationTime <= 0) {
                this.trigger();
                this.durationTime = this.trggerDelayTime;
            }
        }
    };
    e.prototype.onPressAccomplished = function () {
        if (this.trggerWay === o.Immediately) {
            this.trigger();
        } else {
            if (this.trggerWay === o.AfterLoosing) {
                this.hasAccomplished = !0;
            }
        }
        this._isComplateLongPress = !0;
    };
    e.prototype.trigger = function () {
        cc.Component.EventHandler.emitEvents(this.longPressEvents, this);
        this.node.emit(exports.LONG_PRESS, this);
    };
    e.prototype.isComplateLongPress = function () {
        return this._isComplateLongPress;
    };
    __decorate([l({})], e.prototype, "triggerTime", void 0);
    __decorate([l({})], e.prototype, "trggerDelayTime", void 0);
    __decorate(
        [
            l({
                type: cc.Enum(o)
            })
        ],
        e.prototype,
        "trggerWay",
        void 0
    );
    __decorate(
        [
            l({
                type: cc.Component.EventHandler
            })
        ],
        e.prototype,
        "longPressEvents",
        void 0
    );
    return __decorate([c, u("Utils/Components/LongPress")], e);
})(cc.Component);
exports.default = p;
