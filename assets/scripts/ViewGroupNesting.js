var i;
var a = cc._decorator;
var s = a.ccclass;
var c =
    (a.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.events = [];
            return e;
        }
        __extends(e, t);
        e.prototype.onLoad = function () {
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchHandle, this, !0);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchHandle, this, !0);
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchHandle, this, !0);
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchHandle, this, !0);
        };
        e.prototype.onTouchHandle = function (t) {
            if (!t.sham && !t.simulate && t.target !== this.node) {
                var e = new cc.Event.EventTouch(t.getTouches(), t.bubbles);
                e.type = t.type;
                e.touch = t.touch;
                e.sham = !0;
                this.events.push(e);
            }
        };
        e.prototype.update = function () {
            if (0 !== this.events.length) {
                for (var t = 0; t < this.events.length; t++) {
                    this.node.dispatchEvent(this.events[t]);
                }
                this.events.length = 0;
            }
        };
        return __decorate([s], e);
    })(cc.Component));
exports.default = c;
