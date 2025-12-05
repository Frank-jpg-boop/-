var $nodePoolManager = require("./NodePoolManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $battleMgr = require("./BattleMgr");
var s = (function () {
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
    t.prototype.createBullet = function (t) {
        var e = this;
        var n = $nodePoolManager.default.instance.getPoolPrefab(t.prefabName);
        if (n) {
            var s = $nodePoolManager.default.instance.getNode(n);
            t.parent.addChild(s);
            s.setSiblingIndex(0);
            s.setPosition(t.initPos);
            var c = s.getComponent(t.bulletClass);
            c.init(t.iconPath);
            s.active = !1;
            if (t.onCreated) {
                t.onCreated(c);
            }
        } else {
            $resLoader.ResLoader.loadAsset({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "prefabs/battle/bullet/" + t.prefabName,
                type: cc.Prefab,
                success: function (n) {
                    $nodePoolManager.default.instance.addPoolPrefab(n);
                    $battleMgr.default.instance.addPoolNodePrefabName(n.name);
                    e.createBullet(t);
                }
            });
        }
    };
    t._instance = null;
    return t;
})();
exports.default = s;
