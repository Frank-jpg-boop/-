var i;
var $simplyRectCollider = require("./SimplyRectCollider");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $actorEnum = require("./ActorEnum");
var $actorMgr = require("./ActorMgr");
var $spAnimEffect = require("./SpAnimEffect");
var p = cc._decorator;
var h = p.ccclass;
var f = p.property;
var d = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.collider = null;
        e._owner = null;
        return e;
    }
    __extends(e, t);
    e.prototype.play = function (t, e) {
        this._owner = t;
        this.playDefaultAnim("atk", 1, !1, function () {
            if (e) {
                e();
            }
        });
    };
    e.prototype.onDefaultAnimFrameEvent = function (t, e) {
        if ("atk" == e) {
            this.checkHurt();
        }
    };
    e.prototype.checkHurt = function () {
        for (
            var t = 0, e = $actorMgr.default.instance.queryActorByCamp($actorEnum.ETeamType.PLAYER);
            t < e.length;
            t++
        ) {
            var n = e[t];
            if (
                n.canBeHurt() &&
                !n.isDead() &&
                $simplyCollisionDetector.default.isCollisionRectToRect(this.collider.rect, n.hurtColliderRect)
            ) {
                n.beHurt(this._owner.getHurt());
            }
        }
    };
    __decorate([f($simplyRectCollider.default)], e.prototype, "collider", void 0);
    return __decorate([h], e);
})($spAnimEffect.default);
exports.default = d;
