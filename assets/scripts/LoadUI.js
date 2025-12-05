var i;
exports.LoadUI = void 0;
var $cfg = require("./Cfg");
var $sqlUtil = require("./SqlUtil");
var $frameEnum = require("./FrameEnum");
var $loadUIBase = require("./LoadUIBase");
var $redPointMgr = require("./RedPointMgr");
var $dataMgr = require("./DataMgr");
var $guideMgr = require("./GuideMgr");
var $userCenterMgr = require("./UserCenterMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $stageDataProxy = require("./StageDataProxy");
var $userDataProxy = require("./UserDataProxy");
var $zBActiveView = require("./ZBActiveView");
var b = cc._decorator;
var E = b.ccclass;
var S = b.property;
var P = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.zbActiveView = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        this.zbActiveView.node.active = !1;
        t.prototype.onLoad.call(this);
        this.bundles.push(
            $frameEnum.Frame.EBundleName.RES_TT,
            $frameEnum.Frame.EBundleName.CONFIG,
            $frameEnum.Frame.EBundleName.RES,
            $frameEnum.Frame.EBundleName.GAME,
            $frameEnum.Frame.EBundleName.HOME
        );
        this.onLoadDealChannel();
    };
    e.prototype.onDestroy = function () {
        t.prototype.onDestroy.call(this);
    };
    e.prototype.onLoadDealChannel = function () {};
    e.prototype.loadConfigRes = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (t) {
                switch (t.label) {
                    case 0:
                        return [4, $cfg.default.instance.initByMergeCompressConfig()];
                    case 1:
                        t.sent();
                        return [
                            2,
                            new Promise(function (t) {
                                t();
                            })
                        ];
                }
            });
        });
    };
    e.prototype.loadUserData = function () {
        return __awaiter(this, void 0, Promise, function () {
            var t;
            var e;
            var n;
            return __generator(this, function (i) {
                switch (i.label) {
                    case 0:
                        if ("" == (t = $sqlUtil.SqlUtil.getLocalUserData($userDataProxy.userDataProxy.codeKey, ""))) {
                            e = new Date().getTime().toString();
                            t = yzll.gameConfig.name + "" + (e + Math.floor(1e3 * Math.random()));
                            $sqlUtil.SqlUtil.setLocalUserData($userDataProxy.userDataProxy.codeKey, t);
                        }
                        return [4, this.checkZBActive(t)];
                    case 1:
                        i.sent();
                        return [4, this.login(t)];
                    case 2:
                        i.sent();
                        this.onChannelLogin();
                        n = "";
                        if ("" != $userCenterMgr.UserCenterMgr.instance.playerId) {
                            n = $userCenterMgr.UserCenterMgr.instance.playerId;
                            $sqlUtil.SqlUtil.setLocalUserData(
                                $userDataProxy.userDataProxy.uidKey,
                                $userCenterMgr.UserCenterMgr.instance.playerId
                            );
                        } else {
                            if (
                                "" == (n = $sqlUtil.SqlUtil.getLocalUserData($userDataProxy.userDataProxy.uidKey, ""))
                            ) {
                                n = t;
                            }
                        }
                        $redPointMgr.default.instance.initRedPointTree();
                        $dataMgr.DataMgr.instance.init(n, $userCenterMgr.UserCenterMgr.instance.svrData);
                        if ($guideDataProxy.guideDataProxy.isCompleteFirstBattleGuide()) {
                            this.nextSceneName = "home";
                            this.nextSceneBundle = $frameEnum.Frame.EBundleName.HOME;
                        } else {
                            $stageDataProxy.stageDataProxy.selectedStageId = 0;
                            this.nextSceneName = "game";
                            this.nextSceneBundle = $frameEnum.Frame.EBundleName.GAME;
                        }
                        $guideMgr.GuideMgr.instance.initGuide();
                        return [2, Promise.resolve()];
                }
            });
        });
    };
    e.prototype.onChannelLogin = function () {};
    e.prototype.loadComplete = function () {};
    e.prototype.login = function (t) {
        return __awaiter(this, void 0, Promise, function () {
            var e = this;
            return __generator(this, function () {
                return [
                    2,
                    new Promise(function (n) {
                        mm.platform.login(function (i, o) {
                            var r = t;
                            if (i && o && "" != o) {
                                r = o;
                            }
                            console.log("code:", r);
                            $userCenterMgr.UserCenterMgr.instance.loginUserCenter(
                                r,
                                function () {
                                    n();
                                },
                                function () {
                                    n();
                                },
                                e
                            );
                        });
                    })
                ];
            });
        });
    };
    e.prototype.checkZBActive = function (t) {
        return __awaiter(this, void 0, Promise, function () {
            var e = this;
            return __generator(this, function () {
                if (yzll.gameConfig.isZB) {
                    return [
                        2,
                        new Promise(function (n) {
                            $userCenterMgr.UserCenterMgr.instance.zbActiveState(t, function () {
                                console.log("主播状态:", $userCenterMgr.UserCenterMgr.instance.zbState);
                                if (0 == $userCenterMgr.UserCenterMgr.instance.zbState) {
                                    e.zbActiveView.node.active = !0;
                                    e.zbActiveView.initView();
                                } else {
                                    n();
                                }
                            });
                        })
                    ];
                } else {
                    return [2, Promise.resolve()];
                }
            });
        });
    };
    __decorate([S($zBActiveView.default)], e.prototype, "zbActiveView", void 0);
    return __decorate([E], e);
})($loadUIBase.LoadUIBase);
exports.LoadUI = P;
