exports.ResLoader = void 0;
var $logger = require("./Logger");
var $stringUtil = require("./StringUtil");
var r = (function () {
    function t() {}
    t.loadRemote = function (t) {
        var e = this;
        if (null == t.option) {
            t.option = {};
        }
        var n = t.url;
        var i = t.option;
        var o = t.success;
        var r = t.fail;
        var a = t.complete;
        if (!o) {
            return new Promise(function (t, o) {
                e._loadRemote(n, i, t, o);
            });
        }
        this._loadRemote(n, i, o, r, a);
    };
    t._loadRemote = function (t, e, n, i, o) {
        cc.assetManager.loadRemote(t, e, function (t, e) {
            if (t) {
                if (i) {
                    i({
                        errCode: -1,
                        errMsg: t.message
                    });
                }
            } else {
                if (n) {
                    n(e);
                }
            }
            if (o) {
                o();
            }
        });
    };
    t.loadAssetAny = function (t) {
        for (var e = [], n = 0; n < t.requests.length; n++) {
            e.push(this.loadAsset(t.requests[n]));
        }
        return Promise.all(e);
    };
    t.preload = function (t) {
        this.loadBundle({
            bundle: t.bundle,
            bundleName: t.bundleName
        })
            .then(function (e) {
                e.preload(t.paths, t.type);
            })
            .catch(function () {});
    };
    t.loadAssetSync = function (t, e, n) {
        var i;
        if ((i = $stringUtil.StringUtil.isEmpty(n) ? cc.resources : cc.assetManager.getBundle(n))) {
            return i.get(t, e);
        } else {
            return null;
        }
    };
    t.loadAsset = function (t) {
        var e = this;
        if (!t.success) {
            return new Promise(function (n, i) {
                e._loadAsset(t.path, t.type, t.bundle, t.bundleName, n, i);
            });
        }
        this._loadAsset(t.path, t.type, t.bundle, t.bundleName, t.success, t.fail, t.complete);
    };
    t._loadAsset = function (t, e, n, o, r, a, s) {
        this.loadBundle({
            bundle: n,
            bundleName: o,
            success: function (n) {
                var o = n.get(t, e);
                if (null != o) {
                    if (r) {
                        r(o);
                    }
                    return void (s && s());
                }
                n.load(t, e, function (t, e) {
                    if (t) {
                        $logger.Logger.error(t);
                        if (null == a) {
                            //
                        } else {
                            a({
                                errCode: -1,
                                errMsg: t.message
                            });
                        }
                        return void (null == s || s());
                    }
                    if (r) {
                        r(e);
                    }
                    if (s) {
                        s();
                    }
                });
            },
            fail: function (t) {
                if (a) {
                    a(t);
                }
                if (s) {
                    s();
                }
            }
        });
    };
    t.loadBundle = function (t) {
        var e = this;
        if (!t.success) {
            return new Promise(function (n, i) {
                e._loadBundle(t.bundle, t.bundleName, n, i);
            });
        }
        this._loadBundle(t.bundle, t.bundleName, t.success, t.fail, t.complete);
    };
    t._loadBundle = function (t, e, n, i, r) {
        if (t) {
            //
        } else {
            if ($stringUtil.StringUtil.isEmpty(e)) {
                t = cc.resources;
            } else {
                t = cc.assetManager.getBundle(e);
            }
        }
        if (t) {
            if (n) {
                n(t);
            }
            return void (r && r());
        }
        cc.assetManager.loadBundle(e, function (t, e) {
            if (t) {
                if (i) {
                    i({
                        errCode: -1,
                        errMsg: t.message
                    });
                }
                return void (r && r());
            }
            if (n) {
                n(e);
            }
            if (r) {
                r();
            }
        });
    };
    t.preloadDir = function (t) {
        this.loadBundle({
            bundle: t.bundle,
            bundleName: t.bundleName
        }).then(function (e) {
            e.preloadDir(t.dir);
        });
    };
    t.loadDir = function (t) {
        var e = this;
        if (!t.success) {
            return new Promise(function (n, i) {
                e._loadDir(t.dir, t.bundle, t.bundleName, n, i);
            });
        }
        this._loadDir(t.dir, t.bundle, t.bundleName, t.success, t.fail, t.complete);
    };
    t._loadDir = function (t, e, n, i, o, r) {
        this.loadBundle({
            bundle: e,
            bundleName: n,
            success: function (e) {
                e.loadDir(t, function (t, e) {
                    if (t) {
                        if (o) {
                            o({
                                errCode: -1,
                                errMsg: t.message
                            });
                        }
                        return void (r && r());
                    }
                    if (i) {
                        i(e);
                    }
                    if (r) {
                        r();
                    }
                });
            },
            fail: function (t) {
                if (o) {
                    o(t);
                }
                if (r) {
                    r();
                }
            }
        });
    };
    t.loadAssetAnySequence = function (t) {
        for (var e = [], n = 0; n < t.requests.length; n++) {
            e.push(this.loadAsset(t.requests[n]));
        }
        var i = [];
        var o = 0;
        return new Promise(function (n) {
            if (t.requests.length <= 0) {
                return n(i);
            }
            var r = function () {
                e[o].then(function (a) {
                    i.push({
                        asset: a,
                        option: t.requests[o]
                    });
                    if (++o === e.length) {
                        return n(i);
                    }
                    r();
                });
            };
            r();
        });
    };
    t.setSpritFrame = function (t, e, n, i) {
        this.loadAsset({
            bundleName: e,
            path: n,
            type: cc.SpriteFrame
        })
            .then(function (e) {
                t.spriteFrame = e;
                if (i) {
                    i();
                }
            })
            .catch(function (t) {
                console.error(t);
            });
    };
    return t;
})();
exports.ResLoader = r;
