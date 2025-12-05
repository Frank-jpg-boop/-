exports.AudioManager = void 0;
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $basicsProxy = require("./BasicsProxy");
var a = (function () {
    function t() {
        this._limitTimeEffectNames = [];
        this._clips = Object.create(null);
        this._loading = [];
        this._battleEffectSwitch = !0;
        this._bgmId = -1;
        cc.audioEngine.setEffectsVolume($basicsProxy.basicsProxy.effectVolume);
        cc.audioEngine.setMusicVolume($basicsProxy.basicsProxy.bgmVolume);
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == t._instance) {
                t._instance = new t();
            }
            return t._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "battleEffectSwitch", {
        get: function () {
            return this._battleEffectSwitch;
        },
        set: function (t) {
            this._battleEffectSwitch = t;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.setBgmVolume = function (t) {
        $basicsProxy.basicsProxy.bgmVolume = t;
        cc.audioEngine.setMusicVolume($basicsProxy.basicsProxy.bgmVolume);
        if (0 === t) {
            this.pauseBgm();
        } else {
            if (this.isBgmPlaying()) {
                //
            } else {
                this.resumeBgm();
            }
        }
    };
    t.prototype.playBgm = function (t, e) {
        if (void 0 === e) {
            e = !0;
        }
        if (-1 !== this._bgmId) {
            this.stopBgm();
        }
        this._bgmId = cc.audioEngine.playMusic(t, e);
    };
    t.prototype.playBgmPath = function (t, e, n) {
        var o = this;
        if (void 0 === e) {
            e = void 0;
        }
        if (void 0 === n) {
            n = !0;
        }
        var r = (e || "") + t;
        this._loading.push(r);
        $resLoader.ResLoader.loadAsset({
            bundleName: e,
            path: t,
            type: cc.AudioClip,
            success: function (t) {
                var e = o._loading.indexOf(r);
                if (-1 !== e) {
                    o._loading.splice(e, 1);
                    o.playBgm(t, n);
                }
            }
        });
    };
    t.prototype.isBgmPlaying = function () {
        return cc.audioEngine.isMusicPlaying();
    };
    t.prototype.resumeBgm = function () {
        cc.audioEngine.resumeMusic();
    };
    t.prototype.pauseBgm = function () {
        cc.audioEngine.pauseMusic();
    };
    t.prototype.stopBgm = function () {
        cc.audioEngine.stopMusic();
        this._bgmId = -1;
    };
    t.prototype.setEffectVolume = function (t) {
        $basicsProxy.basicsProxy.effectVolume = t;
        cc.audioEngine.setEffectsVolume($basicsProxy.basicsProxy.effectVolume);
        if (0 === t) {
            this.stopAllEffect();
        }
    };
    t.prototype.playEffect = function (t, e, n) {
        if (void 0 === e) {
            e = !1;
        }
        if (void 0 === n) {
            n = "";
        }
        if (0 === $basicsProxy.basicsProxy.effectVolume) {
            return -1;
        }
        var i = cc.audioEngine.playEffect(t, e);
        this._clips[t.name + n] = i;
        return i;
    };
    t.prototype.playBattleEffect = function (t, e, n, i, r) {
        if (void 0 === e) {
            e = $frameEnum.Frame.EBundleName.RES;
        }
        if (void 0 === n) {
            n = !1;
        }
        if (void 0 === i) {
            i = !1;
        }
        if (void 0 === r) {
            r = "";
        }
        if (this._battleEffectSwitch) {
            this.playEffectPath(t, e, n, i, r);
        }
    };
    t.prototype.playEffectPath = function (t, e, n, r, a) {
        var s = this;
        if (void 0 === e) {
            e = $frameEnum.Frame.EBundleName.RES;
        }
        if (void 0 === n) {
            n = !1;
        }
        if (void 0 === r) {
            r = !1;
        }
        if (void 0 === a) {
            a = "";
        }
        var c = t.split("/").pop();
        this._loading.push(c);
        $resLoader.ResLoader.loadAsset({
            path: t,
            bundleName: e,
            type: cc.AudioClip,
            success: function (t) {
                if (n) {
                    t.addRef();
                }
                var e = s._loading.indexOf(c);
                if (-1 !== e) {
                    s._loading.splice(e, 1);
                    var i = s.playEffect(t, r, a);
                    if (n) {
                        cc.audioEngine.setFinishCallback(i, function () {
                            t.decRef();
                        });
                    }
                } else {
                    if (n) {
                        t.decRef();
                    }
                }
            }
        });
    };
    t.prototype.playLimitTimeEffect = function (t, e, n, i) {
        var r = this;
        if (void 0 === e) {
            e = $frameEnum.Frame.EBundleName.RES;
        }
        if (void 0 === n) {
            n = 0.5;
        }
        if (void 0 === i) {
            i = !1;
        }
        var a = (e || "") + t;
        if (!this._limitTimeEffectNames.includes(a)) {
            this._limitTimeEffectNames.push(a);
            var s = setTimeout(function () {
                r._limitTimeEffectNames.splice(r._limitTimeEffectNames.indexOf(a), 1);
                clearTimeout(s);
            }, 1e3 * n);
            this.playEffectPath(t, e, !1, i);
        }
    };
    t.prototype.pauseEffect = function (t, e) {
        if (void 0 === e) {
            e = "";
        }
        var n = this._clips[t + e];
        if (n) {
            cc.audioEngine.pauseEffect(n);
        }
    };
    t.prototype.resumeEffect = function (t, e) {
        if (void 0 === e) {
            e = "";
        }
        var n = this._clips[t + e];
        if (n) {
            cc.audioEngine.resumeEffect(n);
        }
    };
    t.prototype.stopEffect = function (t, e) {
        if (void 0 === e) {
            e = "";
        }
        var n = this._loading.indexOf(t);
        if (-1 !== n) {
            this._loading.splice(n, 1);
        }
        var i = this._clips[t + e];
        if (i) {
            cc.audioEngine.stopEffect(i);
            delete this._clips[t + e];
        }
    };
    t.prototype.stopAllEffect = function () {
        for (var t in this._clips)
            if ("draw" != t) {
                var e = this._clips[t];
                if (e) {
                    cc.audioEngine.stopEffect(e);
                    delete this._clips[t];
                }
            }
    };
    t._instance = null;
    return t;
})();
exports.AudioManager = a;
