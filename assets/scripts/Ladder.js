var i;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $sceneManager = require("./SceneManager");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $commonUnlockTips = require("./CommonUnlockTips");
var $battleMgr = require("./BattleMgr");
var $simplyCircleCollider = require("./SimplyCircleCollider");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $simplyVec2 = require("./SimplyVec2");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var $progressWaitItem = require("./ProgressWaitItem");
var $levelObjectBase = require("./LevelObjectBase");
var v = cc._decorator;
var b = v.ccclass;
var E = v.property;
var S = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.selfCollider = null;
        e.pUnlockTip = null;
        e.nIcon = null;
        e.nLockIcon = null;
        e._isUnlcok = !0;
        e._unlockMethod = 0;
        e._unlockCost = 0;
        e._showType = 0;
        e._bindPointIds = [];
        e._curUnlockCost = 0;
        e._waitTime = 0;
        e._waitTimer = 0;
        e._progress = null;
        e._unlockTime = 0;
        e._unlockTimer = 0.2;
        e._unlockTips = null;
        e._isShowLackTips = !1;
        e._isPlayAdUnlock = !1;
        e._isFixedDisplayUnlock = !0;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "bindPointIds", {
        get: function () {
            return this._bindPointIds;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "isUnlock", {
        get: function () {
            return this._isUnlcok;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "isExitLadder", {
        get: function () {
            return this._initParam.isExitLadder;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "lineIds", {
        get: function () {
            var t = this._bindPointIds[0];
            var e = this._bindPointIds[1];
            return [t + "|" + e, e + "|" + t];
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onInit = function () {
        var t = this;
        this._isFixedDisplayUnlock = $battleMgr.default.instance.isFixedDisplayUnlock;
        $eventManager.EventManager.instance.on(
            $battleEnum.EBattleEvent.PLAYER_ROOM_ID_CHANGE_INFORM,
            this.onEventPlayerRoomIdChange,
            this
        );
        $eventManager.EventManager.instance.on(
            $battleEnum.EBattleEvent.TRIGGER_BOSS_INFORM,
            this.onEventBossTrigger,
            this
        );
        $eventManager.EventManager.instance.on(
            $battleEnum.EBattleEvent.TRIGGER_BOSS_END_INFORM,
            this.onEventBossEnd,
            this
        );
        $eventManager.EventManager.instance.on(
            $battleEnum.EBattleEvent.PLAYER_ENTER_WAIT_FOR_RESCUE_INFORM,
            this.onEventEnterWait,
            this
        );
        this.updateRoomId(this._initParam.roomId);
        this._unlockMethod = this._initParam.unlockMethod;
        this._unlockCost = this._initParam.unlockCost;
        this._showType = this._initParam.showType;
        this._bindPointIds = this._initParam.bindPointIds;
        this._isPlayAdUnlock = !1;
        this._isUnlcok = 0 == this._unlockMethod;
        this._curUnlockCost = 0;
        this._waitTimer = Number($cfg.default.instance.dataCons.getById(141).val);
        $battleMgr.default.instance.createOtherNode(
            2 == this._unlockMethod ? "AdProgressWaitItem" : "ProgressWaitItem",
            function (e) {
                t._progress = e.getComponent($progressWaitItem.default);
                t._progress.init(1, 2 != t._unlockMethod);
                t._progress.node.x = t.node.x;
                t._progress.node.y = t.node.y + 150;
                if (t._isFixedDisplayUnlock && 2 == t._unlockMethod) {
                    t._progress.show();
                }
            }
        );
        this.initUnlockTips();
        this.updateView();
    };
    e.prototype.initUnlockTips = function () {
        if (0 != this._unlockMethod && 2 != this._unlockMethod) {
            var t = cc.instantiate(this.pUnlockTip);
            if (
                1 ===
                ($sceneManager.SceneManager.instance.curScene.curUINode.getChildByName("GameLayer").addChild(t),
                (this._unlockTips = t.getComponent($commonUnlockTips.default)),
                this._unlockMethod)
            ) {
                this._unlockTips.initTips($commonUnlockTips.EUnlockType.GOLD, this._unlockCost);
            }
            this._unlockTips.node.active = this._isFixedDisplayUnlock;
        }
    };
    e.prototype.updateView = function () {
        var t = this.node.getChildByName("Bed");
        var e = this.node.getChildByName("Normal");
        if (this._isUnlcok) {
            t.active = !1;
            e.active = !0;
            this.nIcon.active = !0;
            this.nLockIcon.active = !1;
            if (0 == this._showType) {
                this.nIcon.anchorY = 0;
            } else {
                this.nIcon.anchorY = 1;
            }
            this.nIcon.y = (this._showType, 0);
            if (0 == this._showType) {
                this.nLockIcon.anchorY = 0;
            } else {
                this.nLockIcon.anchorY = 1;
            }
            this.nLockIcon.y = (this._showType, 0);
        } else {
            t.active = !0;
            e.active = !1;
            t.getChildByName("Up").active = 0 == this._showType;
            t.getChildByName("Down").active = 1 == this._showType;
        }
    };
    e.prototype.triggerUnlock = function (t) {
        this._curUnlockCost += t;
        if (this._curUnlockCost >= this._unlockCost) {
            this.unlock();
        }
        if (this._unlockTips) {
            this._unlockTips.hideTips(!0);
            this._unlockTips = null;
        }
    };
    e.prototype.unlock = function () {
        this._isUnlcok = !0;
        var t = $battleMgr.default.instance.getCurScene().level;
        this._bindPointIds.forEach(function (e) {
            t.path.unlockPoint(e);
        });
        this.updateView();
    };
    e.prototype.checkPlayerCollision = function (t, e) {
        return $simplyCollisionDetector.default.isCollisionPointToCircle(
            new $simplyVec2.default(e.x, e.y),
            this.selfCollider.circle
        );
    };
    e.prototype.onPlayerCollisionEnter = function () {};
    e.prototype.onPlayerCollisionStay = function (t, e) {
        var n = this;
        if (!this._isUnlcok) {
            if (this._waitTime < this._waitTimer) {
                this._waitTime += e;
                this._progress &&
                    ((this._progress.node.x = t.node.x),
                    (this._progress.node.y = t.node.y + 150),
                    this._progress.show(),
                    this._progress.updateProgress(this._waitTime / this._waitTimer));
            } else {
                if (this._progress) {
                    this._progress.hide();
                }
                if (this._unlockTips && this._unlockTips.node.active) {
                    this._unlockTips.hideTips(!0);
                    return void (this._unlockTips = null);
                }
                switch (this._unlockMethod) {
                    case 1:
                        if (this._isFixedDisplayUnlock) {
                            //
                        } else {
                            if (this._unlockTips && !this._unlockTips.node.active) {
                                this._unlockTips.node.active = !0;
                                this._unlockTips.showTips();
                            }
                        }
                        this._unlockTime -= e;
                        if (this._unlockTime <= 0) {
                            this._unlockTime = this._unlockTimer;
                            if ($levelBattleData.levelBattleData.gold < 1) {
                                return void (
                                    this._isShowLackTips ||
                                    ((this._isShowLackTips = !0), $globalPopupMgr.default.instance.showTips("元宝不足"))
                                );
                            }
                            $levelBattleData.levelBattleData.updateGold(-1);
                            this.triggerUnlock(1);
                            if (this._unlockTips) {
                                this._unlockTips.updateTips(this._unlockCost - this._curUnlockCost);
                            }
                        }
                        break;
                    case 2:
                        if (this._isPlayAdUnlock) {
                            //
                        } else {
                            this._isPlayAdUnlock = !0;
                            $globalPopupMgr.default.instance.showLevelAdConfirmPopup(
                                "解锁楼梯",
                                "是否观看广告开启楼梯",
                                function () {
                                    n.triggerUnlock(1);
                                },
                                function () {
                                    n._isPlayAdUnlock = !1;
                                    n._waitTime = 0;
                                },
                                "AD_OpenRoom",
                                $battleMgr.default.instance.getCurScene().isPlay
                            );
                        }
                }
            }
        }
    };
    e.prototype.onPlayerCollisionExit = function () {
        this._waitTime = 0;
        this._isShowLackTips = !1;
        if (2 == this._unlockMethod) {
            if (this._isFixedDisplayUnlock) {
                this._progress.updateProgress(0);
            } else {
                this._progress && this._progress.hide();
            }
        } else {
            this._progress && this._progress.hide();
            this._isFixedDisplayUnlock || (this._unlockTips && this._unlockTips.hideTips());
        }
    };
    e.prototype.onRemove = function () {
        if (this._unlockTips) {
            this._unlockTips.node.destroy();
            this._unlockTips = null;
        }
        this._progress.remove();
        this._progress = null;
        $eventManager.EventManager.instance.off(
            $battleEnum.EBattleEvent.TRIGGER_BOSS_INFORM,
            this.onEventBossTrigger,
            this
        );
        $eventManager.EventManager.instance.off(
            $battleEnum.EBattleEvent.TRIGGER_BOSS_END_INFORM,
            this.onEventBossEnd,
            this
        );
        $eventManager.EventManager.instance.off(
            $battleEnum.EBattleEvent.PLAYER_ENTER_WAIT_FOR_RESCUE_INFORM,
            this.onEventEnterWait,
            this
        );
        $eventManager.EventManager.instance.off(
            $battleEnum.EBattleEvent.PLAYER_ROOM_ID_CHANGE_INFORM,
            this.onEventPlayerRoomIdChange,
            this
        );
        t.prototype.onRemove.call(this);
    };
    e.prototype.onEventPlayerRoomIdChange = function () {};
    e.prototype.onEventBossTrigger = function () {
        if (this.isExitLadder) {
            this.nIcon.active = !1;
            this.nLockIcon.active = !0;
        }
    };
    e.prototype.onEventBossEnd = function () {
        if (this.isExitLadder) {
            this.nIcon.active = !0;
            this.nLockIcon.active = !1;
        }
    };
    e.prototype.onEventEnterWait = function () {
        if (this.isExitLadder) {
            this.nIcon.active = !1;
            this.nLockIcon.active = !0;
        }
    };
    __decorate([E($simplyCircleCollider.default)], e.prototype, "selfCollider", void 0);
    __decorate([E(cc.Prefab)], e.prototype, "pUnlockTip", void 0);
    __decorate([E(cc.Node)], e.prototype, "nIcon", void 0);
    __decorate([E(cc.Node)], e.prototype, "nLockIcon", void 0);
    return __decorate([b], e);
})($levelObjectBase.default);
exports.default = S;
