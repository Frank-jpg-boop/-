var i;
exports.ResKeeper = void 0;
var a = cc._decorator;
var s = a.ccclass;
var c =
    (a.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._resCacheMap = new Set();
            return e;
        }
        __extends(e, t);
        e.prototype.cacheAsset = function (t) {
            if (this._resCacheMap.has(t)) {
                //
            } else {
                t.addRef();
                this._resCacheMap.add(t);
            }
        };
        e.prototype.releaseAssets = function () {
            this._resCacheMap.forEach(function (t) {
                t.decRef();
            });
            this._resCacheMap.clear();
        };
        e.prototype.onDestroy = function () {
            this.releaseAssets();
        };
        return __decorate([s], e);
    })(cc.Component));
exports.ResKeeper = c;
