var i;
var $cfg = require("./Cfg");
var $audioUtil = require("./AudioUtil");
var $eventManager = require("./EventManager");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $guideMgr = require("./GuideMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $commonUnlockTips = require("./CommonUnlockTips");
var $battleMgr = require("./BattleMgr");
var $simplyRectCollider = require("./SimplyRectCollider");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $simplyVec2 = require("./SimplyVec2");
var $actorEnum = require("./ActorEnum");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var $progressWaitItem = require("./ProgressWaitItem");
var $levelObjectBase = require("./LevelObjectBase");
var S = cc._decorator;
var P = S.ccclass;
var A = S.property;
var w = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.selfCollider = null;
        e.pUnlockTip = null;
        e._waitTime = 0;
        e._waitTimer = 0;
        e._progress = null;
        e._unlockTime = 0;
        e._unlockTimer = 0.1;
        e._unlockTips = null;
        e._isShowLockTips = !1;
        e._isFixedDisplayUnlock = !0;
        e._isPlayAdUnlock = !1;
        e._isLockCheck = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        var t = this;
        this._isFixedDisplayUnlock = $battleMgr.default.instance.isFixedDisplayUnlock;
        this._isPlayAdUnlock = !1;
        this._isShowLockTips = !0;
        this._isLockCheck = !1;
        this.updateRoomId(this._initParam.roomId);
        var e = $cfg.default.instance.dataRoom.getById(this._roomId);
        this._waitTimer = Number($cfg.default.instance.dataCons.getById(12 == e.openType ? 127 : 125).val);
        $battleMgr.default.instance.createOtherNode(
            12 == e.openType ? "AdProgressWaitItem" : "ProgressWaitItem",
            function (n) {
                t._progress = n.getComponent($progressWaitItem.default);
                t._progress.init(1, 12 != e.openType);
                t._progress.node.x = t.node.x;
                t._progress.node.y = t.node.y + 150;
                if (t._isFixedDisplayUnlock && 12 == e.openType) {
                    t._progress.show();
                }
            }
        );
        this.initUnlockTips();
    };
    e.prototype.initUnlockTips = function () {
        var t = $cfg.default.instance.dataRoom.getById(this._roomId);
        if (12 != t.openType && 1 != t.openType) {
            var e = cc.instantiate(this.pUnlockTip);
            $battleMgr.default.instance.getCurScene().effectParent.addChild(e);
            this._unlockTips = e.getComponent($commonUnlockTips.default);
            switch (t.openType) {
                case 2:
                    this._unlockTips.initTips($commonUnlockTips.EUnlockType.GOLD, t.openVal);
                    break;
                case 11:
                    this._unlockTips.initTips($commonUnlockTips.EUnlockType.ITEM, 1, t.openVal);
            }
            var n = this.node.getPosition();
            n.x += 20;
            n.y += 160;
            this._unlockTips.node.setPosition(n);
            this._unlockTips.node.active = this._isFixedDisplayUnlock;
            if (this._unlockTips.node.active) {
                this._unlockTips.showTips();
            }
        }
    };
    e.prototype.checkPlayerCollision = function (t, e) {
        return $simplyCollisionDetector.default.isCollisionPointToRect(
            new $simplyVec2.default(e.x, e.y),
            this.selfCollider.rect
        );
    };
    e.prototype.onPlayerCollisionStay = function (t, e) {
        var n = this;
        if (!this._isRemove) {
            var i = $cfg.default.instance.dataRoom.getById(this._roomId);
            if (12 == i.openType && t.curState == $actorEnum.EActorStateType.WALK) {
                this._waitTime = 0;
                return void (this._isFixedDisplayUnlock ? this._progress.updateProgress(0) : this._progress.hide());
            }
            if (this._waitTime < this._waitTimer) {
                this._waitTime += e;
                this._progress &&
                    (this._progress.show(), this._progress.updateProgress(this._waitTime / this._waitTimer));
            } else {
                if (this._progress) {
                    this._progress.hide();
                }
                var o = $battleMgr.default.instance.getCurScene().level.getRoomById(this._roomId);
                if (o.isUnlock && this._unlockTips && this._unlockTips.node.active) {
                    this._unlockTips.hideTips(!0);
                    return void (this._unlockTips = null);
                }
                switch (i.openType) {
                    case 1:
                        if (this._isLockCheck) {
                            //
                        } else {
                            this._isLockCheck = !0;
                            $globalPopupMgr.default.instance.showTips("房间解锁后才可进入");
                        }
                        break;
                    case 2:
                        if (this._isFixedDisplayUnlock) {
                            //
                        } else {
                            if (this._unlockTips && !this._unlockTips.node.active) {
                                this._unlockTips.node.active = !0;
                                this._unlockTips.showTips();
                            }
                        }
                        if (
                            0 == $levelBattleData.levelBattleData.cfgStage.id &&
                            $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_8
                        ) {
                            if (this._isLockCheck) {
                                //
                            } else {
                                $globalPopupMgr.default.instance.showTips("元宝足够后可解锁");
                                this._isLockCheck = !0;
                            }
                            break;
                        }
                        this._unlockTime -= e;
                        if (this._unlockTime <= 0) {
                            this._unlockTime = this._unlockTimer;
                            if ($levelBattleData.levelBattleData.gold < 1) {
                                if (this._isShowLockTips) {
                                    //
                                } else {
                                    this._isShowLockTips = !0;
                                    $globalPopupMgr.default.instance.showTips("元宝不足");
                                }
                                break;
                            }
                            $levelBattleData.levelBattleData.updateGold(-1);
                            $audioUtil.AudioUtil.playLimitEffect("sounds/lmtw_yx_ConsumingMoney", 0.2);
                            o.triggerUnlock(1);
                            if (this._unlockTips) {
                                this._unlockTips.updateTips(o.curUnlockResidueCost);
                            }
                        }
                        break;
                    case 11:
                        if (this._isLockCheck) {
                            return;
                        }
                        var r = function () {
                            n._isLockCheck = !0;
                            var t = $cfg.default.instance.dataReward.getById(i.openVal);
                            if ($levelBattleData.levelBattleData.hasBagItem(t.id)) {
                                n._unlockTips.setLockClick(!0);
                                var e = n._unlockTips.node.convertToWorldSpaceAR(cc.v2(25, 25));
                                $eventManager.EventManager.instance.emit(
                                    $battleEnum.EBattleEvent.CONSUME_FLY_ITEM,
                                    t.id,
                                    1,
                                    e,
                                    function () {
                                        n._unlockTips.setLockClick(!1);
                                        var t = $battleMgr.default.instance.getCurScene().level.getRoomById(n._roomId);
                                        if (t) {
                                            $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_OpenKeyDoor");
                                            t.triggerUnlock(1);
                                        }
                                    }
                                );
                            } else {
                                $globalPopupMgr.default.instance.showTips("未获得" + t.name);
                            }
                        };
                        if (!this._isFixedDisplayUnlock) {
                            if (this._unlockTips && !this._unlockTips.node.active) {
                                this._unlockTips.node.active = !0;
                                this._unlockTips.showTips(function () {
                                    r();
                                });
                            }
                            break;
                        }
                        r();
                        break;
                    case 12:
                        if (this._isPlayAdUnlock) {
                            //
                        } else {
                            this._isPlayAdUnlock = !0;
                            $globalPopupMgr.default.instance.showLevelAdConfirmPopup(
                                "解锁房间",
                                "是否观看广告开启奖励房间",
                                function () {
                                    var t = $battleMgr.default.instance.getCurScene().level.getRoomById(n._roomId);
                                    if (t) {
                                        $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_OpenKeyDoor");
                                        t.triggerUnlock(1);
                                    }
                                },
                                function () {
                                    n._waitTime = 0;
                                    n._isPlayAdUnlock = !1;
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
        this._isShowLockTips = !1;
        this._isLockCheck = !1;
        this._isPlayAdUnlock = !1;
        if (12 == $cfg.default.instance.dataRoom.getById(this._roomId).openType) {
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
            this._unlockTips.hideTips(!0);
            this._unlockTips = null;
        }
        this._progress.remove();
        this._progress = null;
        t.prototype.onRemove.call(this);
    };
    __decorate([A($simplyRectCollider.default)], e.prototype, "selfCollider", void 0);
    __decorate([A(cc.Prefab)], e.prototype, "pUnlockTip", void 0);
    return __decorate([P], e);
})($levelObjectBase.default);
exports.default = w;
