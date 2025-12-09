import $cfg from './Cfg';
import $audioUtil from './AudioUtil';
import $eventManager from './EventManager';
import $sceneManager from './SceneManager';
import $guideMgr from './GuideMgr';
import $guideDataProxy from './GuideDataProxy';
import $battleMgr from './BattleMgr';
import $effectMgr from './EffectMgr';
import $spAnimEffect from './SpAnimEffect';
import $levelBattleData from './LevelBattleData';
import $progressWaitItem from './ProgressWaitItem';
import $levelObjectBase from './LevelObjectBase';
let i;
const g = cc._decorator;
const v = g.ccclass;
const b =
  (g.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._waitTime = 0;
      e._waitTimer = 1;
      e._progress = null;
      e._isTrigger = !1;
      e._isEnterRescue = !1;
      return e;
    }
    e.prototype.onInit = function () {
      const t = this;
      this._isEnterRescue = !1;
      this._isTrigger = !1;
      this._waitTimer = Number($cfg.default.instance.dataCons.getById(128).val);
      $battleMgr.default.instance.createOtherNode(
        "ExitProgressWaitItem",
        function (e) {
          t._progress = e.getComponent($progressWaitItem.default);
          t._progress.init(1, !1);
          t._progress.node.x = t.node.x;
          t._progress.node.y = t.node.y + 300;
        },
      );
    };
    e.prototype.checkPlayerCollision = function () {
      return !0;
    };
    e.prototype.onPlayerCollisionStay = function (t, e) {
      if (this._waitTime < this._waitTimer) {
        this._waitTime += e;
        this._progress &&
          ((this._progress.node.x = t.node.x),
          (this._progress.node.y = t.node.y + 300),
          this._progress.show(),
          this._progress.updateProgress(this._waitTime / this._waitTimer));
      } else if ((this._progress && this._progress.hide(), !this._isTrigger)) {
        this._isTrigger = !0;
        if (
          0 == $levelBattleData.levelBattleData.cfgStage.id &&
          $guideMgr.GuideMgr.instance.cfgGuideStepId ==
            $guideDataProxy.EGuideStepId.G_12
        ) {
          $eventManager.EventManager.instance.emit(
            $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
            $guideDataProxy.EGuideStepId.G_12,
          );
        }
        const n = $battleMgr.default.instance.getCurScene();
        $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_Helicopter");
        $effectMgr.default.instance.createEffect({
          parent: n.lowEffectParent,
          prefabName: "ESignalShell",
          initPos: this.node.getPosition(),
          effectClass: $spAnimEffect.default,
          onCreated: function (t) {
            $sceneManager.SceneManager.instance.curScene.node
              .getChildByName("Mist")
              .getComponent(cc.Animation)
              .play("MistBack", 0);
            t.playDefaultAnim("launch", 1, !1, function () {
              $battleMgr.default.instance.getCurScene().waitRescue();
            });
          },
        });
        this._isEnterRescue = !0;
      }
    };
    e.prototype.onPlayerCollisionExit = function () {
      if (this._isEnterRescue) {
        //
      } else {
        this._waitTime = 0;
        this._isTrigger = !1;
        if (this._progress) {
          this._progress.hide();
        }
      }
    };
  })($levelObjectBase.default));
exports.default = b;
