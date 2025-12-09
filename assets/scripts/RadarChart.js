let i;
export const RadarChart = void 0;
const a = cc._decorator;
const s = a.ccclass;
const c = a.property;
const l = a.executeInEditMode;
const u =
  (a.executionOrder,
  a.help,
  a.menu,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e.target = null;
      e._axisLength = 200;
      e._axes = 6;
      e._axisScales = 3;
      e._drawAxes = !0;
      e._gridLineWidth = 4;
      e._innerGridLineWidth = 4;
      e._gridLineColor = cc.Color.GRAY;
      e._gridFillColor = cc.color(100, 100, 100, 100);
      e._dataValuesStrings = ['0.8,0.5,0.6,0.5,0.8,0.6', '0.5,0.9,0.5,0.8,0.5,0.9'];
      e._dataLineWidths = [5, 5];
      e._dataLineColors = [cc.Color.BLUE, cc.Color.RED];
      e._dataFillColors = [cc.color(120, 120, 180, 100), cc.color(180, 120, 120, 100)];
      e._dataJoinColors = [];
      e._drawDataJoin = !0;
      e.graphics = null;
      e.keepUpdating = !1;
      e.angles = null;
      e._curDatas = [];
      e.curTweenRes = null;
      return e;
    }
    Object.defineProperty(e.prototype, 'axisLength', {
      get: function () {
        return this._axisLength;
      },
      set: function (t) {
        this._axisLength = t;
        this.draw(this.curDatas);
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'axes', {
      get: function () {
        return this._axes;
      },
      set: function (t) {
        this._axes = Math.floor(t >= 3 ? t : 3);
        this.draw(this.curDatas);
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'axisScales', {
      get: function () {
        return this._axisScales;
      },
      set: function (t) {
        this._axisScales = Math.floor(t >= 1 ? t : 1);
        this.draw(this.curDatas);
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'drawAxes', {
      get: function () {
        return this._drawAxes;
      },
      set: function (t) {
        this._drawAxes = t;
        this.draw(this.curDatas);
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'gridLineWidth', {
      get: function () {
        return this._gridLineWidth;
      },
      set: function (t) {
        this._gridLineWidth = t;
        this.draw(this.curDatas);
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'innerGridLineWidth', {
      get: function () {
        return this._innerGridLineWidth;
      },
      set: function (t) {
        this._innerGridLineWidth = t;
        this.draw(this.curDatas);
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'gridLineColor', {
      get: function () {
        return this._gridLineColor;
      },
      set: function (t) {
        this._gridLineColor = t;
        this.draw(this.curDatas);
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'gridFillColor', {
      get: function () {
        return this._gridFillColor;
      },
      set: function (t) {
        this._gridFillColor = t;
        this.draw(this.curDatas);
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'dataValuesStrings', {
      get: function () {
        return this._dataValuesStrings;
      },
      set: function (t) {
        this._dataValuesStrings = t;
        this.drawWithProperties();
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'dataLineWidths', {
      get: function () {
        return this._dataLineWidths;
      },
      set: function (t) {
        this._dataLineWidths = t;
        this.drawWithProperties();
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'dataLineColors', {
      get: function () {
        return this._dataLineColors;
      },
      set: function (t) {
        this._dataLineColors = t;
        this.drawWithProperties();
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'dataFillColors', {
      get: function () {
        return this._dataFillColors;
      },
      set: function (t) {
        this._dataFillColors = t;
        this.drawWithProperties();
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'dataJoinColors', {
      get: function () {
        return this._dataJoinColors;
      },
      set: function (t) {
        this._dataJoinColors = t;
        this.drawWithProperties();
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'drawDataJoin', {
      get: function () {
        return this._drawDataJoin;
      },
      set: function (t) {
        this._drawDataJoin = t;
        this.draw(this.curDatas);
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, 'curDatas', {
      get: function () {
        return this._curDatas;
      },
      enumerable: !1,
      configurable: !0,
    });
    e.prototype.onLoad = function () {
      this.init();
      this.drawWithProperties();
    };
    e.prototype.update = function () {
      if (this.keepUpdating && 0 !== this._curDatas.length) {
        this.draw(this._curDatas);
      }
    };
    e.prototype.init = function () {
      if (this.target) {
        //
      } else {
        this.target = this.node;
      }
      this.graphics =
        this.target.getComponent(cc.Graphics) || this.target.addComponent(cc.Graphics);
      this.graphics.lineJoin = cc.Graphics.LineJoin.ROUND;
      this.graphics.lineCap = cc.Graphics.LineCap.ROUND;
    };
    e.prototype.drawWithProperties = function () {
      for (
        const t = [],
          e = this.dataValuesStrings,
          n = this._dataLineWidths,
          i = this._dataLineColors,
          o = this._dataFillColors,
          r = this._dataJoinColors,
          a = 0;
        a < e.length;
        a++
      ) {
        t.push({
          values: this.processValuesString(e[a]),
          lineWidth: n[a] || p.lineWidth,
          lineColor: i[a] || p.lineColor,
          fillColor: o[a] || p.fillColor,
          joinColor: r[a] || p.joinColor,
        });
      }
      this.draw(t);
    };
    e.prototype.processValuesString = function (t) {
      for (const e = t.split(','), n = [], i = 0; i < e.length; i++) {
        const o = parseFloat(e[i]);
        n.push(isNaN(o) ? 0 : o);
      }
      return n;
    };
    e.prototype.drawBase = function () {
      const t = this.graphics;
      t.lineWidth = this._gridLineWidth;
      t.strokeColor = this._gridLineColor;
      t.fillColor = this._gridFillColor;
      for (const e = (this.angles = []), n = 360 / this.axes, i = 0; i < this.axes; i++) {
        e.push(n * i);
      }
      const o = [];
      const r = this._axisLength;
      const a = this._axisScales;
      const s = r / a;
      for (i = 0; i < a; i++) {
        for (const c = [], l = r - s * i, u = 0, p = this.angles.length; u < p; u++) {
          const h = (Math.PI / 180) * this.angles[u];
          c.push(cc.v2(l * Math.cos(h), l * Math.sin(h)));
        }
        o.push(c);
      }
      const f = o[0];
      if (this._drawAxes) {
        for (i = 0; i < f.length; i++) {
          t.moveTo(0, 0);
          t.lineTo(f[i].x, f[i].y);
        }
      }
      t.moveTo(f[0].x, f[0].y);
      for (i = 1; i < f.length; i++) {
        t.lineTo(f[i].x, f[i].y);
      }
      t.close();
      t.fill();
      t.stroke();
      if (o.length > 1) {
        t.lineWidth = this._innerGridLineWidth;
        for (i = 1; i < o.length; i++) {
          const d = o[i];
          t.moveTo(d[0].x, d[0].y);
          for (u = 1; u < d.length; u++) {
            t.lineTo(d[u].x, d[u].y);
          }
          t.close();
        }
        t.stroke();
      }
    };
    e.prototype.draw = function (t) {
      const e = this.graphics;
      e.clear();
      this.drawBase();
      const n = null;
      if (Array.isArray(t)) {
        n = t;
      } else {
        n = [t];
      }
      this._curDatas = n;
      this.resizeCurDatasValues(0);
      for (const i = this.axes, o = this.axisLength, r = this.angles, a = 0; a < n.length; a++) {
        const s = n[a];
        e.strokeColor = s.lineColor || p.lineColor;
        e.fillColor = s.fillColor || p.fillColor;
        e.lineWidth = s.lineWidth || p.lineWidth;
        for (const c = [], l = 0; l < i; l++) {
          const u = (s.values[l] > 1 ? 1 : s.values[l]) * o;
          const h = (Math.PI / 180) * r[l];
          c.push(cc.v2(u * Math.cos(h), u * Math.sin(h)));
        }
        e.moveTo(c[0].x, c[0].y);
        for (l = 1; l < c.length; l++) {
          e.lineTo(c[l].x, c[l].y);
        }
        e.close();
        e.fill();
        e.stroke();
        if (this._drawDataJoin) {
          for (l = 0; l < c.length; l++) {
            const f = c[l];
            e.strokeColor = s.lineColor || p.lineColor;
            e.circle(f.x, f.y, 2);
            e.stroke();
            e.strokeColor = s.joinColor || p.joinColor;
            e.circle(f.x, f.y, 0.65);
            e.stroke();
          }
        }
      }
    };
    e.prototype.to = function (t, e) {
      const n = this;
      return new Promise(function (i) {
        let o;
        n.unscheduleAllCallbacks();
        if (n.curTweenRes) {
          n.curTweenRes();
        }
        n.curTweenRes = i;
        const r = null;
        if (Array.isArray(t)) {
          r = t;
        } else {
          r = [t];
        }
        n.keepUpdating = !0;
        for (const a = 0; a < r.length; a++) {
          const s = n._curDatas[a];
          if (s) {
            for (const c = r[a], l = 0; l < s.values.length; l++) {
              cc.tween(s.values)
                .to(e, ((o = {}), (o[l] = c.values[l] > 1 ? 1 : c.values[l]), o))
                .start();
            }
            cc.tween(s)
              .to(e, {
                lineWidth: c.lineWidth || s.lineWidth,
                lineColor: c.lineColor || s.lineColor,
                fillColor: c.fillColor || s.fillColor,
                joinColor: c.joinColor || s.joinColor,
              })
              .start();
          }
        }
        n.scheduleOnce(function () {
          n.keepUpdating = !1;
          n.curTweenRes();
          n.curTweenRes = null;
        }, e);
      });
    };
    e.prototype.resizeCurDatasValues = function (t) {
      if (void 0 === t) {
        t = 0;
      }
      for (const e = this._curDatas, n = 0; n < e.length; n++) {
        const i = e[n];
        if (i.values.length < this._axes) {
          for (const o = this._axes - i.values.length, r = 0; r < o; r++) {
            i.values.push(t);
          }
        }
      }
    };
  })(cc.Component));
export const RadarChart = u;
const p = {
  lineWidth: 5,
  lineColor: cc.Color.BLUE,
  fillColor: cc.color(120, 120, 180, 100),
  joinColor: cc.Color.WHITE,
};
