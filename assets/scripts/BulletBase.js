import $nodePoolManager from './NodePoolManager';
import $mathUtil from './MathUtil';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $battleMgr from './BattleMgr';
let i;
const p = cc._decorator;
const h = p.ccclass;
const f = p.property;
e.prototype.onRemove = function () {};
e.prototype.resume = function () {
  this.node.resumeAllActions();
};
e.prototype.pause = function () {
  this.node.pauseAllActions();
};
e.prototype.remove = function () {
  const t = this;
  if (this._isRemove) {
    //
  } else {
    this._isRemove = !0;
    this.node.active = !1;
    this.onRemove();
    this._owner = null;
    this.unscheduleAllCallbacks();
    this.scheduleOnce(function () {
      $nodePoolManager.default.instance.putNode(t.node, !0);
    });
  }
};
e.prototype.onUpdate = function () {};
e.prototype.update = function (t) {
  if (
    this._isShoot &&
    !this._isRemove &&
    $battleMgr.default.instance.getCurScene().isPlay &&
    this._owner &&
    !this._owner.isDead()
  ) {
    this.onUpdate(t);
  }
};
e.prototype.tweenTo = function (t, e, n, i, o, r, a) {
  const c = this;
  if (void 0 === r) {
    r = "";
  }
  if (void 0 === a) {
    a = !0;
  }
  cc.Tween.stopAllByTarget(this.node);
  if (e.fuzzyEquals(t, 5)) {
    if (o) {
      o();
    }
    return void (a && this.remove());
  }
  if (i) {
    const l = e.sub(t).normalizeSelf();
    this.node.angle = $mathUtil.MathUtil.radians2Angle(
      cc.Vec2.RIGHT.signAngle(l),
    );
  }
  const p = {};
  if ("" != r) {
    p.easing = r;
  }
  n /= $battleMgr.default.instance.gameSpeed;
  cc.tween(this.node)
    .to(
      n,
      {
        x: e.x,
        y: e.y,
      },
      p,
    )
    .call(function () {
      if (o) {
        o();
      }
      if (a) {
        c.remove();
      }
    })
    .start();
};
e.prototype.bezierTo = function (t, e, n, i, o, r, a, c, l) {
  const p = this;
  if (void 0 === a) {
    a = "";
  }
  if (void 0 === c) {
    c = null;
  }
  if (void 0 === l) {
    l = !0;
  }
  cc.Tween.stopAllByTarget(this.node);
  i /= $battleMgr.default.instance.gameSpeed;
  $mathUtil.MathUtil.bezierTo(
    this.node,
    i,
    t,
    e,
    n,
    function (t, e) {
      if (o) {
        const n = t.x - p.node.x;
        const i = t.y - p.node.y;
        const r = cc.v2(n, i).normalizeSelf();
        if (0 == r.x && 0 == r.y) {
          return;
        }
        p.node.angle = $mathUtil.MathUtil.radians2Angle(
          cc.Vec2.RIGHT_R.signAngle(r),
        );
      }
      if (c) {
        c(t, e);
      }
    },
    a,
  )
    .call(function () {
      if (r) {
        r();
      }
      if (l) {
        p.remove();
      }
    })
    .start();
};
e.prototype.onShoot = function () {
  for (const t = [], e = 0; e < arguments.length; e++) {
    t[e] = arguments[e];
  }
};
e.prototype.shoot = function (t) {
  for (const e = [], n = 1; n < arguments.length; n++) {
    e[n - 1] = arguments[n];
  }
  const i = $battleMgr.default.instance.getCurScene();
  if (i && !i.isResult) {
    this._owner = t;
    if (t.isDead()) {
      this.remove();
    } else {
      ((this._isRemove = !1),
        this.onShoot.apply(this, e),
        (this._isShoot = !0),
        (this.node.active = !0));
    }
  } else {
    this.remove();
  }
};
e.prototype.onInit = function () {};
e.prototype.init = function (t) {
  const e = this;
  if (void 0 === t) {
    t = "";
  }
  this._iconPath = t;
  if ("" != t && this.spIcon) {
    $resLoader.ResLoader.loadAsset({
      bundleName: $frameEnum.Frame.EBundleName.GAME,
      path: t,
      type: cc.SpriteFrame,
    }).then(function (t) {
      e.spIcon.spriteFrame = t;
    });
  }
  this.node.active = !1;
  this.delayShowTime = 0.05;
  this.node.angle = 0;
  this.node.scale = 1;
  this.onInit();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.spIcon = null;
  e._owner = null;
  e._iconPath = "";
  e._isShoot = !1;
  e._isRemove = !1;
  e.delayShowTime = 0;
  return e;
}
exports.default = d;
