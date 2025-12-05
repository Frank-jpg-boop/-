var i;
var $audioUtil = require("./AudioUtil");
var $componentBase = require("./ComponentBase");
var $eventManager = require("./EventManager");
var $nodePoolManager = require("./NodePoolManager");
var $resLoader = require("./ResLoader");
var $battleMgr = require("./BattleMgr");
var $bulletBase = require("./BulletBase");
var $actorEnum = require("./ActorEnum");
var $battleEnum = require("./BattleEnum");
var $enemyRefreshMgr = require("./EnemyRefreshMgr");
var $actorMgr = require("./ActorMgr");
var $levelBattleData = require("./LevelBattleData");
var b = cc._decorator;
var E = b.ccclass;
var S =
    (b.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._isInit = !1;
            e._isPlay = !1;
            e._isResult = !1;
            e._stageType = $battleEnum.EBattleSceneType.LEVEL;
            e._secondTime = 0;
            e._popHurtMap = new Map();
            e._bgTopParent = null;
            e._unitParent = null;
            e._actorParent = null;
            e._lowEffectParent = null;
            e._effectParent = null;
            e._popHurtParent = null;
            e._bulletParent = null;
            e._actorTopParent = null;
            e._gameCamera = null;
            e._battleMapCtrl = null;
            e._sm = null;
            e._playerId = 0;
            e._cameraCtrl = null;
            e._cfg = null;
            e._isLock = !1;
            e.uiNode = null;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "isLock", {
            get: function () {
                return this._isLock;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "effectParent", {
            get: function () {
                return this._effectParent;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "lowEffectParent", {
            get: function () {
                return this._lowEffectParent;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "unitParent", {
            get: function () {
                return this._unitParent;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "actorParent", {
            get: function () {
                return this._actorParent;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "popHurtParent", {
            get: function () {
                return this._popHurtParent;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "bulletParent", {
            get: function () {
                return this._bulletParent;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "actorTopParent", {
            get: function () {
                return this._actorTopParent;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "battleType", {
            get: function () {
                return this._stageType;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "gameCamera", {
            get: function () {
                return this._gameCamera;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "isResult", {
            get: function () {
                return this._isResult;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "isInit", {
            get: function () {
                return this._isInit;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "isPlay", {
            get: function () {
                return this._isPlay;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "battleMapCtrl", {
            get: function () {
                return this._battleMapCtrl;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "curState", {
            get: function () {
                if (this._sm) {
                    return this._sm.currentState.stateType;
                } else {
                    return 0;
                }
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "cfg", {
            get: function () {
                return this._cfg;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "cameraCtrl", {
            get: function () {
                return this._cameraCtrl;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "playerId", {
            get: function () {
                return this._playerId;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onLoad = function () {
            t.prototype.onLoad.call(this);
            this._effectParent = this.node.getChildByName("Effects");
            this._popHurtParent = this.node.getChildByName("PopHurts");
            this._bulletParent = this.node.getChildByName("Bullets");
            this._gameCamera = cc.director
                .getScene()
                .getChildByName("Canvas")
                .getChildByName("GameCamera")
                .getComponent(cc.Camera);
            this.registerEvent();
        };
        e.prototype.onDestroy = function () {
            t.prototype.onDestroy.call(this);
            this.unregisterEvent();
        };
        e.prototype.registerEvent = function () {
            $eventManager.EventManager.instance.on(
                $actorEnum.EActorEvent.ACTOR_DEAD_REMOVE,
                this.onActorDeadRemove,
                this
            );
        };
        e.prototype.unregisterEvent = function () {
            $eventManager.EventManager.instance.off(
                $actorEnum.EActorEvent.ACTOR_DEAD_REMOVE,
                this.onActorDeadRemove,
                this
            );
        };
        e.prototype.init = function () {
            return __awaiter(this, void 0, Promise, function () {
                var t = this;
                return __generator(this, function (e) {
                    switch (e.label) {
                        case 0:
                            this._secondTime = 0;
                            this._isResult = !1;
                            this._popHurtMap.clear();
                            this.initCfg();
                            return [4, this.initAssets()];
                        case 1:
                            e.sent();
                            this.initMap();
                            return [4, this.onInit()];
                        case 2:
                            e.sent();
                            this.registerState();
                            return [
                                2,
                                new Promise(function (e) {
                                    t._isInit = !0;
                                    e();
                                })
                            ];
                    }
                });
            });
        };
        e.prototype.initCfg = function () {};
        e.prototype.initAssets = function () {
            var t = this;
            var e = [];
            e.push.apply(e, this.getLoadMapResOption());
            e.push.apply(e, this.getLoadPrefabResOption());
            return new Promise(function (n) {
                $resLoader.ResLoader.loadAssetAnySequence({
                    requests: e
                }).then(function (e) {
                    e.forEach(function (e) {
                        if (e.option.isPrefabAddNodePool && e.asset instanceof cc.Prefab) {
                            $nodePoolManager.default.instance.addPoolPrefab(e.asset);
                            $battleMgr.default.instance.addPoolNodePrefabName(e.asset.name);
                        } else {
                            t.addRef(e.asset);
                        }
                    });
                    n();
                });
            });
        };
        e.prototype.getLoadMapResOption = function () {
            return [];
        };
        e.prototype.getLoadPrefabResOption = function () {
            return [];
        };
        e.prototype.initMap = function () {};
        e.prototype.onInit = function () {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function () {
                    return [
                        2,
                        new Promise(function (t) {
                            t();
                        })
                    ];
                });
            });
        };
        e.prototype.registerState = function () {};
        e.prototype.resume = function () {
            if (this._isPlay) {
                //
            } else {
                this._bulletParent.children.forEach(function (t) {
                    var e;
                    if (null === (e = t.getComponent($bulletBase.default)) || void 0 === e) {
                        //
                    } else {
                        e.resume();
                    }
                });
                $actorMgr.default.instance.queryActor().forEach(function (t) {
                    t.resume();
                });
                this.onResume();
                this._isPlay = !0;
            }
        };
        e.prototype.onResume = function () {};
        e.prototype.pause = function (t) {
            if (void 0 === t) {
                t = !1;
            }
            if (this._isPlay) {
                this._bulletParent.children.forEach(function (t) {
                    var e;
                    if (null === (e = t.getComponent($bulletBase.default)) || void 0 === e) {
                        //
                    } else {
                        e.pause();
                    }
                });
                $actorMgr.default.instance.queryActor().forEach(function (e) {
                    if (t && e.isDead()) {
                        //
                    } else {
                        e.pause();
                    }
                });
                this.scheduleOnce(function () {
                    $audioUtil.AudioUtil.stopAllEffect();
                }, 0.2);
                this._isPlay = !1;
                this.onPause();
            }
        };
        e.prototype.onPause = function () {};
        e.prototype.clear = function () {
            this._isInit = !1;
            this._isPlay = !1;
            this._isResult = !1;
            if (this._gameCamera) {
                cc.Tween.stopAllByTarget(this._gameCamera.node);
            }
            if (this._popHurtMap) {
                this._popHurtMap.clear();
                this._popHurtMap = null;
            }
            $enemyRefreshMgr.EnemyRefreshMgr.instance.clear();
            this.onClear();
            $actorMgr.default.instance.queryActor().forEach(function (t) {
                t.unscheduleAllCallbacks();
                t.remove();
            });
            this._actorParent.removeAllChildren();
            $actorMgr.default.instance.clearActor();
        };
        e.prototype.onClear = function () {};
        e.prototype.getCameraMoveSpeed = function () {
            return 0;
        };
        e.prototype.resetCamare = function () {};
        e.prototype.changeState = function (t) {
            if (this._sm) {
                this._sm.changeState(t);
            }
        };
        e.prototype.update = function (t) {
            if (this._isInit && this._isPlay) {
                t *= $battleMgr.default.instance.gameSpeed;
                this.onUpdate(t);
                if (this._sm && !this.isResult) {
                    this._sm.update(t);
                }
                this._secondTime -= t;
                if (this._secondTime <= 0) {
                    this._secondTime = 1;
                    this.secondUpdate();
                }
                $actorMgr.default.instance.queryActor().forEach(function (e) {
                    if (0 == e.fixedZIndex) {
                        var n = 10 * -e.node.y + e.actorType;
                        n = Math.max(cc.macro.MIN_ZINDEX, n);
                        n = Math.min(cc.macro.MAX_ZINDEX, n);
                        e.node.zIndex = n;
                    } else {
                        e.node.zIndex = e.fixedZIndex;
                    }
                    e.updateActor(t);
                });
                $levelBattleData.levelBattleData.update(t);
            }
        };
        e.prototype.onUpdate = function () {};
        e.prototype.secondUpdate = function () {};
        e.prototype.win = function () {
            for (var t = [], e = 0; e < arguments.length; e++) {
                t[e] = arguments[e];
            }
            if (this._isResult) {
                //
            } else {
                this._isResult = !0;
                this.onWin.apply(this, t);
            }
        };
        e.prototype.onWin = function () {
            for (var t = [], e = 0; e < arguments.length; e++) {
                t[e] = arguments[e];
            }
        };
        e.prototype.fail = function () {
            if (this._isResult) {
                //
            } else {
                this._isResult = !0;
                this._isInit = !1;
                this.onFail();
            }
        };
        e.prototype.onFail = function () {};
        e.prototype.addPopHurt = function (t, e) {
            if (this._popHurtMap.has(t)) {
                this._popHurtMap.get(t).push(e);
            } else {
                this._popHurtMap.set(t, [e]);
            }
        };
        e.prototype.removePopHurt = function (t, e) {
            if (this._popHurtMap.has(t)) {
                var n = this._popHurtMap.get(t);
                var i = n.indexOf(e);
                if (-1 != i) {
                    n.splice(i, 1);
                }
            }
        };
        e.prototype.getPopHurts = function (t) {
            if (this._popHurtMap.has(t)) {
                return this._popHurtMap.get(t);
            } else {
                return [];
            }
        };
        e.prototype.onActorDeadRemove = function () {};
        return __decorate([E], e);
    })($componentBase.ComponentBase));
exports.default = S;
