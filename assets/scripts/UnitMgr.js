exports.UnitMgr = void 0;
var $nodePoolManager = require("./NodePoolManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $battleMgr = require("./BattleMgr");
var s = (function () {
    function t() {
        this._unitId = 0;
        this._unitMap = new Map();
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (this._instance) {
                //
            } else {
                this._instance = new t();
            }
            return this._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.init = function () {
        this._unitId = 0;
        this._unitMap.clear();
    };
    t.prototype.createUnit = function (t) {
        var e = this;
        var n = $nodePoolManager.default.instance.getPoolPrefab(t.prefabName);
        if (n) {
            var s = t.id || ++this._unitId;
            var c = $nodePoolManager.default.instance.getNode(n);
            t.parent.addChild(c);
            c.setPosition(t.initPos);
            var l = c.getComponent(t.unitClass);
            this._unitMap.set(s, l);
            l.init(s, t.areaObjType, t.areaColliderType, t.initParam).then(function () {
                if (t.onCreated) {
                    t.onCreated(l);
                }
            });
        } else {
            $resLoader.ResLoader.loadAsset({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "prefabs/room/units/" + t.prefabName,
                type: cc.Prefab,
                success: function (n) {
                    if ($battleMgr.default.instance.getCurScene()) {
                        $nodePoolManager.default.instance.addPoolPrefab(n);
                        $battleMgr.default.instance.addPoolNodePrefabName(n.name);
                        e.createUnit(t);
                    }
                }
            });
        }
    };
    t.prototype.removeUnit = function (t) {
        this._unitMap.delete(t);
    };
    t.prototype.getUnit = function (t) {
        return this._unitMap.get(t);
    };
    t.prototype.queryUnit = function (t) {
        var e = [];
        this._unitMap.forEach(function (n) {
            if (n.areaType == t) {
                e.push(n);
            }
        });
        return e;
    };
    t.prototype.clear = function () {
        this._unitId = 0;
        this._unitMap.forEach(function (t) {
            t.remove();
        });
        this._unitMap.clear();
    };
    return t;
})();
exports.UnitMgr = s;
