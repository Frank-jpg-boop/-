var i;
var a = cc._decorator;
var s = a.ccclass;
var c =
    (a.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._peopleId = 0;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "peopleId", {
            get: function () {
                return this._peopleId;
            },
            set: function (t) {
                this._peopleId = t;
            },
            enumerable: !1,
            configurable: !0
        });
        return __decorate([s], e);
    })(cc.Component));
exports.default = c;
