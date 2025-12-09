import $logger from './Logger';
import $stringUtil from './StringUtil';
export const ResLoader = void 0;
t.setSpritFrame = function (t, e, n, i) {
  this.loadAsset({
    bundleName: e,
    path: n,
    type: cc.SpriteFrame,
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
t.loadAssetAnySequence = function (t) {
  for (const e = [], n = 0; n < t.requests.length; n++) {
    e.push(this.loadAsset(t.requests[n]));
  }
  const i = [];
  const o = 0;
  return new Promise(function (n) {
    if (t.requests.length <= 0) {
      return n(i);
    }
    const r = function () {
      e[o].then(function (a) {
        i.push({
          asset: a,
          option: t.requests[o],
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
              errMsg: t.message,
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
    },
  });
};
t.loadDir = function (t) {
  const e = this;
  if (!t.success) {
    return new Promise(function (n, i) {
      e._loadDir(t.dir, t.bundle, t.bundleName, n, i);
    });
  }
  this._loadDir(t.dir, t.bundle, t.bundleName, t.success, t.fail, t.complete);
};
t.preloadDir = function (t) {
  this.loadBundle({
    bundle: t.bundle,
    bundleName: t.bundleName,
  }).then(function (e) {
    e.preloadDir(t.dir);
  });
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
          errMsg: t.message,
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
t.loadBundle = function (t) {
  const e = this;
  if (!t.success) {
    return new Promise(function (n, i) {
      e._loadBundle(t.bundle, t.bundleName, n, i);
    });
  }
  this._loadBundle(t.bundle, t.bundleName, t.success, t.fail, t.complete);
};
t._loadAsset = function (t, e, n, o, r, a, s) {
  this.loadBundle({
    bundle: n,
    bundleName: o,
    success: function (n) {
      const o = n.get(t, e);
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
              errMsg: t.message,
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
    },
  });
};
t.loadAsset = function (t) {
  const e = this;
  if (!t.success) {
    return new Promise(function (n, i) {
      e._loadAsset(t.path, t.type, t.bundle, t.bundleName, n, i);
    });
  }
  this._loadAsset(t.path, t.type, t.bundle, t.bundleName, t.success, t.fail, t.complete);
};
t.loadAssetSync = function (t, e, n) {
  let i;
  if ((i = $stringUtil.StringUtil.isEmpty(n) ? cc.resources : cc.assetManager.getBundle(n))) {
    return i.get(t, e);
  } else {
    return null;
  }
};
t.preload = function (t) {
  this.loadBundle({
    bundle: t.bundle,
    bundleName: t.bundleName,
  })
    .then(function (e) {
      e.preload(t.paths, t.type);
    })
    .catch(function () {});
};
t.loadAssetAny = function (t) {
  for (const e = [], n = 0; n < t.requests.length; n++) {
    e.push(this.loadAsset(t.requests[n]));
  }
  return Promise.all(e);
};
t._loadRemote = function (t, e, n, i, o) {
  cc.assetManager.loadRemote(t, e, function (t, e) {
    if (t) {
      if (i) {
        i({
          errCode: -1,
          errMsg: t.message,
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
t.loadRemote = function (t) {
  const e = this;
  if (null == t.option) {
    t.option = {};
  }
  const n = t.url;
  const i = t.option;
  const o = t.success;
  const r = t.fail;
  const a = t.complete;
  if (!o) {
    return new Promise(function (t, o) {
      e._loadRemote(n, i, t, o);
    });
  }
  this._loadRemote(n, i, o, r, a);
};
function t() {}
const r = t;
export const ResLoader = r;
