var i;
var a = cc._decorator;
var s = a.ccclass;
var c = a.property;
var l = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.target = null;
        e.isBlockAll = !1;
        e.isPassAll = !1;
        e.clickEvent = null;
        e.clickEventCaller = null;
        e._clickScreenEvent = null;
        e._clickScreenEventCaller = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        this.registerEvent();
    };
    e.prototype.start = function () {
        this.reset();
    };
    e.prototype.onDestroy = function () {
        this.unregisterEvent();
    };
    e.prototype.registerEvent = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEvent, this);
    };
    e.prototype.unregisterEvent = function () {
        this.node.targetOff(this);
    };
    e.prototype.reset = function () {
        this.setSwallowTouches(!1);
    };
    e.prototype.onTouchEvent = function (t) {
        var e = this;
        if (e.isPassAll) {
            return (
                e.target &&
                    e.target.activeInHierarchy &&
                    e.target.getBoundingBoxToWorld().contains(t.getLocation()) &&
                    t.type == cc.Node.EventType.TOUCH_END &&
                    e.clickEvent &&
                    e.clickEvent.call(e.clickEventCaller),
                this._clickScreenEvent && this._clickScreenEvent.call(this._clickScreenEventCaller),
                (this._clickScreenEvent = null),
                void (this._clickScreenEventCaller = null)
            );
        } else {
            if (e.isBlockAll) {
                if (null == this.target && t.type == cc.Node.EventType.TOUCH_END) {
                    return (
                        e.clickEvent && e.clickEvent.call(e.clickEventCaller),
                        void (this._clickScreenEvent && this._clickScreenEvent.call(this._clickScreenEventCaller))
                    );
                } else {
                    return void t.stopPropagationImmediate();
                }
            } else {
                return void (e.target && e.target.activeInHierarchy
                    ? (e.target.getBoundingBoxToWorld().contains(t.getLocation())
                          ? t.type == cc.Node.EventType.TOUCH_END &&
                            e.clickEvent &&
                            e.clickEvent.call(e.clickEventCaller)
                          : t.stopPropagationImmediate(),
                      this._clickScreenEvent && this._clickScreenEvent.call(this._clickScreenEventCaller),
                      (this._clickScreenEvent = null),
                      (this._clickScreenEventCaller = null))
                    : (this.node.active = !1));
            }
        }
    };
    e.prototype.blockAll = function () {
        this.isBlockAll = !0;
        this.isPassAll = !1;
    };
    e.prototype.passAll = function () {
        this.isPassAll = !0;
        this.isBlockAll = !1;
    };
    e.prototype.setTarget = function (t) {
        this.target = t;
        this.isBlockAll = !1;
        this.isPassAll = !1;
    };
    e.prototype.setSwallowTouches = function (t) {
        var e = this.node;
        if (e._touchListener) {
            e._touchListener.setSwallowTouches(t);
        }
    };
    e.prototype.setClickTargetEvent = function (t, e) {
        this.clickEvent = t;
        this.clickEventCaller = e;
    };
    e.prototype.setClickScreenEvent = function (t, e) {
        this._clickScreenEvent = t;
        this._clickScreenEventCaller = e;
    };
    __decorate(
        [
            c({
                type: cc.Node
            })
        ],
        e.prototype,
        "target",
        void 0
    );
    return __decorate([s], e);
})(cc.Component);
exports.default = l;
