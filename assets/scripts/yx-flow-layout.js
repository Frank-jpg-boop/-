import $yx_collection_view from './yx-collection-view';
let i;
export const YXFlowLayout = void 0;
const a = cc._decorator;
const s =
  (a.ccclass,
  a.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e.pagingEnabled = !1;
      e.extraVisibleCount = 0;
      e.itemSize = new cc.Size(100, 100);
      e.verticalSpacing = 0;
      e.horizontalSpacing = 0;
      e.sectionInset = $yx_collection_view.YXEdgeInsets.ZERO;
      return e;
    }
    e.prototype.getItemSize = function () {
      if (this.itemSize instanceof Function == 0) {
        return this.itemSize;
      }
      throw new Error(
        'YXFlowLayout: 动态配置的布局参数不支持直接获取，请检查自己的布局逻辑并谨慎的通过动态配置自己获取，注意避免死循环',
      );
    };
    e.prototype.getVerticalSpacing = function () {
      if (this.verticalSpacing instanceof Function == 0) {
        return this.verticalSpacing;
      }
      throw new Error(
        'YXFlowLayout: 动态配置的布局参数不支持直接获取，请检查自己的布局逻辑并谨慎的通过动态配置自己获取，注意避免死循环',
      );
    };
    e.prototype.getHorizontalSpacing = function () {
      if (this.horizontalSpacing instanceof Function == 0) {
        return this.horizontalSpacing;
      }
      throw new Error(
        'YXFlowLayout: 动态配置的布局参数不支持直接获取，请检查自己的布局逻辑并谨慎的通过动态配置自己获取，注意避免死循环',
      );
    };
    e.prototype.getSectionInset = function () {
      if (this.sectionInset instanceof Function == 0) {
        return this.sectionInset;
      }
      throw new Error(
        'YXFlowLayout: 动态配置的布局参数不支持直接获取，请检查自己的布局逻辑并谨慎的通过动态配置自己获取，注意避免死循环',
      );
    };
    e.prototype.prepare = function (t) {
      if (t.scrollDirection != $yx_collection_view.YXCollectionView.ScrollDirection.HORIZONTAL) {
        if (t.scrollDirection != $yx_collection_view.YXCollectionView.ScrollDirection.VERTICAL) {
          //
        } else {
          this._vertical(t);
        }
      } else {
        this._horizontal(t);
      }
    };
    e.prototype.initOffset = function (t) {
      if (t.scrollDirection != $yx_collection_view.YXCollectionView.ScrollDirection.HORIZONTAL) {
        if (t.scrollDirection != $yx_collection_view.YXCollectionView.ScrollDirection.VERTICAL) {
          //
        } else {
          t.scrollView.scrollToTop(0);
        }
      } else {
        t.scrollView.scrollToLeft(0);
      }
    };
    e.prototype.targetOffset = function (t, e, n) {
      if (0 == this.pagingEnabled) {
        return null;
      }
      const i = t.scrollView.getScrollOffset();
      i.x = -i.x;
      if (t.scrollDirection == $yx_collection_view.YXCollectionView.ScrollDirection.HORIZONTAL) {
        const o = Math.round(i.x / t.scrollView.node.width);
        const a = e.x / t.scrollView.node.width;
        if (n && Math.abs(a) >= 0.2) {
          o = Math.round(n.x / t.scrollView.node.width) + (a > 0 ? -1 : 1);
        }
        i.x = o * t.scrollView.node.width;
      }
      if (t.scrollDirection == $yx_collection_view.YXCollectionView.ScrollDirection.VERTICAL) {
        o = Math.round(i.y / t.scrollView.node.height);
        a = e.y / t.scrollView.node.height;
        if (n && Math.abs(a) >= 0.2) {
          o = Math.round(n.y / t.scrollView.node.height) + (a > 0 ? 1 : -1);
        }
        i.y = o * t.scrollView.node.height;
      }
      return {
        offset: i,
        time: 0.25,
      };
    };
    e.prototype.layoutAttributesForElementsInRect = function (e, n) {
      if (this.extraVisibleCount < 0) {
        return t.prototype.layoutAttributesForElementsInRect.call(this, e, n);
      }
      for (const i = -1, o = 0, r = this.attributes.length - 1; o <= r && r >= 0; ) {
        const a = o + (r - o) / 2;
        a = Math.floor(a);
        const s = this.attributes[a];
        if (e.intersects(s.frame)) {
          i = a;
          break;
        }
        if (e.yMax < s.frame.yMin || e.xMax < s.frame.xMin) {
          r = a - 1;
        } else {
          o = a + 1;
        }
      }
      if (i < 0) {
        return t.prototype.layoutAttributesForElementsInRect.call(this, e, n);
      }
      const c = [];
      c.push(this.attributes[i]);
      for (const l = i; l > 0; ) {
        const u = l - 1;
        s = this.attributes[u];
        if (0 == e.intersects(s.frame)) {
          break;
        }
        c.push(s);
        l = u;
      }
      for (const p = this.extraVisibleCount; p > 0 && !((u = l - 1) < 0); ) {
        s = this.attributes[u];
        e.intersects(s.frame) && c.push(s);
        l = u;
        p--;
      }
      for (
        const h = i;
        h < this.attributes.length - 1 &&
        ((u = h + 1), (s = this.attributes[u]), 0 != e.intersects(s.frame));
      ) {
        c.push(s);
        h = u;
      }
      for (const f = this.extraVisibleCount; f > 0 && !((u = h + 1) >= this.attributes.length); ) {
        s = this.attributes[u];
        e.intersects(s.frame) && c.push(s);
        h = u;
        f--;
      }
      return c;
    };
    e.prototype.layoutAttributesForItemAtIndexPath = function (e, n) {
      for (const i = 0, o = this.attributes.length - 1; i <= o && o >= 0; ) {
        const r = i + (o - i) / 2;
        r = Math.floor(r);
        const a = this.attributes[r];
        if (a.indexPath.equals(e)) {
          return a;
        }
        if (
          a.indexPath.section < e.section ||
          (a.indexPath.section == e.section && a.indexPath.item < e.item)
        ) {
          i = r + 1;
        } else {
          o = r - 1;
        }
      }
      return t.prototype.layoutAttributesForItemAtIndexPath.call(this, e, n);
    };
    e.prototype._horizontal = function (t) {
      t.scrollView.horizontal = !0;
      t.scrollView.vertical = !1;
      for (
        const e = t.node.getContentSize().clone(),
          n = [],
          i = t.numberOfSections instanceof Function ? t.numberOfSections(t) : t.numberOfSections,
          o = 0,
          a = 0;
        a < i;
        a++
      ) {
        const s = null;
        if (t.numberOfItems instanceof Function) {
          s = t.numberOfItems(a, t);
        } else {
          s = t.numberOfItems;
        }
        const l = null;
        if (this.verticalSpacing instanceof Function) {
          l = this.verticalSpacing(a, this, t);
        } else {
          l = this.verticalSpacing;
        }
        const u = null;
        if (this.horizontalSpacing instanceof Function) {
          u = this.horizontalSpacing(a, this, t);
        } else {
          u = this.horizontalSpacing;
        }
        const p = null;
        if (this.sectionInset instanceof Function) {
          p = this.sectionInset(a, this, t);
        } else {
          p = this.sectionInset;
        }
        o += p.left;
        const h = new c();
        h.verticalSpacing = l;
        h.horizontalSpacing = u;
        h.sectionInset = p;
        h.offset = o;
        h.attrs = [];
        h.containerWidth = 0;
        h.containerHeight = e.height;
        for (const f = 0; f < s; f++) {
          const d = new $yx_collection_view.YXIndexPath(a, f);
          const m = null;
          if (this.itemSize instanceof Function) {
            m = this.itemSize(d, this, t);
          } else {
            m = this.itemSize;
          }
          const y = h.layout_horizontal_item(d, m);
          if (null == y) {
            h.offset = h.offset + h.containerWidth + u;
            h.containerWidth = 0;
            h.attrs = [];
            y = h.layout_horizontal_item(d, m);
          }
          if (y) {
            n.push(y);
          }
          o = Math.max(o, h.offset + h.containerWidth);
        }
        o += p.right;
      }
      this.attributes = n;
      e.width = Math.max(e.width, o);
      this.contentSize = e;
    };
    e.prototype._vertical = function (t) {
      t.scrollView.horizontal = !1;
      t.scrollView.vertical = !0;
      for (
        const e = t.node.getContentSize().clone(),
          n = [],
          i = t.numberOfSections instanceof Function ? t.numberOfSections(t) : t.numberOfSections,
          o = 0,
          a = 0;
        a < i;
        a++
      ) {
        const s = null;
        if (t.numberOfItems instanceof Function) {
          s = t.numberOfItems(a, t);
        } else {
          s = t.numberOfItems;
        }
        const l = null;
        if (this.verticalSpacing instanceof Function) {
          l = this.verticalSpacing(a, this, t);
        } else {
          l = this.verticalSpacing;
        }
        const u = null;
        if (this.horizontalSpacing instanceof Function) {
          u = this.horizontalSpacing(a, this, t);
        } else {
          u = this.horizontalSpacing;
        }
        const p = null;
        if (this.sectionInset instanceof Function) {
          p = this.sectionInset(a, this, t);
        } else {
          p = this.sectionInset;
        }
        o += p.top;
        const h = new c();
        h.verticalSpacing = l;
        h.horizontalSpacing = u;
        h.sectionInset = p;
        h.offset = o;
        h.attrs = [];
        h.containerWidth = e.width;
        h.containerHeight = 0;
        for (const f = 0; f < s; f++) {
          const d = new $yx_collection_view.YXIndexPath(a, f);
          const m = null;
          if (this.itemSize instanceof Function) {
            m = this.itemSize(d, this, t);
          } else {
            m = this.itemSize;
          }
          const y = h.layout_vertical_item(d, m);
          if (null == y) {
            h.offset = h.offset + h.containerHeight + l;
            h.containerHeight = 0;
            h.attrs = [];
            y = h.layout_vertical_item(d, m);
          }
          if (y) {
            n.push(y);
          }
          o = Math.max(o, h.offset + h.containerHeight);
        }
        o += p.bottom;
      }
      this.attributes = n;
      e.height = Math.max(e.height, o);
      this.contentSize = e;
    };
    return e;
  })($yx_collection_view.YXLayout));
export const YXFlowLayout = s;
t.prototype.layout_horizontal_item = function (t, e) {
  if (this.attrs.length <= 0) {
    (a = new $yx_collection_view.YXLayoutAttributes()).indexPath = t;
    a.frame = new cc.Rect(this.offset, this.sectionInset.top, e.width, e.height);
    this.attrs.push(a);
    this.containerWidth = Math.max(this.containerWidth, a.frame.width);
    return a;
  }
  const n = new cc.Rect();
  n.size = e;
  for (const i = 0; i < this.attrs.length; i++) {
    const o = this.attrs[i];
    n.x = o.frame.x;
    n.y = o.frame.yMax + this.verticalSpacing;
    if (n.yMax <= this.containerHeight - this.sectionInset.bottom && 0 == this.intersects(n)) {
      (a = new $yx_collection_view.YXLayoutAttributes()).indexPath = t;
      a.frame = n;
      this.attrs.push(a);
      this.containerWidth = Math.max(this.containerWidth, a.frame.xMax - this.offset);
      return a;
    }
  }
  for (i = 0; i < this.attrs.length; i++) {
    let a;
    o = this.attrs[i];
    n.x = o.frame.xMax + this.horizontalSpacing;
    n.y = o.frame.y;
    if (n.xMax <= this.offset + this.containerWidth && 0 == this.intersects(n)) {
      (a = new $yx_collection_view.YXLayoutAttributes()).indexPath = t;
      a.frame = n;
      this.attrs.push(a);
      this.containerWidth = Math.max(this.containerWidth, a.frame.width);
      return a;
    }
  }
  return null;
};
t.prototype.layout_vertical_item = function (t, e) {
  if (this.attrs.length <= 0) {
    (a = new $yx_collection_view.YXLayoutAttributes()).indexPath = t;
    a.frame = new cc.Rect(this.sectionInset.left, this.offset, e.width, e.height);
    this.attrs.push(a);
    this.containerHeight = Math.max(this.containerHeight, a.frame.height);
    return a;
  }
  const n = new cc.Rect();
  n.size = e;
  for (const i = 0; i < this.attrs.length; i++) {
    const o = this.attrs[i];
    n.x = o.frame.xMax + this.horizontalSpacing;
    n.y = o.frame.y;
    if (n.xMax <= this.containerWidth - this.sectionInset.right && 0 == this.intersects(n)) {
      (a = new $yx_collection_view.YXLayoutAttributes()).indexPath = t;
      a.frame = n;
      this.attrs.push(a);
      this.containerHeight = Math.max(this.containerHeight, a.frame.yMax - this.offset);
      return a;
    }
  }
  for (i = 0; i < this.attrs.length; i++) {
    let a;
    o = this.attrs[i];
    n.x = o.frame.x;
    n.y = o.frame.yMax + this.verticalSpacing;
    if (n.yMax <= this.offset + this.containerHeight && 0 == this.intersects(n)) {
      (a = new $yx_collection_view.YXLayoutAttributes()).indexPath = t;
      a.frame = n;
      this.attrs.push(a);
      this.containerHeight = Math.max(this.containerHeight, a.frame.height);
      return a;
    }
  }
  return null;
};
t.prototype.intersects = function (t) {
  for (const e = 0; e < this.attrs.length; e++) {
    const n = this.attrs[e];
    const i = new cc.Rect();
    n.frame.intersection(i, t);
    if (i.width * i.height > 0) {
      return !0;
    }
  }
  return !1;
};
function t() {
  this.attrs = [];
}
const c = t;
