import $audioUtil from './AudioUtil';
import $hollowOut from './HollowOut';
import $touchBlocker from './TouchBlocker';
import $componentBase from './ComponentBase';
import $animUtils from './AnimUtils';
import $nodeUtil from './NodeUtil';
let i;
const d = cc._decorator;
const m = d.ccclass;
const y = d.property;
e.prototype.onClickBtnClickTouch = function () {
  if (this._isTypewriter) {
    this._isTypewriter = !1;
    this.unscheduleAllCallbacks();
    this.lDialog.string = this._typewriterDesc;
    const t = this.nDialog.getChildByName("Down");
    t.active = !0;
    $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_Click");
    $animUtils.AnimUtil.floatAnim(t, 0.3, -5);
    if (this._descs.length <= 0) {
      this.nTouchLock.active = !1;
    }
  } else {
    if (this._descs.length > 0) {
      $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_Click");
      this.showDialog(this._descs.shift(), !1);
    }
  }
};
e.prototype.showDialog = function (t, e) {
  const n = this;
  if (void 0 === e) {
    e = !0;
  }
  this.lDialog.string = "";
  this.nDialog.active = !0;
  const i = this.nDialog.getChildByName("Down");
  const o = function () {
    const e = 0;
    const o = t.length;
    const r = "";
    if (o > 0) {
      n._isTypewriter = !0;
    }
    n.schedule(
      function () {
        r += t[e];
        e++;
        n.lDialog.string = r;
        if (e >= o) {
          n._isTypewriter = !1;
          i.active = !0;
          $animUtils.AnimUtil.floatAnim(i, 0.3, -5);
          if (n._descs.length <= 0) {
            n.nTouchLock.active = !1;
          }
        }
      },
      0.1,
      o - 1,
    );
  };
  this._typewriterDesc = t;
  if (e) {
    const r = null;
    if (this._data.dialogOffsetPos) {
      r = this._data.dialogOffsetPos;
    } else {
      r = cc.v2();
    }
    this.nDialog.y = r.y;
    this.nDialog.x = r.x - 1e3;
    i.y = -63;
    cc.tween(this.nDialog)
      .to(0.2, {
        x: r.x,
      })
      .call(function () {
        o();
      })
      .start();
  } else {
    o();
  }
  i.active = !1;
};
e.prototype.slideAt = function (t, e) {
  const n = $nodeUtil.default.nodeLocalPos(this.node, t);
  const i = $nodeUtil.default.nodeLocalPos(this.node, e);
  const o = cc.Vec2.distance(n, i) / 500;
  this.nFinger.setPosition(n);
  const r = cc
    .tween()
    .to(0, {
      x: n.x,
      y: n.y,
    })
    .to(o, {
      x: i.x,
      y: i.y,
    })
    .delay(1);
  cc.tween(this.nFinger).repeatForever(r).start();
};
e.prototype.fingerAt = function (t, e) {
  cc.Tween.stopAllByTarget(this.nFinger);
  const n = $nodeUtil.default.nodeParentChangeLocalPos(t, this.node);
  if (e) {
    n.addSelf(e);
  }
  this.nFinger.setPosition(n);
};
e.prototype.lookAt = function (t, e, n, i, o) {};
e.prototype.initView = function () {
  const t = this;
  this.nDialog.active = !1;
  this.lookAt(
    this._data.target,
    1 == this._data.cfg.force,
    1 == this._data.cfg.forcedClick,
    this._data.onClickTarget,
    this._data.eventCaller,
  ).then(function () {
    if ("" != t._data.cfg.text) {
      t._descs = t._data.cfg.text.split("|next|");
      t.showDialog(t._descs.shift());
    } else {
      t.nTouchLock.active = !1;
    }
    if (t._data.target) {
      t.nFinger.active = t._data.showFinger;
      t.nFinger.active &&
        (t._data.isSlide
          ? t.slideAt(t._data.slideStartWorldPos, t._data.slideEndWorldPos)
          : t.fingerAt(t._data.target, t._data.fingerOffsetPos));
    } else {
      t.nFinger.active = !1;
    }
  });
};
e.prototype.close = function () {
  this.node.active = !1;
};
e.prototype.open = function (t) {
  const e = this;
  this._data = t;
  this.blocker.node.active = !0;
  this.nTouchLock.active = !0;
  this.nFinger.active = !1;
  this._isTypewriter = !1;
  this.unscheduleAllCallbacks();
  const n = null;
  if (t.delay) {
    n = t.delay;
  } else {
    n = 0;
  }
  this.scheduleOnce(function () {
    let t;
    e.node.active = !0;
    if (null === (t = e.node.getComponent(cc.Widget)) || void 0 === t) {
      //
    } else {
      t.updateAlignment();
    }
    e.initView();
  }, n);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.hollowOut = null;
  e.blocker = null;
  e.nFinger = null;
  e.nDialog = null;
  e.lDialog = null;
  e.nTouchLock = null;
  e._isTypewriter = !1;
  e._typewriterDesc = "";
  e._descs = [];
  e._data = null;
  return e;
}
exports.default = _;
