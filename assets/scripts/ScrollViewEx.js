let i;
let a;
const s = cc._decorator;
const c = s.ccclass;
const l = s.property;
const u = s.menu;
const p = s.requireComponent;
const h = s.disallowMultiple;
!(function (t) {
  t[(t.ONE = 1)] = 'ONE';
  t[(t.TWO = 2)] = 'TWO';
  t[(t.MORE = 3)] = 'MORE';
})(a || (a = {}));
e.prototype.checkCollision = function (t) {
  const e = this.getBoundingBoxToWorld(this.node.getComponent(cc.ScrollView).content.parent);
  const n = this.getBoundingBoxToWorld(t);
  return e.intersects(n);
};
e.prototype.getBoundingBoxToWorld = function (t) {
  const e = t._contentSize.width;
  const n = t._contentSize.height;
  const i = cc.rect(-t._anchorPoint.x * e, -t._anchorPoint.y * n, e, n);
  t._calculWorldMatrix();
  i.transformMat4(i, t._worldMatrix);
  return i;
};
e.prototype.onEventUpdateOpacity = function () {
  this.updateOpacity();
};
e.prototype.updateOpacity = function () {
  const t = this;
  this._scrollView.getComponentsInChildren(cc.Layout).forEach(function (t) {
    t.updateLayout();
  });
  for (
    const e = this.childLayerType == a.MORE ? this.childLayerNum : this.childLayerType,
      n = [],
      i = [this._scrollView.content];
    e > 0;
  ) {
    n = [];
    i.forEach(function (t) {
      n.push.apply(n, t.children);
    });
    i = n.slice();
    e--;
  }
  n.forEach(function (e) {
    if (t.checkCollision(e)) {
      e.opacity = 255;
    } else {
      e.opacity = 0;
    }
  });
};
e.prototype.onDisable = function () {
  this.node.off('scrolling', this.onEventUpdateOpacity, this);
  this._scrollView.content.off(cc.Node.EventType.CHILD_REMOVED, this.onEventUpdateOpacity, this);
  this._scrollView.content.off(cc.Node.EventType.CHILD_ADDED, this.onEventUpdateOpacity, this);
  this._scrollView.content.off(cc.Node.EventType.CHILD_REORDER, this.onEventUpdateOpacity, this);
};
e.prototype.onEnable = function () {
  this.node.on('scrolling', this.onEventUpdateOpacity, this);
  this._scrollView.content.on(cc.Node.EventType.CHILD_REMOVED, this.onEventUpdateOpacity, this);
  this._scrollView.content.on(cc.Node.EventType.CHILD_ADDED, this.onEventUpdateOpacity, this);
  this._scrollView.content.on(cc.Node.EventType.CHILD_REORDER, this.onEventUpdateOpacity, this);
};
e.prototype.onLoad = function () {
  this._scrollView = this.node.getComponent(cc.ScrollView);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.childLayerType = a.ONE;
  e.childLayerNum = 3;
  e._scrollView = null;
  return e;
}
export default f;
