import $globalEnum from './GlobalEnum';
import $sqlUtil from './SqlUtil';
import $frameEnum from './FrameEnum';
import $audioManager from './AudioManager';
exports.AudioUtil = void 0;
t._curMusicPath = "";
t._effectSwitch = !0;
t._musicSwitch = !0;
t.playLimitEffect = function (e, n, i) {
  if (void 0 === n) {
    n = 0.5;
  }
  if (void 0 === i) {
    i = !1;
  }
  if (t._effectSwitch) {
    $audioManager.AudioManager.instance.playLimitTimeEffect(
      e,
      $frameEnum.Frame.EBundleName.RES,
      n,
      i,
    );
  }
};
t.stopAllEffect = function () {
  $audioManager.AudioManager.instance.stopAllEffect();
};
t.stopEffect = function (t, e) {
  if (void 0 === e) {
    e = "";
  }
  $audioManager.AudioManager.instance.stopEffect(t, e);
};
t.playEffect = function (e, n, i) {
  if (t._effectSwitch) {
    $audioManager.AudioManager.instance.playEffectPath(e, n, !0, i);
  }
};
t.resumeMusic = function () {
  if (t._musicSwitch) {
    $audioManager.AudioManager.instance.resumeBgm();
  }
};
t.pauseMusic = function () {
  if (t._musicSwitch) {
    $audioManager.AudioManager.instance.pauseBgm();
  }
};
t.playMusic = function (e, n, i) {
  if (void 0 === n) {
    n = $frameEnum.Frame.EBundleName.RES;
  }
  t._curMusicPath = e;
  if (t._musicSwitch) {
    $audioManager.AudioManager.instance.playBgmPath(e, n, i);
  }
};
t.setEffectSwitch = function (e, n) {
  if (void 0 === n) {
    n = !0;
  }
  t._effectSwitch = e;
  if (n) {
    $sqlUtil.SqlUtil.setLocalUserData(
      $globalEnum.Global.ELocalDataKey.AUDIO_EFFECT_SWITCH,
      e ? 1 : 0,
    );
  }
};
t.setMusicSwitch = function (e, n) {
  if (void 0 === n) {
    n = !0;
  }
  if (t._musicSwitch != e) {
    t._musicSwitch = e;
    if (n) {
      $sqlUtil.SqlUtil.setLocalUserData(
        $globalEnum.Global.ELocalDataKey.MUSIC_SWITCH,
        e ? 1 : 0,
      );
    }
    if (e) {
      t.playMusic(t._curMusicPath, $frameEnum.Frame.EBundleName.RES, !0);
    } else {
      $audioManager.AudioManager.instance.pauseBgm();
    }
  }
};
t.init = function () {
  t._musicSwitch =
    1 ==
    $sqlUtil.SqlUtil.getLocalUserData(
      $globalEnum.Global.ELocalDataKey.MUSIC_SWITCH,
      1,
    );
  t._effectSwitch =
    1 ==
    $sqlUtil.SqlUtil.getLocalUserData(
      $globalEnum.Global.ELocalDataKey.AUDIO_EFFECT_SWITCH,
      1,
    );
};
Object.defineProperty(t, "effectSwitch", {
  get: function () {
    return t._effectSwitch;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t, "musicSwitch", {
  get: function () {
    return t._musicSwitch;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {}
const s = t;
exports.AudioUtil = s;
