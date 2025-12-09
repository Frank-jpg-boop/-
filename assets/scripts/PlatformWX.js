import $globalPopupMgr from './GlobalPopupMgr';
import $audioUtil from './AudioUtil';
import $eventManager from './EventManager';
import $commonUtil from './CommonUtil';
import $appProxy from './AppProxy';
import $sceneManager from './SceneManager';
import $nodeUtil from './NodeUtil';
exports.PlatformWX = void 0;
t.prototype.triggerGC = function () {
  wx.triggerGC();
};
t.prototype.copyToClipboard = function (t, e, n) {
  wx.requirePrivacyAuthorize({
    success: function (i) {
      console.log("授权成功", i);
      wx.setClipboardData({
        data: t,
        success: function () {
          if (e) {
            e();
          }
        },
        fail: function (t) {
          if (n) {
            n();
          }
          console.log("setClipboardData调用失败", t);
        },
      });
    },
    fail: function (t) {
      console.log("授权失败", t);
      if (n) {
        n();
      }
    },
    complete: function () {},
  });
};
t.prototype.addDesk = function () {};
t.prototype.umaTrackEvent = function (t, e) {
  if (t) {
    wx.uma.trackEvent(t, e);
  }
};
t.prototype.showTips = function (t) {
  $globalPopupMgr.default.instance.showTips(t);
};
t.prototype.requestSubscribeMessage = function (t, e) {
  wx.requestSubscribeMessage({
    tmplIds: t,
    success: function (t) {
      if (e) {
        e(!0, t);
      }
    },
    fail: function (t) {
      console.log("订阅失败：", t);
      if (e) {
        e(!1, t);
      }
    },
  });
};
t.prototype.startVibrate = function (t) {
  if (void 0 === t) {
    t = 0;
  }
  if (0 == t) {
    wx.vibrateShort({
      type: "medium",
      success: function () {},
      fail: function () {},
      complete: function () {},
    });
  } else {
    wx.vibrateLong({
      success: function () {},
      fail: function () {},
      complete: function () {},
    });
  }
};
t.prototype.compareVersion = function (t) {
  const e = this.systemInfo.SDKVersion;
  const n = /\d+.\d+.\d+/;
  if (!n.test(t) || !n.test(e)) {
    console.warn("SDKVersion取值异常");
    return !1;
  }
  for (const i = e.split("."), o = t.split("."), r = 0; r < 3; r++) {
    const a = parseInt(i[r]);
    const s = parseInt(o[r]);
    if (a > s) {
      return !0;
    }
    if (a < s) {
      return !1;
    }
  }
  return !0;
};
t.prototype.showVideoAds = function (t) {
  const e = this;
  this._adsId = 1;
  this._videoObj = t;
  const n = this.adUintId.video[this._adsId];
  if (0 !== n.length) {
    const i = wx.createRewardedVideoAd({
      adUnitId: n,
    });
    if (i) {
      $sceneManager.SceneManager.instance.showLoading();
      i.offClose();
      i.offError();
      i.load().then(function () {
        i.show().then(function () {
          $audioUtil.AudioUtil.pauseMusic();
          $sceneManager.SceneManager.instance.hideLoading();
          $commonUtil.CommonUtil.print("视频广告显示成功");
        });
      });
      i.onClose(function (t) {
        $sceneManager.SceneManager.instance.hideLoading();
        setTimeout(function () {
          if (t.isEnded) {
            e.showTips("视频播放完毕!");
            e.umaTrackEvent(e._videoObj.eventId, {
              userA: "",
            });
            e._videoObj.success &&
              e._videoObj.success.call(e._videoObj.caller);
          } else {
            e.showTips("视频未播放完毕!");
            e._videoObj.fail && e._videoObj.fail.call(e._videoObj.caller);
          }
          $audioUtil.AudioUtil.resumeMusic();
        }, 10);
        e._adsId++;
        if (e._adsId > 2) {
          e._adsId = 1;
        }
      });
      i.onError(function (t) {
        $sceneManager.SceneManager.instance.hideLoading();
        $commonUtil.CommonUtil.print(t);
        e.showTips("视频加载失败!");
        if (e._videoObj.error) {
          e._videoObj.error.call(e._videoObj.caller);
        }
        e._adsId++;
        if (e._adsId > 2) {
          e._adsId = 1;
        }
      });
      const r = setTimeout(function () {
        clearTimeout(r);
        $sceneManager.SceneManager.instance.hideLoading();
      }, 2e3);
    }
  } else {
    if (this._videoObj.error) {
      this._videoObj.error.call(this._videoObj.caller);
    }
  }
};
t.prototype.getImageUrlByCamera = function (t) {
  const e = new cc.RenderTexture();
  const n = cc.game._renderContext;
  e.initWithSize(500, 400, n.STENCIL_INDEX8);
  t.targetTexture = e;
  t.render(null);
  const i = e.readPixels();
  const o = document.createElement("canvas");
  const r = o.getContext("2d");
  const a = (o.width = e.width);
  const s = (o.height = e.height);
  o.width = e.width;
  o.height = e.height;
  for (const c = 4 * a, l = 0; l < s; l++) {
    for (
      const u = s - 1 - l, p = r.createImageData(a, 1), h = u * a * 4, f = 0;
      f < c;
      f++
    ) {
      p.data[f] = i[h + f];
    }
    r.putImageData(p, 0, l);
  }
  return o.toTempFilePathSync();
};
t.prototype.getImageUrlFromCanvasCenter = function () {
  let t;
  let e;
  let n;
  let i;
  const o =
    cc.game.canvas.getContext("2d") ||
    cc.game.canvas.getContext("webgl", {
      preserveDrawingBuffer: !0,
    });
  if (cc.winSize.width > cc.winSize.height) {
    n = ((i = o.drawingBufferHeight) / 4) * 5;
  } else {
    i = ((n = o.drawingBufferWidth) / 5) * 4;
  }
  t = (o.drawingBufferWidth - n) / 2;
  e = (o.drawingBufferHeight - i) / 2;
  return o.canvas.toTempFilePathSync({
    x: t,
    y: e,
    width: n,
    height: i,
    destWidth: 500,
    destHeight: 400,
  });
};
t.prototype.shareResult = function () {
  $audioUtil.AudioUtil.resumeMusic();
  if (Date.now() - this._shareTime > 3500) {
    if (this._shareSuccess) {
      this._shareSuccess();
    }
  } else {
    if (this._shareFail) {
      this._shareFail();
    }
  }
  if (this._shareComplete) {
    this._shareComplete();
  }
  this._shareTime = 0;
  this._shareSuccess = null;
  this._shareFail = null;
  this._shareComplete = null;
};
t.prototype.shareAppMessage = function (t) {
  if (t) {
    //
  } else {
    t = {
      title: null,
      imageUrl: null,
      query: null,
      camera: null,
      success: null,
      fail: null,
      complete: null,
    };
  }
  this._shareTime = Date.now();
  if (null == t) {
    this._shareSuccess = void 0;
  } else {
    this._shareSuccess = t.success;
  }
  if (null == t) {
    this._shareFail = void 0;
  } else {
    this._shareFail = t.fail;
  }
  if (null == t) {
    this._shareComplete = void 0;
  } else {
    this._shareComplete = t.complete;
  }
  t.title =
    (null == t ? void 0 : t.title) ||
    (null == this ? void 0 : this._shareTitle);
  if (null == t ? void 0 : t.camera) {
    t.imageUrl = this.getImageUrlByCamera(t.camera);
  } else {
    if (null == t ? void 0 : t.imageUrl) {
      t.imageUrl = t.imageUrl;
    } else {
      t.imageUrl = this.getImageUrlFromCanvasCenter();
    }
  }
  const e = [
    "[有人@我]僵尸来了，快上车！",
    "[有人@我]我被僵尸吃掉了~",
    "[有人@我]带好装备，出发！",
  ];
  $commonUtil.CommonUtil.print("分享出去：", t.query);
  const n = this.getRandomNum(0, e.length - 1);
  wx.shareAppMessage({
    title: e[n],
    imageUrl: cc.url.raw(
      "resources/share/" +
        ["share_img_1", "share_img_2", "share_img_3"][n] +
        ".png",
    ),
    query: t.query,
  });
};
t.prototype.getUserInfo = function (t) {
  const e = this;
  wx.login({
    success: function (n) {
      $commonUtil.CommonUtil.print("登录成功:", n);
      e.authorize({
        scope: "scope.userInfo",
        success: function () {
          wx.getUserInfo({
            success: function (e) {
              $commonUtil.CommonUtil.print(
                "getUserInfo 调用成功",
                e.userInfo,
              );
              if (t) {
                t(e.userInfo);
              }
            },
            fail: function (e) {
              $commonUtil.CommonUtil.print("getUserInfo 调用失败", e.errMsg);
              if (t) {
                t();
              }
            },
          });
        },
        fail: function (e) {
          console.log("授权失败", e);
          if (t) {
            t();
          }
        },
      });
    },
    fail: function (e) {
      $commonUtil.CommonUtil.print("登录失败", e.errMsg);
      if (t) {
        t();
      }
    },
  });
};
t.prototype.hideGameClubButton = function () {
  if (this._gameClubButton) {
    this._gameClubButton.hide();
  }
};
t.prototype.createGameClubButton = function (t, e) {
  if (this._gameClubButton) {
    this._gameClubButton.show();
  } else {
    const n = cc.size(t.width + 10, t.height + 10);
    const i = cc.view.getFrameSize();
    const o = cc.director.getWinSize();
    const r = $nodeUtil.default.nodeParentChangeLocalPos(t, e);
    const a = ((0.5 * o.width + r.x - 0.5 * n.width) / o.width) * i.width;
    const s = ((0.5 * o.height - r.y - 0.5 * n.height) / o.height) * i.height;
    const c = (n.width / o.width) * i.width;
    const u = (n.height / o.height) * i.height;
    this._gameClubButton = wx.createGameClubButton({
      type: "text",
      text: "",
      style: {
        left: a,
        top: s,
        width: c,
        height: u,
      },
    });
  }
};
t.prototype.authorize = function (t) {
  const e = this;
  wx.getSetting({
    success: function (n) {
      if (n.authSetting[t.scope]) {
        if ("scope.userInfo" != t.scope) {
          if (t.success) {
            t.success();
          }
        } else {
          wx.getUserInfo({
            withCredentials: !0,
            lang: "zh_CN",
            success: function (e) {
              if (t.success) {
                t.success(e);
              }
            },
          });
        }
      } else if ("scope.userInfo" != t.scope) {
        wx.authorize({
          scope: t.scope,
          success: function () {
            if (t.success) {
              t.success();
            }
          },
          fail: function () {
            if (t.fail) {
              t.fail();
            }
          },
        });
      } else if (e.compareVersion("2.0.7")) {
        const i = wx.createUserInfoButton({
          withCredentials: !0,
          type: "text",
          text: "",
          style: {
            left: 0,
            top: 0,
            width: cc.winSize.width,
            height: cc.winSize.height,
            backgroundColor: "#00000000",
            fontSize: 16,
            lineHeight: 20,
            color: "#000000",
            textAlign: "center",
            borderRadius: 0,
          },
        });
        const o = !0;
        i.onTap(function (e) {
          if (e.userInfo) {
            $commonUtil.CommonUtil.print("用户授权");
            i.destroy();
            o && ((o = !1), t.success && t.success(e));
          } else {
            $commonUtil.CommonUtil.print("拒绝授权用户信息");
            i.destroy();
            t.fail && t.fail();
          }
        });
      } else {
        wx.showModal({
          title: "温馨提示",
          content: "当前微信版本过低，请升级到最新版微信后重试!",
        });
      }
    },
    fail: function () {
      $commonUtil.CommonUtil.print("wx.getSetting fail");
      if (t.fail) {
        t.fail();
      }
    },
  });
};
t.prototype.login = function (t) {
  wx.login({
    success: function (e) {
      if (t) {
        t(!0, e.code);
      }
    },
    fail: function () {
      $commonUtil.CommonUtil.print("wx.login fail");
      if (t) {
        t(!1, null);
      }
    },
  });
};
t.prototype.showToast = function (t, e, n) {
  wx.showToast({
    title: t,
    icon: e,
    duration: n ? 1500 : 500,
  });
};
t.prototype.getRandomNum = function (t, e, n) {
  if (void 0 === n) {
    n = !0;
  }
  const i = e - t;
  const o = Math.random() * i + t;
  if (n) {
    o = Math.round(o);
  }
  return o;
};
t.prototype.getPlatform = function () {
  return "wx";
};
t.prototype.getChannelId = function () {
  return 1;
};
t.prototype.checkUpdate = function () {
  const t = wx.getUpdateManager();
  t.onUpdateReady(function () {
    wx.showModal({
      title: "更新提示",
      content: "新版本已准备好，是否重启应用？",
      success: function (e) {
        if (e.confirm) {
          t.applyUpdate();
        }
      },
    });
  });
};
t.prototype.initShare = function () {
  const t = this;
  wx.showShareMenu({
    showShareItems: ["qq", "qzone", "wechatFriends", "wechatMoment"],
    withShareTicket: !0,
  });
  wx.onShareAppMessage(function () {
    const e = Math.floor(Math.random() * t._shareDescs.length);
    const n = Math.floor(Math.random() * t._shareImgs.length);
    return {
      title: t._shareDescs[e],
      imageUrl: cc.url.raw("resources/share/" + t._shareImgs[n] + ".png"),
      query: "",
    };
  });
  cc.game.on(cc.game.EVENT_SHOW, this.shareResult, this);
};
t.prototype.init = function () {
  this.initShare();
  this.checkUpdate();
  wx.onShow(function (t) {
    $commonUtil.CommonUtil.print("game_on_show callback = ", t);
    $eventManager.EventManager.instance.emit($appProxy.AppEvent.GAME_SHOW);
  });
  wx.onHide(function () {
    $eventManager.EventManager.instance.emit($appProxy.AppEvent.GAME_HIDE);
  });
};
function t() {
  this.versionCode = 100;
  this.systemInfo = null;
  this.launchInfo = null;
  this.tmplIds = [];
  this.adUintId = {
    video: {
      1: "adunit-baa4376c6135ddd9",
      2: "adunit-d1ddb962331caed9",
    },
  };
  this._shareTitle = "快来一起玩吧";
  this._shareTime = 0;
  this._shareDescs = [
    "我就不信有人过得了这关",
    "别私聊了，游戏真的很好玩，懂得都懂",
    "快来帮帮我，我顶不住了",
  ];
  this._shareImgs = ["share_1"];
  this._shareSuccess = null;
  this._shareFail = null;
  this._shareComplete = null;
  this._adsId = 1;
  this._videoObj = null;
  this._gameClubButton = null;
  console.log("Runtime：wx");
  this.systemInfo = wx.getSystemInfoSync();
  this.launchInfo = wx.getLaunchOptionsSync();
  this.init();
}
const u = t;
exports.PlatformWX = u;
