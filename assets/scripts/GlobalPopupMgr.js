var i;
var $cfg = require("./Cfg");
var $appBase = require("./AppBase");
var $blockInputManager = require("./BlockInputManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $popupManager = require("./PopupManager");
var $util = require("./Util");
var $battleMgr = require("./BattleMgr");
var $itemDataProxy = require("./ItemDataProxy");
var $tips = require("./Tips");
var y = cc._decorator;
var _ = y.ccclass;
var g =
    (y.property,
    (function (t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        var n;
        __extends(e, t);
        n = e;
        Object.defineProperty(e, "instance", {
            get: function () {
                return n._instance;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onLoad = function () {
            n._instance = this;
            cc.game.addPersistRootNode(this.node);
        };
        e.prototype.showTips = function (t, e) {
            if (void 0 === e) {
                e = 1;
            }
            var n = $appBase.topNode.getChildByName("Tips");
            if (n) {
                var i = n.getComponent($tips.default);
                if (i) {
                    return void i.pushTips(t, e);
                }
            }
            $resLoader.ResLoader.loadAsset({
                bundleName: $frameEnum.Frame.EBundleName.RES,
                path: "prefabs/Tips",
                type: cc.Prefab,
                success: function (n) {
                    n.addRef();
                    var i = cc.instantiate(n);
                    $appBase.topNode.addChild(i);
                    var o = i.getComponent($tips.default);
                    if (o) {
                        o.pushTips(t, e);
                    }
                }
            });
        };
        e.prototype.showCopyright = function () {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.RES,
                path: "popups/CopyrightPopup",
                keep: !0
            });
        };
        e.prototype.showAwardNotice = function (t, e) {
            if (void 0 === e) {
                e = null;
            }
            $itemDataProxy.itemDataProxy.addItems(t);
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.RES,
                path: "popups/AwardNoticePopup",
                keep: !0,
                params: {
                    rewards: t,
                    onClose: e
                }
            });
        };
        e.prototype.showGM = function () {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "popups/GMPopup",
                keep: !0
            });
        };
        e.prototype.showBattleGM = function () {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.RES,
                path: "popups/BattleGMPopup",
                keep: !0
            });
        };
        e.prototype.showGMInput = function (t, e, n) {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.RES,
                path: "popups/GMInputPopup",
                keep: !0,
                params: {
                    title: t,
                    inputDatas: e,
                    onClickOk: n
                }
            });
        };
        e.prototype.showLevelOver = function () {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "popups/LevelOverPopup",
                keep: !0
            });
        };
        e.prototype.showLevelWin = function (t) {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "popups/LevelWinPopup",
                keep: !0,
                params: {
                    isFinish: t
                }
            });
        };
        e.prototype.showLevelFail = function (t) {
            if (void 0 === t) {
                t = !1;
            }
            $battleMgr.default.instance.getCurScene().pause();
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "popups/LevelFailPopup",
                keep: !0,
                params: {
                    battlePlayState: t
                }
            });
        };
        e.prototype.showLevelSkill = function (t) {
            if (void 0 === t) {
                t = !1;
            }
            $battleMgr.default.instance.getCurScene().pause();
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "popups/LevelSkillPopup",
                keep: !0,
                params: {
                    battlePlayState: t
                }
            });
        };
        e.prototype.showLevelSkillEx = function (t, e, n) {
            if (void 0 === t) {
                t = 0;
            }
            if (void 0 === e) {
                e = !1;
            }
            if (void 0 === n) {
                n = 0;
            }
            $battleMgr.default.instance.getCurScene().pause();
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "popups/LevelSkillExPopup",
                keep: !0,
                params: {
                    golden: t,
                    battlePlayState: e,
                    iconType: n
                }
            });
        };
        e.prototype.showLevelSet = function (t) {
            if (void 0 === t) {
                t = !1;
            }
            $battleMgr.default.instance.getCurScene().pause();
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "popups/LevelSettingPopup",
                keep: !0,
                params: {
                    battlePlayState: t
                }
            });
        };
        e.prototype.showLevelBagInfo = function (t) {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "popups/LevelBagInfoPopup",
                keep: !0,
                params: {
                    rewardId: t
                }
            });
        };
        e.prototype.showLevelAdConfirmPopup = function (t, e, n, i, o, r) {
            if (void 0 === r) {
                r = !1;
            }
            $battleMgr.default.instance.getCurScene().pause();
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "popups/LevelAdConfirmPopup",
                keep: !0,
                params: {
                    name: t,
                    desc: e,
                    onAdComplete: n,
                    onAdCancel: i,
                    adEventId: o,
                    battlePlayState: r
                }
            });
        };
        e.prototype.showShopBoxLevelDetailsPopup = function () {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.HOME,
                path: "popups/ShopBoxLevelDetailsPopup",
                keep: !0
            });
        };
        e.prototype.showStageDropOutPopup = function (t) {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.HOME,
                path: "popups/StageDropOutPopup",
                keep: !0,
                params: {
                    stage: t
                }
            });
        };
        e.prototype.showClothingPopup = function () {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.HOME,
                path: "popups/ClothingPopup",
                keep: !0
            });
        };
        e.prototype.showArtifactDetailsPopup = function (t) {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.HOME,
                path: "popups/ArtifactDetailsPopup",
                keep: !0,
                params: {
                    artifactData: t
                }
            });
        };
        e.prototype.showCampsiteBuildDetailsPopup = function (t) {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.HOME,
                path: "popups/CampsiteBuildDetailsPopup",
                keep: !0,
                params: {
                    buildData: t
                }
            });
        };
        e.prototype.showHomeSetingPopup = function () {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.HOME,
                path: "popups/HomeSetingPopup",
                keep: !0
            });
        };
        e.prototype.showHomeTestPopup = function () {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.HOME,
                path: "test/HomeTestPopup",
                keep: !0
            });
        };
        e.prototype.showUnlockSkinPopup = function (t) {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.HOME,
                path: "popups/UnlockSkinPopup",
                keep: !0,
                params: {
                    skinId: t
                }
            });
        };
        e.prototype.showSurviveListPopup = function (t, e) {
            if (void 0 === e) {
                e = !1;
            }
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.HOME,
                path: "popups/SurviveListPopup",
                keep: !0,
                params: {
                    stageId: t,
                    isShowReward: e
                }
            });
        };
        e.prototype.showOpenBoxPopup = function (t, e) {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.HOME,
                path: "popups/OpenBoxPopup",
                keep: !0,
                params: {
                    skinId: t,
                    callback: e
                }
            });
        };
        e.prototype.showSurvivePeopleDetailsPopup = function (t) {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.HOME,
                path: "popups/SurvivePeopleDetailsPopup",
                keep: !0,
                params: {
                    surviveData: t
                }
            });
        };
        e.prototype.showSevenSignPopup = function () {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.HOME,
                path: "popups/SevenSignPopup",
                keep: !0
            });
        };
        e.prototype.showGentleTipsPopup = function (t) {
            if (void 0 === t) {
                t = null;
            }
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.RES,
                path: "popups/GentleTipsPopup",
                keep: !0,
                params: {
                    onClose: t
                }
            });
        };
        e.prototype.showUnlockArtifactPopup = function (t) {
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.HOME,
                path: "popups/UnlockArtifactPopup",
                keep: !0,
                params: {
                    skillId: t
                }
            });
        };
        e.prototype.showUnlockRemainsPopup = function (t, e) {
            if (void 0 === e) {
                e = null;
            }
            if (t.length <= 0) {
                if (e) {
                    e();
                }
            } else {
                for (
                    var n = new Map(),
                        i = function (e) {
                            var i = t[e];
                            var o = $cfg.default.instance.dataSkill.queryOne(function (t) {
                                return (
                                    -1 !=
                                    t.speReward.split("|").findIndex(function (t) {
                                        return Number(t.split("_")[0]) == i;
                                    })
                                );
                            });
                            if (n.has(o.id)) {
                                n.get(o.id).remainIds.push(i);
                            } else {
                                n.set(o.id, {
                                    remainIds: [i]
                                });
                            }
                        },
                        o = 0;
                    o < t.length;
                    o++
                ) {
                    i(o);
                }
                var r = Array.from(n.values());
                this.showUnlockSomeRemainsPopup(r, e);
            }
        };
        e.prototype.showUnlockSomeRemainsPopup = function (t, e) {
            var n = this;
            if (t.length <= 0) {
                if (e) {
                    e();
                }
            } else {
                var i = t.shift().remainIds;
                $popupManager.PopupManager.instance.show({
                    bundleName: $frameEnum.Frame.EBundleName.RES,
                    path: "popups/UnlockRemainsPopup",
                    keep: !0,
                    params: {
                        remainIds: i,
                        onComplete: function () {
                            $blockInputManager.BlockInputManager.instance.netBlockInputNum++;
                            $util.default.delay(
                                0.3,
                                function () {
                                    $blockInputManager.BlockInputManager.instance.netBlockInputNum--;
                                    n.showUnlockSomeRemainsPopup(t, e);
                                },
                                n
                            );
                        }
                    }
                });
            }
        };
        e._instance = null;
        return (n = __decorate([_], e));
    })(cc.Component));
exports.default = g;
