let i;
exports.ResKeeper = void 0;
const a = cc._decorator;
const s = a.ccclass;
const c =
  (a.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._resCacheMap = new Set();
      return e;
    }
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
  })(cc.Component));
exports.ResKeeper = c;
