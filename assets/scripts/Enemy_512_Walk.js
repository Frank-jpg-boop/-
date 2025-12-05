var i;
exports.Enemy_512_Walk = void 0;
var $mathUtil = require("./MathUtil");
var $battleMgr = require("./BattleMgr");
var $actorEnum = require("./ActorEnum");
var $enemyRefreshMgr = require("./EnemyRefreshMgr");
var l = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._exitPos = null;
        n._findPathPointId = "";
        n._findPathLineId = "";
        n._stateType = $actorEnum.EActorStateType.WALK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        t.prototype.begin.call(this, null);
    };
    e.prototype.updateFindTarget = function () {
        if (null == this._exitPos) {
            this._exitPos = $enemyRefreshMgr.EnemyRefreshMgr.instance.randomRefreshPoint().pos;
            for (
                var t = $mathUtil.MathUtil.vec2Fixed(this._exitPos),
                    e = $battleMgr.default.instance.getCurScene().level.path;
                ;

            ) {
                var n = e.findPathPointByPos(t);
                if ("" != n) {
                    this._findPathPointId = n;
                    this._findPathLineId = "";
                    break;
                }
                var i = e.findPathLineByPos(t);
                if ("" != i) {
                    this._findPathLineId = i;
                    this._findPathPointId = "";
                }
                break;
            }
        }
        this.updateFinder(this._exitPos, this._findPathLineId, this._findPathPointId);
    };
    e.prototype.update = function (t) {
        if (this._context.node.getPosition().fuzzyEquals(this._exitPos, 10)) {
            this._context.remove();
        } else {
            this.updateFinderMove(t);
        }
    };
    e.prototype.end = function () {};
    return e;
})(require("./EnemyWalkState").EnemyWalkState);
exports.Enemy_512_Walk = l;
