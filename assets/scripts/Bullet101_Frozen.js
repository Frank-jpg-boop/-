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
            e._eliminateEnemyId = 0;
            e._hurtIds = [];
            return e;
        }
        __extends(e, t);
        e.prototype.onShoot = function (t, e, n) {
            this._hurtIds = [];
            this._ownerSkill = e;
            this._eliminateEnemyId = n;
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
                    !this._hurtIds.includes(r.unitId) &&
                    !r.isDead() &&
                    r.unitId != this._eliminateEnemyId &&
                    $simplyCollisionDetector.default.isCollisionPointToRect(
                        new $simplyVec2.default(i.x, i.y),
                        r.hurtColliderRect
                    )
                ) {
                    this._hurtIds.push(r.unitId);
                    var u = $battleHurtFormulaMgr.default.instance.skillHurt(this._ownerSkill.getFrozenHurtOption(), r);
                    r.beHurt(u);
                    break;
                }
            }
        };
        return __decorate([h], e);
    })($bulletBase.default));
exports.default = f;
