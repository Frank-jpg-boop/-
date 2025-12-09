import $cfg from './Cfg';
import $blockInputManager from './BlockInputManager';
import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $sceneManager from './SceneManager';
import $nodeUtil from './NodeUtil';
import $commonRedPoint from './CommonRedPoint';
import $util from './Util';
import $spAnimCtrl from './SpAnimCtrl';
import $globalPopupMgr from './GlobalPopupMgr';
import $localDataProxy from './LocalDataProxy';
import $playerDataProxy from './PlayerDataProxy';
import $stageDataProxy from './StageDataProxy';
import $homePalmItem from './HomePalmItem';
let i;
const E = cc._decorator;
const S = E.ccclass;
const P = E.property;
e.prototype.onClickBtnSevenSign = function () {
  $globalPopupMgr.default.instance.showSevenSignPopup();
};
e.prototype.onBtnSurvive = function () {
  $globalPopupMgr.default.instance.showSurviveListPopup(this._slectedStageId);
};
e.prototype.updateExploreRewardRedPoint = function () {
  if (this.mBtnLeft.active) {
    for (const t = !1, e = this._slectedStageId - 1; e > 0; ) {
      if ($playerDataProxy.playerDataProxy.hasStageExploreReward(e)) {
        t = !0;
        break;
      }
      e--;
    }
    this.mBtnLeft
      .getChildByName("CommonRedPoint")
      .getComponent($commonRedPoint.default)
      .setRedPointState(t);
  }
  if (this.mBtnRight.active) {
    t = !1;
    e = this._slectedStageId + 1;
    for (
      const n = Math.min(
        $stageDataProxy.stageDataProxy.passStageId + 1,
        $stageDataProxy.stageDataProxy.maxStageId,
      );
      e <= n;
    ) {
      if ($playerDataProxy.playerDataProxy.hasStageExploreReward(e)) {
        t = !0;
        break;
      }
      e++;
    }
    this.mBtnRight
      .getChildByName("CommonRedPoint")
      .getComponent($commonRedPoint.default)
      .setRedPointState(t);
  }
};
e.prototype.setSelectChapterBtn = function () {
  const t = $stageDataProxy.stageDataProxy.passStageId + 2;
  const e = $cfg.default.instance.dataStage.sheet();
  const n = Object.keys(e);
  const i = e[n[n.length - 1]].id;
  const o = !1;
  if (t > i) {
    t = i;
    o = this._slectedStageId == t;
  }
  this.mBtnLeft.active = this._slectedStageId > 1;
  this.mBtnRight.active = this._slectedStageId <= t && !o;
  this.mRewardInfo.active = !1;
  this.mBtnStart.getComponent(cc.Button).interactable =
    this._slectedStageId <= $stageDataProxy.stageDataProxy.passStageId + 1;
  this.setStageInfo();
  this.updateExploreRewardRedPoint();
};
e.prototype.onBtnRight = function () {
  const t = this;
  if (this._isCanMove) {
    this._slectedStageId++;
    this.setSelectChapterBtn();
    this._isCanMove = !1;
    cc.Tween.stopAllByTarget(this.mViewContent);
    const e = this.mViewContent.x - this.mViewContent.parent.width;
    cc.tween(this.mViewContent)
      .to(0.3, {
        position: cc.v3(e, this.mViewContent.y),
      })
      .call(function () {
        t.setPageView();
      })
      .start();
  }
};
e.prototype.onBtnLeft = function () {
  const t = this;
  if (this._isCanMove) {
    this._slectedStageId--;
    this.setSelectChapterBtn();
    this._isCanMove = !1;
    cc.Tween.stopAllByTarget(this.mViewContent);
    const e = this.mViewContent.x + this.mViewContent.parent.width;
    cc.tween(this.mViewContent)
      .to(0.3, {
        position: cc.v3(e, this.mViewContent.y),
      })
      .call(function () {
        t.setPageView();
      })
      .start();
  }
};
e.prototype.onBtnClothing = function () {
  this.mRewardInfo.active = !1;
  const t = $cfg.default.instance.dataCons.getById(15).val;
  if (Number(t) - 1 > $stageDataProxy.stageDataProxy.passStageId) {
    $globalPopupMgr.default.instance.showTips("需要解锁第" + t + "章");
  } else {
    $globalPopupMgr.default.instance.showClothingPopup();
  }
};
e.prototype.onBtnStart = function () {
  this.mRewardInfo.active = !1;
  $stageDataProxy.stageDataProxy.startStagePeople =
    $stageDataProxy.stageDataProxy.getStageSurvivalCount(
      this._slectedStageId,
    );
  $stageDataProxy.stageDataProxy.startPassStageId =
    $stageDataProxy.stageDataProxy.passStageId;
  $stageDataProxy.stageDataProxy.selectedStageId = this._slectedStageId;
  $sceneManager.SceneManager.instance.runScene(
    "game",
    $frameEnum.Frame.EBundleName.GAME,
    null,
    !0,
    [
      "LevelBagPopup",
      "LevelSkillPopup",
      "LevelSkillExPopup",
      "LevelFailPopup",
      "LevelWinPopup",
    ],
  );
};
e.prototype.getBoxReward = function (t) {
  for (
    const e = $cfg.default.instance.dataStage
              .getById(this._slectedStageId)
              .boxReward.split("|")
              [t].split("_"),
          n = "",
          i = 1;
    i < e.length;
    ++i
  ) {
    if (i > 1 && i < e.length) {
      n += "_" + e[i];
    } else {
      n += e[i];
    }
  }
  const o = $playerDataProxy.playerDataProxy.getBoxReward(n);
  this.updateExploreRewardRedPoint();
  $playerDataProxy.playerDataProxy.updateStageExploreRedPoint();
  $globalPopupMgr.default.instance.showAwardNotice(o);
};
e.prototype.getBoxRewardData = function (t) {
  for (
    const e = $cfg.default.instance.dataStage
              .getById(this._slectedStageId)
              .boxReward.split("|")
              [t].split("_"),
          n = [],
          i = 1;
    i < e.length;
    ++i
  ) {
    const o = e[i].split("&");
    n.push({
      itemId: Number(o[0]),
      itemNum: Number(o[1]),
    });
  }
  return n;
};
e.prototype.onBoxItemClick = function (t, e) {
  const n = $cfg.default.instance.dataStage.getById(this._slectedStageId);
  const i =
    $stageDataProxy.stageDataProxy.stageData.stageInfos[this._slectedStageId];
  const o = n.boxReward.split("|");
  const r = (i && i.boxState[e.idx]) || 0;
  const s = !1;
  const c = o[e.idx].split("_");
  const p = i.exploreValue || 0;
  if (0 == r) {
    s = p >= Math.floor(Number(c[0]) * n.maxRoom);
  }
  if (s) {
    $stageDataProxy.stageDataProxy.stageData.stageInfos[
      this._slectedStageId
    ].boxState[e.idx] = 1;
    this.getBoxReward(e.idx);
    $localDataProxy.localDataProxy.saveData();
    this.setBoxItems();
  } else {
    const h = this.mRewardInfo.getChildByName("items");
    h.children.forEach(function (t) {
      t.active = !1;
    });
    const f = h.getChildByName("rewardItem");
    const d = this.getBoxRewardData(e.idx);
    this.mRewardInfo.active = d.length > 0;
    this.mRewardInfo.x = e.boxItem.x;
    for (
      const m = function (t) {
                const e = h.children[t];
                if (e) {
                  //
                } else {
                  e = cc.instantiate(f);
                  h.addChild(e);
                }
                e.active = !0;
                const n = e.getChildByName("greadImg");
                const i = e.getChildByName("icon");
                const o = e.getChildByName("num");
                const r = d[t];
                const s = $cfg.default.instance.dataItem.getById(r.itemId);
                $resLoader.ResLoader.loadAsset({
                  path: "textures/public/pic_wuping_di_" + s.rare,
                  type: cc.SpriteFrame,
                  bundleName: $frameEnum.Frame.EBundleName.HOME,
                })
                  .then(function (t) {
                    n.getComponent(cc.Sprite).spriteFrame = t;
                  })
                  .catch(function (t) {
                    console.log("error:", t);
                  });
                $resLoader.ResLoader.loadAsset({
                  path: "textures/atlas/item/" + s.icon,
                  type: cc.SpriteFrame,
                  bundleName: $frameEnum.Frame.EBundleName.RES,
                })
                  .then(function (t) {
                    i.getComponent(cc.Sprite).spriteFrame = t;
                  })
                  .catch(function (t) {
                    console.log("error:", t);
                  });
                o.getComponent(cc.Label).string = "x" + r.itemNum;
              },
            y = 0;
      y < d.length;
      ++y
    ) {
      m(y);
    }
  }
};
e.prototype.onBtnDetails = function () {
  this.mRewardInfo.active = !1;
  $globalPopupMgr.default.instance.showStageDropOutPopup(
    this._slectedStageId,
  );
};
e.prototype.setBoxItems = function () {
  for (
    const t = $cfg.default.instance.dataStage.getById(this._slectedStageId),
          e =
            $stageDataProxy.stageDataProxy.stageData.stageInfos[
              this._slectedStageId
            ],
          n = t.boxReward.split("|"),
          i = e.exploreValue || 0,
          o = t.maxRoom,
          r = 0;
    r < this.mBoxItems.childrenCount;
    ++r
  ) {
    const s = this.mBoxItems.children[r];
    const c = null;
    if (e) {
      c = e.boxState[r];
    } else {
      c = 0;
    }
    const l = s.getChildByName("onBox");
    const u = s.getChildByName("activeBg");
    const p = s.getChildByName("lab");
    const f = n[r].split("_");
    p.getComponent(cc.Label).string = 100 * Number(f[0]) + "%";
    if (c && 0 != c) {
      if (1 == c) {
        l.active = !1;
        u.active = !1;
      }
    } else if (
      ((l.active = !0),
      (u.active = i >= Math.floor(Number(f[0]) * o)),
      cc.Tween.stopAllByTarget(u),
      u.active)
    ) {
      const d = cc.tween(u).by(0.3, {
        angle: 90,
      });
      cc.tween(u).repeatForever(d).start();
    }
    $nodeUtil.default.addButtonListener(
      s,
      "BattleView",
      "onBoxItemClick",
      this.node,
      {
        boxItem: s,
        idx: r,
      },
    );
  }
  const m = t.survivor.split("|");
  const y = $stageDataProxy.stageDataProxy.getStageSurvivalCount(t.id);
  this.mRichText.string =
    "<b><outline color=#000000 width=3><color=#00FF00>" +
    y +
    "</color><color=#FFFFFF>/" +
    m.length +
    "</color></outline></b>";
  const _ = i / t.maxRoom;
  this.mBoxBar.fillRange = _;
};
e.prototype.setStageInfo = function () {
  const t = $cfg.default.instance.dataStage.getById(this._slectedStageId);
  if (t) {
    this.mChapterLab.string =
      "第" + $util.default.numToString(this._slectedStageId) + "章";
    this.mChapterName.string = t.name;
    this.setBoxItems();
    this.mBtnSurvive.active =
      this._slectedStageId <= $stageDataProxy.stageDataProxy.passStageId + 1;
  } else {
    console.log("获取不到关卡信息:", this._slectedStageId);
  }
};
e.prototype.updateSkin = function () {
  const t = this;
  const e = $cfg.default.instance.dataSkin.getById(
    $playerDataProxy.playerDataProxy.skinId,
  );
  $resLoader.ResLoader.loadAsset({
    path: "spines/player/" + e.skin + "/" + e.skin,
    type: sp.SkeletonData,
    bundleName: $frameEnum.Frame.EBundleName.GAME,
  })
    .then(function (e) {
      for (const n = t.mViewContent.children, i = 0; i < n.length; ++i) {
        const o = n[i].getChildByName("roleSp");
        o.getComponent(sp.Skeleton).skeletonData = e;
        o.getComponent(sp.Skeleton).setAnimation(0, "bide", !0);
      }
    })
    .catch(function (t) {
      console.log("error:", t);
    });
};
e.prototype.setBtnState = function () {
  this.mBtnSurvive.active =
    this._slectedStageId <= $stageDataProxy.stageDataProxy.passStageId + 1;
  const t = $cfg.default.instance.dataCons.getById(15).val;
  if (Number(t) - 1 > $stageDataProxy.stageDataProxy.passStageId) {
    $nodeUtil.default.setSpriteGrayMaterial(this.mBtnClothing);
  } else {
    $nodeUtil.default.setSpriteNormalMaterial(this.mBtnClothing);
  }
};
e.prototype.gmPassStage = function () {
  this._slectedStageId = $stageDataProxy.stageDataProxy.selectedStageId;
  this.setSelectChapterBtn();
  this.setBtnState();
  this.setPageView();
};
e.prototype.touchBegin = function () {
  this.mRewardInfo.active = !1;
};
e.prototype.setPageView = function (t) {
  const e = this;
  if (void 0 === t) {
    t = !1;
  }
  this._isCanMove = !0;
  const n = null;
  if (1 == this._slectedStageId) {
    n = 1;
  } else {
    if (this._slectedStageId == $stageDataProxy.stageDataProxy.maxStageId) {
      n = this._slectedStageId - 2;
    } else {
      n = this._slectedStageId - 1;
    }
  }
  const i = null;
  if (1 == this._slectedStageId) {
    i = 0;
  } else {
    if (this._slectedStageId == $stageDataProxy.stageDataProxy.maxStageId) {
      i = 2;
    } else {
      i = 1;
    }
  }
  this.mViewContent.x = -375 - this.mViewContent.parent.width * i;
  for (
    const o = this.mViewContent.children,
          r = function (i) {
            const r = o[i];
            const l = n + i;
            const u = $cfg.default.instance.dataStage.getById(l);
            if (!u) {
              return "continue";
            }
            r.getChildByName("chapterImg").getComponent(cc.Sprite).spriteFrame =
              c.mStageImgFremes.get(u.pic2);
            const p = r.getChildByName("lockMask");
            const h = p.getChildByName("fingerprint");
            const f = p.getChildByName("maskBg");
            f.active = !0;
            f.zIndex = 2;
            p.active =
              ($stageDataProxy.stageDataProxy.isUnlockNewStage &&
                l == $stageDataProxy.stageDataProxy.passStageId + 1) ||
              l > $stageDataProxy.stageDataProxy.passStageId + 1;
            cc.Tween.stopAllByTarget(h);
            if (p.active) {
              h.opacity = 255;
              const d = cc
                .tween(h)
                .to(1, {
                  opacity: 0,
                })
                .to(1, {
                  opacity: 255,
                });
              cc.tween(h).repeatForever(d).start();
            }
            const y = p.getChildByName("layout");
            y.active = !0;
            y.zIndex = 2;
            const _ = y.getChildByName("tips1");
            const g = y.getChildByName("num");
            const b = y.getChildByName("tips2");
            if (l == $stageDataProxy.stageDataProxy.passStageId + 3) {
              _.getComponent(cc.Label).string = "请先解锁上一章";
              b.active = !1;
              g.active = !1;
            } else {
              _.getComponent(cc.Label).string =
                "第" + (c._slectedStageId - 1) + "章再解救";
              const E = $stageDataProxy.stageDataProxy.getStageSurvivalCount(
                c._slectedStageId - 1,
              );
              const S = Math.max(0, u.need - E);
              const P = u.need - $stageDataProxy.stageDataProxy.startStagePeople;
              if (
                t &&
                $stageDataProxy.stageDataProxy.startStagePeople != E &&
                p.active
              ) {
                cc.Tween.stopAllByTarget(g);
                g.getComponent(cc.Label).string = "" + P;
                g.scale = 1;
                g.opacity = 255;
                cc.tween(g)
                  .delay(0.5)
                  .to(0.3, {
                    opacity: 0,
                  })
                  .call(function () {
                    g.scale = 5;
                    g.opacity = 255;
                    g.getComponent(cc.Label).string = "" + S;
                  })
                  .to(0.3, {
                    scale: 1,
                  })
                  .call(function () {
                    if (l == e._slectedStageId) {
                      if ($stageDataProxy.stageDataProxy.isUnlockNewStage) {
                        y.active = !1;
                        f.active = !1;
                        const t = r
                          .getChildByName("SpAnim")
                          .getComponent($spAnimCtrl.default);
                        t.clearAnim();
                        t.node.active = !0;
                        e.scheduleOnce(function () {
                          p.active = !1;
                        }, 1);
                        t.playAnim("start", 0.5, !1, function () {
                          t.node.active = !1;
                          $stageDataProxy.stageDataProxy.isUnlockNewStage = !1;
                          $blockInputManager.BlockInputManager.instance
                            .netBlockInputNum--;
                        });
                      } else {
                        e._slectedStageId--;
                        e.setSelectChapterBtn();
                        e._isCanMove = !1;
                        cc.Tween.stopAllByTarget(e.mViewContent);
                        const n = e.mViewContent.x + e.mViewContent.parent.width;
                        cc.tween(e.mViewContent)
                          .delay(0.2)
                          .to(0.3, {
                            position: cc.v3(n, e.mViewContent.y),
                          })
                          .call(function () {
                            e._isCanMove = !0;
                          })
                          .start();
                      }
                    }
                  })
                  .start();
              } else {
                g.getComponent(cc.Label).string = "" + S;
              }
              b.active = !0;
              g.active = !0;
            }
          },
          c = this,
          l = 0;
    l < 3;
    ++l
  ) {
    r(l);
  }
};
e.prototype.initStageImgFremes = function (t) {
  const e = this;
  $resLoader.ResLoader.loadAsset({
    path: "textures/chapter/stageImg",
    type: cc.SpriteAtlas,
    bundleName: $frameEnum.Frame.EBundleName.HOME,
  })
    .then(function (n) {
      for (const i = 1; i <= 6; ++i) {
        const o = $cfg.default.instance.dataStage.getById(i);
        e.mStageImgFremes.set(o.pic2, n.getSpriteFrame(o.pic2));
      }
      if (t) {
        t();
      }
    })
    .catch(function (t) {
      console.log("error:", t);
    });
};
e.prototype.addPalmItem = function () {
  for (const t = this.mViewContent.children, e = 0; e < 3; ++e) {
    const n = t[e].getChildByName("lockMask");
    if (n.active) {
      const i = n.getChildByName("palmPoints").children;
      const o = Math.floor(1e3 * Math.random()) % i.length;
      const r = cc.instantiate(this.mHomePalmItemPb);
      n.addChild(r);
      r.getComponent($homePalmItem.default).show();
      r.position = i[o].position;
    }
  }
};
e.prototype.onDestroy = function () {
  this.node.off(cc.Node.EventType.TOUCH_START, this.touchBegin, this);
  $eventManager.EventManager.instance.off(
    $playerDataProxy.EPlayDataEvent.UPDATE_SKIN,
    this.updateSkin,
    this,
  );
  $eventManager.EventManager.instance.off(
    $playerDataProxy.EPlayDataEvent.GM_PASS_STAGE,
    this.gmPassStage,
    this,
  );
};
e.prototype.onLoad = function () {
  const t = this;
  this._slectedStageId = $stageDataProxy.stageDataProxy.selectedStageId;
  this.node.on(cc.Node.EventType.TOUCH_START, this.touchBegin, this);
  $eventManager.EventManager.instance.on(
    $playerDataProxy.EPlayDataEvent.UPDATE_SKIN,
    this.updateSkin,
    this,
  );
  $eventManager.EventManager.instance.on(
    $playerDataProxy.EPlayDataEvent.GM_PASS_STAGE,
    this.gmPassStage,
    this,
  );
  this.setSelectChapterBtn();
  this.initStageImgFremes(function () {
    t.setPageView(!0);
    t.schedule(t.addPalmItem, 2);
    t.updateSkin();
  });
  this.setBtnState();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.mChapterLab = null;
  e.mChapterName = null;
  e.mBoxBar = null;
  e.mBoxItems = null;
  e.mBtnLeft = null;
  e.mBtnRight = null;
  e.mRewardInfo = null;
  e.mRichText = null;
  e.mBtnStart = null;
  e.mHomePalmItemPb = null;
  e.mBtnClothing = null;
  e.mBtnSurvive = null;
  e.mViewContent = null;
  e.mStageImgFremes = new Map();
  e._slectedStageId = 0;
  e._isCanMove = !1;
  return e;
}
exports.default = A;
