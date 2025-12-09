var i;
exports.Enemy_611_Atk = void 0;
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
    e.prototype.begin = function (t, e) {
        var n = this;
        if (void 0 === e) {
            e = !1;
        }
        this._context.setDirX(t.x > this._context.node.x);
        if (t && t.isValid) {
            var i = t.getComponent($door.default);
            if (i && i.state != $door.EDoorState.DESTROY) {
                return void this._context.playAnimAttack(
                    function () {
                        n._context.attackHit(t);
                    },
                    function () {
                        n._context.changeState($actorEnum.EActorStateType.IDLE);
                    },
                    t
                );
            }
        }
        if (!e) {
            this._context.summon(t);
            return void this._context.scheduleOnce(function () {
                n._context.playAnimAttack(
                    function () {
                        n._context.attackHit(t);
                    },
                    function () {
                        n._context.changeState($actorEnum.EActorStateType.IDLE);
                    },
                    t
                );
            }, 0.3);
        }
        this._context.playAnimAttack(
            function () {
                n._context.attackHit(t);
            },
            function () {
                n._context.changeState($actorEnum.EActorStateType.IDLE);
            },
            t
        );
    };
    e.prototype.update = function () {};
    e.prototype.end = function () {
        this._context.unscheduleAllCallbacks();
    };
    return e;
})($state.State);
exports.Enemy_611_Atk = c;
