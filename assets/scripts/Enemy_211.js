var i;
var $actorEnum = require("./ActorEnum");
var $enemyBase = require("./EnemyBase");
var $enemy_211_Atk = require("./Enemy_211_Atk");
var l = cc._decorator;
var u = l.ccclass;
var p =
    (l.property,
    (function (t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "spCtrl", {
            get: function () {
                return this._spCtrl;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.initAnim = function () {
            this._atkAnimName = "atk1";
            return t.prototype.initAnim.call(this);
        };
        e.prototype.registerState = function () {
            t.prototype.registerState.call(this);
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $enemy_211_Atk.Enemy_211_Atk(this));
        };
        e.prototype.enterAttackCd = function () {
            this._attackCD = this._cfg.arkWait;
        };
        return __decorate([u], e);
    })($enemyBase.default));
exports.default = p;
