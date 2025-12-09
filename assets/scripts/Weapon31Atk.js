import $spAnimEffect from './SpAnimEffect';
let i;
const s = cc._decorator;
const c = s.ccclass;
const l =
  (s.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._onEvent = null;
      return e;
    }
    e.prototype.onInit = function () {
      t.prototype.onInit.call(this);
    };
    e.prototype.play = function (t, e) {
      this._onEvent = t;
      this.playDefaultAnim("atk", 1, !1, function () {
        if (e) {
          e();
        }
      });
    };
    e.prototype.onDefaultAnimFrameEvent = function (t, e) {
      if ("atk" == e && this._onEvent) {
        this._onEvent();
      }
    };
  })($spAnimEffect.default));
exports.default = l;
