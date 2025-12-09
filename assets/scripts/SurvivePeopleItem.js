let i;
const a = cc._decorator;
const s = a.ccclass;
const c =
  (a.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._peopleId = 0;
      return e;
    }
    Object.defineProperty(e.prototype, "peopleId", {
      get: function () {
        return this._peopleId;
      },
      set: function (t) {
        this._peopleId = t;
      },
      enumerable: !1,
      configurable: !0,
    });
  })(cc.Component));
exports.default = c;
