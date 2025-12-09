exports.PlatformTT = void 0;
var $dataMgr = require("./DataMgr");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $userCenterMgr = require("./UserCenterMgr");
var $audioUtil = require("./AudioUtil");
var $eventManager = require("./EventManager");
var $commonUtil = require("./CommonUtil");
var $appProxy = require("./AppProxy");
var $sceneManager = require("./SceneManager");
var p = (function () {
    function t() {
        this.tmplIds = ["MSG2134944137207486165810172512564"];
        this.sceneId = 3;
        this.versionCode = 100;
        this.systemInfo = null;
        this.launchInfo = null;
        this.shareTitle = "[有人@我]快来看看我是怎么玩游戏的！";
        this.shareImageUrl = null;
        this.shareIds = ["41902i4f4e5d6c1jkl"];
        this.shareDescs = [
            "躺平又出新玩法了？",
            "电量、理智、生命值，我该如何在黑暗中守住最后30秒？",
            "我不是在讲故事，我在分享我的“求生实录”。",
            "和队友在电诈园区里被鬼追是什么体验？",
            "我已经知道真相了，但知道真相，还能活下去吗？"
        ];
        this.recorder = null;
        this.recorderVideoPath = null;
        this.recorderStopCallback = null;
        this.recorderErrorMsg = null;
        this.isStopRecorder = !1;
        this.adUintId = {
            Video: {
                1: "1515kfan2kmikk95ik",
                2: "141jt1j031j3i405jb",
                3: "3fmka9dr9em70xl59t"
            },
            Banner: {
                1: "4552986c79mi702kcm"
            },
            Interstitial: {
                1: "3f59diedembh9o2lgl"
            }
        };
        this.shareTime = 0;
        this.shareSuccess = null;
        this.shareFail = null;
        this.shareComplete = null;
        this.bannerCache = {};
        this.interstitial = null;
        this.ttVideoAd = null;
        this.ttVideoObj = null;
        this._adsId = 1;
        $commonUtil.CommonUtil.print("运行环境：tt");
        this.systemInfo = tt.getSystemInfoSync();
        this.launchInfo = tt.getLaunchOptionsSync();
        this.showShareMenu({});
        this.checkUpdate();
        tt.onShow(function (t) {
            $commonUtil.CommonUtil.print("game_on_show callback = ", t);
            if ("021036" === t.scene && "homepage" === t.launch_from && "sidebar_card" === t.location) {
                $dataMgr.DataMgr.isSidebarCardInGameForTT = !0;
                $eventManager.EventManager.instance.emit("ETTSidebarItemEvent.UPDATE_REDPOINT");
            }
            $eventManager.EventManager.instance.emit($appProxy.AppEvent.GAME_SHOW);
        });
        tt.onHide(function () {
            $eventManager.EventManager.instance.emit($appProxy.AppEvent.GAME_HIDE);
        });
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.listenMemoryWarning = function () {
        tt.onMemoryWarning(function () {
            console.log("onMemoryWarning");
        });
    };
    t.prototype.triggerGC = function () {
        tt.triggerGC();
    };
    t.prototype.getPlatform = function () {
        return "tt";
    };
    t.prototype.restartMiniProgramSync = function () {
        try {
            tt.restartMiniProgramSync();
        } catch (t) {
            console.log("restartMiniProgramSync调用失败", t);
        }
    };
    t.prototype.setKeepScreenOn = function () {
        tt.setKeepScreenOn({
            keepScreenOn: !0,
            success: function () {
                console.log("屏幕常亮已关闭，省电中");
            },
            fail: function () {
                console.log("setKeepScreenOn调用失败");
            }
        });
    };
    t.prototype.getRandomNum = function (t, e) {
        var n = e - t;
        return Math.floor(Math.random() * n + t);
    };
    t.prototype.showToast = function (t, e, n) {
        tt.showToast({
            title: t,
            icon: e,
            duration: n ? 1500 : 500
        });
    };
    t.prototype.showLoading = function (t) {
        tt.showLoading({
            title: t
        });
    };
    t.prototype.hideLoading = function () {
        tt.hideLoading();
    };
    t.prototype.getChannelId = function () {
        return 501;
    };
    t.prototype.login = function (t) {
        tt.login({
            success: function (e) {
                if (t) {
                    t(!0, e.code);
                }
            },
            fail: function () {
                $commonUtil.CommonUtil.print("tt.login fail");
                if (t) {
                    t(!1, null);
                }
            }
        });
    };
    t.prototype.authorize = function (t) {
        tt.getSetting({
            success: function (e) {
                if (e.authSetting[t.scope]) {
                    console.log("已经授权过了");
                    tt.getUserInfo({
                        withCredentials: !1,
                        lang: "zh_CN",
                        success: function (e) {
                            console.log("获取到了用户信息");
                            if (t.success) {
                                t.success(e);
                            }
                        },
                        fail: function () {
                            console.log("获取用户信息失败");
                            if (t.fail) {
                                t.fail(null);
                            }
                        }
                    });
                } else {
                    console.log("没授权过，开始请求授权");
                    tt.authorize({
                        scope: t.scope,
                        success: function () {
                            tt.getUserInfo({
                                withCredentials: !1,
                                lang: "zh_CN",
                                success: function (e) {
                                    console.log("获取到了用户信息");
                                    if (t.success) {
                                        t.success(e);
                                    }
                                },
                                fail: function () {
                                    console.log("获取用户信息失败");
                                    if (t.fail) {
                                        t.fail(null);
                                    }
                                }
                            });
                        },
                        fail: function () {
                            if (t.fail) {
                                t.fail(null);
                            }
                        }
                    });
                }
            },
            fail: function () {
                $commonUtil.CommonUtil.print("tt.getSetting fail");
                if (t.fail) {
                    t.fail(null);
                }
            }
        });
    };
    t.prototype.getUserInfo = function (t) {
        tt.login({
            success: function (e) {
                $commonUtil.CommonUtil.print("登录成功:", e);
                tt.getUserInfo({
                    success: function (e) {
                        $commonUtil.CommonUtil.print("getUserInfo 调用成功", e.userInfo);
                        if (t) {
                            t({
                                nickName: e.userInfo.nickName,
                                avatarUrl: e.userInfo.avatarUrl
                            });
                        }
                    },
                    fail: function (e) {
                        $commonUtil.CommonUtil.print("getUserInfo 调用失败", e.errMsg);
                        if (t) {
                            t();
                        }
                    }
                });
            },
            fail: function (e) {
                $commonUtil.CommonUtil.print("登录失败", e.errMsg);
                if (t) {
                    t();
                }
            }
        });
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
                complete: null
            };
        }
        t.title = (null == t ? void 0 : t.title) || (null == this ? void 0 : this.shareTitle);
        var e = this.getRandomNum(0, this.shareDescs.length);
        tt.shareAppMessage({
            channel: "invite",
            templateId: this.shareIds[0],
            title: this.shareDescs[e],
            query: t.query,
            success: function (e) {
                $commonUtil.CommonUtil.print("分享成功" + JSON.stringify(e));
                if (t.success) {
                    t.success();
                }
                t = null;
            },
            fail: function () {
                $commonUtil.CommonUtil.print("分享失败");
                if (t.fail) {
                    t.fail();
                }
                t = null;
            }
        });
    };
    t.prototype.shareResult = function () {
        if (Date.now() - this.shareTime > 3500) {
            if (this.shareSuccess) {
                this.shareSuccess();
            }
        } else {
            if (this.shareFail) {
                this.shareFail();
            }
        }
        if (this.shareComplete) {
            this.shareComplete();
        }
        this.shareTime = 0;
        this.shareSuccess = null;
        this.shareFail = null;
        this.shareComplete = null;
    };
    t.prototype.getImageUrlFromCanvasCenter = function () {
        var t;
        var e;
        var n;
        var i;
        var o =
            cc.game.canvas.getContext("2d") ||
            cc.game.canvas.getContext("webgl", {
                preserveDrawingBuffer: !0
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
            destHeight: 400
        });
    };
    t.prototype.getImageUrlByCamera = function (t) {
        var e = new cc.RenderTexture();
        var n = cc.game._renderContext;
        e.initWithSize(500, 400, n.STENCIL_INDEX8);
        t.targetTexture = e;
        t.render(null);
        var i = e.readPixels();
        var o = document.createElement("canvas");
        var r = o.getContext("2d");
        var a = (o.width = e.width);
        var s = (o.height = e.height);
        o.width = e.width;
        o.height = e.height;
        for (var c = 4 * a, l = 0; l < s; l++) {
            for (var u = s - 1 - l, p = r.createImageData(a, 1), h = u * a * 4, f = 0; f < c; f++) {
                p.data[f] = i[h + f];
            }
            r.putImageData(p, 0, l);
        }
        return o.toTempFilePathSync();
    };
    t.prototype.showShareMenu = function () {
        var t = this;
        tt.showShareMenu({
            showShareItems: ["qq", "qzone", "wechatFriends", "wechatMoment"],
            withShareTicket: !0
        });
        tt.onShareAppMessage(function () {
            var e = ["share_1", "share_2"];
            var n = t.getRandomNum(0, t.shareDescs.length);
            var i = t.getRandomNum(0, e.length);
            return {
                title: t.shareDescs[n],
                imageUrl: cc.url.raw("resources/share/" + e[i] + ".png"),
                query: ""
            };
        });
    };
    t.prototype.addDesk = function () {
        var t = this;
        tt.addShortcut({
            success: function () {
                t.showTips("添加桌面成功!");
            },
            fail: function () {
                t.showTips("添加桌面失败!");
            }
        });
    };
    t.prototype.preloadAds = function () {};
    t.prototype.addBanner = function (t) {
        var e = this;
        var n = t.id;
        var i = t.posNode;
        var o = t.width;
        var r = t.sCnt;
        var a = t.preload;
        var s = this.adUintId.Banner[n];
        o = cc.misc.clampf(o, 300, this.systemInfo.screenHeight);
        r = t.sCnt || 3;
        this.hideAllBanner();
        var l = function (t) {
            if (i) {
                t.style.top = e.systemInfo.screenHeight * (1 - i.getBoundingBoxToWorld().yMin / cc.winSize.height);
            } else {
                t.style.top = e.systemInfo.screenHeight - Math.ceil(t.style.realHeight) - 2;
            }
        };
        if (!this.bannerCache[s] || this.bannerCache[s].sCnt <= 0) {
            if (this.bannerCache[s]) {
                this.bannerCache[s].banner.destroy();
            }
            var u = (this.systemInfo.screenWidth - o) / 2;
            var p = tt.createBannerAd({
                adUnitId: s,
                style: {
                    left: u,
                    top: this.systemInfo.screenHeight,
                    width: o
                }
            });
            p.onError(function (t) {
                $commonUtil.CommonUtil.print(t);
            });
            p.onResize(function () {
                l(p);
            });
            this.bannerCache[s] = {
                banner: p,
                sCnt: r
            };
        } else {
            l(this.bannerCache[s].banner);
        }
        if (a) {
            //
        } else {
            this.bannerCache[s].banner.show();
            this.bannerCache[s].sCnt -= 1;
        }
    };
    t.prototype.showBanner = function () {};
    t.prototype.hideBanner = function () {};
    t.prototype.hideAllBanner = function () {
        for (var t in this.bannerCache) this.bannerCache[t].banner.hide();
    };
    t.prototype.showInterstitial = function () {
        this.addInterstitial(1);
    };
    t.prototype.addInterstitial = function (t) {
        var e = this;
        var n = this.adUintId.Interstitial[t];
        if (this.compareVersion("2.6.0")) {
            if (this.interstitial) {
                //
            } else {
                this.interstitial = tt.createInterstitialAd({
                    adUnitId: n
                });
            }
            this.interstitial
                .load()
                .then(function () {
                    e.interstitial.show();
                })
                .catch(function (t) {
                    console.error(t);
                });
        }
    };
    t.prototype.hideInterstitial = function () {
        if (this.interstitial) {
            this.interstitial.destroy();
        }
    };
    t.prototype.setClipboardData = function (t) {
        tt.setClipboardData({
            data: t,
            success: function () {
                this.showTips("复制成功~");
            },
            fail: function () {
                this.showTips("复制失败~");
            }
        });
    };
    t.prototype.showVideoAds = function (t) {
        var e = this;
        this.ttVideoObj = t;
        var n = this.adUintId.Video[this._adsId];
        if (n && 0 !== n.length) {
            if (this.ttVideoAd) {
                //
            } else {
                this.ttVideoAd = tt.createRewardedVideoAd({
                    adUnitId: n
                });
                this.ttVideoAd.offClose();
                this.ttVideoAd.offError();
                this.ttVideoAd.onClose(function (t) {
                    $sceneManager.SceneManager.instance.hideLoading();
                    setTimeout(function () {
                        if (t.isEnded) {
                            e.showTips("视频播放完毕!");
                            e.ttVideoObj && e.ttVideoObj.success && e.ttVideoObj.success();
                        } else {
                            e.showTips("视频未播放完毕!");
                            e.ttVideoObj.fail && e.ttVideoObj.fail();
                        }
                    }, 10);
                    e._adsId++;
                    if (e._adsId > 2) {
                        e._adsId = 1;
                    }
                    $audioUtil.AudioUtil.resumeMusic();
                }, 10);
                this.ttVideoAd.onError(function (t) {
                    e.showTips("视频加载失败!");
                    $sceneManager.SceneManager.instance.hideLoading();
                    $commonUtil.CommonUtil.print(t);
                    if (e.ttVideoObj.error) {
                        e.ttVideoObj.error();
                    }
                    e._adsId++;
                    if (e._adsId > 2) {
                        e._adsId = 1;
                    }
                });
            }
            if (this.ttVideoAd) {
                $sceneManager.SceneManager.instance.showLoading();
                this.ttVideoAd.load().then(function () {
                    e.ttVideoAd.show().then(function () {
                        $audioUtil.AudioUtil.pauseMusic();
                        $commonUtil.CommonUtil.print("视频广告显示成功");
                        $sceneManager.SceneManager.instance.hideLoading();
                        Date.now();
                    });
                });
            } else {
                if (this.ttVideoObj.error) {
                    this.ttVideoObj.error();
                }
            }
            var i = setTimeout(function () {
                clearTimeout(i);
                $sceneManager.SceneManager.instance.hideLoading();
            }, 2e3);
        } else {
            if (this.ttVideoObj.error) {
                this.ttVideoObj.error();
            }
        }
    };
    t.prototype.compareVersion = function (t) {
        var e = this.systemInfo.SDKVersion;
        var n = /\d+.\d+.\d+/;
        if (!n.test(t) || !n.test(e)) {
            console.warn("SDKVersion取值异常");
            return !1;
        }
        for (var i = e.split("."), o = t.split("."), r = 0; r < 3; r++) {
            var a = parseInt(i[r]);
            var s = parseInt(o[r]);
            if (a > s) {
                return !0;
            }
            if (a < s) {
                return !1;
            }
        }
        return !0;
    };
    t.prototype.checkUpdate = function () {
        var t = tt.getUpdateManager();
        t.onUpdateReady(function () {
            tt.showModal({
                title: "更新提示",
                content: "新版本已准备好，是否重启应用？",
                success: function (e) {
                    if (e.confirm) {
                        t.applyUpdate();
                    }
                }
            });
        });
    };
    t.prototype.review = function () {};
    t.prototype.startVibrate = function (t) {
        if (void 0 === t) {
            t = 0;
        }
        if (0 == t) {
            tt.vibrateShort({
                success: function () {},
                fail: function () {}
            });
        } else {
            tt.vibrateLong({
                success: function () {},
                fail: function () {}
            });
        }
    };
    t.prototype.uploadEvent = function () {};
    t.prototype.recorderStart = function (t, e) {
        var n = this;
        if (!this.recorder) {
            if (tt && tt.getGameRecorderManager()) {
                this.recorder = tt.getGameRecorderManager();
            }
            if (!this.recorder) {
                return;
            }
            $commonUtil.CommonUtil.print("开始录制");
            this.recorder.onStart(function (t) {
                $commonUtil.CommonUtil.print("录屏开始");
                n.isStopRecorder = !1;
                n.recorderVideoPath = "";
                if (e) {
                    e(!0, t);
                }
            });
            this.recorder.onPause(function () {
                $commonUtil.CommonUtil.print("录屏暂停");
            });
            this.recorder.onResume(function () {
                $commonUtil.CommonUtil.print("录屏恢复");
            });
            this.recorder.onStop(function (t) {
                n.isStopRecorder = !0;
                $commonUtil.CommonUtil.print("录屏停止，文件保存在：", t.videoPath);
                n.recorderVideoPath = t.videoPath;
                $commonUtil.CommonUtil.print("录屏停止，this.recorderStopCallback：", n.recorderStopCallback);
                if (n.recorderStopCallback) {
                    n.recorderStopCallback(!0);
                }
            });
            this.recorder.onError(function (t) {
                $commonUtil.CommonUtil.print("录屏失败，errMsg：" + t);
                n.recorderErrorMsg = t;
                if (n.recorderStopCallback) {
                    n.recorderStopCallback(!1);
                }
            });
        }
        this.recorder.start({
            duration: t
        });
    };
    t.prototype.recordPause = function () {
        if (this.recorder) {
            this.recorder.pause();
        }
    };
    t.prototype.recordResume = function () {
        if (this.recorder) {
            this.recorder.resume();
        }
    };
    t.prototype.recordStop = function (t) {
        if (void 0 === t) {
            t = null;
        }
        $commonUtil.CommonUtil.print("停止录制：", !this.recorder + "" + this.isStopRecorder);
        if (this.recorder) {
            if (this.isStopRecorder) {
                t && t();
            } else {
                (this.recorderStopCallback = t),
                    (this.isStopRecorder = !0),
                    $commonUtil.CommonUtil.print("调停止录制接口"),
                    this.recorder.stop();
            }
        }
    };
    t.prototype.recorderShare = function (t) {
        if (!this.recorder) {
            $commonUtil.CommonUtil.print("分享录屏失败1");
            return void (t && t(!1, "录屏失败，请稍后再试"));
        }
        if ("" == this.recorderVideoPath) {
            $commonUtil.CommonUtil.print("分享录屏失败2");
            return void (t && t(!1, this.recorderErrorMsg));
        }
        var e = this.recorderVideoPath;
        tt.shareAppMessage({
            channel: "video",
            extra: {
                videoPath: e,
                videoTopics: ["进我鱼塘", "进我鱼塘小游戏"]
            },
            success: function (e) {
                $commonUtil.CommonUtil.print("分享成功：", e);
                setTimeout(function () {
                    if (t) {
                        t(!0, e);
                    }
                }, 10);
            },
            fail: function (e) {
                $commonUtil.CommonUtil.print("分享失败：", e);
                setTimeout(function () {
                    if (t) {
                        t(!1, e);
                    }
                }, 10);
            }
        });
    };
    t.prototype.checkFollowState = function (t) {
        tt.checkFollowState({
            success: function (e) {
                $commonUtil.CommonUtil.print(e.result);
                if (t) {
                    t(e.result);
                }
            }
        });
    };
    t.prototype.followOfficialAccount = function (t) {
        tt.followOfficialAccount({
            success: function (e) {
                if (0 === e.errCode) {
                    $commonUtil.CommonUtil.print("关注成功");
                    t && t(!0);
                } else {
                    $commonUtil.CommonUtil.print(e.errMsg);
                    t && t(!1);
                }
            }
        });
    };
    t.prototype.checkGroupInfo = function (t) {
        var e = !1;
        try {
            var n = tt.getSystemInfoSync();
            $commonUtil.CommonUtil.print("手机型号为 " + n.model);
            e = "Douyin" == n.appName || "douyin_lite" == n.appName;
        } catch (e) {
            $commonUtil.CommonUtil.print("获取系统信息失败");
            if (t) {
                t(!1);
            }
        }
        if (t) {
            t(e);
        }
    };
    t.prototype.joinGroup = function (t, e) {
        $commonUtil.CommonUtil.print("加入群id:", t);
        tt.joinGroup({
            groupid: t,
            success: function (t) {
                $commonUtil.CommonUtil.print(t);
                if (e) {
                    e(!0);
                }
            },
            fail: function (t) {
                $commonUtil.CommonUtil.print(t);
                if (e) {
                    e(!1);
                }
            }
        });
    };
    t.prototype.checkFollowAwemeState = function (t) {
        var e = !1;
        try {
            var n = tt.getSystemInfoSync();
            $commonUtil.CommonUtil.print("手机型号为 " + n.model);
            e = "Douyin" == n.appName || "douyin_lite" == n.appName;
        } catch (e) {
            $commonUtil.CommonUtil.print("获取系统信息失败");
            if (t) {
                t(!1);
            }
        }
        if (e) {
            if (t) {
                t(!0);
            }
        } else {
            if (t) {
                t(!1);
            }
        }
    };
    t.prototype.openAwemeUserProfile = function (t) {
        tt.openAwemeUserProfile({
            success: function (e) {
                $commonUtil.CommonUtil.print("调用成功", e);
                if (t) {
                    t(!0);
                }
            },
            fail: function (e) {
                $commonUtil.CommonUtil.print("调用失败", e);
                if (t) {
                    t(!1);
                }
            }
        });
    };
    t.prototype.requestSubscribeMessage = function (t, e) {
        $commonUtil.CommonUtil.print("==requestSubscribeMessage:", t);
        if (tt.requestSubscribeMessage) {
            tt.requestSubscribeMessage({
                tmplIds: t,
                success: function (t) {
                    $commonUtil.CommonUtil.print("==requestSubscribeMessage success:", t);
                    if (e) {
                        e(!0, t);
                    }
                },
                fail: function (t) {
                    $commonUtil.CommonUtil.print("==requestSubscribeMessage fail:", t);
                    if (e) {
                        e(!1, t);
                    }
                }
            });
        } else {
            this.showTips("当前应用暂不支持订阅!");
        }
    };
    t.prototype.createGameClubButton = function () {};
    t.prototype.hideGameClubButton = function () {};
    t.prototype.umaTrackEvent = function (t, e) {
        var n = e.userA;
        var i = $userCenterMgr.UserCenterMgr.instance.configVersion;
        var o = Number(yzll.gameConfig.v.split(".").join(""));
        if (n) {
            n = i + "_" + o + "_" + n;
        }
        e.userA = n;
        if (t && "" != t) {
            tt.uma.trackEvent(t, e);
        }
    };
    t.prototype.setImRankData = function (t) {
        var e = {
            dataType: 0,
            value: t.toString(),
            priority: 0,
            extra: "extra",
            zoneId: "default",
            success: function (t) {
                console.log("setImRankData success res: " + t);
            },
            fail: function (t) {
                console.log("setImRankData fail res: " + t.errMsg);
            }
        };
        tt.setImRankData(e);
    };
    t.prototype.getImRankList = function (t, e) {
        tt.login({
            force: !0,
            success: function (n) {
                console.log("login success res: " + n.code);
                tt.getImRankList({
                    relationType: "all",
                    dataType: 0,
                    rankType: "day",
                    suffix: "波",
                    rankTitle: "天黑请闭眼",
                    zoneId: "default",
                    success: function (e) {
                        console.log("getImRankData success res: " + e);
                        if (t) {
                            t(e);
                        }
                    },
                    fail: function (t) {
                        console.log("getImRankData fail res: " + t.errMsg);
                        if (e) {
                            e(t);
                        }
                    }
                });
            },
            fail: function (t) {
                console.log("login fail res: " + t.errMsg);
            }
        });
    };
    t.prototype.showTips = function (t) {
        $globalPopupMgr.default.instance.showTips(t);
    };
    t.prototype.copyToClipboard = function (t, e, n) {
        tt.setClipboardData({
            data: t,
            success: function () {
                if (e) {
                    e();
                }
            },
            fail: function (t) {
                if (n) {
                    n(t);
                }
            }
        });
    };
    t._instance = null;
    return t;
})();
exports.PlatformTT = p;
