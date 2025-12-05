var i;
exports.EasyHurt = void 0;
var r = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._addHurtValue = 0;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "addHurtValue", {
        get: function () {
            return this._addHurtValue;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onTrigger = function (t) {
        this._addHurtValue += t;
    };
    e.prototype.onAgain = function (t) {
        this._addHurtValue += t;
        this._effects.forEach(function (t) {
            t.playOnceAllAnim(null, !1);
        });
    };
    return e;
})(require("./BuffBase").default);
exports.EasyHurt = r;
