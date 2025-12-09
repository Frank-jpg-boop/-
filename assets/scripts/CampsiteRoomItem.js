import $cfg from './Cfg';
import $audioUtil from './AudioUtil';
import $animUtils from './AnimUtils';
import $globalPopupMgr from './GlobalPopupMgr';
import $playerDataProxy from './PlayerDataProxy';
import $stageDataProxy from './StageDataProxy';
import $campsitePeopleItem from './CampsitePeopleItem';
import $campsiteRewardItem from './CampsiteRewardItem';
let i;
const d = cc._decorator;
const m = d.ccclass;
const y = d.property;
e.prototype.onClickBtnThis = function () {
  const t = this;
  if (this.node.getChildByName('lockMask').getChildByName('lockIcon').active) {
    $globalPopupMgr.default.instance.showTips('暂未解锁');
  } else if ($stageDataProxy.stageDataProxy.passStageId >= this._unlockStageId) {
    const e = $playerDataProxy.playerDataProxy.getBuildLv(this._roomLoc);
    const n = $cfg.default.instance.dataBuild.queryOne(function (n) {
      return n.loc == t._roomLoc && n.lv == e;
    });
    $globalPopupMgr.default.instance.showCampsiteBuildDetailsPopup(n);
  } else {
    $globalPopupMgr.default.instance.showTips('第' + (this._unlockStageId + 1) + '章解锁');
  }
};
e.prototype.updatePoeple = function () {
  const t = this.node.getChildByName('People');
  const e = t.childrenCount;
  const n = Math.min(this.getMaxPoeple(), 5);
  if (n > e) {
    for (const i = e; i < n; ++i) {
      const o = cc.instantiate(this.mCampsitePeopleItemPb);
      t.addChild(o);
      o.getComponent($campsitePeopleItem.default).joinRoom(this.node);
    }
  }
};
e.prototype.getMaxPoeple = function () {
  for (
    const t = this,
      e = 0,
      n = $playerDataProxy.playerDataProxy.getBuildLv(this._roomLoc),
      i = function (n) {
        const i = $cfg.default.instance.dataBuild.queryOne(function (e) {
          return e.loc == t._roomLoc && e.lv == n;
        });
        e += i.max;
      },
      o = 1;
    o <= n;
    ++o
  ) {
    i(o);
  }
  return e;
};
e.prototype.updateView = function () {
  const t = this;
  const e = $stageDataProxy.stageDataProxy.passStageId >= this._unlockStageId;
  const n = this.node.getChildByName('lv').getComponent(cc.Label);
  const i = this.node.getChildByName('lockMask');
  const o = this.node.getChildByName('upArrow');
  if (e) {
    n.node.active = !0;
    const r = $playerDataProxy.playerDataProxy.getBuildLv(this._roomLoc);
    if (r >= this._maxLv) {
      n.string = 'MAX';
    } else {
      n.string = 'Lv.' + $playerDataProxy.playerDataProxy.getBuildLv(this._roomLoc);
    }
    if ($playerDataProxy.playerDataProxy.getIsFirstUnlockBuild(this._roomLoc)) {
      i.active = !0;
      i.getChildByName('unlockTips').active = !1;
      i.getChildByName('lockIcon').active = !1;
      $audioUtil.AudioUtil.playEffect('sounds/lmtw_yx_HomeBuild');
      cc.tween(i)
        .to(0.5, {
          opacity: 0,
        })
        .call(function () {
          i.active = !1;
        })
        .start();
    } else {
      i.active = !1;
    }
    if (this.rewardItem) {
      this.rewardItem.node.active = !0;
      const l = $playerDataProxy.playerDataProxy.getBuildLv(this._roomLoc);
      const h = $cfg.default.instance.dataBuild.queryOne(function (e) {
        return e.loc == t._roomLoc && e.lv == l;
      });
      this.rewardItem.buildData = h;
    }
    const f = $playerDataProxy.playerDataProxy.checkBuildLvUp(this._roomLoc);
    if (o.active != f) {
      if (f) {
        o.y = -73;
        $animUtils.AnimUtil.floatAnim(o, 1, 10);
      }
      o.active = f;
    }
    this.updatePoeple();
  } else {
    if (this.rewardItem) {
      this.rewardItem.node.active = !1;
    }
    n.node.active = !1;
    i.active = !0;
    const d = i.getChildByName('unlockTips');
    const m = i.getChildByName('lockIcon');
    if (
      $stageDataProxy.stageDataProxy.passStageId >=
      $playerDataProxy.playerDataProxy.getBuildUnlockStage(this._roomLoc - 1)
    ) {
      d.active = !0;
      m.active = !1;
      d.getComponent(cc.Label).string = '第' + (this._unlockStageId + 1) + '章解锁';
    } else {
      m.active = !0;
      d.active = !1;
    }
    o.active = !1;
    o.y = -73;
  }
};
e.prototype.initData = function (t) {
  const e = this;
  this._roomLoc = t;
  this._maxLv = $cfg.default.instance.dataBuild.queryAll(function (t) {
    return t.loc == e._roomLoc;
  }).length;
  this._unlockStageId = $playerDataProxy.playerDataProxy.getBuildUnlockStage(this._roomLoc);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.mCampsitePeopleItemPb = null;
  e.rewardItem = null;
  e._roomLoc = 0;
  e._maxLv = 0;
  e._unlockStageId = 0;
  return e;
}
export default _;
