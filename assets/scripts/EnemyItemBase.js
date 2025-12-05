var i;
var $stateMachine = require("./StateMachine");
var $actorEnum = require("./ActorEnum");
var $actorBase = require("./ActorBase");
var $enemyItem_Dead = require("./EnemyItem_Dead");
var $enemyItem_Idle = require("./EnemyItem_Idle");
var p = cc._decorator;
var h = p.ccclass;
var f =
    (p.property,
    (function (t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        __extends(e, t);
        e.prototype.initType = function () {
            this._actorType = $actorEnum.EActorType.ENEMY;
        };
        e.prototype.registerState = function () {
            this._sm = new $stateMachine.StateMachine();
            this._sm.addState($actorEnum.EActorStateType.IDLE, new $enemyItem_Idle.EnemyItem_Idle(this));
            this._sm.addState($actorEnum.EActorStateType.DEAD, new $enemyItem_Dead.EnemyItem_Dead(this));
        };
        e.prototype.playAnimIdle = function () {};
        e.prototype.fadeIn = function (t, e) {
            if (void 0 === t) {
                t = 0.3;
            }
            this.node.opacity = 0;
            cc.tween(this.node)
                .to(t, {
                    opacity: 255
                })
                .call(function () {
                    if (e) {
                        e();
                    }
                })
                .start();
        };
        e.prototype.fadeOut = function (t, e) {
            if (void 0 === t) {
                t = 0.3;
            }
            cc.tween(this.node)
                .to(t, {
                    opacity: 0
                })
                .call(function () {
                    if (e) {
                        e();
                    }
                })
                .start();
        };
        return __decorate([h], e);
    })($actorBase.default));
exports.default = f;
