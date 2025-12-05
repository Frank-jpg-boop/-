var i;
exports.SlowDown = void 0;
var $attrEnum = require("./AttrEnum");
var a = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._subSpeed = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onTrigger = function (t) {
        this._subSpeed = t;
        this._buffData.parentActor.getAttribute($attrEnum.E_AttrType.SPEED).changePercentAdd(100 * -t);
    };
    e.prototype.onRemove = function () {
        t.prototype.onRemove.call(this);
        this._buffData.parentActor.getAttribute($attrEnum.E_AttrType.SPEED).changePercentAdd(100 * this._subSpeed);
    };
    return e;
})(require("./BuffBase").default);
exports.SlowDown = a;
