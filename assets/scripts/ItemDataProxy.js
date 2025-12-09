import $cfg from './Cfg';
import $itemEnum from './ItemEnum';
import $taskEnum from './TaskEnum';
import $audioUtil from './AudioUtil';
import $proxyBase from './ProxyBase';
import $proxyDataBase from './ProxyDataBase';
import $eventManager from './EventManager';
import $randomUtil from './RandomUtil';
import $frameEnum from './FrameEnum';
import $campsiteView from './CampsiteView';
import $playerActionMgr from './PlayerActionMgr';
import $localDataProxy from './LocalDataProxy';
import $playerDataProxy from './PlayerDataProxy';
let i;
exports.itemDataProxy = exports.ItemDataProxy = exports.ItemData = exports.EItemDataEvent = void 0;
let r;
!(function (t) {
  t.ITEM_ONCE_UPDATE = 'item_once_update';
  t.ITEM_ADD_COMMMON_UI_NOTICE = 'item_add_common_ui_notice';
})((r = exports.EItemDataEvent || (exports.EItemDataEvent = {})));
e.prototype.createInitData = function () {
  return {
    dict: {},
  };
};
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const v = e;
exports.ItemData = v;
e.prototype.updateRedPoint = function () {
  $playerDataProxy.playerDataProxy.updateSkillRedPoint();
};
e.prototype.randomChip = function (t, e) {
  for (
    const n = new Map(),
      i = $cfg.default.instance.dataSkill
        .queryAll(function (e) {
          return $playerDataProxy.playerDataProxy.isUnlockSkill(e.id) && e.rare == t && !e.isInfo;
        })
        .map(function (t) {
          return $playerDataProxy.playerDataProxy.getArtifactUpGreadNeeItemId(t.id);
        });
    e > 0;
  ) {
    const o = i[$randomUtil.RandomUtil.randomInt(0, i.length)];
    const r = $cfg.default.instance.dataItem.getById(o);
    const s = n.get(r.id) || 0;
    n.set(r.id, s + 1);
    e--;
  }
  return n;
};
e.prototype.getItemIconScale = function (t) {
  if (3 === $cfg.default.instance.dataItem.getById(t).type) {
    return 0.6;
  } else {
    return 1;
  }
};
e.prototype.getItemIconBundleName = function () {
  return $frameEnum.Frame.EBundleName.RES;
};
e.prototype.getItemIconPath = function (t) {
  const e = $cfg.default.instance.dataItem.getById(t);
  if (111 == e.type) {
    return 'textures/atlas/item_scene/' + e.icon;
  } else {
    return 'textures/atlas/item/' + e.icon;
  }
};
e.prototype.setItemValue = function (t, e) {
  const n = e - (this._data.localData.dict[t] ? this._data.localData.dict[t] : 0);
  this._data.localData.dict[t] = e;
  if (t == $itemEnum.E_ItemId.SURVIVOR) {
    $playerActionMgr.PlayerActionMgr.instance.triggerAction(
      $taskEnum.EPlayerActionType.RESCUE_HOSTAGE,
    );
    $playerDataProxy.playerDataProxy.updateBuildRedPoint();
  }
  if (t == $itemEnum.E_ItemId.GOLD) {
    $playerDataProxy.playerDataProxy.updateBuildRedPoint();
  }
  $eventManager.EventManager.instance.emit(r.ITEM_ONCE_UPDATE + t, n);
};
e.prototype.addItem = function (t, e) {
  this.updateItemValue(t.itemId, t.itemNum, e);
};
e.prototype.addItems = function (t) {
  const e = this;
  const n = t.length;
  t.forEach(function (t, i) {
    e.addItem(t, i == n - 1);
  });
};
e.prototype.updateItemValue = function (t, e, n) {
  if (void 0 === n) {
    n = !0;
  }
  if (0 != e) {
    const i = e;
    if (this._data.localData.dict[t]) {
      i += this._data.localData.dict[t];
    }
    if (i < 0) {
      i = 0;
    }
    this._data.localData.dict[t] = i;
    if (t == $itemEnum.E_ItemId.GOLD && e < 0) {
      $audioUtil.AudioUtil.playEffect('sounds/lmtw_yx_ConsumingMoney');
    }
    if (t == $itemEnum.E_ItemId.SURVIVOR) {
      if (e > 0) {
        for (const o = e; o > 0; ) {
          $playerActionMgr.PlayerActionMgr.instance.triggerAction(
            $taskEnum.EPlayerActionType.RESCUE_HOSTAGE,
          );
          --o;
        }
      }
      $playerDataProxy.playerDataProxy.updateBuildRedPoint();
      if (e > 0) {
        $eventManager.EventManager.instance.emit($campsiteView.ECampsiteEvent.UPDATE_ROOM);
      }
    }
    if (t == $itemEnum.E_ItemId.GOLD) {
      $playerDataProxy.playerDataProxy.updateBuildRedPoint();
      $eventManager.EventManager.instance.emit($campsiteView.ECampsiteEvent.UPDATE_ROOM);
    }
    if (n) {
      $localDataProxy.localDataProxy.saveData();
    }
    this.updateRedPoint();
    $eventManager.EventManager.instance.emit(r.ITEM_ONCE_UPDATE + t, e);
  }
};
e.prototype.getItemValue = function (t) {
  return this._data.localData.dict[t] || 0;
};
e.prototype.checkCanDropReward = function (t) {
  if (0 == t) {
    return !1;
  }
  const e = $cfg.default.instance.dataReward.getById(t);
  return !(e && 111 == e.type && this.getItemValue(e.changeID) > 0);
};
e.prototype.initData = function () {};
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const b = e;
exports.ItemDataProxy = b;
exports.itemDataProxy = new b(v);
