var i;
exports.Poison = void 0;
var $battleHurtFormulaMgr = require("./BattleHurtFormulaMgr");
var $attrEnum = require("./AttrEnum");
var s = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._hurtDis = 0;
        e._hurtRate = 0;
        e._healPercent = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onTrigger = function (t, e) {
        this._hurtDis = 0;
        this._hurtRate = t;
        this._healPercent = e;
    };
    e.prototype.onUpdate = function (t) {
        this._hurtDis -= t;
        if (this._hurtDis <= 0) {
            this._hurtDis = 1;
            var e = this._buffData.parentActor.curHp * this._hurtRate;
            this._buffData.parentActor.beHurt(
                $battleHurtFormulaMgr.default.instance.otherHurt(
                    Math.max(e, 1),
                    this._buffData.agentActor,
                    this._buffData.parentActor
                )
            );
            if (this._buffData.parentActor.isDead()) {
                this._buffData.agentActor.beRecover(
                    this._buffData.agentActor.getAttribute($attrEnum.E_AttrType.HP).value * this._healPercent
                );
            }
        }
    };
    return e;
})(require("./BuffBase").default);
exports.Poison = s;
