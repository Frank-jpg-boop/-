var i;
var $battleHurtFormulaMgr = require("./BattleHurtFormulaMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $simplyVec2 = require("./SimplyVec2");
var $bulletBase = require("./BulletBase");
var p = cc._decorator;
var h = p.ccclass;
var f =
    (p.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._ownerSkill = null;
            e._hurt = null;
            return e;
        }
        __extends(e, t);
        e.prototype.onShoot = function (t, e, n) {
            this._ownerSkill = e;
            this._hurt = n;
            var i = this.node.getPosition();
            var o = t.sub(i).len() / 600;
            this.tweenTo(i, t, o, !0, null);
        };
        e.prototype.onUpdate = function () {
            this.checkCollision();
        };
        e.prototype.checkCollision = function () {
            for (
                var t = this.node.getPosition(),
                    e = $gridAreaDivisionMgr.default.instance.getAreaKeyInfo(t.x, t.y),
                    n = $gridAreaDivisionMgr.default.instance.getAreaObjectList(
                        e.key,
                        $gridAreaDivisionMgr.E_AreaObjectType.ENEMY
                    ),
                    i = this.node.convertToWorldSpaceAR(cc.v2()),
                    o = 0;
                o < n.length;
                o++
            ) {
                var r = n[o];
                if (
                    r.canBeHurt() &&
                    !r.isDead() &&
                    $simplyCollisionDetector.default.isCollisionPointToRect(
                        new $simplyVec2.default(i.x, i.y),
                        r.hurtColliderRect
                    )
                ) {
                    var u = $battleHurtFormulaMgr.default.instance.skillHurt(this._hurt, r);
                    r.beHurt(u);
                    this.remove();
                    break;
                }
            }
        };
        return __decorate([h], e);
    })($bulletBase.default));
exports.default = f;
