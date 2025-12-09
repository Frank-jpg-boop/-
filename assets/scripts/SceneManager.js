import $globalPopupMgr from './GlobalPopupMgr';
import $resLoader from './ResLoader';
import $stringUtil from './StringUtil';
import $frameEnum from './FrameEnum';
import $yZLLLoading from './YZLLLoading';
import $yZLLSceneLoading from './YZLLSceneLoading';
import $popupManager from './PopupManager';
exports.SceneManager = void 0;
t._instance = null;
t.prototype.hideLoading = function (t) {
  if (void 0 === t) {
    t = null;
  }
  this._loading.hide(t);
};
t.prototype.showLoading = function (t, e, n, i) {
  if (void 0 === t) {
    t = "加载中";
  }
  if (void 0 === e) {
    e = 120;
  }
  if (void 0 === n) {
    n = null;
  }
  if (void 0 === i) {
    i = !1;
  }
  this._loading.show(t, e, n, i);
};
t.prototype.hideSceneLoading = function (t, e) {
  if (void 0 === t) {
    t = null;
  }
  if (void 0 === e) {
    e = !1;
  }
  this._sceneLoading.hide(t, e);
};
t.prototype.showSceneLoading = function (t, e, n, i, o, r) {
  if (void 0 === t) {
    t = "加载中";
  }
  if (void 0 === e) {
    e = 120;
  }
  if (void 0 === n) {
    n = null;
  }
  if (void 0 === i) {
    i = !1;
  }
  if (void 0 === o) {
    o = !1;
  }
  if (void 0 === r) {
    r = !1;
  }
  this._sceneLoading.show(t, e, n, i, o, r);
};
t.prototype.setSceneLoading = function (t) {
  this._sceneLoading = t.getComponent($yZLLSceneLoading.default);
};
t.prototype.setLoadingNode = function (t) {
  this._loading = t.getComponent($yZLLLoading.default);
};
t.prototype.setCurScene = function (t) {
  this._scene = t;
};
t.prototype.preloadPopups = function (t, e, n) {
  if (e.length > 0) {
    const i = 0;
    e.forEach(function (r) {
      $resLoader.ResLoader.loadAsset({
        bundleName: t,
        path: "popups/" + r,
        type: cc.Prefab,
      }).then(function (t) {
        ++i;
        $popupManager.PopupManager.instance.addPreloadPopup(t);
        if (i == e.length && n) {
          n();
        }
      });
    });
  } else {
    if (n) {
      n();
    }
  }
};
t.prototype.goScene = function (t, e) {
  cc.director.loadScene(t, function () {
    if (e) {
      e();
    }
  });
};
t.prototype.runScene = function (t, e, n, s, c) {
  const l = this;
  if (void 0 === s) {
    s = !0;
  }
  if (void 0 === c) {
    c = [];
  }
  if (this._scene) {
    this._scene = null;
  }
  const u = function () {
    if ($stringUtil.StringUtil.isEmpty(e)) {
      l.goScene(t, n);
    } else {
      $resLoader.ResLoader.loadBundle({
        bundleName: e,
        success: function () {
          l.goScene(t, n);
          l.preloadPopups(e, c, null);
        },
        fail: function () {
          $globalPopupMgr.default.instance.showTips("加载失败");
          l.hideSceneLoading(null, !0);
        },
      });
    }
  };
  if (s) {
    this.showSceneLoading(
      "玩命加载中",
      255,
      function () {
        u();
      },
      !0,
      !0,
      t == $frameEnum.Frame.EBundleName.GAME,
    );
  } else {
    u();
  }
};
Object.defineProperty(t.prototype, "fragment", {
  get: function () {
    return this._fragment;
  },
  set: function (t) {
    this._fragment = t;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "curScene", {
  get: function () {
    return this._scene;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t, "instance", {
  get: function () {
    if (null == this._instance) {
      this._instance = new t();
    }
    return this._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this._scene = null;
  this._fragment = null;
  this._sceneLoading = null;
  this._loading = null;
}
const u = t;
exports.SceneManager = u;
