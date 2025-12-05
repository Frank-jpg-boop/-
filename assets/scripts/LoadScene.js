var i;
exports.LoadScene = void 0;
var $appBase = require("./AppBase");
var $popupManager = require("./PopupManager");
var $engineExUtils = require("./EngineExUtils");
var $sceneBase = require("./SceneBase");
var $resLoader = require("./ResLoader");
var $blockInputManager = require("./BlockInputManager");
var $audioManager = require("./AudioManager");
var $commonUtil = require("./CommonUtil");
var $eventManager = require("./EventManager");
var $appProxy = require("./AppProxy");
var $frameEnum = require("./FrameEnum");
var $audioUtil = require("./AudioUtil");
var b = cc._decorator;
var E = b.ccclass;
var S = b.property;
cc.internal.inputManager._maxTouches = 1;
var P = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.loadBgm = null;
        e.cacheNum = 0;
        e.md5 = !0;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        cc.director.getScene().name = "load";
        $eventManager.EventManager.instance.clear();
        $resLoader.ResLoader.preload({
            paths: "prefabs/LoadUI",
            type: cc.Prefab,
            bundleName: $frameEnum.Frame.EBundleName.LOAD
        });
        t.prototype.onLoad.call(this);
        $engineExUtils.EngineExUtils.all();
        var e = new Date();
        $commonUtil.CommonUtil.print("nowData-----:", e.getTime());
        $audioManager.AudioManager.instance.stopBgm();
        $eventManager.EventManager.instance.emit($appProxy.AppEvent.BGM_CHANGED, $appProxy.BgmTypes.load);
    };
    e.prototype.start = function () {
        t.prototype.start.call(this);
        $appBase.AppBase.init();
        $popupManager.PopupManager.instance.init();
        $blockInputManager.BlockInputManager.instance.init();
        this.showLoadUI();
        if (this.loadBgm) {
            $audioManager.AudioManager.instance.playBgm(this.loadBgm, !0);
        }
        $audioUtil.AudioUtil.init();
    };
    e.prototype.onDestroy = function () {};
    e.prototype.showLoadUI = function () {
        return __awaiter(this, void 0, void 0, function () {
            var t;
            var e;
            return __generator(this, function (n) {
                switch (n.label) {
                    case 0:
                        return [
                            4,
                            $resLoader.ResLoader.loadAsset({
                                path: "prefabs/LoadUI",
                                type: cc.Prefab,
                                bundleName: $frameEnum.Frame.EBundleName.LOAD
                            })
                        ];
                    case 1:
                        if ((t = n.sent())) {
                            (e = cc.instantiate(t)).name = "LoadUI";
                            e.parent = this.node;
                        }
                        return [2];
                }
            });
        });
    };
    e.prototype.checkDuration = function () {
        if (new Date().getTime() >= 1722649525031) {
            cc.game.end();
        }
    };
    e.prototype.compatibilityTT = function () {
        tt.navigateToScene({
            scene: "sidebar",
            success: function () {
                console.log("navigate to scene success");
            },
            fail: function (t) {
                console.log("navigate to scene fail: ", t);
            }
        });
    };
    __decorate([S(cc.AudioClip)], e.prototype, "loadBgm", void 0);
    __decorate(
        [
            S({
                tooltip: ""
            })
        ],
        e.prototype,
        "cacheNum",
        void 0
    );
    __decorate([S], e.prototype, "md5", void 0);
    return __decorate([E], e);
})($sceneBase.SceneBase);
exports.LoadScene = P;
