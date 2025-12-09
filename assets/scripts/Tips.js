import $componentBase from './ComponentBase';
import $queue from './Queue';
let i;
const c = cc._decorator;
const l = c.ccclass;
const u = c.property;
e.prototype.openAnim = function (t) {
  const e = this;
  const n = this;
  t.scale = 1.5;
  t.opacity = 255;
  t.active = !0;
  cc.tween(t)
    .to(
      0.4,
      {
        scale: 1,
      },
      {
        easing: "circOut",
      },
    )
    .delay(this._duration)
    .to(0.3, {
      scale: 0.2,
      opacity: 0,
    })
    .call(function () {
      const t = n.queue.dequeue();
      t.active = !1;
      e.itemPool.put(t);
    })
    .start();
};
e.prototype.pushTips = function (t, e) {
  if (void 0 === e) {
    e = 1;
  }
  const n = this;
  this._duration = e;
  if (n.queue) {
    //
  } else {
    n.queue = new $queue.default();
  }
  if (!(n.queue.size() > 5)) {
    n.node.zIndex = cc.macro.MAX_ZINDEX;
    const i = null;
    if (this.itemPool.size() <= 0) {
      i = cc.instantiate(n.nTipsItem);
    } else {
      i = this.itemPool.get();
    }
    n.nView.addChild(i);
    i.active = !0;
    const o = i.getChildByName("Desc").getComponent(cc.RichText);
    const r = i.getChildByName("Bg");
    if (o) {
      o.string =
        "<b><outline color = #000000 width = 2>" + t + "</outline></b>";
      this.scheduleOnce(function () {
        r.width = (o.node.width + 80) * o.node.scaleX;
        n.queue.enqueue(i);
        n.openAnim(i);
      }, 0.02);
    }
  }
};
e.prototype.onLoad = function () {
  this.queue = new $queue.default();
  this.itemPool = new cc.NodePool();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nView = null;
  e.nTipsItem = null;
  e.queue = new $queue.default();
  e.itemPool = null;
  e._duration = 0;
  return e;
}
exports.default = p;
