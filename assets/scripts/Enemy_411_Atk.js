var i;
exports.Enemy_411_Atk = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var $door = require("./Door");
var c = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._stateType = $actorEnum.EActorStateType.ATTACK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function (t) {
        var e = this;
        this._context.setDirX(t.x > this._context.node.x);
        if (t && t.isValid) {
            var n = t.getComponent($door.default);
            if (n && n.state != $door.EDoorState.DESTROY) {
                return void this._context.playAnimAttack(
                    function () {
                        e._context.attackHit(t);
                    },
                    function () {
                        e._context.changeState($actorEnum.EActorStateType.IDLE);
                    },
                    t
                );
            }
        }
        if (this._context.canSkill(t)) {
            this._context.playAnimSkill(
                function () {
                    e._context.changeState($actorEnum.EActorStateType.IDLE);
                },
                function () {
                    e._context.attackHit(t, !0);
                },
                t
            );
        } else {
            this._context.playAnimAttack(
                function () {
                    e._context.attackHit(t);
                },
                function () {
                    e._context.changeState($actorEnum.EActorStateType.IDLE);
                },
                t
            );
        }
    };
    e.prototype.update = function () {};
    e.prototype.end = function () {};
    return e;
})($state.State);
exports.Enemy_411_Atk = c;
