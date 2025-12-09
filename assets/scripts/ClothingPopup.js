import $cfg from './Cfg';
import $itemEnum from './ItemEnum';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $popupBase from './PopupBase';
import $commonRedPoint from './CommonRedPoint';
import $adMgr from './AdMgr';
import $globalPopupMgr from './GlobalPopupMgr';
import $itemDataProxy from './ItemDataProxy';
import $playerDataProxy from './PlayerDataProxy';
let i;
const y = cc._decorator;
const _ = y.ccclass;
const g = y.property;
e.prototype.setBtnSwitchState = function () {
  if (this.mBtnSwitch.active) {
    const t = this.mBtnSwitch.getChildByName("lab");
    const e = this.mBtnSwitch.getChildByName("unlockTips");
    const n = this.mBtnSwitch.getChildByName("videoUnlock");
    const i = this.mBtnSwitch.getChildByName("goldUnlock");
    const o = this.mBtnSwitch.getChildByName("diamondUnlock");
    if ($playerDataProxy.playerDataProxy.isUnlockSkin(this._slecteSkinId)) {
      t.active = !0;
      t.getComponent(cc.Label).string = "使 用";
      t.getComponent(cc.Label).fontSize = 40;
      this.mBtnSwitch.getComponent(cc.Button).interactable = !0;
      n.active = !1;
      i.active = !1;
      o.active = !1;
      return void (e.active = !1);
    }
    t.active = !1;
    const r = $cfg.default.instance.dataSkin.getById(this._slecteSkinId);
    n.active = 2 == r.unlockType;
    i.active = !1;
    o.active = 3 == r.unlockType;
    e.active = 5 == r.unlockType;
    if (e.active) {
      const c = e.getChildByName("tips");
      const l = e.getChildByName("tips1");
      if ($playerDataProxy.playerDataProxy.videoNum >= r.unlockVal) {
        c.getComponent(cc.Label).string = "领  取";
        c.getComponent(cc.Label).fontSize = 40;
        this.mBtnSwitch.getComponent(cc.Button).interactable = !0;
        l.active = !1;
        c.y = 0;
      } else {
        c.getComponent(cc.Label).string =
          "累计观看(" +
          $playerDataProxy.playerDataProxy.videoNum +
          "/" +
          r.unlockVal +
          ")";
        this.mBtnSwitch.getComponent(cc.Button).interactable = !1;
      }
    } else if (n.active) {
      (u = n.getChildByName("videoLab")).getComponent(cc.Label).string =
        "解锁(" +
        $playerDataProxy.playerDataProxy.getSkinVideoNum(this._slecteSkinId) +
        "/" +
        r.unlockVal +
        ")";
      this.mBtnSwitch.getComponent(cc.Button).interactable = !0;
    } else if (o.active) {
      let u;
      (u = o.getChildByName("videoLab")).getComponent(cc.Label).string =
        "x" + r.unlockVal;
      this.mBtnSwitch.getComponent(cc.Button).interactable = !0;
      const p = $itemDataProxy.itemDataProxy.getItemValue(
        $itemEnum.E_ItemId.DIAMOND,
      );
      if (p >= r.unlockVal) {
        u.color = cc.color(255, 255, 255);
      } else {
        u.color = cc.color(255, 75, 75);
      }
    } else if (4 == r.unlockType) {
      const h = $playerDataProxy.playerDataProxy.checkGetSkin(r.id);
      t.active = !0;
      if (h) {
        t.getComponent(cc.Label).string = "领 取";
      } else {
        t.getComponent(cc.Label).string = r.unlockInfo;
      }
      t.getComponent(cc.Label).fontSize = 30;
      this.mBtnSwitch.getComponent(cc.Button).interactable = h;
    } else {
      t.active = !0;
      t.getComponent(cc.Label).string = "使 用";
      t.getComponent(cc.Label).fontSize = 40;
      this.mBtnSwitch.getComponent(cc.Button).interactable = !0;
    }
  }
};
e.prototype.updateSelectSkinRedPoint = function () {
  if (this.mBtnLeft.active) {
    for (const t = !1, e = this._slecteSkinId - 1; e > 0; ) {
      if ($playerDataProxy.playerDataProxy.checkGetSkin(e)) {
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
    for (
      e = this._slecteSkinId + 1;
      e < $cfg.default.instance.dataSkin.size;
    ) {
      if ($playerDataProxy.playerDataProxy.checkGetSkin(e)) {
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
  this.mBtnLeft.active = this._slecteSkinId > 1;
  const t = $cfg.default.instance.dataSkin.sheet();
  const e = Object.keys(t).length;
  this.mBtnRight.active = this._slecteSkinId < e;
  this.node.getChildByName("selectBg").active =
    this._slecteSkinId == $playerDataProxy.playerDataProxy.skinId;
  this.mBtnSwitch.active =
    this._slecteSkinId != $playerDataProxy.playerDataProxy.skinId;
  this.setSkinInfo();
  this.setBtnSwitchState();
  this.updateSelectSkinRedPoint();
};
e.prototype.onBtnRight = function () {
  this._slecteSkinId++;
  this.setSelectChapterBtn();
};
e.prototype.onBtnLeft = function () {
  this._slecteSkinId--;
  this.setSelectChapterBtn();
};
e.prototype.getEffectDes = function (t) {
  for (let e, n = [], i = /\|([^|]+)\|/g; null != (e = i.exec(t.info)); ) {
    n.push(e[1]);
  }
  const o = t.info;
  n.forEach(function (e) {
    const n = e.replace("%", "");
    o = o.replace(
      "|" + e + "|",
      e.includes("%") ? 100 * Number(t[n]) + "%" : "" + t[n],
    );
  });
  return o;
};
e.prototype.setSkinInfo = function () {
  const t = this;
  const e = $cfg.default.instance.dataSkin.getById(this._slecteSkinId);
  $resLoader.ResLoader.loadAsset({
    path: "spines/player/" + e.skin + "/" + e.skin,
    type: sp.SkeletonData,
    bundleName: $frameEnum.Frame.EBundleName.GAME,
  })
    .then(function (e) {
      t.mRoleSp.skeletonData = e;
      t.mRoleSp.setAnimation(0, "bide", !0);
    })
    .catch(function (t) {
      console.log("error:", t);
    });
  this.mRoleName.string = e.name;
  const n = e.baseSkill;
  const i = $cfg.default.instance.dataSkill.getById(n);
  this.mWeaponName.string = i.name;
  $resLoader.ResLoader.loadAsset({
    path: "textures/public/pic_wuping_di_" + i.rare,
    type: cc.SpriteFrame,
    bundleName: $frameEnum.Frame.EBundleName.HOME,
  })
    .then(function (e) {
      t.mGreadImg.spriteFrame = e;
    })
    .catch(function (t) {
      console.log("error:", t);
    });
  $resLoader.ResLoader.loadAsset({
    path: "textures/skill/" + i.icon,
    type: cc.SpriteFrame,
    bundleName: $frameEnum.Frame.EBundleName.GAME,
  })
    .then(function (e) {
      t.mIcon.spriteFrame = e;
    })
    .catch(function (t) {
      console.log("error:", t);
    });
  if (e.unlockReward && "" != e.unlockReward) {
    const o = e.unlockReward.split("_").map(Number);
    const r = $cfg.default.instance.dataAtt.getById(o[0]);
    if (1 == r.isPer) {
      this.mSkillDes.string =
        r.name +
        "+" +
        (100 * o[1]).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] +
        "%";
    } else {
      this.mSkillDes.string = r.name + "+" + o[1];
    }
  } else {
    this.mSkillDes.string = "无";
  }
  const s = e.baseChoose;
  const u = $cfg.default.instance.dataChoose.getById(s);
  if (u) {
    this.mEffectDes.string = this.getEffectDes(u);
  } else {
    this.mEffectDes.string = "无";
  }
};
e.prototype.onBtnSwitch = function () {
  const t = this;
  if ($playerDataProxy.playerDataProxy.isUnlockSkin(this._slecteSkinId)) {
    $playerDataProxy.playerDataProxy.setSkinId(this._slecteSkinId);
    return void this.setSelectChapterBtn();
  }
  const e = $cfg.default.instance.dataSkin.getById(this._slecteSkinId);
  if (2 == e.unlockType) {
    $adMgr.AdMgr.instance.showVideoAd({
      id: 1,
      eventId: "AD_Unlock_Skin",
      success: function () {
        $playerDataProxy.playerDataProxy.setSkinVideoNum(t._slecteSkinId);
        if (
          $playerDataProxy.playerDataProxy.getSkinVideoNum(t._slecteSkinId) >=
          e.unlockVal
        ) {
          $playerDataProxy.playerDataProxy.unlockSkin(t._slecteSkinId);
          $globalPopupMgr.default.instance.showUnlockSkinPopup(
            t._slecteSkinId,
          );
        }
        t.setSelectChapterBtn();
      },
      fail: function () {},
      error: function (t) {
        cc.log(t);
      },
    });
  } else if (3 == e.unlockType) {
    if (
      $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.DIAMOND) <
      e.unlockVal
    ) {
      return void $globalPopupMgr.default.instance.showTips("钻石不足");
    }
    $itemDataProxy.itemDataProxy.updateItemValue(
      $itemEnum.E_ItemId.DIAMOND,
      -e.unlockVal,
    );
    $playerDataProxy.playerDataProxy.unlockSkin(this._slecteSkinId);
    $globalPopupMgr.default.instance.showUnlockSkinPopup(this._slecteSkinId);
    this.setSelectChapterBtn();
  } else {
    if (5 == e.unlockType || 4 == e.unlockType) {
      $playerDataProxy.playerDataProxy.unlockSkin(this._slecteSkinId);
      $globalPopupMgr.default.instance.showUnlockSkinPopup(
        this._slecteSkinId,
      );
      this.setSelectChapterBtn();
    }
  }
};
e.prototype.init = function () {
  this._slecteSkinId = $playerDataProxy.playerDataProxy.skinId;
  $playerDataProxy.playerDataProxy.skinRed = !1;
  $playerDataProxy.playerDataProxy.updateSkinRedPoint();
  this.setSelectChapterBtn();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.mRoleName = null;
  e.mRoleSp = null;
  e.mGreadImg = null;
  e.mIcon = null;
  e.mWeaponName = null;
  e.mSkillDes = null;
  e.mEffectDes = null;
  e.mBtnSwitch = null;
  e.mBtnLeft = null;
  e.mBtnRight = null;
  e._slecteSkinId = 0;
  return e;
}
exports.default = v;
