var i;
exports.SpeedUp = void 0;
var $eventManager = require("./EventManager");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var c = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._addSpeed = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onTrigger = function (t) {
        this._addSpeed = t;
        this._buffData.parentActor.getAttribute($attrEnum.E_AttrType.SPEED).changeAddValue(t);
        $eventManager.EventManager.instance.emit(
            $actorEnum.EActorEvent.SPEED_CHANGE + this._buffData.parentActor.unitId
        );
    };
    e.prototype.onUpdate = function () {
        if (this._effects[0]) {
            this._effects[0].node.active = this._buffData.parentActor.curState == $actorEnum.EActorStateType.WALK;
        }
    };
    e.prototype.onRemove = function () {
        t.prototype.onRemove.call(this);
        this._buffData.parentActor.getAttribute($attrEnum.E_AttrType.SPEED).changeAddValue(-this._addSpeed);
        $eventManager.EventManager.instance.emit(
            $actorEnum.EActorEvent.SPEED_CHANGE + this._buffData.parentActor.unitId
        );
    };
    return e;
})(require("./BuffBase").default);
exports.SpeedUp = c;
