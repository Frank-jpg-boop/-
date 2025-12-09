var i;
exports.Enemy_111_Walk = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var c = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._moveTagrtPos = null;
        n._stateType = $actorEnum.EActorStateType.WALK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        this._context.move();
        this._moveTagrtPos = this._context.randomPos();
        this._context.playAnimWalk();
    };
    e.prototype.update = function (t) {
        var e = this._context.searchTarget();
        if (e) {
            if (this._context.canSummon()) {
                this._context.changeState($actorEnum.EActorStateType.EXTEND_1);
            } else if (this._context.canAttack()) {
                this._context.changeState($actorEnum.EActorStateType.ATTACK, e.node);
            } else if (this._moveTagrtPos) {
                var n = this._context.node.getPosition();
                if (this._moveTagrtPos.fuzzyEquals(n, 5)) {
                    this._context.changeState($actorEnum.EActorStateType.IDLE);
                } else {
                    var i = this._moveTagrtPos.sub(n).normalize();
                    var o = this._context.getAttribute($attrEnum.E_AttrType.SPEED).value;
                    var r = i.mul(o * t);
                    this._context.setDirX(i.x > 0);
                    this._context.setPos(n.add(r));
                }
            }
        } else {
            this._context.changeState($actorEnum.EActorStateType.IDLE);
        }
    };
    return e;
})($state.State);
exports.Enemy_111_Walk = c;
