import $appBase from './AppBase';
import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $util from './Util';
import $battleMgr from './BattleMgr';
import $guidePopup from './GuidePopup';
import $cfg from './Cfg';
import $guideDataProxy from './GuideDataProxy';
import $reportMgr from './ReportMgr';
import $blockInputManager from './BlockInputManager';
import $audioUtil from './AudioUtil';
exports.GuideMgr = exports.EGuideEvent = void 0;
let i;
!(function (t) {
  t.COMPLETE_GUIDE_STEP = "COMPLETE_GUIDE_STEP";
  t.GUIDE_CHANGE = "GUIDE_CHANGE";
})((i = exports.EGuideEvent || (exports.EGuideEvent = {})));
t.prototype.initGuideStep41 = function () {
  const t = {
    isShowGuidePopup: !0,
    rootNode: this._popupNode,
    path: "",
    updateInitData: function (t) {
      if ("game" == cc.director.getScene().name) {
        const e = $battleMgr.default.instance.getCurScene();
        if (e && e.isInit && e.isPlay) {
          t.rootNode = $appBase.topNode;
          t.path = "ElectricItem";
          e.pause();
        }
      }
    },
    onClickScreen: function () {
      $battleMgr.default.instance.getCurScene().resume();
      $eventManager.EventManager.instance.emit(
        i.COMPLETE_GUIDE_STEP,
        $guideDataProxy.EGuideStepId.G_41,
      );
      $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_Click");
    },
    delay: 0.1,
  };
  this._guideStepMap.set(41, t);
};
t.prototype.initGuideStep27 = function () {
  const t = {
    isShowGuidePopup: !0,
    rootNode: this._popupNode,
    showFinger: !0,
    updateInitData: function (t) {
      if ("home" == cc.director.getScene().name) {
        t.rootNode = cc.director.getScene();
      }
    },
    onClickTarget: function () {
      $eventManager.EventManager.instance.emit(
        i.COMPLETE_GUIDE_STEP,
        $guideDataProxy.EGuideStepId.G_27,
      );
    },
    onStart: function () {
      if (
        0 != $blockInputManager.BlockInputManager.instance.netBlockInputNum
      ) {
        $blockInputManager.BlockInputManager.instance.netBlockInputNum--;
      }
    },
    path: "Canvas/pages/BattleView/BtnStart",
    delay: 0.5,
  };
  this._guideStepMap.set(27, t);
};
t.prototype.initGuideStep26 = function () {
  const t = {
    isShowGuidePopup: !0,
    rootNode: this._popupNode,
    showFinger: !0,
    updateInitData: function (t) {
      if ("home" == cc.director.getScene().name) {
        t.rootNode = cc.director.getScene();
      }
      const e = cc.find("Canvas/pages/BattleView", cc.director.getScene());
      if (e && e.active) {
        $eventManager.EventManager.instance.emit(
          i.COMPLETE_GUIDE_STEP,
          $guideDataProxy.EGuideStepId.G_26,
        );
        t.path = "";
      }
    },
    onStart: function () {
      if (
        0 != $blockInputManager.BlockInputManager.instance.netBlockInputNum
      ) {
        $blockInputManager.BlockInputManager.instance.netBlockInputNum--;
      }
    },
    onEnd: function () {
      $blockInputManager.BlockInputManager.instance.netBlockInputNum++;
    },
    path: "Canvas/downUI/btns/BtnBattle",
    delay: 1,
  };
  this._guideStepMap.set(26, t);
};
t.prototype.initGuideStep25 = function () {
  const t = {
    isShowGuidePopup: !0,
    rootNode: this._popupNode,
    showFinger: !0,
    path: "ArtifactDetailsPopup/BtnUpGerad",
    delay: 0.5,
    onStart: function () {
      if (
        0 != $blockInputManager.BlockInputManager.instance.netBlockInputNum
      ) {
        $blockInputManager.BlockInputManager.instance.netBlockInputNum--;
      }
    },
    onEnd: function () {
      $blockInputManager.BlockInputManager.instance.netBlockInputNum++;
    },
  };
  this._guideStepMap.set(25, t);
};
t.prototype.initGuideStep24 = function () {
  const t = {
    isShowGuidePopup: !0,
    rootNode: this._popupNode,
    showFinger: !0,
    path: "Canvas/pages/ArtifactView/scrollView/view/content/possessRoot/items/item11",
    updateInitData: function (t) {
      t.rootNode = cc.director.getScene();
    },
    onStart: function () {
      if (
        0 != $blockInputManager.BlockInputManager.instance.netBlockInputNum
      ) {
        $blockInputManager.BlockInputManager.instance.netBlockInputNum--;
      }
    },
    onEnd: function () {
      $blockInputManager.BlockInputManager.instance.netBlockInputNum++;
    },
    delay: 0.5,
  };
  this._guideStepMap.set(24, t);
};
t.prototype.initGuideStep23 = function () {
  const t = {
    isShowGuidePopup: !0,
    rootNode: this._popupNode,
    showFinger: !0,
    path: "Canvas/downUI/btns/BtnArtifact",
    updateInitData: function (t) {
      if ("home" == cc.director.getScene().name) {
        t.rootNode = cc.director.getScene();
      }
    },
    onStart: function () {
      if (
        0 != $blockInputManager.BlockInputManager.instance.netBlockInputNum
      ) {
        $blockInputManager.BlockInputManager.instance.netBlockInputNum--;
      }
    },
    onEnd: function () {
      $blockInputManager.BlockInputManager.instance.netBlockInputNum++;
    },
    delay: 0.1,
  };
  this._guideStepMap.set(23, t);
};
t.prototype.initGuideStep21 = function () {
  const t = {
    isShowGuidePopup: !0,
    rootNode: this._popupNode,
    path: "",
    updateInitData: function (t) {
      if ("home" == cc.director.getScene().name) {
        t.rootNode = null;
        $blockInputManager.BlockInputManager.instance.netBlockInputNum--;
      }
    },
    onClickScreen: function () {
      $eventManager.EventManager.instance.emit(
        i.COMPLETE_GUIDE_STEP,
        $guideDataProxy.EGuideStepId.G_21,
      );
      $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_Click");
    },
    onEnd: function () {
      $blockInputManager.BlockInputManager.instance.netBlockInputNum++;
    },
    delay: 0.1,
  };
  this._guideStepMap.set(21, t);
};
t.prototype.initGuideStepBattle = function () {
  for (const t = 1; t <= 14; ++t) {
    this._guideStepMap.set(t, {
      isShowGuidePopup: !1,
    });
  }
};
t.prototype.initGuideStepData = function () {
  this.initGuideStepBattle();
  this.initGuideStep21();
  this.initGuideStep23();
  this.initGuideStep24();
  this.initGuideStep25();
  this.initGuideStep26();
  this.initGuideStep27();
  this.initGuideStep41();
};
t.prototype.onGuideStepComplete = function (t) {
  $reportMgr.ReportMgr.instance.reportEvent("Guide", {
    userA: "" + t,
  });
  this.closeGuide();
  this.saveGuide(t);
  this.enterNextGuide();
};
t.prototype.closeGuide = function () {
  if (this._isGuideing) {
    if (this._guideUI) {
      this._guideUI.close();
    }
    this._curGuideStepTarget = null;
    this._isGuideing = !1;
  }
};
t.prototype.openGuide = function (t, e) {
  if (this._isGuideing) {
    //
  } else {
    if (
      this._curGuideStepData &&
      this._curGuideStepData != e &&
      this._curGuideStepData.onEnd
    ) {
      this._curGuideStepData.onEnd.call(this._curGuideStepData.eventCaller);
    }
    if (e.onInitPopupOption) {
      e.onInitPopupOption.call(e.eventCaller, t);
    }
    if (this._guideUI) {
      this._guideUI.open(t);
    }
    this._curGuideStepTarget = t.target;
    if (e.onStart) {
      e.onStart.call(e.eventCaller);
    }
    this._curGuideStepData = e;
    this._isGuideing = !0;
  }
};
t.prototype.updateGuide = function (t) {
  if (this._isInit && null != this._cfgGuide && !this._isLockGuide) {
    if (this._isGuideing) {
      if (this._curGuideStepData && this._curGuideStepData.onUpdate) {
        this._curGuideStepData.onUpdate.call(
          this._curGuideStepData.eventCaller,
          t,
        );
      }
    } else if (this._guideStepMap.has(this._cfgGuide.id)) {
      const e = this._guideStepMap.get(this._cfgGuide.id);
      if (e.updateInitData) {
        e.updateInitData.call(e.eventCaller, e);
      }
      if (e.isShowGuidePopup) {
        if (null == e.rootNode) {
          const n = {
            target: null,
            cfg: this._cfgGuide,
            onClickTarget: e.onClickTarget,
            onClickScreen: e.onClickScreen,
            eventCaller: e.eventCaller,
            fingerOffsetPos: e.fingerOffsetPos,
            showFinger: e.showFinger,
            delay: e.delay,
          };
          this.openGuide(n, e);
        } else if ("" == e.path) {
          this._curGuideStepData != e &&
            (this._curGuideStepData &&
              this._curGuideStepData.onEnd &&
              this._curGuideStepData.onEnd.call(
                this._curGuideStepData.eventCaller,
              ),
            (this._curGuideStepData = e),
            this._curGuideStepData.onStart &&
              this._curGuideStepData.onStart.call(
                this._curGuideStepData.eventCaller,
              ));
          e.onUpdate && e.onUpdate.call(e.eventCaller, t);
        } else {
          const i = cc.find(e.path, e.rootNode);
          if (i && i.activeInHierarchy) {
            n = {
              target: i,
              cfg: this._cfgGuide,
              onClickTarget: e.onClickTarget,
              onClickScreen: e.onClickScreen,
              eventCaller: e.eventCaller,
              fingerOffsetPos: e.fingerOffsetPos,
              showFinger: e.showFinger,
              delay: e.delay,
            };
            this.openGuide(n, e);
          } else {
            if (e.onTargetNotFind) {
              e.onTargetNotFind.call(e.eventCaller);
            }
          }
        }
      }
    }
  }
};
t.prototype.triggerGuide = function (t) {
  const e = this;
  const n = null;
  if (this._cfgGuide) {
    n = this._cfgGuide.id;
  } else {
    n = -1;
  }
  this._cfgGuide = null;
  this._guideUI.scheduleOnce(function () {
    e._cfgGuide = t;
    $eventManager.EventManager.instance.emit(
      i.GUIDE_CHANGE,
      t ? e._cfgGuide.id : -1,
      n,
    );
  });
};
t.prototype.saveGuide = function (t) {
  $guideDataProxy.guideDataProxy.pushGuide(t);
};
t.prototype.enterNextGuide = function () {
  if (null != this._cfgGuide) {
    const t = $cfg.default.instance.dataGuide.sheet();
    t.sort(function (t, e) {
      return t.id - e.id;
    });
    for (const e = 0; e < t.length; e++) {
      const n = t[e];
      if (n.id > this._cfgGuide.id) {
        return void this.triggerGuide(n);
      }
    }
    this.triggerGuide(null);
    this._isCompleteGuide = !0;
  }
};
t.prototype.initGuide = function () {
  const t = this;
  this._isGuideing = !1;
  this._isLockGuide = !1;
  this._popupNode = $appBase.rootNode.getChildByName("PopupNode");
  this.initGuideStepData();
  $resLoader.ResLoader.loadAsset({
    bundleName: $frameEnum.Frame.EBundleName.RES,
    path: "popups/GuidePopup",
    type: cc.Prefab,
    success: function (e) {
      e.addRef();
      t._guideNodeParent = new cc.Node("GuideNode");
      $appBase.topNode.addChild(t._guideNodeParent);
      t._guideNodeParent.width = $appBase.topNode.width;
      t._guideNodeParent.height = $appBase.topNode.height;
      t._guideNodeParent.setSiblingIndex(0);
      const n = cc.instantiate(e);
      t._guideNodeParent.addChild(n);
      n.active = !1;
      t._guideUI = n.getComponent($guidePopup.default);
      $util.default.delay(
        1,
        function () {
          t._isInit = !0;
        },
        t,
      );
    },
  });
  if (-1 != $guideDataProxy.guideDataProxy.curGuideId) {
    this._cfgGuide = $cfg.default.instance.dataGuide.getById(
      $guideDataProxy.guideDataProxy.curGuideId,
    );
  }
  $eventManager.EventManager.instance.on(
    i.COMPLETE_GUIDE_STEP,
    this.onGuideStepComplete,
    this,
  );
};
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
Object.defineProperty(t.prototype, "isComplateGuide", {
  get: function () {
    return this._isCompleteGuide;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "cfgGuideStepId", {
  get: function () {
    if (this._cfgGuide) {
      return this._cfgGuide.id;
    } else {
      return $guideDataProxy.EGuideStepId.NONE;
    }
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this.isPauseGuideEemey = !1;
  this._cfgGuide = null;
  this._curGuideStepData = null;
  this._curGuideStepTarget = null;
  this._isGuideing = !1;
  this._isCompleteGuide = !1;
  this._guideStepMap = new Map();
  this._guideNodeParent = null;
  this._popupNode = null;
  this._guideUI = null;
  this._isLockGuide = !1;
  this._isInit = !1;
}
const y = t;
exports.GuideMgr = y;
