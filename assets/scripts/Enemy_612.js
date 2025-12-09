var i;
var $eventManager = require("./EventManager");
var $randomUtil = require("./RandomUtil");
var $battleMgr = require("./BattleMgr");
var $spAnimCtrl = require("./SpAnimCtrl");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var $door = require("./Door");
var $actorBase = require("./ActorBase");
var $actorMgr = require("./ActorMgr");
var $playerBase = require("./PlayerBase");
var $enemyBase = require("./EnemyBase");
var v = cc._decorator;
var b = v.ccclass;
var E =
    (v.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._isTurnBacked = !1;
            e._isTurnBacking = !1;
            e._nBackView = null;
            e._spBackAnimCtrl = null;
            return e;
        }
        __extends(e, t);
        e.prototype.onLoad = function () {
            t.prototype.onLoad.call(this);
            this._nBackView = this.node.getChildByName("Body").getChildByName("BackView");
        };
        e.prototype.initAnim = function () {
            this.node.getChildByName("Body").getChildByName("Anim").active = !1;
            this._spBackAnimCtrl = this._nBackView.getChildByName("BackAnim").getComponent($spAnimCtrl.default);
            this._nBackView.active = !0;
            this._spBackAnimCtrl.init();
            this._spBackAnimCtrl.playAnim("stand", 1, !0);
            return t.prototype.initAnim.call(this);
        };
        e.prototype.onInit = function () {
            this._isTurnBacking = !1;
            this._isTurnBacked = !1;
            t.prototype.onInit.call(this);
        };
        e.prototype.onUpdate = function (e) {
            t.prototype.onUpdate.call(this, e);
            if (this.canTurnBack()) {
                this.turnBack();
            }
        };
        e.prototype.canTurnBack = function () {
            if (this._isTurnBacked) {
                return !1;
            }
            if (this._isTurnBacking) {
                return !1;
            }
            var t = $battleMgr.default.instance.getCurScene();
            if (!t) {
                return !1;
            }
            var e = $actorMgr.default.instance.getActor(t.playerId);
            return !(
                !e ||
                e.isDead() ||
                !(
                    this._roomId == e.roomId &&
                    Math.abs(e.node.x - this.node.x) < 50 &&
                    $levelBattleData.levelBattleData.hasBagItem(Number(this._cfg.val1))
                )
            );
        };
        e.prototype.turnBack = function () {
            var t = this;
            this._isTurnBacking = !0;
            this._spBackAnimCtrl.playAnim("startle", 1, !1, function () {
                t._isTurnBacked = !0;
                t.node.getChildByName("Body").getChildByName("Anim").active = !0;
                t._nBackView.active = !1;
                var e = $battleMgr.default.instance.getCurScene();
                if (e) {
                    var n = $actorMgr.default.instance.getActor(e.playerId);
                    if (n && !n.isDead()) {
                        t.changeState($actorEnum.EActorStateType.WALK, n);
                    }
                }
            });
        };
        e.prototype.canBeSearch = function () {
            return this._isTurnBacked && t.prototype.canBeSearch.call(this);
        };
        e.prototype.canBeHurt = function () {
            return this._isTurnBacked && t.prototype.canBeHurt.call(this);
        };
        e.prototype.searchTarget = function () {
            if (this._isTurnBacked) {
                return t.prototype.searchTarget.call(this);
            } else {
                return null;
            }
        };
        e.prototype.attackHit = function (t) {
            if (t && t.isValid) {
                var e = t.getComponent($door.default);
                if (e && e.state != $door.EDoorState.DESTROY) {
                    e.beHurt(this.getAttribute($attrEnum.E_AttrType.ATK).value);
                } else {
                    var n = t.getComponent($playerBase.default);
                    if (n) {
                        if ($levelBattleData.levelBattleData.bagData.bagEquipDatas.length > 0) {
                            for (var i = Number(this._cfg.val2); i > 0; ) {
                                if ($levelBattleData.levelBattleData.bagData.bagEquipDatas.length > 0) {
                                    var o = $randomUtil.RandomUtil.randomInt(
                                        0,
                                        $levelBattleData.levelBattleData.bagData.bagEquipDatas.length
                                    );
                                    var r = $levelBattleData.levelBattleData.bagData.bagEquipDatas[o];
                                    r.rowCol = "";
                                    $levelBattleData.levelBattleData.bagData.bagEquipDatas.splice(o, 1);
                                    $eventManager.EventManager.instance.emit(
                                        $levelBattleData.ELevelBattleDataEvent.BAG_ITEM_CHANGE
                                    );
                                    $eventManager.EventManager.instance.emit(
                                        $battleEnum.EBattleEvent.REWARD_LEAVE_BAG_INFORM + r.unitId
                                    );
                                    $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.UPDATE_BAG_UI);
                                }
                                i--;
                            }
                            return;
                        }
                        n.beHurt(this.getHurt());
                    } else {
                        var c = t.getComponent($actorBase.default);
                        if (c) {
                            c.beHurt(this.getHurt());
                        }
                        $levelBattleData.levelBattleData.bagData.bagEquipDatas.length;
                    }
                }
            }
        };
        return __decorate([b], e);
    })($enemyBase.default));
exports.default = E;
