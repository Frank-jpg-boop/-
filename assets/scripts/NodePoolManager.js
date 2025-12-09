var i = (function () {
    function t() {
        this.poolListMap = new Map();
        this.poolPrefabMap = new Map();
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
    t.prototype.checkNodePoolVaild = function (t) {
        if (this.poolListMap.has(t)) {
            //
        } else {
            this.poolListMap.set(t, new cc.NodePool(t));
        }
    };
    t.prototype.getNode = function (t) {
        this.checkNodePoolVaild(t.name);
        var e = null;
        var n = this.poolListMap.get(t.name);
        (e = n && n.size() > 0 ? n.get() : cc.instantiate(t)).active = !0;
        return e;
    };
    t.prototype.putNode = function (t, e, n) {
        if (void 0 === n) {
            n = !0;
        }
        this.checkNodePoolVaild(t.name);
        if (n) {
            t.active = !1;
        }
        if (e) {
            t.setPosition(-9999, -9999);
        }
        this.poolListMap.get(t.name).put(t);
    };
    t.prototype.clearNodePool = function (t) {
        if (this.poolListMap.has(t.name)) {
            this.poolListMap.get(t.name).clear();
            this.poolListMap.delete(t.name);
        }
    };
    t.prototype.clearAllNodePool = function () {
        this.poolListMap.forEach(function (t) {
            t.clear();
        });
        this.poolListMap.clear();
    };
    t.prototype.addPoolPrefab = function (t) {
        this.poolPrefabMap.set(t.name, t);
        t.addRef();
    };
    t.prototype.getPoolPrefab = function (t) {
        if (this.poolPrefabMap.has(t)) {
            return this.poolPrefabMap.get(t);
        } else {
            return null;
        }
    };
    t.prototype.removePoolPrefab = function (t) {
        if (this.poolPrefabMap.has(t)) {
            this.poolPrefabMap.get(t).decRef();
        }
        this.poolPrefabMap.delete(t);
    };
    t.prototype.clearAllPoolPrefab = function () {
        this.poolPrefabMap.forEach(function (t) {
            t.decRef();
        });
        this.poolPrefabMap.clear();
    };
    t._instance = null;
    return t;
})();
exports.default = i;
