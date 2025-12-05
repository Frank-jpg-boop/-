var i;
var $eventManager = require("./EventManager");
var $battleMgr = require("./BattleMgr");
var $actorEnum = require("./ActorEnum");
var $battleEnum = require("./BattleEnum");
var $actorMgr = require("./ActorMgr");
var $enemyBase = require("./EnemyBase");
var $enemy_113_Appear = require("./Enemy_113_Appear");
var f = cc._decorator;
var d = f.ccclass;
var m =
    (f.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._isAppear = !1;
            return e;
        }
        __extends(e, t);
        e.prototype.registerEvent = function () {
            t.prototype.registerEvent.call(this);
            $eventManager.EventManager.instance.on(
                $battleEnum.EBattleEvent.ROOM_ACTIVATE,
                this.onEventRoomActivate,
                this
            );
        };
        e.prototype.onInit = function () {
            t.prototype.onInit.call(this);
            this._isTrigger = !1;
            if (this.isFixCreate) {
                if (this.canBeSearch()) {
                    this.changeState($actorEnum.EActorStateType.EXTEND_1);
                } else {
                    this.node.active = !1;
                }
            } else {
                this.changeState($actorEnum.EActorStateType.EXTEND_1);
            }
        };
        e.prototype.unRegisterEvent = function () {
            t.prototype.unRegisterEvent.call(this);
            $eventManager.EventManager.instance.off(
                $battleEnum.EBattleEvent.ROOM_ACTIVATE,
                this.onEventRoomActivate,
                this
            );
        };
        e.prototype.registerState = function () {
            t.prototype.registerState.call(this);
            this._sm.addState($actorEnum.EActorStateType.EXTEND_1, new $enemy_113_Appear.Enemy_113_Appear(this));
        };
        e.prototype.canBeSearch = function () {
            return (
                t.prototype.canBeSearch.call(this) &&
                this._isTrigger &&
                this.curState != $actorEnum.EActorStateType.EXTEND_1
            );
        };
        e.prototype.canBeHurt = function () {
            return (
                t.prototype.canBeHurt.call(this) &&
                this._isTrigger &&
                this.curState != $actorEnum.EActorStateType.EXTEND_1
            );
        };
        e.prototype.playAnimAppear = function (t) {
            if (this._flagEffect) {
                if (2 == this._cfg.isBoss) {
                    this._flagEffect.spAnimCtrls[0].spAnim.setSkin("boss"),
                        (this._flagEffect.spAnimCtrls[0].node.active = !0),
                        (this._flagEffect.spAnimCtrls[1].node.active = !1),
                        this._flagEffect.playDefaultAnim("loop", 1, !0);
                } else {
                    (this._flagEffect.spAnimCtrls[0].node.active = !1),
                        (this._flagEffect.spAnimCtrls[1].node.active = !0),
                        this._flagEffect.spAnimCtrls[1].playAnim("stand", 1, !0);
                }
            }
            this._spCtrl.playAnim("drill", 1, !1, function () {
                if (t) {
                    t();
                }
            });
        };
        e.prototype.onUpdate = function (e) {
            t.prototype.onUpdate.call(this, e);
            var n = $actorMgr.default.instance.getActor($battleMgr.default.instance.getCurScene().playerId);
            if (n && !this._isTrigger && this.roomId == n.roomId && Math.abs(n.node.x - this.node.x) < 100) {
                this._isTrigger = !0;
                this.node.active = !0;
                this.changeState($actorEnum.EActorStateType.EXTEND_1);
            }
        };
        e.prototype.onEventRoomActivate = function () {
            this._roomId;
        };
        return __decorate([d], e);
    })($enemyBase.default));
exports.default = m;
