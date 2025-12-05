var i;
var $actorEnum = require("./ActorEnum");
var $enemyBase = require("./EnemyBase");
var $enemy_112_Atk = require("./Enemy_112_Atk");
var $enemy_112_Idle = require("./Enemy_112_Idle");
var $enemy_112_Walk = require("./Enemy_112_Walk");
var p = cc._decorator;
var h = p.ccclass;
var f =
    (p.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._rangeAngles = [30, 80, 100, 150];
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "rangeAngles", {
            get: function () {
                return this._rangeAngles;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.registerState = function () {
            t.prototype.registerState.call(this);
            this._sm.addState($actorEnum.EActorStateType.IDLE, new $enemy_112_Idle.Enemy_112_Idle(this));
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $enemy_112_Atk.Enemy_112_Atk(this));
            this._sm.addState($actorEnum.EActorStateType.WALK, new $enemy_112_Walk.Enemy_112_Walk(this));
        };
        e.prototype.canAttackTarget = function (t) {
            if (!t || t.isDead()) {
                return !1;
            }
            var e = t.node.getPosition().sub(this.node.getPosition());
            var n = e.magSqr();
            var i = (180 * cc.Vec2.RIGHT_R.signAngle(e.normalize().mul(-1))) / Math.PI;
            return (
                ((i >= this._rangeAngles[0] && i <= this._rangeAngles[1]) ||
                    (i >= this._rangeAngles[2] && i <= this._rangeAngles[3])) &&
                n >= Number(this._cfg.val1) * Number(this._cfg.val1) &&
                n <= Number(this._cfg.val2) * Number(this._cfg.val2)
            );
        };
        return __decorate([h], e);
    })($enemyBase.default));
exports.default = f;
