var i;
exports.Dizziness = void 0;
var r = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.onTrigger = function () {
        for (var t = [], e = 0; e < arguments.length; e++) {
            t[e] = arguments[e];
        }
        this.data.parentActor.beStop(this._buffData.duration);
    };
    return e;
})(require("./BuffBase").default);
exports.Dizziness = r;
