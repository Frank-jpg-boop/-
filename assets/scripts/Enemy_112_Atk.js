var i;
exports.Enemy_112_Atk = void 0;
var $randomUtil = require("./RandomUtil");
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var c = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._stateType = $actorEnum.EActorStateType.ATTACK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function (t) {
        this.attack(t);
    };
    e.prototype.attack = function (t) {
        var e = this;
        this._context.setDirX(t.x > this._context.node.x);
        var n = t.getPosition();
        n.y += $randomUtil.RandomUtil.randomInt(30, 60);
        n.x += $randomUtil.RandomUtil.randomInt(-50, 50);
        this._context.playAnimAttack(
            function (i) {
                if ("chong" == i) {
                    cc.tween(e._context.node)
                        .to(
                            0.3,
                            {
                                x: n.x,
                                y: n.y
                            },
                            {
                                easing: "sineIn",
                                onUpdate: function () {
                                    e._context.setPos(e._context.node.getPosition());
                                }
                            }
                        )
                        .start();
                }
                if ("atk" == i) {
                    e._context.attackHit(t);
                }
            },
            function () {
                e._context.changeState($actorEnum.EActorStateType.IDLE);
            }
        );
    };
    e.prototype.update = function () {};
    return e;
})($state.State);
exports.Enemy_112_Atk = c;
