var i;
exports.Boss_621_Atk = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var $actorMgr = require("./ActorMgr");
var c = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._attackCount = 0;
        n._stateType = $actorEnum.EActorStateType.ATTACK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function (t) {
        this.attack(t);
    };
    e.prototype.attack = function (t) {
        var e = this;
        this._attackCount++;
        this._context.setDirX(t.x > this._context.node.x);
        this._context.playAnimAttack(
            function (n) {
                if ("atk" == n) {
                    e._context.attackHit(t);
                }
            },
            function () {
                if (e._attackCount >= 3) {
                    e._attackCount = 0;
                    return void e._context.scheduleOnce(function () {
                        e._context.changeState($actorEnum.EActorStateType.EXTEND_1);
                    });
                }
                e._context.changeState($actorEnum.EActorStateType.IDLE);
            }
        );
    };
    e.prototype.update = function () {};
    e.prototype.end = function () {
        if (this._context.skin2ItemIds.length > 0) {
            this._context.skin2ItemIds.forEach(function (t) {
                var e = $actorMgr.default.instance.getActor(t);
                if (e && !e.isDead()) {
                    e.changeState($actorEnum.EActorStateType.DEAD);
                }
            });
        }
        this._context.skin2ItemIds = [];
    };
    return e;
})($state.State);
exports.Boss_621_Atk = c;
