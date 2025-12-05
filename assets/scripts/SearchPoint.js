var i;
var $cfg = require("./Cfg");
var $audioUtil = require("./AudioUtil");
var $eventManager = require("./EventManager");
var $randomUtil = require("./RandomUtil");
var $frameEnum = require("./FrameEnum");
var $animUtils = require("./AnimUtils");
var $guideMgr = require("./GuideMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $itemDataProxy = require("./ItemDataProxy");
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var $progressWaitItem = require("./ProgressWaitItem");
var $unitMgr = require("./UnitMgr");
var $levelObjectBase = require("./LevelObjectBase");
var S = cc._decorator;
var P = S.ccclass;
var A =
    (S.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._waitTime = 0;
            e._waitTimer = 0;
            e._progress = null;
            e._rewards = null;
            e._worldPos = null;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "rewardNum", {
            get: function () {
                return this._rewards.length;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "worldPos", {
            get: function () {
                return this._worldPos;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onInit = function () {
            var t = this;
            this._worldPos = this.node.convertToWorldSpaceAR(cc.v2());
            $eventManager.EventManager.instance.on(
                $battleEnum.EBattleEvent.PLAYER_ROOM_ID_CHANGE_INFORM,
                this.onEventPlayerRoomIdChange,
                this
            );
            this.updateRoomId(this._initParam.roomId);
            this.initReward();
            var e = this.node.getChildByName("Icon");
            e.y = 0;
            $animUtils.AnimUtil.floatAnim(e, 0.7, 10);
            $battleMgr.default.instance.createOtherNode("ProgressWaitItem", function (e) {
                t._progress = e.getComponent($progressWaitItem.default);
                if (t._isRemove) {
                    t._progress.remove();
                    return void (t._progress = null);
                }
                t._progress.init();
                t._progress.node.x = t.node.x;
                t._progress.node.y = t.node.y + 100;
            });
        };
        e.prototype.initReward = function () {
            var t = this;
            this._rewards = [];
            var e = [];
            if ("" != this._initParam.param) {
                this._initParam.param.split("|").forEach(function (t) {
                    var n = t.split("_").map(Number);
                    var i = n[0];
                    var o = n[1];
                    e.push({
                        rewardId: i,
                        prob: o
                    });
                });
            }
            e.forEach(function (e) {
                if (
                    $itemDataProxy.itemDataProxy.checkCanDropReward(e.rewardId) &&
                    $randomUtil.RandomUtil.randomInt(0, 100) < 100 * e.prob
                ) {
                    t._rewards.push(e.rewardId);
                }
            });
            if (0 == $levelBattleData.levelBattleData.cfgStage.id) {
                this._rewards.sort(function (e, n) {
                    if (22 == t.roomId) {
                        return e - n;
                    } else {
                        return n - e;
                    }
                });
            }
        };
        e.prototype.onEventPlayerRoomIdChange = function (t) {
            this.node.active = this._rewards.length > 0 && t === this.roomId;
        };
        e.prototype.addReward = function (t) {
            var e = this;
            this._rewards.push(t);
            this._rewards.sort(function (t, n) {
                if (0 == $levelBattleData.levelBattleData.cfgStage.id) {
                    if (22 == e.roomId) {
                        return t - n;
                    } else {
                        return n - t;
                    }
                } else {
                    if (Math.random() < 0.5) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            });
        };
        e.prototype.updateRewardData = function () {
            var t = this._rewards[0];
            var e = $cfg.default.instance.dataReward.getById(t);
            this._waitTimer = e.checkTime;
            this._waitTime = 0;
            if (this._progress) {
                this._progress.init(e.rare);
            }
        };
        e.prototype.dropReward = function (t) {
            var e = this._rewards[0];
            if (1 == e) {
                for (var n = 0; n < this._rewards.length; n++) {
                    if (1 == this._rewards[n]) {
                        this._rewards.splice(n, 1);
                        n--;
                        this.createReward(t, e);
                    }
                }
                $audioUtil.AudioUtil.playLimitEffect("sounds/lmtw_yx_SearchCoins");
            } else {
                this._rewards.shift();
                this.createReward(t, e);
                $audioUtil.AudioUtil.playLimitEffect("sounds/lmtw_yx_QiTaWuPinDiaoLuo");
            }
            if (0 != this._rewards.length) {
                this.updateRewardData();
            } else {
                this.remove();
            }
        };
        e.prototype.createReward = function (t, e) {
            var n = this;
            var i = $battleMgr.default.instance.getCurScene();
            var o = this.node.getPosition();
            var r = $randomUtil.RandomUtil.randomInt(-200, 200);
            $unitMgr.UnitMgr.instance.createUnit({
                areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.GOOD,
                areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
                parent: i.unitParent,
                prefabName: "SceneGood",
                unitClass: "SceneGood",
                initPos: o,
                initParam: {
                    rewardId: e,
                    rewardNum: 1
                },
                onCreated: function (i) {
                    if (1 == e) {
                        i.scheduleOnce(function () {
                            i.updateRoomId(n.roomId);
                            i.drop(t, r, 0.35, 40, 0.2);
                        }, $randomUtil.RandomUtil.random(0, 0.5));
                    } else {
                        i.updateRoomId(n.roomId);
                        i.drop(t, r, 0.35, 40, 0.2);
                    }
                }
            });
        };
        e.prototype.checkPlayerCollision = function (t, e) {
            return t.roomId == this._roomId && Math.abs(this.worldPos.x - e.x) < 50;
        };
        e.prototype.onPlayerCollisionEnter = function () {
            this.node.getChildByName("Icon").active = !1;
            this.updateRewardData();
            $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_Search", $frameEnum.Frame.EBundleName.RES, !0);
        };
        e.prototype.onPlayerCollisionStay = function (t, e) {
            if (this._waitTime < this._waitTimer) {
                this._waitTime += e;
                this._progress &&
                    ((this._progress.node.x = t.node.x),
                    (this._progress.node.y = t.node.y + 180),
                    this._progress.show(),
                    this._progress.updateProgress(this._waitTime / this._waitTimer));
            } else {
                if (this._progress) {
                    this._progress.hide();
                }
                var n = $battleMgr.default.instance.getCurScene().level.getRoomById(this.roomId);
                this.dropReward(n.getGroundY());
            }
        };
        e.prototype.onPlayerCollisionExit = function () {
            $audioUtil.AudioUtil.stopEffect("lmtw_yx_Search");
            this.node.getChildByName("Icon").active = !0;
            this._waitTime = 0;
            if (this._progress) {
                this._progress.hide();
            }
        };
        e.prototype.onRemove = function () {
            var e = this.node.getChildByName("Icon");
            cc.Tween.stopAllByTarget(e);
            $audioUtil.AudioUtil.stopEffect("lmtw_yx_Search");
            e.y = 0;
            if (this._progress) {
                this._progress.remove();
                this._progress = null;
            }
            $eventManager.EventManager.instance.off(
                $battleEnum.EBattleEvent.PLAYER_ROOM_ID_CHANGE_INFORM,
                this.onEventPlayerRoomIdChange,
                this
            );
            if (
                0 == $levelBattleData.levelBattleData.cfgStage.id &&
                $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_3
            ) {
                $eventManager.EventManager.instance.emit(
                    $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                    $guideDataProxy.EGuideStepId.G_3
                );
            }
            t.prototype.onRemove.call(this);
        };
        return __decorate([P], e);
    })($levelObjectBase.default));
exports.default = A;
