import $popupManager from './PopupManager';
import $eventManager from './EventManager';
import $appProxy from './AppProxy';
import $componentBase from './ComponentBase';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
let i;
export const PopupBase = exports.AnimType = void 0;;
let c;
const m = cc._decorator;
const y = m.ccclass;
const _ = m.property;
export const AnimType = {
  NONE: 0,
  SCALE: 1,
  FADE: 2,
  CUSTOM: 3,
  SCALE_EASING: 4,
  ANIMATION_CLIP: 5
};
let c = AnimType;
e.prototype.updateAlignment = function () {
  if (this.align) {
    //
  } else {
    this.node.getComponentsInChildren(cc.Widget).forEach(function (t) {
      t.updateAlignment();
    });
  }
};
e.prototype.removeUI = function (t, e) {
  if (void 0 === t) {
    t = $popupManager.PopupCacheMode.ONCE;
  }
  if (void 0 === e) {
    e = !0;
  }
  $popupManager.PopupManager.instance.remove(this.popupName, t, !0, e);
};
e.prototype.onHide = function () {};
e.prototype.onShow = function () {};
e.prototype.init = function () {};
e.prototype.onHideAnim = function () {
  const t = this;
  cc.Tween.stopAllByTarget(this.node);
  if (this._bgNode) {
    cc.tween(this._bgNode)
      .to(this.closeTime, {
        opacity: 0,
      })
      .start();
  }
  if (this.useCloseAnimChip && this.closeAnimChip) {
    const e = this.node.getComponent(cc.Animation);
    if (e) {
      return new Promise(function (n) {
        e.once(
          cc.Animation.EventType.FINISHED,
          function () {
            n();
          },
          t,
        );
        e.play(t.closeAnimChip.name);
      });
    }
  }
  const n = Object.create(null);
  if (c.SCALE === this.animType) {
    n.scale = 0.5;
  } else {
    if (c.FADE === this.animType) {
      n.opacity = 0;
    }
  }
  if (null != this._closePosition) {
    n.position = this._closePosition;
  }
  return new Promise(function (e) {
    if (c.FADE != t.animType) {
      cc.tween(t.node)
        .to(
          t.closeTime,
          {
            scale: 0.5,
          },
          {
            onUpdate: function (e) {
              if (t._bgNode) {
                t._bgNode.scale = 1 / e.scale;
              }
            },
          },
        )
        .call(function () {
          e();
        })
        .start();
    } else {
      cc.tween(t.node)
        .to(t.closeTime, {
          opacity: 0,
        })
        .call(function () {
          e();
        })
        .start();
    }
  });
};
e.prototype._hide = function (t) {
  const e = this;
  if (void 0 === t) {
    t = !0;
  }
  $eventManager.EventManager.instance.emit($appProxy.AppEvent.POPUP_HIDE, this._popupName);
  return this.hideAnim && t
    ? new Promise(function (t) {
        e.onHideAnim()
          .then(function () {
            e.onHide();
            e.node.active = !1;
            t();
          })
          .catch();
      })
    : (this.onHide(), (this.node.active = !1), Promise.resolve());
};
e.prototype._fadeAnim = function () {
  const t = this;
  this.node.opacity = 0;
  return new Promise(function (e) {
    cc.tween(t.node)
      .to(0.25, {
        opacity: 255,
      })
      .call(function () {
        e(!0);
      })
      .start();
  });
};
e.prototype._scaleAnim = function () {
  const t = this;
  this.node.scale = 0;
  return new Promise(function (e) {
    cc.tween(t.node)
      .to(
        0.25,
        {
          scale: 1,
        },
        {
          easing: 'backOut',
          onUpdate: function (e) {
            if (t._bgNode) {
              t._bgNode.scale = 1 / e.scale;
            }
          },
        },
      )
      .call(function () {
        e(!0);
      })
      .start();
  });
};
e.prototype._scaleEasingAnim = function () {
  const t = this;
  this.node.scale = 0;
  return new Promise(function (e) {
    cc.tween(t.node)
      .to(
        0.35,
        {
          scale: 1,
        },
        {
          easing: 'backOut',
        },
      )
      .call(function () {
        e(!0);
      })
      .start();
  });
};
e.prototype.animationClipShowAnim = function () {};
e.prototype.customShowAnim = function () {};
e.prototype._show = function () {};
e.prototype._init = function (t, e, n) {
  this._popupName = t;
  this._closePosition = e;
  this.nWidgerts.forEach(function (t) {
    if (t) {
      const e = t.getComponent(cc.Widget);
      if (e) {
        e.enabled = !1;
      }
    }
  });
  this.init(n);
};
e.prototype.onLoad = function () {
  const e = this;
  t.prototype.onLoad.call(this);
  const n = cc.view.getVisibleSize();
  if (this.transBack) {
    this._bgNode = new cc.Node('BgNode');
    const i = this._bgNode.addComponent(cc.Sprite);
    $resLoader.ResLoader.loadAsset({
      path: 'textures/transback',
      type: cc.SpriteFrame,
      bundleName: $frameEnum.Frame.EBundleName.RES,
    })
      .then(function (t) {
        i.spriteFrame = t;
        e._bgNode.color = new cc.Color(e.bgColor.r, e.bgColor.g, e.bgColor.b);
        e._bgNode.setContentSize(n.width, n.height);
      })
      .catch(function () {});
    i.type = cc.Sprite.Type.SLICED;
    i.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    this.node.addChild(this._bgNode, -1);
    this._bgNode.opacity = 0;
    cc.tween(this._bgNode)
      .to(0.25, {
        opacity: this.bgColor.a,
      })
      .start();
  }
  if (this.blockInput) {
    this.node.setContentSize(n);
    this.node.addComponent(cc.BlockInputEvents);
  }
};
Object.defineProperty(e.prototype, 'popupName', {
  get: function () {
    return this._popupName;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, 'fullScreen', {
  get: function () {
    return this._fullScreen;
  },
  set: function (t) {
    this._fullScreen = t;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.transBack = !0;
  e.blockInput = !0;
  e.bgColor = cc.color(0, 0, 0, 200);
  e.anim = !0;
  e.hideAnim = !0;
  e.animType = c.SCALE;
  e.useCloseAnimChip = !1;
  e.closeAnimChip = null;
  e.closeTime = 0.1;
  e._fullScreen = !1;
  e._popupName = '';
  e.nWidgerts = [];
  e.bannerPosition = null;
  e.nativePosition = null;
  e.align = !1;
  e._bgNode = null;
  e._closePosition = null;
  e._isShow = !1;
  e._showComplete = !1;
  return e;
}
export const PopupBase = g;;
