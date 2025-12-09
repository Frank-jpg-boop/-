import $nodeUtil from './NodeUtil';
let i;
let a;
const c = cc._decorator;
const l = c.ccclass;
const u = c.property;
!(function (t) {
  t[(t.HORIZONTAL = 1)] = 'HORIZONTAL';
  t[(t.VERTICAL = 2)] = 'VERTICAL';
})(a || (a = {}));
e.prototype.getVerticalBaseHeight = function () {
  const t = 0;
  this.node.children.forEach(function (e) {
    t += e.height;
  });
  return t + this.spacing * (this.node.children.length - 1);
};
e.prototype.getHorizontalBaseWidth = function () {
  const t = 0;
  this.node.children.forEach(function (e) {
    t += e.width;
  });
  return t + this.spacing * (this.node.children.length - 1);
};
e.prototype.addNode = function (t, e) {
  for (
    const n = this,
      i = $nodeUtil.default.nodeParentChangeLocalPos(t, this.node),
      o = cc.v2(),
      r = this.node.childrenCount,
      c = 0;
    c < this.node.children.length;
    c++
  ) {
    const l = this.node.children[c];
    if (this.layoutType == a.HORIZONTAL) {
      if (l.x > i.x) {
        r = c;
        break;
      }
    } else if (this.layoutType == a.VERTICAL && l.y > i.y) {
      r = c;
      break;
    }
  }
  if (this.layoutType === a.HORIZONTAL) {
    const u = this.getHorizontalBaseWidth() + t.width + this.spacing;
    this.node.width = u;
    const p = -u / 2;
    this.node.children.forEach(function (e, i) {
      if (i == r) {
        const a = t.getAnchorPoint();
        o.x = p + a.x * t.width;
        p += t.width + n.spacing;
      }
      const s = e.getAnchorPoint();
      cc.tween(e)
        .to(0.2, {
          x: p + s.x * e.width,
        })
        .start();
      p += e.width + n.spacing;
    });
    if (r >= this.node.childrenCount) {
      const h = t.getAnchorPoint();
      o.x = p + h.x * t.width;
    }
  } else if (this.layoutType === a.VERTICAL) {
    const f = this.getVerticalBaseHeight() + t.height + this.spacing;
    this.node.height = f;
    const d = -f / 2;
    this.node.children.forEach(function (e, i) {
      if (i == r) {
        const a = t.getAnchorPoint();
        o.y = d + a.y * t.height;
        d += t.height + n.spacing;
      }
      const s = e.getAnchorPoint();
      cc.tween(e)
        .to(0.2, {
          y: d + s.y * e.height,
        })
        .start();
      d += e.height + n.spacing;
    });
    if (r >= this.node.childrenCount) {
      h = t.getAnchorPoint();
      o.y = d + h.x * t.height;
    }
  }
  const m = t.getPosition();
  const y = t.parent.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(o));
  const _ = cc.Vec2.distance(m, y) / 2e3;
  cc.tween(t)
    .to(_, {
      x: y.x,
      y: y.y,
    })
    .call(function () {
      t.parent = n.node;
      t.setSiblingIndex(r);
      t.setPosition(o.x, o.y);
      if (e) {
        e();
      }
    })
    .start();
};
e.prototype.updateLayout = function (t) {
  const e = this;
  if (void 0 === t) {
    t = 0;
  }
  if (this.layoutType === a.HORIZONTAL) {
    const n = this.getHorizontalBaseWidth();
    this.node.width = n;
    const i = -n / 2;
    this.node.children.forEach(function (n) {
      const o = n.getAnchorPoint();
      if (t > 0) {
        cc.tween(n)
          .to(t, {
            x: i + o.x * n.width,
          })
          .start();
      } else {
        n.x = i + o.x * n.width;
      }
      i += n.width + e.spacing;
    });
  } else if (this.layoutType === a.VERTICAL) {
    const o = this.getVerticalBaseHeight();
    this.node.height = o;
    const r = -o / 2;
    this.node.children.forEach(function (n) {
      const i = n.getAnchorPoint();
      if (t > 0) {
        cc.tween(n)
          .to(t, {
            y: r + i.y * n.height,
          })
          .start();
      } else {
        n.y = r + i.y * n.height;
      }
      r += n.height + e.spacing;
    });
  }
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.layoutType = a.HORIZONTAL;
  e.spacing = 0;
  return e;
}
export default p;
