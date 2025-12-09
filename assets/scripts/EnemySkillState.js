var i;
exports.EnemySkillState = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var s = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._stateType = $actorEnum.EActorStateType.SKILL;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        var t = this;
        this._context.playAnimSkill(function () {
            t._context.changeState($actorEnum.EActorStateType.IDLE);
        });
    };
    e.prototype.update = function () {};
    return e;
})($state.State);
exports.EnemySkillState = s;
