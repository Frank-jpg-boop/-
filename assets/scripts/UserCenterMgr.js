exports.UserCenterMgr = void 0;
var $commonUtil = require("./CommonUtil");
var $httpRequest = require("./HttpRequest");
var $itemDataProxy = require("./ItemDataProxy");
var $eventManager = require("./EventManager");
var $userDataProxy = require("./UserDataProxy");
var $localDataProxy = require("./LocalDataProxy");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $sqlUtil = require("./SqlUtil");
var p = (function() {
    function t() {
        this.loginUrl = "https://minigame.yuanzililiang.cn/doomsday";
        this._token = "";
        this._playerId = "";
        this._openId = "";
        this._zbState = 0;
        this._svrData = null;
    }
    Object.defineProperty(t, "instance", {
        get: function() {
            if (null == t._instance) {
                t._instance = new t();
            }
            return t._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "token", {
        get: function() {
            return this._token;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "playerId", {
        get: function() {
            return this._playerId;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "openId", {
        get: function() {
            return this._openId;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "svrData", {
        get: function() {
            return this._svrData;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "zbState", {
        get: function() {
            return this._zbState;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "configVersion", {
        get: function() {
            return "a";
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.loginUserCenter = function(t, e, n, r) {
        // var a = this;
        // var s = "/account/sdklogin";
        // var c = {
        //     openId: t,
        //     channel: mm.platform.getChannelId(),
        //     projectName: yzll.gameConfig.name
        // };
        // if (yzll.gameConfig.isZB) {
        //     c.appId = yzll.gameConfig.appid;
        //     s = "/account/login/zhubo";
        // }
        // console.log(JSON.stringify(c));
        // var l = JSON.stringify({
        //     params: $httpRequest.HttpRequest.inst.encryptStr(JSON.stringify(c))
        // });
        // $httpRequest.HttpRequest.inst
        //     .request("POST", s, l, this.loginUrl)
        //     .then(function (t) {
        //         $commonUtil.CommonUtil.print("登录成功:", t);
        //         a._token = t.data.token;
        //         a._playerId = t.data.playerId;
        //         if (t && t.data && t.data.openId) {
        //             a._openId = t.data.openId.split("@")[1];
        //         } else {
        //             a._openId = "";
        //         }
        //         a._svrData = t.data.props;
        //         if (yzll.gameConfig.isZB) {
        //             yzll.gameConfig.isGM = 1 == a._zbState || 2 == a._zbState || 3 == a._zbState;
        //             yzll.gameConfig.isGameTest = 3 == a._zbState;
        //         }
        if (e) {
            e.call(r);
        }
        //     })
        //     .catch(function (t) {
        //         console.error("登录失败:", t);
        //         if (n) {
        //             n.call(r);
        //         }
        //     });
    };
    t.prototype.subscribe = function(t, e) {
        var n = JSON.stringify({
            params: $httpRequest.HttpRequest.inst.encryptStr(JSON.stringify(t))
        });
        $httpRequest.HttpRequest.inst
            .request(
                "POST",
                "/subscribe/" + (cc.sys.platform == cc.sys.BYTEDANCE_GAME ? "douyin" : "weixin") + "/send",
                n,
                this.loginUrl
            )
            .then(function(t) {
                if (e) {
                    e(t);
                }
            })
            .catch(function(t) {
                console.error("提交失败：", t);
            });
    };
    t.prototype.cdkey = function(t, e) {
        var n = JSON.stringify({
            params: $httpRequest.HttpRequest.inst.encryptStr(JSON.stringify(t))
        });
        $httpRequest.HttpRequest.inst
            .request("POST", "/player/cdkey", n, this.loginUrl)
            .then(function(t) {
                if (200 == t.code) {
                    if ("" != t.data) {
                        var n = t.data.split("|");
                        var i = [];
                        n.forEach(function(t) {
                            var e = t.split("_").map(Number);
                            var n = e[0];
                            var o = e[1];
                            i.push({
                                itemId: n,
                                itemNum: o
                            });
                        });
                        $eventManager.EventManager.instance.emit(
                            $itemDataProxy.EItemDataEvent.ITEM_ADD_COMMMON_UI_NOTICE,
                            i
                        );
                    } else {
                        $globalPopupMgr.default.instance.showTips("开启无广模式");
                        yzll.gameConfig.isGM = !0;
                    }
                } else {
                    $globalPopupMgr.default.instance.showTips("无效兑换码");
                }
                if (e) {
                    e(t);
                }
            })
            .catch(function(t) {
                console.error("提交失败：", t);
                $globalPopupMgr.default.instance.showTips("无效兑换码");
            });
    };
    t.prototype.saveData = function(t, e, n) {
        if ("" != this._token) {
            var i = {};
            i[t] = e;
            var r = JSON.stringify({
                params: $httpRequest.HttpRequest.inst.encryptStr(JSON.stringify(i))
            });
            $httpRequest.HttpRequest.inst
                .request("POST", "/player/updateProps", r, this.loginUrl)
                .then(function() {
                    if (n) {
                        n();
                    }
                })
                .catch(function() {});
        } else {
            this.resetLogin();
        }
    };
    t.prototype.clearData = function(t) {
        $httpRequest.HttpRequest.inst
            .request("POST", "/player/props/clear", {}, this.loginUrl)
            .then(function(e) {
                if (200 == e.code) {
                    if (t) {
                        t();
                    }
                    console.log("清除成功");
                }
            })
            .catch(function() {});
    };
    t.prototype.resetLogin = function() {
        var e = this;
        mm.platform.login(function(n, i) {
            if (n) {
                if (i && "" != i) {
                    //
                } else {
                    i = $sqlUtil.SqlUtil.getLocalUserData($userDataProxy.userDataProxy.codeKey, "");
                }
                t.instance.loginUserCenter(
                    i,
                    function() {
                        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                            wx.uma.setOpenid(t.instance.openId);
                        }
                        $userDataProxy.userDataProxy.setUid(e._playerId);
                        $localDataProxy.localDataProxy.saveData();
                    },
                    function() {},
                    e
                );
            }
        });
    };
    t.prototype.zbActiveState = function(t, e) {
        var n = this;
        var i = {
            openId: t
        };
        var r = JSON.stringify({
            params: $httpRequest.HttpRequest.inst.encryptStr(JSON.stringify(i))
        });
        $httpRequest.HttpRequest.inst
            .request("POST", "/appdata/zhubo/data", r, "https://game.yuanzililiang.cn")
            .then(function(t) {
                if (200 == t.code) {
                    t.data && (n._zbState = t.data.state);
                    e && e(!0);
                } else {
                    if (e) {
                        e(!1);
                    }
                }
            })
            .catch(function() {
                if (e) {
                    e(!1);
                }
            });
    };
    t.prototype.zbActiveApply = function(t, e, n) {
        if (void 0 === n) {
            n = null;
        }
        var i = {
            openId: t,
            name: e
        };
        var r = JSON.stringify({
            params: $httpRequest.HttpRequest.inst.encryptStr(JSON.stringify(i))
        });
        $httpRequest.HttpRequest.inst
            .request("POST", "/appdata/zhubo/apply", r, "https://game.yuanzililiang.cn")
            .then(function(t) {
                if (200 == t.code) {
                    if (n) {
                        n(!0);
                    }
                } else {
                    if (n) {
                        n(!1);
                    }
                }
            })
            .catch(function() {
                if (n) {
                    n(!1);
                }
            });
    };
    t.prototype.clearToken = function() {
        this._token = "";
    };
    t._instance = null;
    return t;
})();
exports.UserCenterMgr = p;