import $cfg from './Cfg';
import $audioUtil from './AudioUtil';
import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $mathUtil from './MathUtil';
import $randomUtil from './RandomUtil';
import $frameEnum from './FrameEnum';
import $attrMgr from './AttrMgr';
import $globalPopupMgr from './GlobalPopupMgr';
import $guideMgr from './GuideMgr';
import $guideDataProxy from './GuideDataProxy';
import $battleMgr from './BattleMgr';
import $simplyRectCollider from './SimplyRectCollider';
import $simplyCollisionDetector from './SimplyCollisionDetector';
import $simplyVec2 from './SimplyVec2';
import $spAnimCtrl from './SpAnimCtrl';
import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
import $battleEnum from './BattleEnum';
import $levelBattleData from './LevelBattleData';
import $doorHead from './DoorHead';
import $guideArrow from './GuideArrow';
import $levelObjectBase from './LevelObjectBase';
let i;
export const EDoorState = {
  NONE: 0,
  CLOSE: 1,
  OPEN: 2,
  DESTROY: 3
};
let a = EDoorState;
const D = cc._decorator;
const T = D.ccclass;
const B = D.property;
e.prototype.onGuideChange = function (t, e) {
  const n = this;
  if (t == $guideDataProxy.EGuideStepId.G_4 && 11 == this._roomId) {
    $battleMgr.default.instance.createOtherNode(
      'GuideArrow',
      function (t) {
        const e = t.getComponent($guideArrow.default);
        e.show('解锁新的房间');
        const i = n.node.getPosition();
        i.y += 250;
        e.node.setPosition(i);
        n._guideArrow = e;
      },
      $battleMgr.default.instance.getCurScene().effectParent,
    );
  }
  if (e == $guideDataProxy.EGuideStepId.G_4 && 11 == this._roomId && this._guideArrow) {
    this._guideArrow.hide();
    this._guideArrow = null;
  }
  if (t == $guideDataProxy.EGuideStepId.G_8 && 12 == this._roomId) {
    if (this._guideArrow) {
      //
    } else {
      $battleMgr.default.instance.createOtherNode(
        'GuideArrow',
        function (t) {
          const e = t.getComponent($guideArrow.default);
          e.show('门可以阻挡怪物');
          const i = n.node.getPosition();
          i.y += 250;
          e.node.setPosition(i);
          n._guideArrow = e;
        },
        $battleMgr.default.instance.getCurScene().effectParent,
      );
    }
  }
  if (e == $guideDataProxy.EGuideStepId.G_11 && this._guideArrow) {
    this._guideArrow.hide();
    this._guideArrow = null;
  }
};
e.prototype.onEnemyExit = function (t) {
  const e = this._rightEnemyIds.indexOf(t.unitId);
  if (e >= 0) {
    this._rightEnemyIds.splice(e, 1);
  } else {
    const n = this._leftEnemyIds.indexOf(t.unitId);
    if (n >= 0) {
      this._leftEnemyIds.splice(n, 1);
    }
  }
};
e.prototype.onEnemyStay = function (t) {
  let e;
  if (t.node.getPosition().x > this.node.x) {
    if ((e = this._leftEnemyIds.indexOf(t.unitId)) >= 0) {
      this._leftEnemyIds.splice(e, 1);
    }
  } else {
    if ((e = this._rightEnemyIds.indexOf(t.unitId)) >= 0) {
      this._rightEnemyIds.splice(e, 1);
    }
  }
};
e.prototype.onEnemyEnter = function (t) {
  if (t.pathPos.x > this.node.x) {
    this._rightEnemyIds.push(t.unitId);
  } else {
    this._leftEnemyIds.push(t.unitId);
  }
};
e.prototype.onImpExit = function (t) {
  const e = this._checkStateActorIds.indexOf(t.unitId);
  if (e >= 0) {
    this._checkStateActorIds.splice(e, 1);
  }
  if (this.isUnlock() && this._state == a.OPEN && 0 == this._checkStateActorIds.length) {
    this.changeState(a.CLOSE);
  }
};
e.prototype.onImpEnter = function (t) {
  if (this.isUnlock() && (this._checkStateActorIds.push(t.unitId), this._state == a.CLOSE)) {
    this.changeState(a.OPEN);
  }
};
e.prototype.onPlayerCollisionExit = function (t) {
  this._isShowTips = !1;
  this.nMaintain.active = !1;
  this._isPlayBuildDoor = !1;
  $audioUtil.AudioUtil.stopEffect(this._recoverSoundName);
  const e = this._checkStateActorIds.indexOf(t.unitId);
  if (e >= 0) {
    this._checkStateActorIds.splice(e, 1);
  }
  if (this.isUnlock()) {
    this._waitTime = 0;
    this._recoverTime = 0;
    if (this._state == a.OPEN && 0 == this._checkStateActorIds.length) {
      this.changeState(a.CLOSE, !0);
    }
  }
};
e.prototype.onPlayerCollisionStay = function (t, e) {
  if (
    0 == $levelBattleData.levelBattleData.cfgStage.id &&
    22 == this.roomId &&
    $guideMgr.GuideMgr.instance.cfgGuideStepId >= $guideDataProxy.EGuideStepId.G_8
  ) {
    if (t.moveDir && t.moveDir.x < 0) {
      t.clearMove();
    }
  } else if (this.isUnlock()) {
    const n = t.node.x > this.node.x;
    if (n != this._enterPlayerIsRightX) {
      this._enterPlayerIsRightX = n;
      $eventManager.EventManager.instance.emit($actorEnum.EPlayerEvent.PLAYER_PASS_DOOR, this);
    }
    if (this._state == a.CLOSE) {
      return void this.changeState(a.OPEN);
    }
    if (t.curState == $actorEnum.EActorStateType.WALK) {
      this._waitTime = 0;
      this._recoverTime = 0;
      this.nMaintain.active = !1;
      this._isPlayBuildDoor = !1;
      return void $audioUtil.AudioUtil.stopEffect(this._recoverSoundName);
    }
    if (this._waitTime < this._waitTimer) {
      this._waitTime += e;
    } else {
      this._recoverTime -= e;
      this._recoverTime < 0 &&
        ((this._recoverTime = this._recoverTimer), this.beRecover(this._recoverHp));
    }
  }
};
e.prototype.onPlayerCollisionEnter = function (t) {
  if (
    0 == $levelBattleData.levelBattleData.cfgStage.id &&
    22 == this.roomId &&
    $guideMgr.GuideMgr.instance.cfgGuideStepId >= $guideDataProxy.EGuideStepId.G_8
  ) {
    if (t.moveDir && t.moveDir.x < 0) {
      t.clearMove();
    }
    return void $globalPopupMgr.default.instance.showTips('【危险！别离开房间】');
  }
  if (
    this.isUnlock() &&
    (this._checkStateActorIds.push(t.unitId),
    (this._enterPlayerIsRightX = t.node.x > this.node.x),
    this._state == a.CLOSE)
  ) {
    this.changeState(a.OPEN, !0);
  }
};
e.prototype.checkPlayerCollision = function (t, e) {
  return (
    (0 != $levelBattleData.levelBattleData.cfgStage.id || 11 != this.roomId) &&
    $simplyCollisionDetector.default.isCollisionPointToRect(
      new $simplyVec2.default(e.x, e.y),
      this.selfCollider.rect,
    )
  );
};
e.prototype.beRecover = function (t) {
  if (this._state == a.DESTROY) {
    this.changeState(a.OPEN);
  }
  if (1 == $levelBattleData.levelBattleData.cfgStage.id && 102 == this.roomId && this._guideArrow) {
    this._guideArrow.hide();
    this._guideArrow = null;
  }
  const e = this._maxHp - this._hp;
  if (e <= 0) {
    this._isPlayBuildDoor = !1;
    $audioUtil.AudioUtil.stopEffect(this._recoverSoundName);
    return void (this.nMaintain.active = !1);
  }
  t = Math.min(e, t);
  this._hp += t;
  if (this._hp >= this._maxHp) {
    this._hp = this._maxHp;
  }
  if (this._head) {
    this._head.updateHp(this._hp);
  }
  const n = this.node.getPosition().add(cc.v2(68, $randomUtil.RandomUtil.randomInt(180, 200)));
  $battleMgr.default.instance.popupNum(
    n,
    '+' + $mathUtil.MathUtil.formatValue(t),
    $battleEnum.EBattlePopupNumType.HEAL,
  );
  this.updateLv(!0);
  this.nMaintain.active = !0;
  if (this._isPlayBuildDoor) {
    //
  } else {
    this._isPlayBuildDoor = !0;
    this._recoverSoundName = 'lmtw_yx_XiuMen0' + $randomUtil.RandomUtil.randomInt(1, 5);
    $audioUtil.AudioUtil.playEffect(
      'sounds/' + this._recoverSoundName,
      $frameEnum.Frame.EBundleName.RES,
      !0,
    );
  }
};
e.prototype.playHurtAnim = function () {
  const t = this;
  if (this._isPlayAnimHurt) {
    //
  } else {
    this._isPlayAnimHurt = !0;
    this.animHurt.once(
      cc.Animation.EventType.FINISHED,
      function () {
        t._isPlayAnimHurt = !1;
        t.animHurt.stop();
      },
      this,
    );
    this.animHurt.play('DoorHurtAnim', 0);
  }
};
e.prototype.beHurt = function (t) {
  if (this._state != a.DESTROY) {
    const e = !$battleMgr.default.instance.isScreenOut(
      this.node.convertToWorldSpaceAR(cc.v2()),
      -500,
    );
    if (e) {
      $audioUtil.AudioUtil.playLimitEffect('sounds/lmtw_yx_DoorHurt');
    }
    this.playHurtAnim();
    const n = Math.floor(t);
    this._hp -= n;
    if (this._hp < 0) {
      this._hp = 0;
    }
    const i = this.node.getPosition().add(cc.v2(0, 200));
    i.y += $randomUtil.RandomUtil.randomInt(0, 20);
    $battleMgr.default.instance.popupNum(
      i,
      $mathUtil.MathUtil.formatValue(n),
      $battleEnum.EBattlePopupNumType.PLAYER_HURT,
    );
    if (0 == $levelBattleData.levelBattleData.cfgStage.id && this._hp <= 10) {
      this._hp = 10;
    }
    if (this._head) {
      this._head.updateHp(this._hp);
    }
    if (this._hp <= 0) {
      this.changeState(a.DESTROY);
      if (e) {
        $audioUtil.AudioUtil.playLimitEffect('sounds/lmtw_yx_DoorStroy');
      }
    }
    this.updateLv(!1);
  }
};
e.prototype.getCollisionWallPos = function (t) {
  if ((t.x < this.node.x ? this._leftEnemyIds.length : this._rightEnemyIds.length) <= 5) {
    return t;
  }
  const e = null;
  if (t.x < this.node.x) {
    e = this.node.getChildByName('WallLeft');
  } else {
    e = this.node.getChildByName('WallRight');
  }
  const n = e.children[0].getPosition();
  const i = e.children[1].getPosition().sub(n);
  const o = $randomUtil.RandomUtil.random(0, 1) * i.len();
  const r = this.node.parent.convertToNodeSpaceAR(
    e.convertToWorldSpaceAR(n.add(i.normalize().mul(o))),
  );
  const a = null;
  if (t.x < this.node.x) {
    a = -1;
  } else {
    a = 1;
  }
  a *= $randomUtil.RandomUtil.randomInt(0, 50);
  r.x += a;
  return r;
};
e.prototype.checkWallCollision = function (t) {
  const e = this.node.getChildByName('WallCollider');
  if (e) {
    const n = e.getComponent($simplyRectCollider.default);
    if (
      n &&
      $simplyCollisionDetector.default.isCollisionPointToRect(
        new $simplyVec2.default(t.x, t.y),
        n.rect,
      )
    ) {
      return !0;
    }
  }
  return !1;
};
e.prototype.isUnlock = function () {
  return $battleMgr.default.instance.getCurScene().level.getRoomById(this.roomId).isUnlock;
};
e.prototype.updateLv = function (t) {
  if (void 0 === t) {
    t = !1;
  }
  for (const e = 1, n = this._lvHps.length - 2; n >= 0; --n) {
    const i = this._lvHps[n];
    if (this._hp >= i) {
      e = n + 2;
      break;
    }
  }
  if (this._curLv != e) {
    this._curLv = e;
    const o = this.node.getChildByName('OpenState').getChildByName('Icon').getComponent(cc.Sprite);
    const r = this.node.getChildByName('CloseState').getChildByName('Icon').getComponent(cc.Sprite);
    $resLoader.ResLoader.setSpritFrame(
      o,
      $frameEnum.Frame.EBundleName.GAME,
      'textures/scene/common/open_' + this._curLv,
    );
    $resLoader.ResLoader.setSpritFrame(
      r,
      $frameEnum.Frame.EBundleName.GAME,
      'textures/scene/common/shut_' + this._curLv,
    );
    if (t) {
      const a = this.node
        .getChildByName('OpenState')
        .getChildByName('Up')
        .getComponent($spAnimCtrl.default);
      a.node.active = !0;
      a.clearAnim();
      a.playAnim('level up1', 1, !1, function () {
        a.node.active = !1;
      });
    }
  }
};
e.prototype.updateView = function () {
  const t = this.node.getChildByName('Lock');
  if (this.isUnlock()) {
    this.node.getChildByName('Lock').active = !1;
    switch (this.state) {
      case a.CLOSE:
        this.node.getChildByName('OpenState').active = !1;
        this.node.getChildByName('CloseState').active = !0;
        this.node.getChildByName('DestroyState').active = !1;
        break;
      case a.OPEN:
        this.node.getChildByName('OpenState').active = !0;
        this.node.getChildByName('CloseState').active = !1;
        this.node.getChildByName('DestroyState').active = !1;
        break;
      case a.DESTROY:
        this.node.getChildByName('OpenState').active = !1;
        this.node.getChildByName('CloseState').active = !1;
        this.node.getChildByName('DestroyState').active = !(
          0 == $levelBattleData.levelBattleData.cfgStage.id && 11 == this.roomId
        );
    }
  } else {
    const e = $cfg.default.instance.dataRoom.getById(this.roomId);
    t.active = 1 != e.openType;
    this.node.getChildByName('OpenState').active = !1;
    this.node.getChildByName('CloseState').active = !1;
    if (t.active) {
      const n = t.getChildByName('Icon');
      $resLoader.ResLoader.setSpritFrame(
        n.getComponent(cc.Sprite),
        $frameEnum.Frame.EBundleName.GAME,
        'textures/scene/common/door_lock_' + e.openType + (11 != e.openType ? '' : '_' + e.openVal),
      );
    }
  }
};
e.prototype.playOpenAnim = function () {
  this.updateView();
};
e.prototype.changeState = function (t, e) {
  if (void 0 === e) {
    e = !1;
  }
  if (this._state != t) {
    this._state = t;
    if (e) {
      if (this._state == a.OPEN) {
        $audioUtil.AudioUtil.playEffect('sounds/lmtw_yx_OpenDoor');
      }
      if (this._state == a.CLOSE) {
        $audioUtil.AudioUtil.playEffect('sounds/lmtw_yx_CloseDoor');
      }
    }
    this.updateView();
  }
};
e.prototype.onDestroy = function () {
  if (
    0 != $levelBattleData.levelBattleData.cfgStage.id ||
    (11 != this.roomId && 12 != this.roomId)
  ) {
    //
  } else {
    $eventManager.EventManager.instance.off(
      $guideMgr.EGuideEvent.GUIDE_CHANGE,
      this.onGuideChange,
      this,
    );
  }
};
e.prototype.onInit = function () {
  const t = this;
  this._leftEnemyIds = [];
  this._rightEnemyIds = [];
  this._checkStateActorIds = [];
  this._isShowTips = !1;
  this._lvHps = $cfg.default.instance.dataCons
    .getById(121)
    .val.split('|')
    .map(function (t) {
      return Number(t);
    });
  if (0 == $levelBattleData.levelBattleData.cfgStage.id) {
    this._maxHp = 1e3;
  } else {
    this._maxHp = $attrMgr.AttrMgr.instance.getPlayerAttrValue($attrEnum.E_AttrType.DOOR_HP_LIMIT);
  }
  this._waitTime = 0;
  this._waitTimer = Number($cfg.default.instance.dataCons.getById(122).val);
  this._recoverHp = $attrMgr.AttrMgr.instance.getPlayerAttrValue($attrEnum.E_AttrType.GATE_HP);
  this._recoverTime = 0;
  this._recoverTimer = Number($cfg.default.instance.dataCons.getById(124).val);
  this._hp = this._initParam.hp;
  this.updateRoomId(this._initParam.roomId);
  this.updateLv(!1);
  this.changeState(this._hp > 0 ? a.CLOSE : a.DESTROY);
  $battleMgr.default.instance.createOtherNode('DoorHead', function (e) {
    t._head = e.getComponent($doorHead.default);
    t._head.init(210);
    t._head.node.x = t.node.x;
    t._head.node.y = t.node.y + t._head.headOffsetY;
    t._head.updateHp(t._hp, !0);
  });
  if (1 == $levelBattleData.levelBattleData.cfgStage.id && 102 == this.roomId) {
    $battleMgr.default.instance.createOtherNode(
      'GuideArrow',
      function (e) {
        const n = e.getComponent($guideArrow.default);
        n.show('站立修门');
        const i = t.node.getPosition();
        i.y += 250;
        n.node.setPosition(i);
        t._guideArrow = n;
      },
      $battleMgr.default.instance.getCurScene().effectParent,
    );
  }
  this._isPlayBuildDoor = !1;
  this.nMaintain.active = !1;
  this._isPlayAnimHurt = !1;
  if (
    0 != $levelBattleData.levelBattleData.cfgStage.id ||
    (11 != this.roomId && 12 != this.roomId)
  ) {
    //
  } else {
    $eventManager.EventManager.instance.on(
      $guideMgr.EGuideEvent.GUIDE_CHANGE,
      this.onGuideChange,
      this,
    );
  }
};
Object.defineProperty(e.prototype, 'hp', {
  get: function () {
    return this._hp;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, 'state', {
  get: function () {
    return this._state;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.selfCollider = null;
  e.animHurt = null;
  e.nMaintain = null;
  e.openSpAnim = null;
  e._state = a.NONE;
  e._hp = 0;
  e._head = null;
  e._waitTime = 0;
  e._waitTimer = 0;
  e._progress = null;
  e._recoverHp = 0;
  e._recoverTime = 0;
  e._recoverTimer = 0;
  e._curLv = 0;
  e._lvHps = [];
  e._maxHp = 0;
  e._isShowTips = !1;
  e._leftEnemyIds = [];
  e._rightEnemyIds = [];
  e._isPlayAnimHurt = !1;
  e._enterPlayerIsRightX = !1;
  e._checkStateActorIds = [];
  e._isPlayBuildDoor = !1;
  e._guideArrow = null;
  e._recoverSoundName = '';
  return e;
}
export default O;;
