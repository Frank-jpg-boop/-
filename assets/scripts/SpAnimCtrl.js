let i;
const a = cc._decorator;
const s = a.ccclass;
const c = a.property;
const l = a.menu;
sp.SkeletonData.prototype.isTexturesLoaded = function () {
  for (const t = this.textures, e = t ? t.length : 0, n = 0; n < e; n++) {
    if (!t[n].loaded) {
      return !1;
    }
  }
  return !0;
};
e.prototype.clearTracks = function () {
  if (this.spAnim.isAnimationCached()) {
    //
  } else {
    this.spAnim.clearTracks();
  }
};
e.prototype.destroySomeNodes = function (t) {
  this.spAnim.attachUtil.destroyAttachedNodes(t);
};
e.prototype.generateSomeNodes = function (t, e) {
  const n = this.spAnim.attachUtil.generateAttachedNodes(t)[0];
  if (e) {
    return (
      e instanceof cc.Prefab
        ? n.addChild(cc.instantiate(e))
        : e.parent
          ? (e.parent = n)
          : n.addChild(e),
      n
    );
  } else {
    return n;
  }
};
e.prototype.releaseRes = function () {};
e.prototype.clearAnim = function () {
  this._onceOnComplete = null;
  this.clearTracks();
};
e.prototype.onCompleteEvent = function (t) {
  if (this._onceOnComplete) {
    this._onceOnComplete(t);
  }
  this._onceOnComplete = null;
  this._onceFremeEvent = null;
  this.animCompleteListener.forEach(function (e, n) {
    e.call(n, t);
  });
};
e.prototype.onFrameEvent = function (t, e) {
  const n = this;
  if (this._onceFremeEvent) {
    this._onceFremeEvent.call(this, t.animation.name, e.data.name, this);
  }
  this.animFrameEventListener.forEach(function (i, o) {
    i.call(o, t.animation.name, e.data.name, n);
  });
};
e.prototype.unregisterComplete = function (t) {
  this.animCompleteListener.delete(t);
};
e.prototype.registerComplete = function (t, e) {
  this.animCompleteListener.set(e, t);
};
e.prototype.unregisterFrameEvent = function (t) {
  this.animFrameEventListener.delete(t);
};
e.prototype.registerFrameEvent = function (t, e) {
  this.animFrameEventListener.set(e, t);
};
e.prototype.getCurAnimTime = function () {
  if (!this.spAnim.isAnimationCached()) {
    const t = this.spAnim.getCurrent(0);
    if (t) {
      return t.animationEnd;
    }
  }
  return 0;
};
e.prototype.playAnimFixSpeed = function (t, e, n, i) {
  if (void 0 === e) {
    e = 1;
  }
  if (void 0 === n) {
    n = !1;
  }
  if (!this.spAnim) {
    return null;
  }
  if (t) {
    //
  } else {
    t = this.spAnim.defaultAnimation;
  }
  if (!this.spAnim.isAnimationCached()) {
    const o = this.spAnim.getCurrent(0);
    if (o && o.animation.name == t) {
      return null;
    }
    this.spAnim.clearTrack(0);
  }
  this.spAnim.setToSetupPose();
  this.spAnim.timeScale = e;
  this._onceOnComplete = i;
  return this.spAnim.setAnimation(0, t, n);
};
e.prototype.playAnim = function (t, e, n, i, o) {
  if (void 0 === e) {
    e = 1;
  }
  if (void 0 === n) {
    n = !1;
  }
  if (!this.spAnim) {
    return null;
  }
  if (this.node.active) {
    if (t) {
      //
    } else {
      t = this.spAnim.defaultAnimation;
    }
    if (!this.spAnim.isAnimationCached()) {
      const r = this.spAnim.getCurrent(0);
      if (r && r.animation.name == t) {
        return null;
      }
      this.spAnim.clearTrack(0);
    }
    this.spAnim.setToSetupPose();
    this.spAnim.timeScale = e;
    this._onceOnComplete = i;
    this._onceFremeEvent = o;
    return this.spAnim.setAnimation(0, t, n);
  }
};
e.prototype.playAnimWithFrame = function (t, e, n, i, o) {
  if (void 0 === e) {
    e = !1;
  }
  if (void 0 === n) {
    n = 0;
  }
  if (void 0 === i) {
    i = Number.MAX_SAFE_INTEGER;
  }
  if (void 0 === o) {
    o = 1;
  }
  if (!this.spAnim) {
    return null;
  }
  if (this.node.active) {
    const r = this.spAnim.findAnimation(t);
    if (r) {
      const a = r.duration;
      const s = Math.ceil(60 * a);
      i = Math.min(i, s);
      const c = Math.max(0, n / 60);
      const l = Math.min(i / 60, 1);
      const u = this.spAnim.setAnimation(0, t, e);
      this.spAnim.timeScale = 0;
      u.animationStart = c;
      u.animationEnd = l;
      this.spAnim.timeScale = o;
      return u;
    }
  }
};
e.prototype.init = function (t) {
  if (void 0 === t) {
    t = null;
  }
  this.spAnim.enabled = !0;
  this.spAnim.node.opacity = 255;
  if (
    null == t ||
    !t.skeletonData ||
    (this.spAnim.skeletonData &&
      this.spAnim.skeletonData.name == t.skeletonData.name)
  ) {
    this.clearTracks();
    this.spAnim.setToSetupPose();
    this.animCompleteListener.clear();
    return void this.animFrameEventListener.clear();
  }
  this.spAnim.skeletonData = t.skeletonData;
  this.clearTracks();
  this.spAnim.setToSetupPose();
  this.animCompleteListener.clear();
  this.animFrameEventListener.clear();
  if (this.spAnim) {
    const e = this.spAnim.skeletonData.skeletonJson.animations;
    for (let n in e)
      for (let i in e)
        if (n != i) {
          this.spAnim.setMix(n, i, 0.2);
        }
  }
};
e.prototype.onDestroy = function () {
  this.animFrameEventListener.clear();
  this.animCompleteListener.clear();
  this.spAnim.setEventListener(null);
  this.spAnim.setCompleteListener(null);
};
e.prototype.onLoad = function () {
  this.spAnim.setEventListener(this.onFrameEvent.bind(this));
  this.spAnim.setCompleteListener(this.onCompleteEvent.bind(this));
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.spAnim = null;
  e.animFrameEventListener = new Map();
  e.animCompleteListener = new Map();
  e._onceOnComplete = null;
  e._onceFremeEvent = null;
  return e;
}
exports.default = u;
