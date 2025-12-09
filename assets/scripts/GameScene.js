var i;
exports.GameScene = void 0;
var $globalEnum = require("./GlobalEnum");
var $taskEnum = require("./TaskEnum");
var $eventManager = require("./EventManager");
var $appProxy = require("./AppProxy");
var $sceneBase = require("./SceneBase");
var $playerActionMgr = require("./PlayerActionMgr");
var $reportMgr = require("./ReportMgr");
var $stageDataProxy = require("./StageDataProxy");
var $gameEnum = require("./GameEnum");
var _ = cc._decorator;
var g = _.ccclass;
var v = _.property;
var b = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.pGameUI = null;
        e._curNode = null;
        e._curGameSceneType = $gameEnum.Game.EGameSceneUIType.MAIN_UI;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "curUINode", {
        get: function () {
            return this._curNode;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onLoad = function () {
        t.prototype.onLoad.call(this);
        cc.director.getScene().name = "game";
        this.initScene();
        $eventManager.EventManager.instance.on($gameEnum.Game.EGameEvent.SCENE_UI_SWITCH, this.switchSceneUI, this);
        $eventManager.EventManager.instance.emit($appProxy.AppEvent.BGM_CHANGED, $globalEnum.Global.EBgmType.GAME);
    };
    e.prototype.initScene = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function () {
                $playerActionMgr.PlayerActionMgr.instance.triggerAction($taskEnum.EPlayerActionType.ENTER_BATTLE);
                $reportMgr.ReportMgr.instance.reportEvent("BA_StageStart", {
                    userA: "" + $stageDataProxy.stageDataProxy.selectedStageId
                });
                this.switchSceneUI($gameEnum.Game.EGameSceneUIType.BATTLE_UI);
                return [
                    2,
                    new Promise(function (t) {
                        t();
                    })
                ];
            });
        });
    };
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off($gameEnum.Game.EGameEvent.SCENE_UI_SWITCH, this.switchSceneUI, this);
        t.prototype.onDestroy.call(this);
    };
    e.prototype.switchSceneUI = function (t) {
        if (this._curNode) {
            this._curNode.destroy();
            this._curNode = null;
        }
        this._curGameSceneType = t;
        if (t === $gameEnum.Game.EGameSceneUIType.BATTLE_UI) {
            var e = cc.instantiate(this.pGameUI);
            this.node.addChild(e);
            this._curNode = e;
        }
    };
    __decorate([v(cc.Prefab)], e.prototype, "pGameUI", void 0);
    return __decorate([g], e);
})($sceneBase.SceneBase);
exports.GameScene = b;
