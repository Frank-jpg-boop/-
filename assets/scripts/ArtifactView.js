import $cfg from './Cfg';
import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $nodeUtil from './NodeUtil';
import $commonRedPoint from './CommonRedPoint';
import $globalPopupMgr from './GlobalPopupMgr';
import $guideMgr from './GuideMgr';
import $guideDataProxy from './GuideDataProxy';
import $itemDataProxy from './ItemDataProxy';
import $playerDataProxy from './PlayerDataProxy';
import $stageDataProxy from './StageDataProxy';
let i;
const g = cc._decorator;
const v = g.ccclass;
const b = g.property;
e.prototype.onArtifactItemClick = function (t, e) {
  if (
    $guideMgr.GuideMgr.instance.cfgGuideStepId ==
      $guideDataProxy.EGuideStepId.G_24 &&
    11 == e.artifactData.id
  ) {
    $eventManager.EventManager.instance.emit(
      $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
      $guideDataProxy.EGuideStepId.G_24,
    );
  }
  $stageDataProxy.stageDataProxy.unlockSkillId = 0;
  this.setArtifactItem(e.item, e.artifactData);
  $globalPopupMgr.default.instance.showArtifactDetailsPopup(e.artifactData);
};
e.prototype.initArtifactData = function () {
  this._possessArtifacts = [];
  this._lockArtifacts = [];
  const t = $cfg.default.instance.dataSkill.sheet();
  const e = $stageDataProxy.stageDataProxy.passStageId;
  for (let n in t) {
    const i = t[n];
    if ("" != i.icon) {
      if (0 == i.unlockType || (1 == i.unlockType && e >= i.unlockVal)) {
        this._possessArtifacts.push(i);
      } else {
        this._lockArtifacts.push(i);
      }
    }
  }
  this._lockArtifacts.sort(function (t, e) {
    return t.unlockVal - e.unlockVal;
  });
};
e.prototype.setArtifactItem = function (t, e) {
  t.name = "item" + e.id;
  const n = t.getChildByName("greadBg");
  const i = t.getChildByName("name");
  const o = t.getChildByName("icon");
  const r = t.getChildByName("bar");
  const a = t.getChildByName("num");
  i.getComponent(cc.Label).string = e.name;
  $resLoader.ResLoader.loadAsset({
    path: "textures/skill/" + e.icon,
    type: cc.SpriteFrame,
    bundleName: $frameEnum.Frame.EBundleName.GAME,
  })
    .then(function (t) {
      o.getComponent(cc.Sprite).spriteFrame = t;
    })
    .catch(function (t) {
      console.log("error:", t);
    });
  $resLoader.ResLoader.loadAsset({
    path: "textures/artifact/pic_faqi_gread_" + e.rare,
    type: cc.SpriteFrame,
    bundleName: $frameEnum.Frame.EBundleName.HOME,
  })
    .then(function (t) {
      n.getComponent(cc.Sprite).spriteFrame = t;
    })
    .catch(function (t) {
      console.log("error:", t);
    });
  const s = t.getChildByName("lv");
  if (s) {
    const u = t
      .getChildByName("CommonRedPoint")
      .getComponent($commonRedPoint.default);
    const h = $playerDataProxy.playerDataProxy.getArtifactUpGreadNeedNum(e.id);
    const f = e.dmg.split("|").map(Number);
    const d = $playerDataProxy.playerDataProxy.getArtifactLv(e.id);
    t.getChildByName("New")
      .getComponent($commonRedPoint.default)
      .setRedPointState(
        0 != $stageDataProxy.stageDataProxy.unlockSkillId &&
          $stageDataProxy.stageDataProxy.unlockSkillId == e.id,
      );
    if (d < f.length) {
      s.getComponent(cc.Label).string = "Lv." + d;
      const g = $playerDataProxy.playerDataProxy.getArtifactUpGreadNeeItemId(
        e.id,
      );
      const v = $itemDataProxy.itemDataProxy.getItemValue(g);
      r.getComponent(cc.Sprite).fillRange = v / h;
      a.getComponent(cc.Label).string = v + "/" + h;
      u.setRedPointState(v >= h);
    } else {
      s.getComponent(cc.Label).string = "Lv.Max";
      r.getComponent(cc.Sprite).fillRange = 1;
      a.getComponent(cc.Label).string = "Max";
      u.setRedPointState(!1);
    }
  }
};
e.prototype.initArtifactItem = function () {
  const t = this.mPossessItems.children[0];
  t.active = !1;
  for (const e = 0; e < this._possessArtifacts.length; ++e) {
    const n = this._possessArtifacts[e];
    if ((o = this.mPossessItems.children[e])) {
      //
    } else {
      o = cc.instantiate(t);
      this.mPossessItems.addChild(o);
    }
    o.active = !0;
    this.setArtifactItem(o, n);
    $nodeUtil.default.addButtonListener(
      o,
      "ArtifactView",
      "onArtifactItemClick",
      this.node,
      {
        item: o,
        artifactData: n,
      },
    );
  }
  const i = this.mLockItems.children[0];
  i.active = !1;
  for (e = 0; e < this._lockArtifacts.length; ++e) {
    let o;
    n = this._lockArtifacts[e];
    if ((o = this.mLockItems.children[e])) {
      //
    } else {
      o = cc.instantiate(i);
      this.mLockItems.addChild(o);
    }
    o.active = !0;
    this.setArtifactItem(o, n);
    o
      .getChildByName("lockMask")
      .getChildByName("tips")
      .getComponent(cc.Label).string = "第" + (n.unlockVal + 1) + "章解锁";
  }
};
e.prototype.updateArtifactLevel = function () {
  for (const t = this.mPossessItems.children, e = 0; e < t.length; ++e) {
    const n = this._possessArtifacts[e];
    this.setArtifactItem(t[e], n);
  }
};
e.prototype.gmPassStage = function () {
  if (this.node.active) {
    this.initArtifactData();
    this.initArtifactItem();
  }
};
e.prototype.onDisable = function () {
  $stageDataProxy.stageDataProxy.unlockSkillId = 0;
};
e.prototype.onEnable = function () {
  this.initArtifactData();
  this.initArtifactItem();
};
e.prototype.onDestroy = function () {
  $eventManager.EventManager.instance.off(
    $playerDataProxy.EPlayDataEvent.UPDATE_ARTIFACT_LEVEL,
    this.updateArtifactLevel,
    this,
  );
  $eventManager.EventManager.instance.off(
    $playerDataProxy.EPlayDataEvent.GM_PASS_STAGE,
    this.gmPassStage,
    this,
  );
};
e.prototype.onLoad = function () {
  $eventManager.EventManager.instance.on(
    $playerDataProxy.EPlayDataEvent.UPDATE_ARTIFACT_LEVEL,
    this.updateArtifactLevel,
    this,
  );
  $eventManager.EventManager.instance.on(
    $playerDataProxy.EPlayDataEvent.GM_PASS_STAGE,
    this.gmPassStage,
    this,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.mPossessItems = null;
  e.mLockItems = null;
  e._possessArtifacts = [];
  e._lockArtifacts = [];
  return e;
}
exports.default = E;
