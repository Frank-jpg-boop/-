var i;
var $componentBase = require("./ComponentBase");
var $nodePoolManager = require("./NodePoolManager");
var $util = require("./Util");
var l = cc._decorator;
var u = l.ccclass;
var p =
    (l.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._onAnimComplete = null;
            e._isInit = !1;
            e._isRemove = !1;
            return e;
        }
        __extends(e, t);
        e.prototype.init = function () {
            this.node.opacity = 255;
            this.node.scale = 1;
            this.onInit();
            this._isRemove = !1;
            this._isInit = !0;
        };
        e.prototype.onInit = function () {};
        e.prototype.play = function () {
            for (var t = [], e = 0; e < arguments.length; e++) {
                t[e] = arguments[e];
            }
        };
        e.prototype.playOnceAllAnim = function (t) {
            if (void 0 === t) {
                t = null;
            }
            for (var e = [], n = 1; n < arguments.length; n++) {
                e[n - 1] = arguments[n];
            }
        };
        e.prototype.update = function (t) {
            if (this._isInit && !this._isRemove) {
                this.onUpdate(t);
            }
        };
        e.prototype.onUpdate = function () {};
        e.prototype.remove = function () {
            if (this._isRemove) {
                //
            } else {
                this._isRemove = !0;
                this.onRemove();
            }
        };
        e.prototype.onEffectAnimCompleteEvent = function () {
            for (var t = [], e = 0; e < arguments.length; e++) {
                t[e] = arguments[e];
            }
            if (this._onAnimComplete) {
                this._onAnimComplete();
            }
            this.remove();
        };
        e.prototype.onRemove = function () {
            var t = this;
            this.unscheduleAllCallbacks();
            cc.Tween.stopAllByTarget(this.node);
            this._onAnimComplete = null;
            this.node.scale = 0;
            this.node.removeFromParent(!1);
            $util.default.delay(0.1, function () {
                $nodePoolManager.default.instance.putNode(t.node, !0, !1);
            });
        };
        e.prototype.fideIn = function (t, e) {
            if (void 0 === t) {
                t = null;
            }
            if (void 0 === e) {
                e = 0.5;
            }
            cc.Tween.stopAllByTarget(this.node);
            this.node.opacity = 0;
            cc.tween(this.node)
                .to(e, {
                    opacity: 255
                })
                .call(function () {
                    if (t) {
                        t();
                    }
                })
                .start();
        };
        e.prototype.fideOut = function (t, e) {
            if (void 0 === t) {
                t = null;
            }
            if (void 0 === e) {
                e = 0.5;
            }
            cc.Tween.stopAllByTarget(this.node);
            this.node.opacity = 255;
            cc.tween(this.node)
                .to(e, {
                    opacity: 0
                })
                .call(function () {
                    if (t) {
                        t();
                    }
                })
                .start();
        };
        return __decorate([u], e);
    })($componentBase.ComponentBase));
exports.default = p;
