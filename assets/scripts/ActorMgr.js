var $cfg = require("./Cfg");
var $nodePoolManager = require("./NodePoolManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $actorEnum = require("./ActorEnum");
var u = (function () {
    function t() {
        this.actorMap = new Map();
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
    t.prototype.createActor = function (t) {
        var e = this;
        var n = $nodePoolManager.default.instance.getPoolPrefab(t.prefabName);
        if (n) {
            var i = $nodePoolManager.default.instance.getNode(n);
            if (null != t.opacity) {
                i.opacity = t.opacity;
            } else {
                i.opacity = 255;
            }
            t.parent.addChild(i);
            i.setPosition(t.initPos);
            var u = i.addComponent(t.actorClass);
            this.actorMap.set(t.id, u);
            u.init(
                t.id,
                t.camp == $actorEnum.ETeamType.PLAYER
                    ? $gridAreaDivisionMgr.E_AreaObjectType.PLAYER
                    : $gridAreaDivisionMgr.E_AreaObjectType.ENEMY,
                $gridAreaDivisionMgr.E_AreaColliderType.RECT,
                t.cfgId,
                t.camp,
                t.initParam
            ).then(function () {
                if (t.onCreated) {
                    t.onCreated(u);
                }
            });
        } else {
            $resLoader.ResLoader.loadAsset({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path:
                    "prefabs/battle/" +
                    (t.camp == $actorEnum.ETeamType.PLAYER ? "player" : "enemy") +
                    "/" +
                    t.prefabName,
                type: cc.Prefab,
                success: function (n) {
                    $nodePoolManager.default.instance.addPoolPrefab(n);
                    $battleMgr.default.instance.addPoolNodePrefabName(n.name);
                    e.createActor(t);
                }
            });
        }
    };
    t.prototype.getActorClassName = function (t, e) {
        if (e == $actorEnum.ETeamType.PLAYER) {
            return "PlayerBase";
        }
        if (e == $actorEnum.ETeamType.ENEMY) {
            var n = $cfg.default.instance.dataEnemy.getById(t);
            if (1 == n.enemyType || 2 == n.enemyType || 3 == n.enemyType) {
                return "EnemyBase";
            } else {
                if (2 == n.isBoss) {
                    return "Boss_" + t;
                } else {
                    return "Enemy_" + t;
                }
            }
        }
    };
    t.prototype.getActor = function (t) {
        if (this.actorMap.has(t)) {
            return this.actorMap.get(t);
        } else {
            return null;
        }
    };
    t.prototype.remoreActor = function (t) {
        this.actorMap.delete(t);
    };
    t.prototype.queryActor = function () {
        return this.actorMap;
    };
    t.prototype.queryActorByCamp = function (t) {
        var e = [];
        this.actorMap.forEach(function (n) {
            if (n.camp == t) {
                e.push(n);
            }
        });
        return e;
    };
    t.prototype.clearActor = function () {
        this.actorMap.clear();
    };
    t._instance = null;
    return t;
})();
exports.default = u;
