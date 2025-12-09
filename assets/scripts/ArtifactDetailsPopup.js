import $cfg from './Cfg';
import $taskEnum from './TaskEnum';
import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $popupBase from './PopupBase';
import $popupManager from './PopupManager';
import $sceneManager from './SceneManager';
import $animUtils from './AnimUtils';
import $nodeUtil from './NodeUtil';
import $globalPopupMgr from './GlobalPopupMgr';
import $guideMgr from './GuideMgr';
import $playerActionMgr from './PlayerActionMgr';
import $guideDataProxy from './GuideDataProxy';
import $itemDataProxy from './ItemDataProxy';
import $playerDataProxy from './PlayerDataProxy';
import $stageDataProxy from './StageDataProxy';
import $homeEnum from './HomeEnum';
import $artifactDetailsItem from './ArtifactDetailsItem';
import $artifactUpGreadItem from './ArtifactUpGreadItem';
let i;
const C = cc._decorator;
const M = C.ccclass;
const I = C.property;
e.prototype.scrollToItem = function (t, e, n, i) {
  if (void 0 === n) {
    n = 'center';
  }
  if (void 0 === i) {
    i = 0.3;
  }
  if (t && e) {
    const o = t.content;
    if (o) {
      const r = t.node.height;
      const a = o.height;
      const s = -e.getPosition().y;
      const c = s - e.height / 2;
      const l = s - e.height;
      const u = 0;
      switch (n) {
        case 'top':
          u = s;
          break;
        case 'center':
        default:
          u = c - (r / 2 - e.height / 2);
          break;
        case 'bottom':
          u = l - r + e.height;
      }
      u = Math.max(0, Math.min(u, a - r));
      t.scrollToOffset(cc.v2(0, u), i, !0);
    }
  }
};
e.prototype.onHideRemainsDetails = function () {
  this.mRemainsDetails.active = !1;
};
e.prototype.onBtnUpGerad = function () {
  let t;
  let e;
  const n = this;
  const i = $playerDataProxy.playerDataProxy.getArtifactLv(this._artifactData.id);
  if (i >= this._artifactData.dmg.split('|').map(Number).length) {
    $globalPopupMgr.default.instance.showTips('已满级');
    return void (
      $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_25 &&
      (this.removeUI(),
      $eventManager.EventManager.instance.emit(
        $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
        $guideDataProxy.EGuideStepId.G_25,
      ))
    );
  }
  const o = $playerDataProxy.playerDataProxy.getArtifactUpGreadNeedNum(this._artifactData.id);
  const r = $playerDataProxy.playerDataProxy.getArtifactUpGreadNeeItemId(this._artifactData.id);
  if ($itemDataProxy.itemDataProxy.getItemValue(r) < o) {
    $animUtils.AnimUtil.shakeAngle(this.mDetailsIcon);
    $globalPopupMgr.default.instance.showTips('碎片不足');
    return void (
      $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_25 &&
      (this.removeUI(),
      $eventManager.EventManager.instance.emit(
        $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
        $guideDataProxy.EGuideStepId.G_25,
      ))
    );
  }
  if ($guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_25) {
    $eventManager.EventManager.instance.emit(
      $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
      $guideDataProxy.EGuideStepId.G_25,
    );
  }
  $playerActionMgr.PlayerActionMgr.instance.triggerAction($taskEnum.EPlayerActionType.WEAPON_UP);
  $itemDataProxy.itemDataProxy.updateItemValue(r, -o);
  const a = !1;
  if (this._moveToItem && this._moveToItem.isValid) {
    if (
      null === (t = this._moveToItem.getComponent($artifactDetailsItem.default)) ||
      void 0 === t
    ) {
      a = void 0;
    } else {
      a = t.getIsUnlock();
    }
  }
  i += 1;
  $playerDataProxy.playerDataProxy.setArtifactLv(this._artifactData.id, i);
  this._isScrollToItem = !0;
  for (const l = this.mSkillItems.children, u = !1, p = null, h = 0; h < l.length; ++h) {
    const f = l[h];
    const m = null;
    if (null === (e = f.getComponent($artifactDetailsItem.default)) || void 0 === e) {
      m = void 0;
    } else {
      m = e.updateArtifactLv();
    }
    if (this._moveToItem != f || p || a) {
      //
    } else {
      u = m;
      p = f;
    }
    if (!m && this._isScrollToItem) {
      this._isScrollToItem = !1;
      this._moveToItem = f;
    }
  }
  if (p && p.isValid && u) {
    const S = cc.instantiate(this.mArtifactUpGreadItemPb);
    p.addChild(S);
    S.getComponent($artifactUpGreadItem.default).play(function () {
      n.scrollToItem(n.scrollView, n._moveToItem);
    });
  }
  this.initAttributes();
  const P = this.mAttributes
    .getChildByName('attribute1')
    .getChildByName('layout')
    .getChildByName('num');
  cc.Tween.stopAllByTarget(P);
  cc.tween(P)
    .to(0.2, {
      scale: 1.2,
    })
    .to(0.1, {
      scale: 1,
    })
    .delay(1)
    .call(function () {
      if ($guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_26) {
        n.removeUI();
      }
    })
    .start();
};
e.prototype.getEffectDes = function (t) {
  for (let e, n = [], i = /\|([^|]+)\|/g; null != (e = i.exec(t.info)); ) {
    n.push(e[1]);
  }
  const o = t.info;
  n.forEach(function (e) {
    const n = e.replace('%', '');
    o = o.replace('|' + e + '|', e.includes('%') ? 100 * Number(t[n]) + '%' : '' + t[n]);
  });
  return o;
};
e.prototype.onUpdateItem = function () {};
e.prototype.onBtnGoClick = function (t, e) {
  if (e.getStage > $stageDataProxy.stageDataProxy.passStageId) {
    $globalPopupMgr.default.instance.showTips('章节还未解锁');
  } else {
    if (1 == e.cfgReward.getStageType) {
      (($stageDataProxy.stageDataProxy.selectedStageId = e.getStage),
        $popupManager.PopupManager.instance.removeAll(),
        $sceneManager.SceneManager.instance.runScene('game', $frameEnum.Frame.EBundleName.GAME));
    } else {
      (this.removeUI(),
        $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 2),
        $globalPopupMgr.default.instance.showSurviveListPopup(e.getStage, !0));
    }
  }
};
e.prototype.onRemainsItemClick = function (t, e) {
  this.mRemainsDetails.active = !0;
  const n = e.rewardDatas[1];
  const i = this.mRemainsDetails.getChildByName('desBg');
  const o = i.getChildByName('des');
  const r = i.getChildByName('getTips');
  const s = i.getChildByName('BtnGo');
  const c = $nodeUtil.default.nodeParentChangeLocalPos(e.item, this.mRemainsDetails);
  if (c.x < 0) {
    i.getChildByName('Bg').scaleX = 1;
    i.x = c.x + i.width / 2 - 50;
  } else {
    i.getChildByName('Bg').scaleX = -1;
    i.x = c.x - i.width / 2 + 50;
  }
  r.getComponent(cc.Label).string = '第' + e.cfgData.getStage + '章';
  const l = $cfg.default.instance.dataChoose.getById(n);
  o.getComponent(cc.Label).string = this.getEffectDes(l);
  $nodeUtil.default.addButtonListener(s, 'ArtifactDetailsPopup', 'onBtnGoClick', this.node, {
    getStage: e.cfgData.getStage,
    cfgReward: e.cfgData,
  });
};
e.prototype.initRemainsItems = function () {
  const t = this._artifactData.speReward;
  this.node.getChildByName('notTips').active = '' == t;
  if ('' != t) {
    for (
      const e = t.split('|'),
        n = this.mRemainsItems.children[0],
        i = function (t) {
          const i = e[t].split('_').map(Number);
          const r = i[0];
          const s = $cfg.default.instance.dataReward.getById(r);
          if (!s) {
            return 'continue';
          }
          const c = o.mRemainsItems.children[t];
          if (c) {
            //
          } else {
            c = cc.instantiate(n);
            o.mRemainsItems.addChild(c);
          }
          c.active = !0;
          const p = c.getChildByName('greadImg');
          const h = c.getChildByName('icon');
          $resLoader.ResLoader.loadAsset({
            path: 'textures/public/pic_wuping_di_' + s.rare,
            type: cc.SpriteFrame,
            bundleName: $frameEnum.Frame.EBundleName.HOME,
          })
            .then(function (t) {
              p.getComponent(cc.Sprite).spriteFrame = t;
            })
            .catch(function (t) {
              console.log('error:', t);
            });
          $resLoader.ResLoader.loadAsset({
            path: 'textures/atlas/item_scene/' + s.spr,
            type: cc.SpriteFrame,
            bundleName: $frameEnum.Frame.EBundleName.RES,
          })
            .then(function (t) {
              h.getComponent(cc.Sprite).spriteFrame = t;
            })
            .catch(function (t) {
              console.log('error:', t);
            });
          const f = 0 != $itemDataProxy.itemDataProxy.getItemValue(r);
          const d = c.getChildByName('notTips');
          if (f) {
            $nodeUtil.default.setSpriteNormalMaterial(p);
            $nodeUtil.default.setSpriteNormalMaterial(h);
            d.active = !1;
          } else {
            $nodeUtil.default.setSpriteGrayMaterial(p);
            $nodeUtil.default.setSpriteGrayMaterial(h);
            d.active = !0;
          }
          $nodeUtil.default.addButtonListener(
            c,
            'ArtifactDetailsPopup',
            'onRemainsItemClick',
            o.node,
            {
              item: c,
              cfgData: s,
              rewardDatas: i,
            },
          );
        },
        o = this,
        r = 0;
      r < e.length;
      ++r
    ) {
      i(r);
    }
  }
};
e.prototype.initAttributes = function () {
  const t = this.mAttributes.getChildByName('attribute1');
  const e = this.mAttributes.getChildByName('attribute2');
  const n = this.mAttributes.getChildByName('attribute3');
  const i = t.getChildByName('layout').getChildByName('num');
  const o = e.getChildByName('num');
  const r = n.getChildByName('num');
  const a = this._artifactData.dmg.split('|').map(Number);
  const s = $playerDataProxy.playerDataProxy.getArtifactLv(this._artifactData.id);
  const c = a[s - 1];
  if (c) {
    i.getComponent(cc.Label).string = '' + c;
  }
  o.getComponent(cc.Label).string = this._artifactData.main2 + 's';
  if (this._artifactData.edge >= 9999) {
    r.getComponent(cc.Label).string = '无限';
  } else {
    r.getComponent(cc.Label).string = '' + this._artifactData.edge;
  }
  const l = a[s];
  const u = $playerDataProxy.playerDataProxy.getArtifactUpGreadNeedNum(this._artifactData.id);
  const p = $playerDataProxy.playerDataProxy.getArtifactUpGreadNeeItemId(this._artifactData.id);
  const h = $itemDataProxy.itemDataProxy.getItemValue(p);
  if (l) {
    this.mAddNum.node.active = h >= u;
    this.mAddNum.string = '+' + (l - a[s - 1]);
  } else {
    this.mAddNum.node.active = !1;
  }
  if (s < a.length) {
    this.mBar.fillRange = h / u;
    this.mDebrisNum.string = h + '/' + u;
    this.mLv.string = 'Lv.' + $playerDataProxy.playerDataProxy.getArtifactLv(this._artifactData.id);
    const f = this.node.getChildByName('BtnUpGerad');
    if (h >= u) {
      $nodeUtil.default.setSpriteNormalMaterial(f);
    } else {
      $nodeUtil.default.setSpriteGrayMaterial(f);
    }
  } else {
    this.mLv.string = 'Lv.Max';
    this.mBar.fillRange = 1;
    this.mDebrisNum.string = 'Max';
    f = this.node.getChildByName('BtnUpGerad');
    $nodeUtil.default.setSpriteGrayMaterial(f);
    f.getChildByName('lab').getComponent(cc.Label).string = '已满级';
  }
  this.initRemainsItems();
};
e.prototype.initMyList = function () {
  for (const t = this, e = this._artifactData.chooseLv.split('|'), n = 0; n < e.length; ++n) {
    const i = e[n];
    if ('' != i) {
      const o = i.split('_');
      const r = Number(o[0]);
      const a = o[1].split('&');
      const s = Number(a[0]);
      this._artifactSkills.push({
        unlockLv: r,
        chooseId: s,
      });
    }
  }
  const c = this.mItemContent.children[0];
  this._isScrollToItem = !0;
  for (n = 0; n < this._artifactSkills.length; ++n) {
    const l = cc.instantiate(c);
    this.mItemContent.addChild(l);
    l.active = !0;
    const u = this._artifactSkills[n];
    if (
      !l
        .getComponent($artifactDetailsItem.default)
        .ininArtifactDetailsItem(u, this._artifactData) &&
      this._isScrollToItem
    ) {
      this._isScrollToItem = !1;
      this._moveToItem = l;
    }
  }
  if (this._moveToItem) {
    //
  } else {
    this._moveToItem = this.mItemContent.children[this.mItemContent.childrenCount - 1];
  }
  this.scheduleOnce(function () {
    t.scrollToItem(t.scrollView, t._moveToItem);
  }, 0.15);
};
e.prototype.onShow = function () {
  this.initMyList();
};
e.prototype.init = function (t) {
  const e = this;
  this._artifactData = t.artifactData;
  this.mName.string = this._artifactData.name;
  $resLoader.ResLoader.loadAsset({
    path: 'textures/public/pic_wuping_di_' + this._artifactData.rare,
    type: cc.SpriteFrame,
    bundleName: $frameEnum.Frame.EBundleName.HOME,
  })
    .then(function (t) {
      e.mGreadImg.spriteFrame = t;
    })
    .catch(function (t) {
      console.log('error:', t);
    });
  $resLoader.ResLoader.loadAsset({
    path: 'textures/skill/' + this._artifactData.icon,
    type: cc.SpriteFrame,
    bundleName: $frameEnum.Frame.EBundleName.GAME,
  })
    .then(function (t) {
      e.mIcon.spriteFrame = t;
    })
    .catch(function (t) {
      console.log('error:', t);
    });
  this.mRemainsDetails.active = !1;
  this.initAttributes();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.mName = null;
  e.mGreadImg = null;
  e.mBar = null;
  e.mDebrisNum = null;
  e.mLv = null;
  e.mIcon = null;
  e.mAttributes = null;
  e.mRemainsItems = null;
  e.mRemainsDetails = null;
  e.mAddNum = null;
  e.mSkillItems = null;
  e.mDetailsIcon = null;
  e.mItemContent = null;
  e.scrollView = null;
  e.mArtifactUpGreadItemPb = null;
  e.nBtnUp = null;
  e._artifactData = null;
  e._artifactSkills = [];
  e._isScrollToItem = !0;
  e._moveToItem = null;
  return e;
}
export default R;
