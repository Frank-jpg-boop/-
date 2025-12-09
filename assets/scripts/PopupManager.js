exports.PopupManager = exports.PopupCacheMode = void 0;
var r;
var $appBase = require("./AppBase");
var $blockInputManager = require("./BlockInputManager");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $appProxy = require("./AppProxy");
var $sceneManager = require("./SceneManager");
var $util = require("./Util");
!(function (t) {
    t[(t.ONCE = 0)] = "ONCE";
    t[(t.CACHE = 1)] = "CACHE";
    t[(t.CACHE_RES = 2)] = "CACHE_RES";
    t[(t.AWAY = 3)] = "AWAY";
})((r = exports.PopupCacheMode || (exports.PopupCacheMode = {})));
var f = (function () {
    function t() {
        this._loadingPopup = [];
        this._dealing = !1;
        this._showOptions = [];
        this.popupNode = null;
        this._popups = [];
        this._prefabMap = {};
        this._nodeMap = {};
        this.popupInit = !1;
        this._globalAnim = null;
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == this._instance) {
                this._instance = new t();
            }
            return this._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "popups", {
        get: function () {
            return this._popups;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "globalAnim", {
        get: function () {
            return this._globalAnim;
        },
        set: function (t) {
            this._globalAnim = t;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.init = function () {
        this.setParent();
    };
    t.prototype.checkDealing = function () {
        if (0 === this._showOptions.length) {
            this._dealing = !1;
            $blockInputManager.BlockInputManager.instance.popupBlockInputNum = 0;
        } else {
            this.dealQueue(this._showOptions.shift());
        }
    };
    t.prototype.dealQueue = function (t) {
        return __awaiter(this, void 0, void 0, function () {
            var e;
            var n;
            var i;
            var r;
            var a;
            var c;
            var u;
            var f;
            return __generator(this, function (o) {
                switch (o.label) {
                    case 0:
                        if ((e = t.name) === this.getCurrentName()) {
                            console.warn(e + "弹框已经显示");
                            this.checkDealing();
                            return [2];
                        }
                        this._dealing = !0;
                        $blockInputManager.BlockInputManager.instance.popupBlockInputNum = 1;
                        n = t.priority || 0;
                        if (null != (i = this._nodeMap[e])) {
                            return [3, 7];
                        }
                        if (null != (r = t.prefab || this._prefabMap[e])) {
                            return [3, 5];
                        }
                        if (null == t.path) {
                            throw (this.checkDealing(), new Error("首次创建必须传入prefab或者path"));
                        }
                        this._loadingPopup.push(e);
                        a = null;
                        o.label = 1;
                    case 1:
                        o.trys.push([1, 3, , 4]);
                        c = null;
                        if (t.notShowLoading) {
                            //
                        } else {
                            c = $util.default.delay(
                                0.5,
                                function () {
                                    $sceneManager.SceneManager.instance.showLoading("玩命加载中");
                                },
                                null
                            );
                        }
                        return [
                            4,
                            $resLoader.ResLoader.loadAsset({
                                bundleName: t.bundleName,
                                path: t.path,
                                type: cc.Prefab
                            })
                        ];
                    case 2:
                        a = o.sent();
                        if (c) {
                            clearTimeout(c);
                            $sceneManager.SceneManager.instance.hideLoading();
                        }
                        return [3, 4];
                    case 3:
                        u = o.sent();
                        $sceneManager.SceneManager.instance.hideLoading();
                        console.error(u);
                        return [3, 4];
                    case 4:
                        if (null == a) {
                            return (
                                this.checkDealing(),
                                $sceneManager.SceneManager.instance.hideLoading(),
                                console.error(t.path + "加载失败"),
                                [2]
                            );
                        } else {
                            return (
                                this._prefabMap[e] || ((this._prefabMap[e] = a), a.addRef()),
                                -1 === (f = this._loadingPopup.indexOf(e))
                                    ? (console.warn(e + "已取消显示"), [2])
                                    : (this._loadingPopup.splice(f, 1),
                                      null == e && (e = a.name),
                                      e === this.getCurrentName()
                                          ? (console.warn(e + "弹框已经显示"), this.checkDealing(), [2])
                                          : ((i = cc.instantiate(a)), [3, 6]))
                            );
                        }
                    case 5:
                        i = cc.instantiate(r);
                        o.label = 6;
                    case 6:
                        this._nodeMap[e] = i;
                        o.label = 7;
                    case 7:
                        this._show(e, i, n, t.params, t.keep || !1, t.closePosition, t.parent);
                        return [2];
                }
            });
        });
    };
    t.prototype.addPreloadPopup = function (t) {
        if (this._prefabMap[t.name]) {
            //
        } else {
            this._prefabMap[t.name] = t;
            t.addRef();
        }
    };
    t.prototype.show = function (t) {
        var e;
        if (!this.popupInit) {
            throw new Error("请先初始化PopupManager");
        }
        var n = t.name || (null === (e = t.prefab) || void 0 === e ? void 0 : e.name);
        if (null == n) {
            if (null == t.path) {
                throw new Error("name、prefab、path不同同时为空");
            }
            n = cc.path.basename(t.path);
        }
        t.name = n;
        if (this._dealing) {
            this._showOptions.push(t);
        } else {
            this.dealQueue(t);
        }
    };
    t.prototype._show = function (t, e, n, i, o, r, a) {
        var s;
        var c = e.getComponent("PopupBase");
        if (null == c) {
            throw (this.checkDealing(), new Error("请将Popup继承PopupBase"));
        }
        var l = this._popups.indexOf(t);
        if (l >= 0) {
            this._popups.splice(l, 1);
        }
        var u = (null === (s = this.getCurrentPopup()) || void 0 === s ? void 0 : s.zIndex) || 0;
        if (n < u) {
            e.active = !1;
            for (var p = this._popups.length - 1; p >= 0; p--) {
                if (n <= (this._nodeMap[this._popups[p]].zIndex || 0)) {
                    this._popups.splice(p, 0, t);
                    break;
                }
            }
        } else if (o) {
            this._popups.push(t);
        } else {
            for (p = 0; p < this._popups.length; p++) {
                var h = this.getPopup(this._popups[p]);
                if (h) {
                    h.active = !1;
                }
            }
            this._popups.push(t);
        }
        c._init(t, r, i);
        var f = a || this.popupNode;
        if (e.parent != f) {
            e.removeFromParent();
            e.parent = f;
        }
        if (e.zIndex != n) {
            if (n > cc.macro.MAX_ZINDEX) {
                n = cc.macro.MAX_ZINDEX;
            } else {
                n < cc.macro.MIN_ZINDEX && (n = cc.macro.MIN_ZINDEX);
            }
            e.zIndex = n;
        }
        if (n >= u) {
            this.showPopup(e);
        } else {
            this.checkDealing();
        }
    };
    t.prototype.showLast = function () {
        var t = null;
        if (this._popups.length > 0) {
            var e = this._popups[this._popups.length - 1];
            t = this._nodeMap[e];
        }
        if (null != t) {
            if (t.active) {
                this.checkDealing();
            } else {
                t.active = !0;
                var n = t.getComponent("PopupBase");
                if (n._isShow) {
                    //
                } else {
                    n._show();
                }
                if (0 === this._showOptions.length) {
                    this.checkDealing();
                }
            }
        } else {
            this.checkDealing();
        }
    };
    t.prototype.showPopup = function (t) {
        var e = this;
        var n = t.getComponent("PopupBase");
        var i = 0 === this._showOptions.length;
        n._show().then(function () {
            if (i) {
                e.checkDealing();
            }
        });
        $eventManager.EventManager.instance.emit($appProxy.AppEvent.POPUP_CHANGED);
        if (i) {
            //
        } else {
            this.checkDealing();
        }
    };
    t.prototype.hidePopup = function (t, e, n) {
        var i = this;
        if (void 0 === e) {
            e = r.ONCE;
        }
        if (void 0 === n) {
            n = !0;
        }
        var o = this._nodeMap[t];
        if (null != o) {
            if (e != r.AWAY) {
                this._nodeMap[t] = null;
            }
            var a = this._prefabMap[t];
            if (e !== r.ONCE && e !== r.CACHE_RES) {
                //
            } else {
                this._prefabMap[t] = null;
            }
            var s = o.getComponent("PopupBase");
            if (o.active) {
                s._hide(n)
                    .then(function () {
                        if (n) {
                            i.removeNode(o, a, e);
                        }
                    })
                    .catch(function () {});
                n || this.removeNode(o, a, e);
            } else {
                this.removeNode(o, a, e);
            }
        } else {
            console.warn(t + "已被销毁");
        }
    };
    t.prototype.removeNode = function (t, e, n) {
        if (r.AWAY !== n) {
            t.destroy();
            r.ONCE === n && e && e.decRef();
        } else {
            if (null != t) {
                t.parent = null;
            }
        }
    };
    t.prototype.remove = function (t, e, n, i) {
        if (void 0 === e) {
            e = r.ONCE;
        }
        if (void 0 === n) {
            n = !0;
        }
        if (void 0 === i) {
            i = !0;
        }
        var o = this._popups.indexOf(t);
        var a = o === this._popups.length - 1;
        if (o >= 0) {
            this._popups.splice(o, 1);
        }
        this.hidePopup(t, e, n);
        if (a && i) {
            this.showLast();
            $eventManager.EventManager.instance.emit($appProxy.AppEvent.POPUP_CHANGED);
        }
    };
    t.prototype.removeAll = function (t, e) {
        if (void 0 === t) {
            t = r.ONCE;
        }
        if (void 0 === e) {
            e = !1;
        }
        var n = this.getCurrentName();
        for (var i in this._nodeMap)
            if (null != this._nodeMap[i] && n !== i) {
                var o = this._popups.indexOf(i);
                if (-1 !== o) {
                    this._popups.splice(o, 1);
                }
                this.hidePopup(i, t, !1);
            }
        if (n) {
            this.remove(n, t, e);
        } else {
            $eventManager.EventManager.instance.emit($appProxy.AppEvent.POPUP_CHANGED);
        }
        this.cleanAllPopup();
    };
    t.prototype.showAll = function () {
        for (var t in this._nodeMap)
            if (null != this._nodeMap[t]) {
                this._nodeMap[t].active = !0;
            }
    };
    t.prototype.hideAll = function () {
        for (var t in this._nodeMap)
            if (null != this._nodeMap[t]) {
                this._nodeMap[t].active = !1;
            }
    };
    t.prototype.has = function (t) {
        return -1 !== this._popups.indexOf(t);
    };
    t.prototype.getCurrentPopup = function () {
        var t = this.getCurrentName();
        if (null == t) {
            return null;
        } else {
            return this._nodeMap[t];
        }
    };
    t.prototype.getCurrentName = function () {
        if (this._popups.length > 0) {
            return this._popups[this._popups.length - 1];
        } else {
            return null;
        }
    };
    t.prototype.getPopup = function (t) {
        return this._nodeMap[t] || null;
    };
    t.prototype.cleanAllPopup = function () {
        this._loadingPopup.length = 0;
        this._popups.length = 0;
        this._showOptions.length = 0;
        this.checkDealing();
    };
    t.prototype.setParent = function () {
        if (this.popupInit) {
            //
        } else {
            this.popupNode = new cc.Node("PopupNode");
            this.popupNode.width = $appBase.rootNode.width;
            this.popupNode.height = $appBase.rootNode.height;
            $appBase.rootNode.addChild(this.popupNode, 1);
            this.popupInit = !0;
        }
    };
    return t;
})();
exports.PopupManager = f;
