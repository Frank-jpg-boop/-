var i;
exports.Fire = void 0;
var $battleHurtFormulaMgr = require("./BattleHurtFormulaMgr");
var a = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._hurtDis = 0;
        e._hurtValue = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onTrigger = function (t) {
        this._hurtDis = 0;
        this._hurtValue = t;
    };
    e.prototype.onUpdate = function (t) {
        this._hurtDis -= t;
        if (this._hurtDis <= 0) {
            this._hurtDis = 1;
            this._buffData.parentActor.beHurt(
                $battleHurtFormulaMgr.default.instance.otherHurt(
                    this._hurtValue,
                    this._buffData.agentActor,
                    this._buffData.parentActor
                )
            );
        }
    };
    return e;
})(require("./BuffBase").default);
exports.Fire = a;
