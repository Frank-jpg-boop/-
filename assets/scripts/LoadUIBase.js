var i;
exports.LoadUIBase = void 0;
var $componentBase = require("./ComponentBase");
var $eventManager = require("./EventManager");
var $appProxy = require("./AppProxy");
var $resLoader = require("./ResLoader");
var $appBase = require("./AppBase");
var $sceneManager = require("./SceneManager");
var $frameEnum = require("./FrameEnum");
var $localDataProxy = require("./LocalDataProxy");
var $popupManager = require("./PopupManager");
var _ = cc._decorator;
var g = _.ccclass;
var v = _.property;
var b = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.versionLabel = null;
        e.spProgress = null;
        e.progressLabel = null;
        e.progressBlock = null;
        e.nLoadInfo = null;
        e.nBtnRepair = null;
        e.nextSceneBundle = "";
        e.nextSceneName = "";
        e._isNet = !1;
        e._maxProgress = 0;
        e._progress = 0;
        e._progressTag = !1;
        e._msg = "";
        e._msgTag = !1;
        e.bundles = [];
        e.dirs = [];
        e._loadTime = 0;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onLoad = function () {
        this.nBtnRepair.active = !1;
        t.prototype.onLoad.call(this);
    };
    e.prototype.onDestroy = function () {
        t.prototype.onDestroy.call(this);
    };
    e.prototype.start = function () {
        t.prototype.start.call(this);
        this.loadGame();
    };
    e.prototype.loadGame = function () {
        return __awaiter(this, void 0, Promise, function () {
            var t;
            var e = this;
            return __generator(this, function (n) {
                switch (n.label) {
                    case 0:
                        this._loadTime = 0;
                        this.initView();
                        this._isNet = !0;
                        t = new Date().getTime();
                        return [4, this.loadBundle()];
                    case 1:
                        n.sent();
                        console.log("Load1:", new Date().getTime() - t, "ms");
                        t = new Date().getTime();
                        return [4, this.loadLoading()];
                    case 2:
                        n.sent();
                        console.log("Load2:", new Date().getTime() - t, "ms");
                        t = new Date().getTime();
                        return [4, this.loadConfig()];
                    case 3:
                        n.sent();
                        console.log("Load3:", new Date().getTime() - t, "ms");
                        t = new Date().getTime();
                        return [4, this.loadUserData()];
                    case 4:
                        n.sent();
                        console.log("Load4:", new Date().getTime() - t, "ms");
                        this.setProgress("加载完成", 1);
                        return [
                            2,
                            new Promise(function (t) {
                                e.nextScene();
                                t();
                            })
                        ];
                }
            });
        });
    };
    e.prototype.initView = function () {
        this.nLoadInfo.active = !0;
        this.versionLabel.string = "v" + yzll.gameConfig.v;
    };
    e.prototype.loadBundle = function () {
        return __awaiter(this, void 0, Promise, function () {
            var t;
            var e;
            return __generator(this, function (n) {
                switch (n.label) {
                    case 0:
                        this.setProgress("资源加载中...", 0, !0);
                        this._maxProgress = 0.7;
                        n.label = 1;
                    case 1:
                        if (this.bundles.length > 0) {
                            return (
                                (t = this.bundles.shift()),
                                console.time("Load1_" + t),
                                [
                                    4,
                                    $resLoader.ResLoader.loadBundle({
                                        bundleName: t
                                    })
                                ]
                            );
                        } else {
                            return [3, 3];
                        }
                    case 2:
                        for (
                            n.sent(),
                                t === this.nextSceneBundle && cc.director.preloadScene(this.nextSceneName),
                                e = this.dirs.length - 1;
                            e >= 0;
                            e--
                        ) {
                            if (this.dirs[e].bundleName === t) {
                                $resLoader.ResLoader.preloadDir(this.dirs[e]);
                                this.dirs.splice(e, 1);
                            }
                        }
                        console.timeEnd("Load1_" + t);
                        return [3, 1];
                    case 3:
                        return [2, Promise.resolve()];
                }
            });
        });
    };
    e.prototype.update = function (t) {
        var e;
        var n;
        var i;
        var o;
        var r;
        if (this._isNet && this._progress < this._maxProgress) {
            this._progress = Number((this._progress + 0.5 * t).toFixed(2));
            this._progressTag = !0;
        }
        if (
            (null === (n = null === (e = this.spProgress) || void 0 === e ? void 0 : e.node) || void 0 === n
                ? void 0
                : n.active) &&
            this._progressTag
        ) {
            this.spProgress.fillRange = this._progress;
        }
        if (
            (null === (o = null === (i = this.progressLabel) || void 0 === i ? void 0 : i.node) || void 0 === o
                ? void 0
                : o.active) &&
            this._msgTag
        ) {
            this.progressLabel.string = this._msg;
        }
        if ((null === (r = this.progressBlock) || void 0 === r ? void 0 : r.active) && this._progressTag) {
            this.progressBlock.x =
                this.spProgress.fillRange * this.spProgress.node.width - this.spProgress.node.width / 2;
        }
        this._loadTime += t;
        if (this._loadTime >= 15 && !this.nBtnRepair.active) {
            this.nBtnRepair.active = !0;
        }
    };
    e.prototype.loadLoading = function () {
        return __awaiter(this, void 0, Promise, function () {
            var t;
            var e;
            var n;
            var i;
            return __generator(this, function (o) {
                switch (o.label) {
                    case 0:
                        return [
                            4,
                            $resLoader.ResLoader.loadAsset({
                                path: "prefabs/YZLLSceneLoading",
                                type: cc.Prefab,
                                bundleName: $frameEnum.Frame.EBundleName.RES
                            })
                        ];
                    case 1:
                        (t = o.sent()).addRef();
                        (e = cc.instantiate(t)).active = !1;
                        $appBase.topNode.addChild(e);
                        e.zIndex = cc.macro.MAX_ZINDEX;
                        $sceneManager.SceneManager.instance.setSceneLoading(e);
                        return [
                            4,
                            $resLoader.ResLoader.loadAsset({
                                path: "prefabs/YZLLLoading",
                                type: cc.Prefab,
                                bundleName: $frameEnum.Frame.EBundleName.RES
                            })
                        ];
                    case 2:
                        (n = o.sent()).addRef();
                        (i = cc.instantiate(n)).active = !1;
                        $appBase.topNode.addChild(i);
                        i.zIndex = cc.macro.MAX_ZINDEX;
                        $sceneManager.SceneManager.instance.setLoadingNode(i);
                        return [2, Promise.resolve()];
                }
            });
        });
    };
    e.prototype.loadConfig = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (t) {
                switch (t.label) {
                    case 0:
                        this.setProgress("读取配置中...", this._maxProgress);
                        this._maxProgress = 0.8;
                        return [4, this.loadConfigRes()];
                    case 1:
                        t.sent();
                        return [2, Promise.resolve()];
                }
            });
        });
    };
    e.prototype.nextScene = function () {
        var t;
        var e = this;
        if (null === (t = this.progressLabel) || void 0 === t ? void 0 : t.node) {
            this.progressLabel.node.active = !1;
        }
        $sceneManager.SceneManager.instance.runScene(this.nextSceneName, this.nextSceneBundle, function () {
            $eventManager.EventManager.instance.emit($appProxy.AppEvent.ENTER_GAME);
            e.loadComplete();
        });
    };
    e.prototype.setProgress = function (t, e, n) {
        if (void 0 === n) {
            n = !1;
        }
        if (null != this.progressLabel && null != t) {
            this._msg = t;
            this._msgTag = !0;
        }
        if (n || e > this._progress) {
            this._progress = e;
            this._progressTag = !0;
        }
    };
    e.prototype.loadComplete = function () {};
    e.prototype.onClickBtnRepair = function () {
        this.nBtnRepair.active = !1;
        $localDataProxy.localDataProxy.clearData();
        $popupManager.PopupManager.instance.removeAll($popupManager.PopupCacheMode.CACHE);
        if (cc.sys.platform == cc.sys.WECHAT_GAME || cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
            mm.platform.restartMiniProgramSync();
        } else {
            $sceneManager.SceneManager.instance.runScene("load", "", null, !1);
        }
    };
    __decorate(
        [
            v({
                type: cc.Label
            })
        ],
        e.prototype,
        "versionLabel",
        void 0
    );
    __decorate(
        [
            v({
                type: cc.Sprite
            })
        ],
        e.prototype,
        "spProgress",
        void 0
    );
    __decorate(
        [
            v({
                type: cc.Label
            })
        ],
        e.prototype,
        "progressLabel",
        void 0
    );
    __decorate(
        [
            v({
                type: cc.Node
            })
        ],
        e.prototype,
        "progressBlock",
        void 0
    );
    __decorate([v(cc.Node)], e.prototype, "nLoadInfo", void 0);
    __decorate([v(cc.Node)], e.prototype, "nBtnRepair", void 0);
    __decorate(
        [
            v({
                tooltip: ""
            })
        ],
        e.prototype,
        "nextSceneBundle",
        void 0
    );
    __decorate(
        [
            v({
                tooltip: ""
            })
        ],
        e.prototype,
        "nextSceneName",
        void 0
    );
    return __decorate([g], e);
})($componentBase.ComponentBase);
exports.LoadUIBase = b;
