var i;
var a = cc._decorator;
var s = a.ccclass;
var c =
    (a.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._isPlaying = !1;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "isPlaying", {
            get: function () {
                return this._isPlaying;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.playUnlockAnim = function (t) {
            var e = this;
            if (this._isPlaying) {
                //
            } else {
                this._isPlaying = !0;
                cc.tween(this.node)
                    .to(0.5, {
                        opacity: 0
                    })
                    .delay(0.3)
                    .call(function () {
                        e._isPlaying = !1;
                        if (t) {
                            t();
                        }
                    })
                    .start();
            }
        };
        return __decorate([s], e);
    })(cc.Component));
exports.default = c;
