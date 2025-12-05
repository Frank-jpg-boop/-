var $eventManager = require("./EventManager");
var $nodePoolManager = require("./NodePoolManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $battleMgr = require("./BattleMgr");
var $battleEnum = require("./BattleEnum");
var $buffEnum = require("./BuffEnum");
var $eB_101 = require("./EB_101");
var $frameAnimEffect = require("./FrameAnimEffect");
var $spAnimEffect = require("./SpAnimEffect");
var f = (function () {
    function t() {}
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
    t.prototype.init = function () {
        $eventManager.EventManager.instance.on($battleEnum.EBattleEvent.ADD_BUFF_EFFECT, this.addBuffEffect, this);
    };
    t.prototype.createEffect = function (t) {
        var e = this;
        var n = $nodePoolManager.default.instance.getPoolPrefab(t.prefabName);
        if (n) {
            var i = $nodePoolManager.default.instance.getNode(n);
            t.parent.addChild(i);
            i.setPosition(t.initPos);
            var c = i.getComponent(t.effectClass);
            c.init();
            if (t.onCreated) {
                t.onCreated(c);
            }
        } else {
            $resLoader.ResLoader.loadAsset({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "prefabs/battle/effect/" + t.prefabName,
                type: cc.Prefab,
                success: function (n) {
                    $nodePoolManager.default.instance.addPoolPrefab(n);
                    $battleMgr.default.instance.addPoolNodePrefabName(n.name);
                    e.createEffect(t);
                }
            });
        }
    };
    t.prototype.addBuffEffect = function (e, n, i) {
        switch (e.buffType) {
            case $buffEnum.EBuffType.EASY_HURT:
                if (e.parentActor.head) {
                    this.createEffect({
                        parent: e.parentActor.head.nBuffView,
                        prefabName: "EB_21",
                        initPos: cc.v2(0, 0),
                        effectClass: $frameAnimEffect.default,
                        onCreated: function (t) {
                            n.bindEffect(t);
                            t.playOnceAllAnim(null, !1);
                        }
                    });
                }
                break;
            case $buffEnum.EBuffType.DIZZINESS:
                t.instance.createEffect({
                    parent: e.parentActor.node,
                    prefabName: "EB_51",
                    effectClass: $spAnimEffect.default,
                    initPos: cc.v2(0, e.parentActor.rightHeight),
                    onCreated: function (t) {
                        n.bindEffect(t);
                        t.playDefaultAnim("stand", 1, !0, null, !1);
                    }
                });
                break;
            case $buffEnum.EBuffType.PALSY:
                this.createEffect({
                    parent: e.parentActor.node,
                    prefabName: "EB_71",
                    initPos: cc.v2(0, 0.5 * e.parentActor.rightHeight),
                    effectClass: $spAnimEffect.default,
                    onCreated: function (t) {
                        n.bindEffect(t);
                        t.playDefaultAnim("stand", 1, !0);
                    }
                });
                break;
            case $buffEnum.EBuffType.FIRE:
                this.createEffect({
                    parent: e.parentActor.node,
                    prefabName: "EB_91",
                    initPos: cc.v2(0, 0.5 * e.parentActor.rightHeight),
                    effectClass: $frameAnimEffect.default,
                    onCreated: function (t) {
                        n.bindEffect(t);
                        t.playOnceAllAnim(null, !1);
                    }
                });
                break;
            case $buffEnum.EBuffType.SLOW_DOWN:
                if (e.parentActor.head) {
                    this.createEffect({
                        parent: e.parentActor.head.nBuffView,
                        prefabName: "EB_101_Speed",
                        initPos: cc.v2(0, 0),
                        effectClass: $frameAnimEffect.default,
                        onCreated: function (t) {
                            n.bindEffect(t);
                            t.playOnceAllAnim(null, !1);
                        }
                    });
                }
                break;
            case $buffEnum.EBuffType.FROZEN:
                this.createEffect({
                    parent: e.parentActor.node,
                    prefabName: "EB_101",
                    initPos: cc.v2(0, 0),
                    effectClass: $eB_101.default,
                    onCreated: function (t) {
                        n.bindEffect(t);
                        t.play(i[0], e.parentActor.unitId);
                    }
                });
                break;
            case $buffEnum.EBuffType.POISON:
                this.createEffect({
                    parent: e.parentActor.node,
                    prefabName: "EB_111",
                    initPos: cc.v2(0, 50),
                    effectClass: $spAnimEffect.default,
                    onCreated: function (t) {
                        n.bindEffect(t);
                        t.playDefaultAnim("animation", 1, !0);
                    }
                });
                break;
            case $buffEnum.EBuffType.SPEED_UP:
                this.createEffect({
                    parent: e.parentActor.node.getChildByName("Body"),
                    prefabName: "EB_121",
                    initPos: cc.v2(0, 25),
                    effectClass: $frameAnimEffect.default,
                    onCreated: function (t) {
                        t.node.setSiblingIndex(0);
                        n.bindEffect(t);
                        t.playOnceAllAnim(null, !1);
                    }
                });
        }
    };
    t._instance = null;
    return t;
})();
exports.default = f;
