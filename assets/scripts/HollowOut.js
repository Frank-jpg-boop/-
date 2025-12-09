let i;
exports.HollowOutShape = void 0;
let c;
const l = cc._decorator;
const u = l.ccclass;
const p = l.property;
const h = l.requireComponent;
const f = l.executeInEditMode;
const d = l.disallowMultiple;
const m = l.executionOrder;
!(function (t) {
  t[(t.Rect = 1)] = "Rect";
  t[(t.Circle = 2)] = "Circle";
})((c = exports.HollowOutShape || (exports.HollowOutShape = {})));
e.prototype.getFeather = function (t) {
  return t / this.node.width;
};
e.prototype.getRound = function (t) {
  return t / this.node.width;
};
e.prototype.getHeight = function (t) {
  return t / this.node.width;
};
e.prototype.getWidth = function (t) {
  return t / this.node.width;
};
e.prototype.getNodeSize = function () {
  return cc.v2(this.node.width, this.node.height);
};
e.prototype.getCenter = function (t) {
  const e = this.node;
  const n = e.width;
  const i = e.height;
  const o = (t.x + n / 2) / n;
  const r = (-t.y + i / 2) / i;
  return cc.v2(o, r);
};
e.prototype.setNodeSize = function () {
  const t = this.node;
  const e = t.width;
  const n = t.height;
  this._radius = Math.sqrt(Math.pow(e, 2) + Math.pow(n, 2)) / 2;
  this.rect(t.getPosition(), e, n, 0, 0);
};
e.prototype.reset = function () {
  this.rect(cc.v2(), 0, 0, 0, 0);
};
e.prototype.circleTo = function (t, e, n, i) {
  const o = this;
  if (void 0 === i) {
    i = 0;
  }
  return new Promise(function (r) {
    o._shape = c.Circle;
    cc.Tween.stopAllByTarget(o);
    o.unscheduleAllCallbacks();
    if (o.tweenRes) {
      o.tweenRes();
    }
    o.tweenRes = r;
    cc.tween(o)
      .to(t, {
        center: e,
        radius: n,
        feather: i,
      })
      .call(function () {
        o.scheduleOnce(function () {
          if (o.tweenRes) {
            o.tweenRes();
            o.tweenRes = null;
          }
        });
      })
      .start();
  });
};
e.prototype.rectTo = function (t, e, n, i, o, r) {
  const a = this;
  if (void 0 === o) {
    o = 0;
  }
  if (void 0 === r) {
    r = 0;
  }
  return new Promise(function (s) {
    a._shape = c.Rect;
    cc.Tween.stopAllByTarget(a);
    a.unscheduleAllCallbacks();
    if (a.tweenRes) {
      a.tweenRes();
    }
    a.tweenRes = s;
    o = Math.min(o, n / 2, i / 2);
    r = Math.min(r, o);
    cc.tween(a)
      .to(t, {
        center: e,
        width: n,
        height: i,
        round: o,
        feather: r,
      })
      .call(function () {
        a.scheduleOnce(function () {
          if (a.tweenRes) {
            a.tweenRes();
            a.tweenRes = null;
          }
        });
      })
      .start();
  });
};
e.prototype.circle = function (t, e, n) {
  this._shape = c.Circle;
  if (null != t) {
    this._center = t;
  }
  if (null != e) {
    this._radius = e;
  }
  if (null != n) {
    if (n >= 0) {
      this._feather = n;
    } else {
      this._feather = 0;
    }
  }
  const i = this.material;
  i.setProperty("size", this.getNodeSize());
  i.setProperty("center", this.getCenter(this._center));
  i.setProperty("width", this.getWidth(2 * this._radius));
  i.setProperty("height", this.getHeight(2 * this._radius));
  i.setProperty("round", this.getRound(this._radius));
  i.setProperty("feather", this.getFeather(this._feather));
};
e.prototype.rect = function (t, e, n, i, o) {
  this._shape = c.Rect;
  if (null != t) {
    this._center = t;
  }
  if (null != e) {
    this._width = e;
  }
  if (null != n) {
    this._height = n;
  }
  if (null != i) {
    if (i >= 0) {
      this._round = i;
    } else {
      this._round = 0;
    }
    const r = Math.min(this._width / 2, this._height / 2);
    if (this._round <= r) {
      this._round = this._round;
    } else {
      this._round = r;
    }
  }
  if (null != o) {
    if (o >= 0) {
      this._feather = o;
    } else {
      this._feather = 0;
    }
    if (this._feather <= this._round) {
      this._feather = this._feather;
    } else {
      this._feather = this._round;
    }
  }
  const a = this.material;
  a.setProperty("size", this.getNodeSize());
  a.setProperty("center", this.getCenter(this._center));
  a.setProperty("width", this.getWidth(this._width));
  a.setProperty("height", this.getHeight(this._height));
  a.setProperty("round", this.getRound(this._round));
  a.setProperty("feather", this.getFeather(this._feather));
};
e.prototype.updateProperties = function () {
  switch (this._shape) {
    case c.Rect:
      this.rect(
        this._center,
        this._width,
        this._height,
        this._round,
        this._feather,
      );
      break;
    case c.Circle:
      this.circle(this._center, this._radius, this._feather);
  }
};
e.prototype.init = function () {};
e.prototype.resetInEditor = function () {
  this.init();
};
e.prototype.onLoad = function () {
  this.init();
};
Object.defineProperty(e.prototype, "feather", {
  get: function () {
    return this._feather;
  },
  set: function (t) {
    this._feather = t;
    this.updateProperties();
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "radius", {
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
Object.defineProperty(e.prototype, "round", {
  get: function () {
    return this._round;
  },
  set: function (t) {
    this._round = t;
    this.updateProperties();
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "height", {
  get: function () {
    return this._height;
  },
  set: function (t) {
    this._height = t;
    this.updateProperties();
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "width", {
  get: function () {
    return this._width;
  },
  set: function (t) {
    this._width = t;
    this.updateProperties();
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "center", {
  get: function () {
    return this._center;
  },
  set: function (t) {
    this._center = t;
    this.updateProperties();
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "shape", {
  get: function () {
    return this._shape;
  },
  set: function (t) {
    this._shape = t;
    this.updateProperties();
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "effect", {
  get: function () {
    return this._effect;
  },
  set: function (t) {
    this._effect = t;
    this.init();
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e._effect = null;
  e._shape = c.Rect;
  e._center = cc.v2();
  e._width = 300;
  e._height = 300;
  e._round = 1;
  e._radius = 200;
  e._feather = 0.5;
  e.sprite = null;
  e.material = null;
  e.tweenRes = null;
  return e;
}
exports.default = y;
