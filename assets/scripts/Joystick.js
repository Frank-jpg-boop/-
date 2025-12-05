var i;
exports.EJoystickEvent = void 0;
var a;
var $eventManager = require("./EventManager");
var $inputUtil = require("./InputUtil");
var $battleMgr = require("./BattleMgr");
var u = cc._decorator;
var p = u.ccclass;
var h = u.property;
u.menu;
(function (t) {
    t.TOUCH_START = "JoystickTouchStart";
    t.TOUCH_MOVE = "JoystickTouchMove";
    t.TOUCH_END = "JoystickTouchEnd";
})((a = exports.EJoystickEvent || (exports.EJoystickEvent = {})));
var f = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nControlDot = null;
        e._radian = 0;
        e._vec2 = null;
        e._power = 0;
        e._isMovable = !1;
        e._initPos = null;
        e.isTouchJoystick = !1;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "radian", {
        get: function () {
            return this._radian;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "dir", {
        get: function () {
            return this._vec2.clone();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "power", {
        get: function () {
            return this._power;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "isMovable", {
        get: function () {
            return this._isMovable;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onLoad = function () {
        var t;
        var e = this;
        e.node.parent.on(cc.Node.EventType.TOUCH_START, e.onTouchStart, e);
        e.node.parent.on(cc.Node.EventType.TOUCH_MOVE, e.onTouchMove, e);
        e.node.parent.on(cc.Node.EventType.TOUCH_END, e.onTouchEnd, e);
        e.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, e.onTouchEnd, e);
        if (null === (t = e.node.getComponent(cc.Widget)) || void 0 === t) {
            //
        } else {
            t.updateAlignment();
        }
        this.node.getComponent(cc.Widget).enabled = !1;
        e._initPos = e.node.getPosition();
    };
    e.prototype.start = function () {
        this.node.parent.getComponent(cc.Widget).updateAlignment();
        $inputUtil.default.instance.clear();
        this.node.active = !1;
    };
    e.prototype.onDestroy = function () {
        var t = this;
        t.node.parent.off(cc.Node.EventType.TOUCH_START, t.onTouchStart, t);
        t.node.parent.off(cc.Node.EventType.TOUCH_MOVE, t.onTouchMove, t);
        t.node.parent.off(cc.Node.EventType.TOUCH_END, t.onTouchEnd, t);
        t.node.parent.off(cc.Node.EventType.TOUCH_CANCEL, t.onTouchEnd, t);
    };
    e.prototype.onTouchStart = function (t) {
        var e = this;
        var n = $battleMgr.default.instance.getCurScene();
        if (n && n.isPlay) {
            $inputUtil.default.instance.clear();
            this.node.active = !0;
            e.isTouchJoystick = !0;
            var i = e.node.parent.convertToNodeSpaceAR(t.getLocation());
            e.setSafePos(i);
            var o = e.node.convertToNodeSpaceAR(t.getLocation());
            var r = o.len();
            var u = e.node.width / 2;
            if (0 == o.x && 0 == o.y) {
                e._radian = 0;
            } else {
                e._radian = cc.v2(1, 0).signAngle(o);
            }
            var p = Math.cos(e._radian) * u;
            var h = Math.sin(e._radian) * u;
            this._vec2 = cc.v2(0, 0);
            e.nControlDot.setPosition(u > r ? o : cc.v2(p, h));
            this._power = Math.min(r, u) / u;
            e._isMovable = !0;
            $eventManager.EventManager.instance.emit(a.TOUCH_START, this._vec2, this._power);
        }
    };
    e.prototype.onTouchMove = function (t) {
        var e = $battleMgr.default.instance.getCurScene();
        if (e && e.isPlay) {
            var n = this;
            var i = n.node.convertToNodeSpaceAR(t.getLocation());
            var o = i.lengthSqr();
            var r = n.node.width / 2;
            if (0 == i.x && 0 == i.y) {
                n._radian = 0;
            } else {
                n._radian = cc.v2(1, 0).signAngle(i);
            }
            var a = Math.cos(n._radian) * r;
            var s = Math.sin(n._radian) * r;
            this._vec2 = cc.v2(Math.cos(this._radian), Math.sin(this._radian));
            n.nControlDot.setPosition(r * r > o ? i : cc.v2(a, s));
            this._power = Math.min(o, r * r) / (r * r);
        }
    };
    e.prototype.onTouchEnd = function () {
        this.setSafePos(this._initPos);
        this.nControlDot.setPosition(cc.v2(0, 0));
        this._vec2 = cc.v2(0, 0);
        this._isMovable = !1;
        this._power = 0;
        this.isTouchJoystick = !1;
        $eventManager.EventManager.instance.emit(a.TOUCH_END);
        this.node.active = !1;
    };
    e.prototype.setSafePos = function (t) {
        var e = this;
        var n = e.node.width / 2;
        var i = e.node.height / 2;
        var o = e.node.parent.width - n;
        var r = e.node.parent.height - i;
        if (t.x < n) {
            t.x = n;
        } else {
            if (t.x > o) {
                t.x = o;
            }
        }
        if (t.y < i) {
            t.y = i;
        } else {
            if (t.y > r) {
                t.y = r;
            }
        }
        e.node.setPosition(t);
    };
    e.prototype.update = function (t) {
        if (this._isMovable && this.isTouchJoystick) {
            $eventManager.EventManager.instance.emit(a.TOUCH_MOVE, this._vec2, this._power, t);
        }
    };
    e.prototype.updateKeyCode = function (t) {
        if (!this.isTouchJoystick) {
            if (this._isMovable) {
                $eventManager.EventManager.instance.emit(a.TOUCH_MOVE, this._vec2, 1, t);
            }
            var e = cc.v2(0, 0);
            if (
                $inputUtil.default.instance.isKeyJustPressed(cc.macro.KEY.w) ||
                $inputUtil.default.instance.isKeyJustPressed(cc.macro.KEY.a) ||
                $inputUtil.default.instance.isKeyJustPressed(cc.macro.KEY.s) ||
                $inputUtil.default.instance.isKeyJustPressed(cc.macro.KEY.d)
            ) {
                if (this._isMovable) {
                    //
                } else {
                    $eventManager.EventManager.instance.emit(a.TOUCH_START);
                }
            }
            if ($inputUtil.default.instance.isKeyPressed(cc.macro.KEY.w)) {
                e.y = 2;
            }
            if ($inputUtil.default.instance.isKeyPressed(cc.macro.KEY.a)) {
                e.x = -1;
            }
            if ($inputUtil.default.instance.isKeyPressed(cc.macro.KEY.s)) {
                e.y = -2;
            }
            if ($inputUtil.default.instance.isKeyPressed(cc.macro.KEY.d)) {
                e.x = 1;
            }
            e.normalizeSelf();
            if (
                $inputUtil.default.instance.isKeyJustReleased(cc.macro.KEY.w) ||
                $inputUtil.default.instance.isKeyJustReleased(cc.macro.KEY.s)
            ) {
                e.y = 0;
            }
            if (
                $inputUtil.default.instance.isKeyJustReleased(cc.macro.KEY.a) ||
                $inputUtil.default.instance.isKeyJustReleased(cc.macro.KEY.d)
            ) {
                e.x = 0;
            }
            var n = 0 != e.x || 0 != e.y;
            if (n) {
                this._radian = cc.v2(1, 0).signAngle(e);
                this._vec2 = e;
                this._isMovable = !0;
            } else {
                this._isMovable != n && $eventManager.EventManager.instance.emit(a.TOUCH_END);
                this._isMovable = !1;
            }
        }
    };
    e.prototype.stopTouch = function () {
        var t = this;
        t.setSafePos(this._initPos);
        t.nControlDot.setPosition(cc.v2(0, 0));
        t._isMovable = !1;
        t.isTouchJoystick = !1;
        this._power = 1;
        t.node.pauseSystemEvents(!0);
    };
    __decorate(
        [
            h({
                type: cc.Node,
                tooltip: "摇杆控制点"
            })
        ],
        e.prototype,
        "nControlDot",
        void 0
    );
    return __decorate([p], e);
})(cc.Component);
exports.default = f;
