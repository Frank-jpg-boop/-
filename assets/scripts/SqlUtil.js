import $cryptoUtil from './CryptoUtil';
import $logger from './Logger';
import $md5 from './Md5';
import $stringUtil from './StringUtil';
import $typeUtil from './TypeUtil';
import $workerManager from './WorkerManager';
exports.SqlUtil = void 0;
t._tempData = {};
t._tempKeys = [];
t._userKeys = null;
t._userId = null;
t._iv = null;
t._key = null;
t.getLocalUserData = function (t, e) {
  return cc.sys.localStorage.getItem(t) || e;
};
t.setLocalUserData = function (t, e) {
  cc.sys.localStorage.setItem(t, e);
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
t.getString = function (t) {
  const e = cc.sys.localStorage.getItem(t);
  if ($stringUtil.StringUtil.isEmpty(e)) {
    return null;
  } else {
    return e;
  }
};
t.clear = function () {
  for (let t in this._tempData) delete this._tempData[t];
  this._tempKeys.length = 0;
  cc.sys.localStorage.clear();
};
t.remove = function (t) {
  if (null != t) {
    delete this._tempData[t];
    const e = this._tempKeys.indexOf(t);
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
t.get = function (t, e) {
  if (null != t) {
    t = yzll.gameConfig.name + t;
    t = $md5.md5(t);
    const n = this.getString(t);
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
t.set = function (t, e) {};
t.clearUserData = function () {
  if (!$stringUtil.StringUtil.isEmpty(this._userId)) {
    if (this._userKeys) {
      //
    } else {
      this._userKeys = this.get("user_save_keys", []);
    }
    for (const t = 0; t < this._userKeys.length; t++) {
      this.remove(this._userId + this._userKeys[t]);
    }
  }
};
t.removeUserData = function (t) {
  if ($stringUtil.StringUtil.isAnyEmpty(this._userId)) {
    //
  } else {
    this.remove(this._userId + t);
  }
};
t.getUserData = function (t, e) {
  if (!$stringUtil.StringUtil.isEmpty(this._userId)) {
    return this.get(this._userId + t, e);
  }
};
t.setUserData = function (t, e) {
  if ($stringUtil.StringUtil.isEmpty(this._userId)) {
    //
  } else {
    this.addUserKey(t);
    this.set(this._userId + t, e);
  }
};
t.init = function (t) {
  this._userId = t;
};
Object.defineProperty(t, "iv", {
  get: function () {
    if (null == this._iv) {
      this._iv = $md5.md5(yzll.gameConfig.gid);
    }
    return this._iv;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t, "key", {
  get: function () {
    if (null == this._key) {
      this._key = $md5.md5(yzll.gameConfig.name);
    }
    return this._key;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {}
const p = t;
exports.SqlUtil = p;
