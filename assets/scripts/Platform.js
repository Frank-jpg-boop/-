var $globalPopupMgr = require("./GlobalPopupMgr");
var $playerDataProxy = require("./PlayerDataProxy");
var $platformTT = require("./PlatformTT");
var $platformWX = require("./PlatformWX");
var s = (function () {
    function t() {
        this.versionCode = 100;
        this.systemInfo = null;
        this.launchInfo = null;
        this.adUintId = {};
        this.tmplIds = [];
        console.log("Runtime：dev");
    }
    t.prototype.getChannelId = function () {
        return 0;
    };
    t.prototype.login = function (t) {
        if (t) {
            t(!0, null);
        }
    };
    t.prototype.getUserInfo = function (t) {
        if (t) {
            t();
        }
    };
    t.prototype.getPlatform = function () {
        return "dev";
    };
    t.prototype.startVibrate = function (t) {
        if (void 0 === t) {
            t = 0;
        }
    };
    t.prototype.showVideoAds = function (t) {
        $playerDataProxy.playerDataProxy.addVideoNum();
        if (t.success) {
            t.success();
        }
    };
    t.prototype.showToast = function (t) {
        $globalPopupMgr.default.instance.showTips(t);
    };
    t.prototype.shareAppMessage = function (t) {
        if (t.success) {
            t.success();
        }
    };
    t.prototype.showTips = function (t) {
        $globalPopupMgr.default.instance.showTips(t);
    };
    t.prototype.umaTrackEvent = function () {};
    t.prototype.addDesk = function () {};
    t.prototype.requestSubscribeMessage = function () {};
    t.prototype.copyToClipboard = function (t, e, n) {
        if (cc.sys.isBrowser) {
            if (navigator.clipboard) {
                navigator.clipboard
                    .writeText(t)
                    .then(function () {
                        if (e) {
                            e();
                        }
                    })
                    .catch(function (t) {
                        if (n) {
                            n(t);
                        }
                    });
            } else {
                var i = document.createElement("textarea");
                i.value = t;
                document.body.appendChild(i);
                i.select();
                try {
                    if (document.execCommand("copy")) {
                        if (e) {
                            e();
                        }
                    } else {
                        if (n) {
                            n();
                        }
                    }
                } catch (t) {
                    console.error("复制失败:", t);
                }
                document.body.removeChild(i);
            }
        }
    };
    t.prototype.triggerGC = function () {};
    return t;
})();
window.mm = {};
cc.game.once(cc.game.EVENT_GAME_INITED, function () {
    mm.config = {
        env: 1
    };
    var t;
    var e = cc.view.getFrameSize();
    if (e.width < e.height) {
        mm.orientation = 1;
    } else {
        mm.orientation = 2;
    }
    if (Math.max(e.width, e.height) / Math.min(e.width, e.height) < 1.78) {
        mm.screen = 1;
    } else {
        mm.screen = 2;
    }
    mm.lang =
        ((t = cc.sys.localStorage.getItem("SysLanguage") || cc.sys.languageCode).includes("zh") && (t = "zh"),
        console.log("Lang:", t, " LanguageCode:", cc.sys.languageCode),
        t);
    mm.platform = (function () {
        switch (cc.sys.platform) {
            case cc.sys.WECHAT_GAME:
                return new $platformWX.PlatformWX();
            case cc.sys.BYTEDANCE_GAME:
                return new $platformTT.PlatformTT();
            default:
                return new s();
        }
    })();
});
