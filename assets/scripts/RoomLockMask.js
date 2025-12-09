let i;
const a = cc._decorator;
const s = a.ccclass;
const c =
  (a.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._isPlaying = !1;
      return e;
    }
    Object.defineProperty(e.prototype, "isPlaying", {
      get: function () {
        return this._isPlaying;
      },
      enumerable: !1,
      configurable: !0,
    });
    e.prototype.playUnlockAnim = function (t) {
      const e = this;
      if (this._isPlaying) {
        //
      } else {
        this._isPlaying = !0;
        cc.tween(this.node)
          .to(0.5, {
            opacity: 0,
          })
          .delay(0.3)
          .call(function () {
            e._isPlaying = !1;
            if (t) {
              t();
            }
          })
          .start();
      }
    };
  })(cc.Component));
exports.default = c;
