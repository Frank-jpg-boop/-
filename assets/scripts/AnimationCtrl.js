import $resLoader from './ResLoader';
let i;
const l = cc._decorator;
const u = l.ccclass;
const p = l.property;
const h = l.menu;
const f = l.requireComponent;
e.prototype.onFrameEvent = function (t, e) {
  if (this._onceFrameEvent) {
    this._onceFrameEvent(Number(e));
  }
};
e.prototype.clearAnimaion = function () {
  const t = this;
  this.animation.stop();
  this.animation.getClips().forEach(function (e) {
    return t.animation.removeClip(e);
  });
};
e.prototype.clearAnimEvent = function () {
  this._curAnimName = "";
  this.animation.onFrameEvent = null;
  this.animation.off(cc.Animation.EventType.FINISHED);
};
e.prototype.playAnim = function (t, e, n, i, o) {
  const r = this;
  if (void 0 === e) {
    e = !1;
  }
  if (void 0 === n) {
    n = null;
  }
  if (void 0 === i) {
    i = null;
  }
  if (void 0 === o) {
    o = 1;
  }
  if (this._curAnimName != t) {
    if (n) {
      this.animation.off(cc.Animation.EventType.FINISHED);
      this.animation.once(
        cc.Animation.EventType.FINISHED,
        function () {
          r._curAnimName = "";
          if (n) {
            n();
          }
        },
        this,
      );
    }
    const a = this.animation.getClips().find(function (e) {
      return e.name == t;
    });
    if (a) {
      e && (a.wrapMode = cc.WrapMode.Loop);
      this._onceFrameEvent = i;
      this._curAnimName = t;
      this.animation.stop();
      this.animation.play(t, 0).speed = this._defaultSpd * o;
    } else {
      cc.error("没有这个动画", t);
    }
  }
};
e.prototype.init = function () {
  this.clearAnimaion();
  this.clearAnimEvent();
};
e.prototype.loadAnimationClip = function (t, e) {
  for (
    const n = this,
          i = [],
          o = 0,
          r = function (i) {
            const o = cc.AnimationClip.createWithSpriteFrames(i, 30);
            o.name = t.actionName;
            o.speed = n._defaultSpd;
            if (t.frameEventIndexs) {
              t.frameEventIndexs.forEach(function (e) {
                o.events.push({
                  frame: (e / t.frameNum) * o.duration,
                  func: "onFrameEvent",
                  params: [t.actionName, e.toString()],
                });
              });
            }
            e(o);
          },
          a = function (e) {
            const n = null;
            if (t.repairNum) {
              n = ("00" + e).slice(-2);
            } else {
              n = e;
            }
            if (t.atlas) {
              i[e] = t.atlas.getSpriteFrame("" + t.spriteFrameNameHead + n);
              if (++o >= t.frameNum) {
                r(i);
              }
              return "continue";
            }
            $resLoader.ResLoader.loadAsset({
              bundleName: t.bundleName,
              path: t.path + "/" + t.spriteFrameNameHead + n,
              type: cc.SpriteFrame,
            })
              .then(function (n) {
                i[e] = n;
                if (++o >= t.frameNum) {
                  r(i);
                }
              })
              .catch(function () {
                if (++o >= t.frameNum) {
                  r(i);
                }
              });
          },
          s = 0;
    s < t.frameNum;
    ++s
  ) {
    a(s);
  }
};
e.prototype.loadAtlasAnimation = function (t, e, n, i, o, r) {
  if (void 0 === i) {
    i = null;
  }
  if (void 0 === o) {
    o = 0.6;
  }
};
e.prototype.loadAnimation = function (t, e, n) {
  if (void 0 === e) {
    e = null;
  }
  if (void 0 === n) {
    n = 0.6;
  }
};
e.prototype.resetInEditor = function () {
  this.animation = this.node.getComponent(cc.Animation);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.animation = null;
  e._loadCompleteCallback = null;
  e._defaultSpd = 0.2;
  e._curAnimName = "";
  e._onceFrameEvent = null;
  return e;
}
exports.default = d;
