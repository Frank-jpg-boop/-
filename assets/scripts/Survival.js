import $cfg from './Cfg';
import $audioUtil from './AudioUtil';
import $eventManager from './EventManager';
import $mathUtil from './MathUtil';
import $randomUtil from './RandomUtil';
import $globalPopupMgr from './GlobalPopupMgr';
import $guideMgr from './GuideMgr';
import $guideDataProxy from './GuideDataProxy';
import $battleMgr from './BattleMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $simplyRectCollider from './SimplyRectCollider';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $simplyVec2 from './SimplyVec2';
import $spAnimCtrl from './SpAnimCtrl';
import $levelBattleData from './LevelBattleData';
import $progressWaitItem from './ProgressWaitItem';
import $unitMgr from './UnitMgr';
import $levelObjectBase from './LevelObjectBase';
let i;
const A = cc._decorator;
const w = A.ccclass;
const C = A.property;
e.prototype.onRemove = function () {
  if (this._progress) {
    this._progress.remove();
    this._progress = null;
  }
  t.prototype.onRemove.call(this);
};
e.prototype.onPlayerCollisionExit = function () {
  $audioUtil.AudioUtil.stopEffect("lmtw_yx_SavePeople");
  this._waitTime = 0;
  if (this._progress) {
    this._progress.hide();
  }
};
e.prototype.onPlayerCollisionStay = function (t, e) {
  if (this._waitTime < this._waitTimer) {
    this._waitTime += e;
    this._progress &&
      ((this._progress.node.x = t.node.x),
      (this._progress.node.y = t.node.y + 180),
      this._progress.show(),
      this._progress.updateProgress(this._waitTime / this._waitTimer));
  } else {
    if (this._progress) {
      this._progress.hide();
    }
    const n = $battleMgr.default.instance
      .getCurScene()
      .level.getRoomById(this.roomId)
      .getGroundY();
    this.dropReward(n);
    this.rescueSurvival(n);
  }
};
e.prototype.onPlayerCollisionEnter = function () {
  $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_SavePeople");
};
e.prototype.checkPlayerCollision = function (t, e) {
  return (
    !this._isRescue &&
    $simplyCollisionDetector.default.isCollisionPointToRect(
      new $simplyVec2.default(e.x, e.y),
      this.selfCollider.rect,
    )
  );
};
e.prototype.dropReward = function (t) {
  const e = this;
  const n = $cfg.default.instance.dataCons.getById(151).val;
  const i = [];
  if ("" != n) {
    n.split("|").forEach(function (t) {
      const e = t.split("_");
      const n = e[0];
      const o = e[1].split("&").map(Number);
      const r = o[0];
      const a = o[1];
      i.push({
        prob: Number(n),
        rewardId: r,
        num: a,
      });
    });
  }
  if (0 != i.length) {
    const o = i.map(function (t) {
      return t.prob;
    });
    const r = $mathUtil.MathUtil.weightedRandom(o);
    const s = i[r].rewardId;
    const c = i[r].num;
    const p = $battleMgr.default.instance.getCurScene();
    const h = this.node.getPosition();
    const f = $randomUtil.RandomUtil.randomInt(-100, 100);
    $unitMgr.UnitMgr.instance.createUnit({
      areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.GOOD,
      areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
      parent: p.unitParent,
      prefabName: "SceneGood",
      unitClass: "SceneGood",
      initPos: h,
      initParam: {
        rewardId: s,
        rewardNum: c,
      },
      onCreated: function (n) {
        n.updateRoomId(e.roomId);
        n.drop(t, f, 0.3, 40, 0.2);
      },
    });
  }
};
e.prototype.rescueSurvival = function (t) {
  const e = this;
  this.node.y = t;
  this.node.x += $randomUtil.RandomUtil.randomInt(-100, 100);
  $levelBattleData.levelBattleData.addRescue(1);
  this._isRescue = !0;
  this.nRescue.active = !0;
  this.nName.parent = this.nRescue;
  this.nName.setSiblingIndex(0);
  this.nWaitRescue.active = !1;
  this.rescueSpAnimCtrl.playAnim("bide", 1, !0);
  this.nRescue.getChildByName("RescueDialog").active = !0;
  const n = null;
  if (this.node.x > 0) {
    n = -1;
  } else {
    n = 1;
  }
  const i = this.node.x + 500 * n;
  const o = $battleMgr.default.instance.getCurScene().level;
  $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_BeRescued");
  if (
    0 == $levelBattleData.levelBattleData.cfgStage.id &&
    $guideMgr.GuideMgr.instance.cfgGuideStepId ==
      $guideDataProxy.EGuideStepId.G_10
  ) {
    $eventManager.EventManager.instance.emit(
      $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
      $guideDataProxy.EGuideStepId.G_10,
    );
    $globalPopupMgr.default.instance.showTips(
      "【她在天台等你，快前往天台撤离点吧】",
    );
  }
  cc.tween(this.node)
    .delay(2)
    .call(function () {
      e.rescueSpAnimCtrl.playAnim("run", 1, !0);
    })
    .parallel(
      cc.tween().to(
        3,
        {
          x: i,
        },
        {
          easing: "sineIn",
        },
      ),
      cc.tween().delay(2).to(1, {
        opacity: 0,
      }),
    )
    .call(function () {
      const t = o.playerExitPos;
      t.y = o.findExitRoom().getGroundY();
      t.x += $randomUtil.RandomUtil.randomInt(-100, 100);
      e.node.setPosition(t);
      e.node.opacity = 255;
      e.rescueSpAnimCtrl.playAnim("bide", 1, !0);
      e.nRescue.getChildByName("RescueDialog").active = !1;
    })
    .start();
};
e.prototype.onInit = function () {
  const t = this;
  this.updateRoomId(this._initParam.roomId);
  this._waitTime = 0;
  this._waitTimer = $cfg.default.instance.dataReward.getById(999).checkTime;
  $battleMgr.default.instance.createOtherNode(
    "ProgressWaitItem",
    function (e) {
      t._progress = e.getComponent($progressWaitItem.default);
      if (t._isRemove) {
        t._progress.remove();
        return void (t._progress = null);
      }
      t._progress.init();
      t._progress.node.x = t.node.x;
      t._progress.node.y = t.node.y + 100;
    },
  );
  this.nName.parent = this.nWaitRescue.getChildByName("View");
  this.nName.setSiblingIndex(0);
  const e = $cfg.default.instance.dataSurvivor.getById(Number(this.key));
  this.lName.string = e.name;
  this._isRescue = !1;
  this.nRescue.active = !1;
  this.nWaitRescue.active = !0;
  this.rescueSpAnimCtrl.init();
};
Object.defineProperty(e.prototype, "key", {
  get: function () {
    return this._initParam.key;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "isRescue", {
  get: function () {
    return this._isRescue;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.selfCollider = null;
  e.nWaitRescue = null;
  e.nRescue = null;
  e.rescueSpAnimCtrl = null;
  e.lName = null;
  e.nName = null;
  e._waitTime = 0;
  e._waitTimer = 0;
  e._progress = null;
  e._isRescue = !1;
  return e;
}
exports.default = M;
