import $randomUtil from './RandomUtil';
exports.AnimUtil = void 0;
t.fade = function (t, e, n, i, o) {
  if (void 0 === e) {
    e = null;
  }
  if (void 0 === n) {
    n = 0.5;
  }
  if (void 0 === i) {
    i = 0;
  }
  if (void 0 === o) {
    o = 255;
  }
  cc.Tween.stopAllByTarget(t);
  t.opacity = i;
  cc.tween(t)
    .to(n, {
      opacity: o,
    })
    .call(function () {
      if (e) {
        e();
      }
    })
    .start();
};
t.bounce = function (t, e, n) {
  if (void 0 === e) {
    e = 50;
  }
  if (void 0 === n) {
    n = 2;
  }
  cc.Tween.stopAllByTarget(t);
  const i = t.y;
  const o = t.y - 20;
  const r = t.y + e;
  cc.tween(t)
    .to(0.1, {
      y: o,
      scaleX: 1.2,
      scaleY: 0.7,
    })
    .to(0.1, {
      y: r,
      scaleX: 0.8,
      scaleY: 1,
    })
    .delay(0.1)
    .to(0.08, {
      y: o,
      scaleX: 0.8,
      scaleY: 0.82,
    })
    .to(0.06, {
      scaleX: 1.2,
      scaleY: 0.7,
    })
    .to(0.1, {
      y: i - 5,
      scaleX: 1,
      scaleY: 1,
    })
    .to(0.08, {
      y: i,
    })
    .delay(n)
    .union()
    .repeatForever()
    .start();
};
t.shakeAngle = function (t, e, n, i, o) {
  if (void 0 === e) {
    e = 10;
  }
  if (void 0 === n) {
    n = 0.5;
  }
  if (void 0 === i) {
    i = !1;
  }
  if (void 0 === o) {
    o = null;
  }
  const r = t.angle;
  const a = function (e, n) {
    if (e < 1 || n < 0.1) {
      cc.tween(t)
        .to(0.2, {
          angle: r,
        })
        .call(function () {
          if (o) {
            o();
          }
        })
        .start();
    } else {
      const i = 0.3 * n;
      const s = 0.5 * e;
      const c = n - i;
      cc.tween(t)
        .to(
          i,
          {
            angle: -e,
          },
          {
            easing: "sineInOut",
          },
        )
        .to(
          i,
          {
            angle: e,
          },
          {
            easing: "sineInOut",
          },
        )
        .call(function () {
          a(s, c);
        })
        .start();
    }
  };
  if (i) {
    const s = cc
      .tween(t)
      .to(
        0.25 * n,
        {
          angle: e,
        },
        {
          easing: "sineOut",
        },
      )
      .to(0.2, {
        angle: r,
      })
      .delay(0.5)
      .call(function () {
        if (o) {
          o();
        }
      });
    cc.tween(t).repeatForever(s).start();
  } else {
    cc.tween(t)
      .to(
        0.25 * n,
        {
          angle: e,
        },
        {
          easing: "sineOut",
        },
      )
      .call(function () {
        a(0.5 * e, 0.75 * n);
      })
      .start();
  }
};
t.shake = function (t, e, n, o) {
  if (void 0 === e) {
    e = 10;
  }
  if (void 0 === n) {
    n = 10;
  }
  if (void 0 === o) {
    o = 0.5;
  }
  cc.Tween.stopAllByTarget(t);
  for (const r = t.position, a = cc.tween(t), s = 0; s < e; s++) {
    const c = $randomUtil.RandomUtil.randomInt(-n, n);
    const l = $randomUtil.RandomUtil.randomInt(-n, n);
    a.to(o / e, {
      position: cc.v3(r.x + c, r.y + l, r.z),
    });
  }
  a.to(0.1, {
    position: r,
  }).start();
};
t.blickAnim = function (t, e, n) {
  if (void 0 === e) {
    e = 0;
  }
  if (void 0 === n) {
    n = 0.5;
  }
  cc.Tween.stopAllByTarget(t);
  cc.tween(t)
    .to(n, {
      opacity: e,
    })
    .to(n, {
      opacity: 255,
    })
    .union()
    .repeatForever()
    .start();
};
t.breathAndFadeAnim = function (t, e, n, i, o) {
  if (void 0 === e) {
    e = 1.2;
  }
  if (void 0 === n) {
    n = 0;
  }
  if (void 0 === i) {
    i = 255;
  }
  if (void 0 === o) {
    o = 0.5;
  }
  cc.Tween.stopAllByTarget(t);
  cc.tween(t)
    .parallel(
      cc
        .tween()
        .to(o, {
          opacity: n,
        })
        .to(o, {
          opacity: i,
        })
        .union(),
      cc
        .tween()
        .to(o, {
          scale: e,
        })
        .to(o, {
          scale: 1,
        })
        .union(),
    )
    .union()
    .repeatForever()
    .start();
};
t.swingLRAnimDuration = function (e, n, i, o) {
  if (void 0 === o) {
    o = 0;
  }
  t.swingLRAnim(e, n, i, function () {
    cc.tween(e)
      .delay(o)
      .call(function () {
        t.swingLRAnimDuration(e, n, i, o);
      })
      .start();
  });
};
t.swingLRAnim = function (t, e, n, i) {
  if (void 0 === i) {
    i = null;
  }
  cc.Tween.stopAllByTarget(t);
  const o = t.x;
  const r = function (e, n) {
    if (e < 1 || n < 0.1) {
      cc.tween(t)
        .to(0.2, {
          x: o,
        })
        .call(function () {
          if (i) {
            i();
          }
        })
        .start();
    } else {
      const a = 0.3 * n;
      const s = 0.5 * e;
      const c = n - a;
      cc.tween(t)
        .to(
          a,
          {
            x: o - e,
          },
          {
            easing: "sineInOut",
          },
        )
        .to(
          a,
          {
            x: o + e,
          },
          {
            easing: "sineInOut",
          },
        )
        .call(function () {
          r(s, c);
        })
        .start();
    }
  };
  cc.tween(t)
    .to(
      0.25 * n,
      {
        x: e + o,
      },
      {
        easing: "sineOut",
      },
    )
    .call(function () {
      r(0.5 * e, 0.75 * n);
    })
    .start();
};
t.flyDropItemAnim = function (t, e, n, o) {
  const r = t.length;
  t.forEach(function (t, a) {
    cc.Tween.stopAllByTarget(t);
    const s = t.getPosition();
    const c = e;
    const l = s.add(
      cc.v2(
        $randomUtil.RandomUtil.randomInt(-300, 300),
        $randomUtil.RandomUtil.randomInt(0, -150),
      ),
    );
    cc.tween(t)
      .bezierTo(0.3 + a * $randomUtil.RandomUtil.random(0.01, 0.05), s, l, c)
      .call(function () {
        if (o) {
          o(t);
        }
        if (--r <= 0 && n) {
          n();
        }
      })
      .start();
  });
};
t.dropItemAnim = function (e, n, i, o, r, a) {
  if (void 0 === r) {
    r = 60;
  }
  const s = e.length;
  const c = t.getCirclePoints(i, o, s, r, 0.5);
  e.forEach(function (t, e) {
    const n = c[e];
    cc.Tween.stopAllByTarget(t);
    const i = Object.create(null);
    const o = !1;
    i.progress = function (t, e, n, i) {
      if (o) {
        n.x = e.x;
      } else {
        n.x = t.x + (e.x - t.x) * i;
        i > 0.8 && (o = !0);
      }
      n.y = t.y + (e.y - t.y) * i;
      return n;
    };
    i.easing = "bounceOut";
    cc.tween(t)
      .to(
        1.5,
        {
          position: n,
        },
        i,
      )
      .call(function () {
        if (--s <= 0 && a) {
          a();
        }
      })
      .start();
  });
};
t.swingAnim = function (t, e, n, i, o, r) {
  if (void 0 === r) {
    r = "";
  }
  cc.Tween.stopAllByTarget(t);
  cc.tween(t)
    .to(i / 2, {
      angle: e,
    })
    .to(
      i / 2,
      {
        angle: n,
      },
      {
        easing: r,
      },
    )
    .delay(o)
    .union()
    .repeatForever()
    .start();
};
t.rotateAnim = function (t, e) {
  cc.Tween.stopAllByTarget(t);
  cc.tween(t)
    .by(1, {
      angle: e,
    })
    .union()
    .repeatForever()
    .start();
};
t.breathAnim = function (t, e, n) {
  if (void 0 === e) {
    e = 1.2;
  }
  if (void 0 === n) {
    n = 0.5;
  }
  cc.Tween.stopAllByTarget(t);
  cc.tween(t)
    .to(
      n,
      {
        scale: e,
      },
      {
        easing: "sineIn",
      },
    )
    .to(
      n,
      {
        scale: 1,
      },
      {
        easing: "sineOut",
      },
    )
    .union()
    .repeatForever()
    .start();
};
t.getCirclePoints = function (t, e, n, i, o) {
  if (void 0 === i) {
    i = 60;
  }
  if (void 0 === o) {
    o = 1;
  }
  for (
    const r = [], a = (Math.PI / 180) * Math.round(360 / n), s = 0;
    s < n;
    s++
  ) {
    const c = Math.sin(a * s);
    const l = Math.cos(a * s);
    const u = e.x + t * c;
    const p = e.y + t * l * o;
    r.unshift(cc.v3(u + Math.random() * i, p + Math.random() * i, 0));
  }
  return r;
};
t.flyItemAnim = function (t, e, n, o, r, a, s) {
  if (void 0 === r) {
    r = 60;
  }
  const c = t.length;
  const l = this.getCirclePoints(e, cc.v3(n, n.y), c, r);
  t.forEach(function (t, e) {
    t.active = !1;
    const r = $randomUtil.RandomUtil.randomInt(0, l.length);
    const u = cc.v2(l[r].x, l[r].y);
    const p = Math.min(Math.abs(u.y - o.y) / 400, 1);
    p = Math.max(p, 0.5);
    const h = u.add(
      cc.v2(
        u.x >= n.x
          ? $randomUtil.RandomUtil.randomInt(0, 300)
          : $randomUtil.RandomUtil.randomInt(-300, 0),
        $randomUtil.RandomUtil.randomInt(0, 150),
      ),
    );
    cc.tween(t)
      .delay(0.01 * e)
      .call(function () {
        t.active = !0;
      })
      .to(0.05, {
        x: u.x,
        y: u.y,
      })
      .bezierTo(p, u, h, o)
      .call(function () {
        t.active = !1;
        if (s) {
          s();
        }
        if (e === c - 1 && a) {
          a();
        }
      })
      .start();
  });
};
t.shakeAnim = function (t, e, n, i) {
  if (void 0 === i) {
    i = 1;
  }
  cc.Tween.stopAllByTarget(t);
  const o = t.x;
  const r = t.y;
  cc.tween(t)
    .to(0.02, {
      x: o + 3 * i,
      y: r + 4 * i,
    })
    .to(0.02, {
      x: o - 3 * i,
      y: r + 4 * i,
    })
    .to(0.02, {
      x: o - 5 * i,
      y: r + 1 * i,
    })
    .to(0.02, {
      x: o + 1 * i,
      y: r - 3 * i,
    })
    .to(0.02, {
      x: o - 3 * i,
      y: r + 3 * i,
    })
    .to(0.02, {
      x: o + 1 * i,
      y: r - 4 * i,
    })
    .to(0.02, {
      x: o - 4 * i,
      y: r - 5 * i,
    })
    .to(0.02, {
      x: o + 1 * i,
      y: r + 5 * i,
    })
    .to(0.02, {
      x: o,
      y: r,
    })
    .union()
    .repeatForever()
    .start();
  const a = setTimeout(function () {
    clearTimeout(a);
    cc.Tween.stopAllByTarget(t);
    t.x = o;
    t.y = r;
    if (n) {
      n();
    }
  }, e);
};
t.floatAnim = function (t, e, n) {
  if (void 0 === e) {
    e = 1;
  }
  if (void 0 === n) {
    n = 25;
  }
  cc.Tween.stopAllByTarget(t);
  const i = t.y;
  cc.tween(t)
    .to(e, {
      y: i + n,
    })
    .to(e, {
      y: i,
    })
    .union()
    .repeatForever()
    .start();
};
function t() {}
const o = t;
exports.AnimUtil = o;
