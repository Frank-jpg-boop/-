exports.SqlUtil = void 0;
var $cryptoUtil = require("./CryptoUtil");
var $logger = require("./Logger");
var $md5 = require("./Md5");
var $stringUtil = require("./StringUtil");
var $typeUtil = require("./TypeUtil");
var $workerManager = require("./WorkerManager");
var p = (function () {
    function t() {}
    Object.defineProperty(t, "key", {
        get: function () {
            if (null == this._key) {
                this._key = $md5.md5(yzll.gameConfig.name);
            }
            return this._key;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t, "iv", {
        get: function () {
            if (null == this._iv) {
                this._iv = $md5.md5(yzll.gameConfig.gid);
            }
            return this._iv;
        },
        enumerable: !1,
        configurable: !0
    });
    t.init = function (t) {
        this._userId = t;
    };
    t.setUserData = function (t, e) {
        if ($stringUtil.StringUtil.isEmpty(this._userId)) {
            //
        } else {
            this.addUserKey(t);
            this.set(this._userId + t, e);
        }
    };
    t.getUserData = function (t, e) {
        if (!$stringUtil.StringUtil.isEmpty(this._userId)) {
            return this.get(this._userId + t, e);
        }
    };
    t.removeUserData = function (t) {
        if ($stringUtil.StringUtil.isAnyEmpty(this._userId)) {
            //
        } else {
            this.remove(this._userId + t);
        }
    };
    t.clearUserData = function () {
        if (!$stringUtil.StringUtil.isEmpty(this._userId)) {
            if (this._userKeys) {
                //
            } else {
                this._userKeys = this.get("user_save_keys", []);
            }
            for (var t = 0; t < this._userKeys.length; t++) {
                this.remove(this._userId + this._userKeys[t]);
            }
        }
    };
    t.set = function (t, e) {
        return __awaiter(this, void 0, void 0, function () {
            var n;
            var i;
            var p = this;
            return __generator(this, function (o) {
                switch (o.label) {
                    case 0:
                        if ($stringUtil.StringUtil.isEmpty(t)) {
                            $logger.Logger.error("存储的key不能为空");
                            return [2];
                        }
                        if (-1 !== this._tempKeys.indexOf(t)) {
                            this._tempData[t] = e;
                            return [2];
                        }
                        if (null == e) {
                            $logger.Logger.debug("存储的值为空，则直接移除该存储");
                            this.remove(t);
                            return [2];
                        }
                        if ($typeUtil.TypeUtil.isFunction(e)) {
                            $logger.Logger.error("储存的值不能为方法");
                            return [2];
                        }
                        this._tempKeys.push(t);
                        n = yzll.gameConfig.name + t;
                        n = $md5.md5(n);
                        e = JSON.stringify({
                            yzllVal: e
                        });
                        o.label = 1;
                    case 1:
                        o.trys.push([1, 5, , 6]);
                        return $workerManager.WorkerManager.instance.isSupport
                            ? [
                                  4,
                                  $workerManager.WorkerManager.instance.postMessage({
                                      type: "ZS_AES_ENCRYPT",
                                      key: this.key,
                                      iv: this.iv,
                                      value: e
                                  })
                              ]
                            : [3, 3];
                    case 2:
                        e = o.sent();
                        return [3, 4];
                    case 3:
                        e = $cryptoUtil.CryptoUtil.aesEncrypt(e, this.key, this.iv);
                        o.label = 4;
                    case 4:
                        return [3, 6];
                    case 5:
                        o.sent();
                        e = null;
                        return [3, 6];
                    case 6:
                        i = {
                            key: n,
                            data: e,
                            success: null,
                            complete: function () {
                                var e = p._tempKeys.indexOf(t);
                                if (-1 !== e) {
                                    p._tempKeys.splice(e, 1);
                                }
                                if (p._tempData.hasOwnProperty(t) || -1 === e) {
                                    var n = p._tempData[t] || null;
                                    delete p._tempData[t];
                                    p.set(t, n);
                                }
                            }
                        };
                        setTimeout(function () {
                            var t;
                            var e;
                            cc.sys.localStorage.setItem(i.key, i.data);
                            if (null === (t = null == i ? void 0 : i.success) || void 0 === t) {
                                //
                            } else {
                                t.call(i);
                            }
                            if (null === (e = null == i ? void 0 : i.complete) || void 0 === e) {
                                //
                            } else {
                                e.call(i);
                            }
                        }, 1);
                        return [2];
                }
            });
        });
    };
    t.get = function (t, e) {
        if (null != t) {
            t = yzll.gameConfig.name + t;
            t = $md5.md5(t);
            var n = this.getString(t);
            if (!$stringUtil.StringUtil.isEmpty(n)) {
                try {
                    n = $cryptoUtil.CryptoUtil.aesDecrypt(n, this.key, this.iv);
                } catch (t) {
                    n = null;
                }
            }
            if (n && -1 !== n.indexOf("yzllVal")) {
                return JSON.parse(n).yzllVal;
            }
            if (null == e) {
                return n;
            }
            if (null === n) {
                return e;
            }
            if ($typeUtil.TypeUtil.isString(e)) {
                return n;
            }
            if ($typeUtil.TypeUtil.isNumber(e)) {
                return Number(n);
            }
            if ($typeUtil.TypeUtil.isBoolean(e)) {
                return "true" == n;
            }
            if ($typeUtil.TypeUtil.isObject(e)) {
                try {
                    return JSON.parse(n);
                } catch (t) {
                    $logger.Logger.error("解析数据失败,str=" + n);
                    return e;
                }
            }
            return n;
        }
        $logger.Logger.error("存储的key不能为空");
    };
    t.remove = function (t) {
        if (null != t) {
            delete this._tempData[t];
            var e = this._tempKeys.indexOf(t);
            if (-1 !== e) {
                this._tempKeys.splice(e, 1);
            }
            t = yzll.gameConfig.name + t;
            t = $md5.md5(t);
            cc.sys.localStorage.removeItem(t);
        } else {
            $logger.Logger.error("存储的key不能为空");
        }
    };
    t.clear = function () {
        for (var t in this._tempData) delete this._tempData[t];
        this._tempKeys.length = 0;
        cc.sys.localStorage.clear();
    };
    t.getString = function (t) {
        var e = cc.sys.localStorage.getItem(t);
        if ($stringUtil.StringUtil.isEmpty(e)) {
            return null;
        } else {
            return e;
        }
    };
    t.addUserKey = function (t) {
        if (this._userKeys) {
            //
        } else {
            this._userKeys = this.get("user_save_keys", []);
        }
        if (-1 == this._userKeys.indexOf(t)) {
            this._userKeys.push(t);
            this.set("user_save_keys", this._userKeys);
        }
    };
    t.setLocalUserData = function (t, e) {
        cc.sys.localStorage.setItem(t, e);
    };
    t.getLocalUserData = function (t, e) {
        return cc.sys.localStorage.getItem(t) || e;
    };
    t._key = null;
    t._iv = null;
    t._userId = null;
    t._userKeys = null;
    t._tempKeys = [];
    t._tempData = {};
    return t;
})();
exports.SqlUtil = p;
