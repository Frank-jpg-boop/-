import $cfg from './Cfg';
import $componentBase from './ComponentBase';
import $eventManager from './EventManager';
import $nodePoolManager from './NodePoolManager';
import $resLoader from './ResLoader';
import $randomUtil from './RandomUtil';
import $frameEnum from './FrameEnum';
import $popupManager from './PopupManager';
import $sceneManager from './SceneManager';
import $nodeUtil from './NodeUtil';
import $globalPopupMgr from './GlobalPopupMgr';
import $guideMgr from './GuideMgr';
import $guideDataProxy from './GuideDataProxy';
import $localDataProxy from './LocalDataProxy';
import $battleMgr from './BattleMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $joystick from './Joystick';
import $spAnimCtrl from './SpAnimCtrl';
import $battleEnum from './BattleEnum';
import $actorMgr from './ActorMgr';
import $unitMgr from './UnitMgr';
import $levelBattleData from './LevelBattleData';
import $gameEnum from './GameEnum';
import $electricItem from './ElectricItem';
import $bossHpView from './BossHpView';
import $exitPointArrowView from './ExitPointArrowView';
import $gameInfoView from './GameInfoView';
import $killBossView from './KillBossView';
import $popBagInfoView from './PopBagInfoView';
let i;
const k = cc._decorator;
const N = k.ccclass;
const L = k.property;
e.prototype.onGuideChange = function () {};
e.prototype.onClickBtnSet = function () {
  $globalPopupMgr.default.instance.showLevelSet($battleMgr.default.instance.getCurScene().isPlay);
};
e.prototype.onClickBtnBag = function () {
  if (0 != $levelBattleData.levelBattleData.cfgStage.id) {
    $battleMgr.default.instance.getCurScene().pause();
    $popupManager.PopupManager.instance.show({
      bundleName: $frameEnum.Frame.EBundleName.GAME,
      path: 'popups/LevelBagPopup',
      keep: !0,
    });
  } else {
    $globalPopupMgr.default.instance.showTips('完成引导关卡后可使用');
  }
};
e.prototype.onClickBtnBagEx = function () {
  if (0 != $levelBattleData.levelBattleData.cfgStage.id) {
    $popupManager.PopupManager.instance.show({
      bundleName: $frameEnum.Frame.EBundleName.GAME,
      path: 'popups/LevelBagPopup',
      keep: !0,
    });
  } else {
    $globalPopupMgr.default.instance.showTips('完成引导关卡后可使用');
  }
};
e.prototype.onEventUpdateElectric = function () {};
e.prototype.showBackConfirm = function () {
  if (
    1 !=
      $localDataProxy.localDataProxy.getDailyRefreshValue(
        $gameEnum.Game.EDailyRefreshDataKey.POWER_FULL_NOT_POPUP,
      ) &&
    0 != $levelBattleData.levelBattleData.cfgStage.id
  ) {
    const t = $battleMgr.default.instance.getCurScene();
    if (t) {
      const e = $actorMgr.default.instance.getActor(t.playerId);
      if (e && !(t.isWaitRescue || t.isRescue || e.isDead() || this._isPopupBack)) {
        this._isPopupBack = !0;
        const n = $battleMgr.default.instance.getCurScene().isPlay;
        $battleMgr.default.instance.getCurScene().pause();
        $popupManager.PopupManager.instance.show({
          bundleName: $frameEnum.Frame.EBundleName.GAME,
          path: 'popups/LevelBackConfirmPopup',
          keep: !0,
          params: {
            battlePlayState: n,
          },
        });
      }
    }
  }
};
e.prototype.onEventSetFullBagState = function (t) {
  const e = this.nBag.getChildByName('Full');
  if (e.active != t && ((e.active = t), t)) {
    const n = e.getChildByName('PopupFull');
    n.scale = 0;
    cc.tween(n)
      .to(0.2, {
        scale: 1,
      })
      .call(function () {})
      .start();
    n.getChildByName('BtnEx').active = !$levelBattleData.levelBattleData.bagData.isUnlock;
  }
};
e.prototype.onEventUpdateBag = function () {
  this.updateBagView();
};
e.prototype.updateBagView = function () {
  const t = $actorMgr.default.instance.getActor($battleMgr.default.instance.getCurScene().playerId);
  const e = $unitMgr.UnitMgr.instance
    .queryUnit($gridAreaDivisionMgr.E_AreaObjectType.GOOD)
    .filter(function (e) {
      return e.roomId == t.roomId && e.isBagItem && !e.isPickup;
    });
  this.nBag.getChildByName('Light').active = e.length > 0;
  const n = $levelBattleData.levelBattleData.bagData.bagEquipDatas.length;
  this.nBag.getChildByName('Point').getChildByName('Value').getComponent(cc.Label).string =
    n.toString();
};
e.prototype.concumeFlyBagCommon = function (t, e, n, i) {
  const o = $nodePoolManager.default.instance.getNode(this.nGameFlyGood);
  const r = $battleMgr.default.instance.getCurScene();
  const s = r.popHurtParent;
  o.parent = s;
  o.scale = 0.8;
  $nodeUtil.default.setGroup(o, 'game');
  const c = $cfg.default.instance.dataReward.getById(t);
  $resLoader.ResLoader.setSpritFrame(
    o.getChildByName('Icon').getComponent(cc.Sprite),
    $frameEnum.Frame.EBundleName.RES,
    'textures/atlas/item_scene/' + c.spr,
  );
  const f = this.nBag.convertToWorldSpaceAR(cc.v2());
  o.setPosition(s.convertToNodeSpaceAR(r.cameraCtrl.uiWorldPosToGameWorldPos(f)));
  const d = s.convertToNodeSpaceAR(n);
  const y = o.getPosition();
  const _ = y.add(cc.v2(0, $randomUtil.RandomUtil.randomInt(100, 200)));
  cc.tween(o)
    .bezierTo(0.7, y, _, d)
    .call(function () {
      o.getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = null;
      $nodePoolManager.default.instance.putNode(o);
      if (i) {
        i();
      }
    })
    .start();
};
e.prototype.consumeFlyGold = function (t, e, n) {
  for (
    const i = this,
      o = Math.min(5, t),
      r = $battleMgr.default.instance.getCurScene(),
      s = r.popHurtParent,
      c = function (t) {
        const c = t;
        p.scheduleOnce(function () {
          const t = $nodePoolManager.default.instance.getNode(i.nGameFlyGood);
          t.parent = s;
          $nodeUtil.default.setGroup(t, 'game');
          const p = $cfg.default.instance.dataReward.getById(1);
          $resLoader.ResLoader.setSpritFrame(
            t.getChildByName('Icon').getComponent(cc.Sprite),
            $frameEnum.Frame.EBundleName.RES,
            'textures/atlas/item_scene/' + p.spr,
          );
          const f = i.nGold.convertToWorldSpaceAR(cc.v2());
          t.setPosition(s.convertToNodeSpaceAR(r.cameraCtrl.uiWorldPosToGameWorldPos(f)));
          const d = s.convertToNodeSpaceAR(e);
          cc.tween(t)
            .to(0.5, {
              x: d.x,
              y: d.y,
            })
            .call(function () {
              t.getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = null;
              $nodePoolManager.default.instance.putNode(t);
              if (c == o - 1 && n) {
                n();
              }
            })
            .start();
        }, 0.15 * t);
      },
      p = this,
      f = 0;
    f < o;
    f++
  ) {
    c(f);
  }
};
e.prototype.onEventConsumeFlyGood = function (t, e, n, i) {
  if (1 === t) {
    this.consumeFlyGold(e, n, i);
  } else {
    this.concumeFlyBagCommon(t, e, n, i);
  }
};
e.prototype.pickupFlyBagCommon = function (t, e, n) {
  for (
    const i = this,
      o = Math.min(5, e),
      r = function (e) {
        const r = e;
        s.scheduleOnce(function () {
          const e = $nodePoolManager.default.instance.getNode(i.nGameFlyGood);
          e.parent = i.nFly;
          $nodeUtil.default.setGroup(e, 'default');
          const s = $cfg.default.instance.dataReward.getById(t);
          $resLoader.ResLoader.setSpritFrame(
            e.getChildByName('Icon').getComponent(cc.Sprite),
            $frameEnum.Frame.EBundleName.RES,
            'textures/atlas/item_scene/' + s.spr,
          );
          const c = $battleMgr.default.instance
            .getCurScene()
            .cameraCtrl.gameWorldPosToUiWorldPos(n);
          e.setPosition(i.nFly.convertToNodeSpaceAR(c));
          const f = $nodeUtil.default.nodeParentChangeLocalPos(i.nBag, i.nFly);
          const d = e.getPosition();
          const y = f;
          const _ = d.add(
            cc.v2(
              $randomUtil.RandomUtil.randomInt(0, 200),
              d.y + $randomUtil.RandomUtil.randomInt(100, 200),
            ),
          );
          i.nBag.active = !0;
          cc.tween(e)
            .bezierTo(0.6, d, _, y)
            .call(function () {
              e.getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = null;
              $nodePoolManager.default.instance.putNode(e);
              if (r == o - 1) {
                cc.tween(i.nBag.getChildByName('Icon'))
                  .to(0.2, {
                    scale: 1.2,
                  })
                  .to(0.1, {
                    scale: 1,
                  })
                  .start();
              }
              if ($levelBattleData.levelBattleData.data.bagItemRecord.has(t)) {
                //
              } else {
                $levelBattleData.levelBattleData.data.bagItemRecord.add(t);
                i.showBagItemInfo(t);
              }
            })
            .start();
        }, 0.15 * e);
      },
      s = this,
      c = 0;
    c < o;
    c++
  ) {
    r(c);
  }
};
e.prototype.pickupFlyElectric = function (t) {
  const e = this;
  const n = $nodePoolManager.default.instance.getNode(this.nGameFlyGood);
  n.parent = this.nFly;
  $nodeUtil.default.setGroup(n, 'default');
  const i = $cfg.default.instance.dataReward.getById(900);
  $resLoader.ResLoader.setSpritFrame(
    n.getChildByName('Icon').getComponent(cc.Sprite),
    $frameEnum.Frame.EBundleName.RES,
    'textures/atlas/item_scene/' + i.spr,
  );
  const o = $battleMgr.default.instance.getCurScene();
  if (o) {
    const r = o.cameraCtrl.gameWorldPosToUiWorldPos(t);
    n.setPosition(this.nFly.convertToNodeSpaceAR(r));
    const s = $nodeUtil.default.nodeParentChangeLocalPos(this.electricItem.node, this.nFly);
    const c = n.getPosition();
    const f = s;
    const d = c.add(
      cc.v2(
        $randomUtil.RandomUtil.randomInt(0, 200),
        c.y + $randomUtil.RandomUtil.randomInt(100, 200),
      ),
    );
    this.electricItem.node.active = !0;
    cc.tween(n)
      .bezierTo(0.6, c, d, f)
      .call(function () {
        $levelBattleData.levelBattleData.updateElectric(1);
        n.getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = null;
        $nodePoolManager.default.instance.putNode(n);
        cc.tween(e.electricItem.node)
          .to(0.2, {
            scale: 1.2,
          })
          .to(0.1, {
            scale: 1,
          })
          .start();
        if (
          $levelBattleData.levelBattleData.electric >=
          $levelBattleData.levelBattleData.electricPowerCount
        ) {
          e.showBackConfirm();
        }
      })
      .start();
  }
};
e.prototype.pickupFlyGold = function (t, e) {
  for (
    const n = this,
      i = Math.min(5, t),
      o = Math.floor(t / i),
      r = t % i,
      s = function (t) {
        const s = t;
        f.scheduleOnce(function () {
          const t = $battleMgr.default.instance.getCurScene();
          if (t) {
            const f = $nodePoolManager.default.instance.getNode(n.nGameFlyGood);
            f.parent = n.nFly;
            $nodeUtil.default.setGroup(f, 'default');
            const d = $cfg.default.instance.dataReward.getById(1);
            $resLoader.ResLoader.setSpritFrame(
              f.getChildByName('Icon').getComponent(cc.Sprite),
              $frameEnum.Frame.EBundleName.RES,
              'textures/atlas/item_scene/' + d.spr,
            );
            const v = t.cameraCtrl.gameWorldPosToUiWorldPos(e);
            f.setPosition(n.nFly.convertToNodeSpaceAR(v));
            const E = $nodeUtil.default.nodeParentChangeLocalPos(n.nGold, n.nFly);
            cc.tween(f)
              .by(
                0.2,
                {
                  y: 50,
                },
                {
                  easing: 'quadIn',
                },
              )
              .by(
                0.15,
                {
                  y: -30,
                },
                {
                  easing: 'quadOut',
                },
              )
              .delay(0.2)
              .call(function () {
                const t = f.getPosition();
                const e = E;
                const a = t.add(
                  cc.v2(
                    $randomUtil.RandomUtil.randomInt(-200, 200),
                    t.y + $randomUtil.RandomUtil.randomInt(100, 200),
                  ),
                );
                cc.tween(f)
                  .bezierTo(0.5, t, a, e)
                  .call(function () {
                    const t = o + (s == i - 1 ? r : 0);
                    $levelBattleData.levelBattleData.updateGold(t);
                    if (
                      0 == $levelBattleData.levelBattleData.cfgStage.id &&
                      $guideMgr.GuideMgr.instance.cfgGuideStepId ==
                        $guideDataProxy.EGuideStepId.G_8 &&
                      $levelBattleData.levelBattleData.gold >= 20
                    ) {
                      $eventManager.EventManager.instance.emit(
                        $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                        $guideDataProxy.EGuideStepId.G_8,
                      );
                      $globalPopupMgr.default.instance.showTips('【敌人无穷无尽，我们先撤退】');
                    }
                    f.getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = null;
                    $nodePoolManager.default.instance.putNode(f);
                    if (s == i - 1) {
                      cc.tween(n.nGold)
                        .to(0.2, {
                          scale: 1.2,
                        })
                        .to(0.1, {
                          scale: 1,
                        })
                        .start();
                    }
                  })
                  .start();
              })
              .start();
          }
        }, 0.15 * t);
      },
      f = this,
      d = 0;
    d < i;
    d++
  ) {
    s(d);
  }
};
e.prototype.onEventPickupFlyGood = function (t, e, n) {
  if (1 != t) {
    if (900 != t) {
      '' == $cfg.default.instance.dataReward.getById(t).boxObj || this.pickupFlyBagCommon(t, e, n);
    } else {
      this.pickupFlyElectric(n);
    }
  } else {
    this.pickupFlyGold(e, n);
  }
};
e.prototype.onEventGameStart = function (t) {
  const e = this;
  this.node.getComponent(cc.Animation).once(
    cc.Animation.EventType.FINISHED,
    function () {
      e.nTouchLock.active = !1;
      if (t) {
        t();
      }
      e.electricItem.onStart();
    },
    this,
  );
  this.node.getComponent(cc.Animation).play('GameUIPlay', 0);
};
e.prototype.showBagItemInfo = function (t) {
  if ('' != $cfg.default.instance.dataReward.getById(t).boxObj) {
    this.popBagInfoView.pushReward(t);
  }
};
e.prototype.update = function (t) {
  const e = $battleMgr.default.instance.getCurScene();
  if (e && e.isInit && e.isPlay && !e.isResult) {
    this.joystick.updateKeyCode(t);
  }
};
e.prototype.hideJoystickGuide = function () {
  const t = this;
  this._isShowJoystickGuide = !1;
  this.spCtrlGuide.playAnim('over', 1, !1, function () {
    t.spCtrlGuide.node.active = !1;
  });
};
e.prototype.showJoystickGuide = function (t) {
  const e = this;
  this._isShowJoystickGuide = !0;
  this.spCtrlGuide.node.active = !0;
  this.spCtrlGuide.playAnim('appear', 1, !1, function () {
    e.spCtrlGuide.playAnim(t, 1, !0);
  });
};
e.prototype.initGuideView = function () {
  if (0 == $levelBattleData.levelBattleData.cfgStage.id) {
    this.nBag.active = !1;
    this.electricItem.node.active = !1;
  }
};
e.prototype.initView = function () {
  this.gameInfoView.initView();
  this.exitPointArrowView.initView();
  this.bossHpView.initView();
  this.killBossView.initView();
  this.electricItem.init();
  this.updateBagView();
  this.initGuideView();
};
e.prototype.start = function () {
  const t = this;
  this._isPopupBack = !1;
  $battleMgr.default.instance.switchScene($battleEnum.EBattleSceneType.LEVEL, function () {
    $sceneManager.SceneManager.instance.hideSceneLoading(null, !0);
    $battleMgr.default.instance.getCurScene().uiNode = t.node;
    t.initView();
  });
};
e.prototype.onDestroy = function () {
  t.prototype.onDestroy.call(this);
  $eventManager.EventManager.instance.off(
    $battleEnum.EBattleEvent.PICKUP_FLY_ITEM,
    this.onEventPickupFlyGood,
    this,
  );
  $eventManager.EventManager.instance.off(
    $battleEnum.EBattleEvent.CONSUME_FLY_ITEM,
    this.onEventConsumeFlyGood,
    this,
  );
  $eventManager.EventManager.instance.off(
    $battleEnum.EBattleEvent.UPDATE_BAG_UI,
    this.onEventUpdateBag,
    this,
  );
  $eventManager.EventManager.instance.off(
    $battleEnum.EBattleEvent.GAEM_START_INFORM,
    this.onEventGameStart,
    this,
  );
  $eventManager.EventManager.instance.off(
    $battleEnum.EBattleEvent.SET_FULL_BAG_UI,
    this.onEventSetFullBagState,
    this,
  );
  $eventManager.EventManager.instance.off(
    $guideMgr.EGuideEvent.GUIDE_CHANGE,
    this.onGuideChange,
    this,
  );
  $eventManager.EventManager.instance.off(
    $levelBattleData.ELevelBattleDataEvent.ELECTRIC_CHANGE,
    this.onEventUpdateElectric,
    this,
  );
};
e.prototype.onLoad = function () {
  t.prototype.onLoad.call(this);
  this.nTouchLock.active = !0;
  $eventManager.EventManager.instance.on(
    $battleEnum.EBattleEvent.PICKUP_FLY_ITEM,
    this.onEventPickupFlyGood,
    this,
  );
  $eventManager.EventManager.instance.on(
    $battleEnum.EBattleEvent.CONSUME_FLY_ITEM,
    this.onEventConsumeFlyGood,
    this,
  );
  $eventManager.EventManager.instance.on(
    $battleEnum.EBattleEvent.UPDATE_BAG_UI,
    this.onEventUpdateBag,
    this,
  );
  $eventManager.EventManager.instance.on(
    $battleEnum.EBattleEvent.GAEM_START_INFORM,
    this.onEventGameStart,
    this,
  );
  $eventManager.EventManager.instance.on(
    $battleEnum.EBattleEvent.SET_FULL_BAG_UI,
    this.onEventSetFullBagState,
    this,
  );
  $eventManager.EventManager.instance.on(
    $guideMgr.EGuideEvent.GUIDE_CHANGE,
    this.onGuideChange,
    this,
  );
  $eventManager.EventManager.instance.on(
    $levelBattleData.ELevelBattleDataEvent.ELECTRIC_CHANGE,
    this.onEventUpdateElectric,
    this,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.joystick = null;
  e.gameInfoView = null;
  e.nGameFlyGood = null;
  e.nGold = null;
  e.nGameUILayer = null;
  e.nFly = null;
  e.nBag = null;
  e.electricItem = null;
  e.nTouchLock = null;
  e.exitPointArrowView = null;
  e.bossHpView = null;
  e.killBossView = null;
  e.spCtrlGuide = null;
  e.popBagInfoView = null;
  e._isShowJoystickGuide = !1;
  e._isPopupBack = !1;
  return e;
}
export default j;
