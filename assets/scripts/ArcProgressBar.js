import $mathUtil from './MathUtil';
let i;
export const ArcProgressBar = void 0;
const s = cc._decorator;
const c = s.ccclass;
const l = s.property;
const u = s.requireComponent;
const p = s.executeInEditMode;
const h =
  (s.help,
  s.menu,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e.graphics = null;
      e._radius = 100;
      e._clockwise = !0;
      e._startAngle = 90;
      e._range = 180;
      e._lineWidth = 20;
      e._progress = 0.4;
      e._lineCap = cc.Graphics.LineCap.ROUND;
      e._backgroundColor = new cc.Color(255, 255, 255, 255);
      e._progressColor = new cc.Color(50, 101, 246, 255);
      e.curStartAngle = 0;
      e.curStartRadians = 0;
      e.curEndRadians = 0;
      e.curTween = null;
      e.curTweenRes = null;
      return e;
    }
    Object.defineProperty(e.prototype, 'radius', {
      get: function () {
        return this._radius;
      },
      set: function (t) {
        this._radius = t;
        this.updateProperties();
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'clockwise', {
      get: function () {
        return this._clockwise;
      },
      set: function (t) {
        this._clockwise = t;
        this.updateProperties();
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'startAngle', {
      get: function () {
        return this._startAngle;
      },
      set: function (t) {
        this._startAngle = t;
        this.updateProperties();
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'range', {
      get: function () {
        return this._range;
      },
      set: function (t) {
        this._range = t;
        this.updateProperties();
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'lineWidth', {
      get: function () {
        return this._lineWidth;
      },
      set: function (t) {
        this._lineWidth = t;
        this.updateProperties();
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'progress', {
      get: function () {
        return this._progress;
      },
      set: function (t) {
        this.updateProgress(t);
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'lineCap', {
      get: function () {
        return this._lineCap;
      },
      set: function (t) {
        this._lineCap = t;
        this.updateProperties();
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'backgroundColor', {
      get: function () {
        return this._backgroundColor;
      },
      set: function (t) {
        this._backgroundColor = t;
        this.updateProperties();
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'progressColor', {
      get: function () {
        return this._progressColor;
      },
      set: function (t) {
        this._progressColor = t;
        this.updateProperties();
      },
      enumerable: !1,
      configurable: !0,
    });
    e.prototype.onLoad = function () {
      this.init();
    };
    e.prototype.resetInEditor = function () {
      this.init();
    };
    e.prototype.init = function () {
      if (this.graphics) {
        //
      } else {
        this.graphics = this.getComponent(cc.Graphics);
      }
      this.updateProperties();
    };
    e.prototype.show = function () {
      const t = this;
      return new Promise(function (e) {
        const n = t.graphics.node;
        n.opacity = 0;
        n.active = !0;
        cc.tween(n)
          .to(0.1, {
            opacity: 255,
          })
          .call(e)
          .start();
      });
    };
    e.prototype.hide = function () {
      const t = this;
      return new Promise(function (e) {
        const n = t.graphics.node;
        cc.tween(n)
          .to(0.1, {
            opacity: 0,
          })
          .set({
            active: !1,
          })
          .call(e)
          .start();
      });
    };
    e.prototype.updateProperties = function () {
      const t = this.graphics;
      t.lineWidth = this._lineWidth;
      t.lineCap = this._lineCap;
      this.curStartAngle = this._startAngle + 90;
      this.curStartRadians = $mathUtil.MathUtil.angle2Radians(this.curStartAngle);
      const e = this.curStartAngle + (this._clockwise ? -this._range : this._range);
      this.curEndRadians = $mathUtil.MathUtil.angle2Radians(e);
      this.updateProgress(this._progress);
    };
    e.prototype.updateProgress = function (t) {
      if (t < 0) {
        t = 0;
      } else {
        if (t > 1) {
          t = 1;
        }
      }
      this._progress = t;
      const e = this.graphics;
      e.clear();
      e.strokeColor = this._backgroundColor;
      e.arc(0, 0, this._radius, this.curStartRadians, this.curEndRadians, !this._clockwise);
      e.stroke();
      const n = null;
      if (this._clockwise) {
        n = -this._range;
      } else {
        n = this._range;
      }
      const i = this.curStartAngle + n * t;
      const o = $mathUtil.MathUtil.angle2Radians(i);
      e.strokeColor = this._progressColor;
      e.arc(0, 0, this._radius, this.curStartRadians, o, !this._clockwise);
      e.stroke();
    };
    e.prototype.to = function (t, e) {
      const n = this;
      return new Promise(function (i) {
        n.stop();
        n.curTweenRes = i;
        n.curTween = cc
          .tween(n)
          .to(t, {
            progress: e,
          })
          .call(function () {
            n.curTween = null;
            n.curTweenRes = null;
          })
          .call(i)
          .start();
      });
    };
    e.prototype.stop = function () {
      if (this.curTween) {
        this.curTween.stop();
        this.curTween = null;
      }
      if (this.curTweenRes) {
        this.curTweenRes();
        this.curTweenRes = null;
      }
    };
  })(cc.Component));
export const ArcProgressBar = h;
