import $nodePoolManager from './NodePoolManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $popupManager from './PopupManager';
import $sceneManager from './SceneManager';
import $dataMgr from './DataMgr';
import $playerDataProxy from './PlayerDataProxy';
import $stageDataProxy from './StageDataProxy';
import $userDataProxy from './UserDataProxy';
import $popHurt from './PopHurt';
import $popupNum from './PopupNum';
import $effectMgr from './EffectMgr';
import $battleEnum from './BattleEnum';
import $levelBattleData from './LevelBattleData';
import $battleSceneBase from './BattleSceneBase';
t._instance = null;
t.prototype.setGameSpeed = function (t) {
  if (this._gameSpeed != t) {
    this._gameSpeed;
    this._gameSpeed = t;
  }
};
t.prototype.addPoolNodePrefabName = function (t) {
  this._battlePrefabPoolPrefabNames.push(t);
};
t.prototype.clear = function () {
  this._gameSpeed = 1;
  if (this._scene) {
    const t = cc.director.getScene().getChildByName('Canvas').getChildByName('GameLayer');
    this._scene.clear();
    this._scene.destroy();
    t.destroyAllChildren();
    this._scene = null;
    this._battlePrefabPoolPrefabNames.forEach(function (t) {
      const e = $nodePoolManager.default.instance.getPoolPrefab(t);
      if (e) {
        $nodePoolManager.default.instance.clearNodePool(e);
      }
    });
    this._battlePrefabPoolPrefabNames = [];
  }
  $nodePoolManager.default.instance.clearAllNodePool();
  this._isBattleing = !1;
};
t.prototype.restartLevelScene = function () {
  const t = this;
  $popupManager.PopupManager.instance.removeAll();
  this.blackIn(0.1, function () {
    t.clear();
    $sceneManager.SceneManager.instance.runScene('game');
  });
};
t.prototype.resetGame = function () {
  const t = this;
  $stageDataProxy.stageDataProxy.resetGame();
  $playerDataProxy.playerDataProxy.resetGame();
  $dataMgr.DataMgr.instance.init($userDataProxy.userDataProxy.data.uid);
  this.blackIn(0.1, function () {
    $popupManager.PopupManager.instance.removeAll();
    t.clear();
    $sceneManager.SceneManager.instance.runScene('home', $frameEnum.Frame.EBundleName.HOME);
  });
};
t.prototype.exitLevelScene = function () {
  const t = this;
  $popupManager.PopupManager.instance.removeAll();
  this.blackIn(0.1, function () {
    t.clear();
    $sceneManager.SceneManager.instance.runScene('home', $frameEnum.Frame.EBundleName.HOME);
  });
  mm.platform.triggerGC();
};
t.prototype.isSceneOut = function (t) {
  const e = this.getCurScene();
  const n = -e.level.node.width / 2;
  const i = e.level.node.width / 2;
  const o = -e.level.node.height / 2;
  const r = e.level.node.height / 2;
  return t.x < n || t.x > i || t.y < o || t.y > r;
};
t.prototype.isScreenOut = function (t, e, n) {
  if (void 0 === e) {
    e = 0;
  }
  if (void 0 === n) {
    n = 0;
  }
  if (this._scene) {
    const i = this._scene.cameraCtrl.gameCamera.getWorldToScreenPoint(t);
    return i.x < e || i.x > cc.winSize.width - e || i.y < n || i.y > cc.winSize.height - n;
  }
};
t.prototype.createOtherNode = function (e, n, a) {
  const s = this;
  if (void 0 === a) {
    a = this._scene.popHurtParent;
  }
  const c = $nodePoolManager.default.instance.getPoolPrefab(e);
  if (c) {
    const l = $nodePoolManager.default.instance.getNode(c);
    l.parent = a;
    if (n) {
      n(l);
    }
  } else {
    $resLoader.ResLoader.loadAsset({
      bundleName: $frameEnum.Frame.EBundleName.GAME,
      path: 'prefabs/battle/other/' + e,
      type: cc.Prefab,
      success: function (o) {
        $nodePoolManager.default.instance.addPoolPrefab(o);
        t.instance.addPoolNodePrefabName(o.name);
        s.createOtherNode(e, n);
      },
    });
  }
};
t.prototype.popupNum = function (e, n, a) {
  const s = this;
  const c = this._popupNumPrefabNameMap.get(a);
  const l = $nodePoolManager.default.instance.getPoolPrefab(c);
  if (l) {
    const u = $nodePoolManager.default.instance.getNode(l);
    this._scene.popHurtParent.addChild(u);
    u.setPosition(e);
    u.getComponent($popupNum.default).popup(n);
  } else {
    $resLoader.ResLoader.loadAsset({
      bundleName: $frameEnum.Frame.EBundleName.GAME,
      path: 'prefabs/battle/other/popup_num/' + c,
      type: cc.Prefab,
      success: function (o) {
        $nodePoolManager.default.instance.addPoolPrefab(o);
        t.instance.addPoolNodePrefabName(o.name);
        s.popupNum(e, n, a);
      },
    });
  }
};
t.prototype.popHurt = function (e, n, a, s, c) {
  const l = this;
  const u = $nodePoolManager.default.instance.getPoolPrefab('PopHurt');
  if (u) {
    const p = $nodePoolManager.default.instance.getNode(u);
    this._scene.popHurtParent.addChild(p);
    p.setPosition(a);
    const f = p.getComponent($popHurt.default);
    const d = e + '_' + c;
    f.popup(e, n, s, d);
  } else {
    $resLoader.ResLoader.loadAsset({
      bundleName: $frameEnum.Frame.EBundleName.GAME,
      path: 'prefabs/battle/other/PopHurt',
      type: cc.Prefab,
      success: function (o) {
        $nodePoolManager.default.instance.addPoolPrefab(o);
        t.instance.addPoolNodePrefabName(o.name);
        l.popHurt(e, n, a, s, c);
      },
    });
  }
};
t.prototype.switchScene = function (t, e) {
  const n = this;
  if (void 0 === e) {
    e = null;
  }
  if (this._isSwitching) {
    //
  } else {
    this._gameSpeed = 1;
    this._isBattleing = !0;
    this._isSwitching = !0;
    this._curSceneType = t;
    this.blackIn(0.2, function () {
      const i = cc.director.getScene().getChildByName('Canvas').getChildByName('GameLayer');
      if (n._scene) {
        n._scene.clear();
        i.destroyAllChildren();
        n._scene = null;
      }
      const a = '';
      if (t === $battleEnum.EBattleSceneType.LEVEL) {
        a = 'prefabs/battle/scene/LevelBattleScene';
        $stageDataProxy.stageDataProxy.enterStage($stageDataProxy.stageDataProxy.selectedStageId);
        $levelBattleData.levelBattleData.init($stageDataProxy.stageDataProxy.selectedStageId);
      }
      $resLoader.ResLoader.loadAsset({
        bundleName: $frameEnum.Frame.EBundleName.GAME,
        path: a,
        type: cc.Prefab,
        success: function (t) {
          const o = cc.instantiate(t);
          i.addChild(o);
          o.x = 0;
          o.setSiblingIndex(0);
          n._scene = o.getComponent($battleSceneBase.default);
          n._scene.init().then(function () {
            if (e) {
              e();
            }
            n.blackOut(0.5, function () {
              n._isSwitching = !1;
            });
          });
        },
      });
    });
  }
};
t.prototype.blackOut = function (t, e) {
  const n = cc.director.getScene().getChildByName('Canvas').getChildByName('GameBattleBlack');
  n.opacity = 255;
  n.active = !0;
  cc.Tween.stopAllByTarget(n);
  cc.tween(n)
    .delay(0.3)
    .to(t, {
      opacity: 0,
    })
    .call(function () {
      n.active = !1;
      if (e) {
        e();
      }
    })
    .start();
};
t.prototype.blackIn = function (t, e) {
  const n = cc.director.getScene().getChildByName('Canvas').getChildByName('GameBattleBlack');
  n.opacity = 0;
  n.active = !0;
  cc.Tween.stopAllByTarget(n);
  cc.tween(n)
    .to(t, {
      opacity: 255,
    })
    .call(function () {
      if (e) {
        e();
      }
    })
    .start();
};
t.prototype.getCurScene = function () {
  return this._scene;
};
Object.defineProperty(t.prototype, 'isBattleing', {
  get: function () {
    return this._isBattleing;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, 'gameSpeed', {
  get: function () {
    return this._gameSpeed;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, 'curSceneType', {
  get: function () {
    return this._curSceneType;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, 'isSwitching', {
  get: function () {
    return this._isSwitching;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t, 'instance', {
  get: function () {
    if (null == t._instance) {
      t._instance = new t();
    }
    return t._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this._scene = null;
  this._isSwitching = !1;
  this._curSceneType = $battleEnum.EBattleSceneType.LEVEL;
  this._isBattleing = !1;
  this._battlePrefabPoolPrefabNames = [];
  this.gm_PlayerInvincible = !1;
  this.gm_InfiniteResurrection = !1;
  this.gm_InfiniteRandom = !1;
  this.gm_InfiniteCandy = !1;
  this.isFixedDisplayUnlock = !0;
  this._popupNumPrefabNameMap = new Map([
    [$battleEnum.EBattlePopupNumType.COMMON_HURT, 'HurtNum'],
    [$battleEnum.EBattlePopupNumType.PLAYER_HURT, 'PlayerHurtNum'],
    [$battleEnum.EBattlePopupNumType.CRIT, 'CritHurtNum'],
    [$battleEnum.EBattlePopupNumType.HEAL, 'HealNum'],
  ]);
  this._gameSpeed = 1;
  $effectMgr.default.instance.init();
}
const g = t;
export default g;
