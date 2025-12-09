var $nodePoolManager = require("./NodePoolManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $popupManager = require("./PopupManager");
var $sceneManager = require("./SceneManager");
var $dataMgr = require("./DataMgr");
var $playerDataProxy = require("./PlayerDataProxy");
var $stageDataProxy = require("./StageDataProxy");
var $userDataProxy = require("./UserDataProxy");
var $popHurt = require("./PopHurt");
var $popupNum = require("./PopupNum");
var $effectMgr = require("./EffectMgr");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var $battleSceneBase = require("./BattleSceneBase");
var g = (function () {
    function t() {
        this._scene = null;
        this._isSwitching = !1;
        this._curSceneType = $battleEnum.EBattleSceneType.LEVEL;
        this._isBattleing = !1;
        this._battlePrefabPoolPrefabNames = [];
        this.gm_PlayerInvincible = !1;
        this.gm_InfiniteResurrection = !1;
        this.gm_InfiniteRandom = !1;
        this.gm_InfiniteCandy = !1;
        this.isFixedDisplayUnlock = !0;
        this._popupNumPrefabNameMap = new Map([
            [$battleEnum.EBattlePopupNumType.COMMON_HURT, "HurtNum"],
            [$battleEnum.EBattlePopupNumType.PLAYER_HURT, "PlayerHurtNum"],
            [$battleEnum.EBattlePopupNumType.CRIT, "CritHurtNum"],
            [$battleEnum.EBattlePopupNumType.HEAL, "HealNum"]
        ]);
        this._gameSpeed = 1;
        $effectMgr.default.instance.init();
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == t._instance) {
                t._instance = new t();
            }
            return t._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "isSwitching", {
        get: function () {
            return this._isSwitching;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "curSceneType", {
        get: function () {
            return this._curSceneType;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "gameSpeed", {
        get: function () {
            return this._gameSpeed;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "isBattleing", {
        get: function () {
            return this._isBattleing;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.getCurScene = function () {
        return this._scene;
    };
    t.prototype.blackIn = function (t, e) {
        var n = cc.director.getScene().getChildByName("Canvas").getChildByName("GameBattleBlack");
        n.opacity = 0;
        n.active = !0;
        cc.Tween.stopAllByTarget(n);
        cc.tween(n)
            .to(t, {
                opacity: 255
            })
            .call(function () {
                if (e) {
                    e();
                }
            })
            .start();
    };
    t.prototype.blackOut = function (t, e) {
        var n = cc.director.getScene().getChildByName("Canvas").getChildByName("GameBattleBlack");
        n.opacity = 255;
        n.active = !0;
        cc.Tween.stopAllByTarget(n);
        cc.tween(n)
            .delay(0.3)
            .to(t, {
                opacity: 0
            })
            .call(function () {
                n.active = !1;
                if (e) {
                    e();
                }
            })
            .start();
    };
    t.prototype.switchScene = function (t, e) {
        var n = this;
        if (void 0 === e) {
            e = null;
        }
        if (this._isSwitching) {
            //
        } else {
            this._gameSpeed = 1;
            this._isBattleing = !0;
            this._isSwitching = !0;
            this._curSceneType = t;
            this.blackIn(0.2, function () {
                var i = cc.director.getScene().getChildByName("Canvas").getChildByName("GameLayer");
                if (n._scene) {
                    n._scene.clear();
                    i.destroyAllChildren();
                    n._scene = null;
                }
                var a = "";
                if (t === $battleEnum.EBattleSceneType.LEVEL) {
                    a = "prefabs/battle/scene/LevelBattleScene";
                    $stageDataProxy.stageDataProxy.enterStage($stageDataProxy.stageDataProxy.selectedStageId);
                    $levelBattleData.levelBattleData.init($stageDataProxy.stageDataProxy.selectedStageId);
                }
                $resLoader.ResLoader.loadAsset({
                    bundleName: $frameEnum.Frame.EBundleName.GAME,
                    path: a,
                    type: cc.Prefab,
                    success: function (t) {
                        var o = cc.instantiate(t);
                        i.addChild(o);
                        o.x = 0;
                        o.setSiblingIndex(0);
                        n._scene = o.getComponent($battleSceneBase.default);
                        n._scene.init().then(function () {
                            if (e) {
                                e();
                            }
                            n.blackOut(0.5, function () {
                                n._isSwitching = !1;
                            });
                        });
                    }
                });
            });
        }
    };
    t.prototype.popHurt = function (e, n, a, s, c) {
        var l = this;
        var u = $nodePoolManager.default.instance.getPoolPrefab("PopHurt");
        if (u) {
            var p = $nodePoolManager.default.instance.getNode(u);
            this._scene.popHurtParent.addChild(p);
            p.setPosition(a);
            var f = p.getComponent($popHurt.default);
            var d = e + "_" + c;
            f.popup(e, n, s, d);
        } else {
            $resLoader.ResLoader.loadAsset({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "prefabs/battle/other/PopHurt",
                type: cc.Prefab,
                success: function (o) {
                    $nodePoolManager.default.instance.addPoolPrefab(o);
                    t.instance.addPoolNodePrefabName(o.name);
                    l.popHurt(e, n, a, s, c);
                }
            });
        }
    };
    t.prototype.popupNum = function (e, n, a) {
        var s = this;
        var c = this._popupNumPrefabNameMap.get(a);
        var l = $nodePoolManager.default.instance.getPoolPrefab(c);
        if (l) {
            var u = $nodePoolManager.default.instance.getNode(l);
            this._scene.popHurtParent.addChild(u);
            u.setPosition(e);
            u.getComponent($popupNum.default).popup(n);
        } else {
            $resLoader.ResLoader.loadAsset({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "prefabs/battle/other/popup_num/" + c,
                type: cc.Prefab,
                success: function (o) {
                    $nodePoolManager.default.instance.addPoolPrefab(o);
                    t.instance.addPoolNodePrefabName(o.name);
                    s.popupNum(e, n, a);
                }
            });
        }
    };
    t.prototype.createOtherNode = function (e, n, a) {
        var s = this;
        if (void 0 === a) {
            a = this._scene.popHurtParent;
        }
        var c = $nodePoolManager.default.instance.getPoolPrefab(e);
        if (c) {
            var l = $nodePoolManager.default.instance.getNode(c);
            l.parent = a;
            if (n) {
                n(l);
            }
        } else {
            $resLoader.ResLoader.loadAsset({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "prefabs/battle/other/" + e,
                type: cc.Prefab,
                success: function (o) {
                    $nodePoolManager.default.instance.addPoolPrefab(o);
                    t.instance.addPoolNodePrefabName(o.name);
                    s.createOtherNode(e, n);
                }
            });
        }
    };
    t.prototype.isScreenOut = function (t, e, n) {
        if (void 0 === e) {
            e = 0;
        }
        if (void 0 === n) {
            n = 0;
        }
        if (this._scene) {
            var i = this._scene.cameraCtrl.gameCamera.getWorldToScreenPoint(t);
            return i.x < e || i.x > cc.winSize.width - e || i.y < n || i.y > cc.winSize.height - n;
        }
    };
    t.prototype.isSceneOut = function (t) {
        var e = this.getCurScene();
        var n = -e.level.node.width / 2;
        var i = e.level.node.width / 2;
        var o = -e.level.node.height / 2;
        var r = e.level.node.height / 2;
        return t.x < n || t.x > i || t.y < o || t.y > r;
    };
    t.prototype.exitLevelScene = function () {
        var t = this;
        $popupManager.PopupManager.instance.removeAll();
        this.blackIn(0.1, function () {
            t.clear();
            $sceneManager.SceneManager.instance.runScene("home", $frameEnum.Frame.EBundleName.HOME);
        });
        mm.platform.triggerGC();
    };
    t.prototype.resetGame = function () {
        var t = this;
        $stageDataProxy.stageDataProxy.resetGame();
        $playerDataProxy.playerDataProxy.resetGame();
        $dataMgr.DataMgr.instance.init($userDataProxy.userDataProxy.data.uid);
        this.blackIn(0.1, function () {
            $popupManager.PopupManager.instance.removeAll();
            t.clear();
            $sceneManager.SceneManager.instance.runScene("home", $frameEnum.Frame.EBundleName.HOME);
        });
    };
    t.prototype.restartLevelScene = function () {
        var t = this;
        $popupManager.PopupManager.instance.removeAll();
        this.blackIn(0.1, function () {
            t.clear();
            $sceneManager.SceneManager.instance.runScene("game");
        });
    };
    t.prototype.clear = function () {
        this._gameSpeed = 1;
        if (this._scene) {
            var t = cc.director.getScene().getChildByName("Canvas").getChildByName("GameLayer");
            this._scene.clear();
            this._scene.destroy();
            t.destroyAllChildren();
            this._scene = null;
            this._battlePrefabPoolPrefabNames.forEach(function (t) {
                var e = $nodePoolManager.default.instance.getPoolPrefab(t);
                if (e) {
                    $nodePoolManager.default.instance.clearNodePool(e);
                }
            });
            this._battlePrefabPoolPrefabNames = [];
        }
        $nodePoolManager.default.instance.clearAllNodePool();
        this._isBattleing = !1;
    };
    t.prototype.addPoolNodePrefabName = function (t) {
        this._battlePrefabPoolPrefabNames.push(t);
    };
    t.prototype.setGameSpeed = function (t) {
        if (this._gameSpeed != t) {
            this._gameSpeed;
            this._gameSpeed = t;
        }
    };
    t._instance = null;
    return t;
})();
exports.default = g;
