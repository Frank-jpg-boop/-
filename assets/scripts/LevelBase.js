import $cfg from './Cfg';
import $eventManager from './EventManager';
import $randomUtil from './RandomUtil';
import $guideMgr from './GuideMgr';
import $itemDataProxy from './ItemDataProxy';
import $stageDataProxy from './StageDataProxy';
import $battleMgr from './BattleMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $levelBattleData from './LevelBattleData';
import $levelPath from './LevelPath';
import $levelRoom from './LevelRoom';
import $unitMgr from './UnitMgr';
let i;
const g = cc._decorator;
const v = g.ccclass;
const b = g.property;
e.prototype.onGuideChange = function () {};
e.prototype.initGuideView = function () {};
e.prototype.findExitRoom = function () {
  return Array.from(this._roomMap.values()).find(function (t) {
    return 1 == t.cfg.isOut;
  });
};
e.prototype.getLayerPosY = function (t) {
  return this._layerPosYMap.get(t);
};
e.prototype.findLayerByPos = function (t) {
  const e = Array.from(this._layerPosYMap.values());
  e.sort(function (t, e) {
    return t - e;
  });
  for (const n = e.length - 1; n >= 0; --n) {
    if (t.y >= e[n]) {
      return n + 1;
    }
  }
  return -1;
};
e.prototype.getRoomByPos = function (t, e) {
  return this.getRoomsByLayer(t).find(function (t) {
    return e.x >= t.node.x && e.x <= t.node.x + t.node.width;
  });
};
e.prototype.getRoomsByLayer = function (t) {
  return Array.from(this._roomMap.values()).filter(function (e) {
    return e.layer == t;
  });
};
e.prototype.getRoomById = function (t) {
  if (this._roomMap.has(t)) {
    return this._roomMap.get(t);
  } else {
    return null;
  }
};
e.prototype.createEvacuationExit = function () {
  $unitMgr.UnitMgr.instance.createUnit({
    areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.EVACUATION_EXIT,
    areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
    parent: $battleMgr.default.instance.getCurScene().unitParent,
    prefabName: "EvacuationExit",
    unitClass: "EvacuationExit",
    initPos: cc.v2(
      this._exLevelData.playerExitPos.x,
      this._exLevelData.playerExitPos.y,
    ),
    onCreated: null,
  });
};
e.prototype.allotSurvivor = function () {
  const t = this;
  this._survivorTotalCount = 0;
  const e = $battleMgr.default.instance.getCurScene().cfg;
  const n = $stageDataProxy.stageDataProxy.getStageInfo(e.id);
  const i = e.maxNpc;
  if (i > 0) {
    const o = [];
    this._exLevelData.rooms.forEach(function (e) {
      e.survivorDatas.forEach(function (e) {
        t._survivorTotalCount++;
        const i = (
          e.weight + $levelBattleData.levelBattleData.cfgStage.checkSur
        ).toString();
        if (n.survivalKeys.includes(i)) {
          //
        } else {
          o.push({
            key: i,
            prob: e.weight,
            pos: cc.v2(e.pos.x, e.pos.y),
            roomId: e.roomId,
          });
        }
      });
    });
    if (0 == o.length) {
      return;
    }
    i = Math.min(i, o.length);
    for (const r = 0; r < i; ++r) {
      const a = $randomUtil.RandomUtil.randomInt(0, o.length);
      const s = o[a];
      o.splice(a, 1);
      $unitMgr.UnitMgr.instance.createUnit({
        areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.SURVIVOR,
        areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
        parent: $battleMgr.default.instance.getCurScene().unitParent,
        prefabName: "Survival",
        unitClass: "Survival",
        initPos: cc.v2(s.pos.x, s.pos.y),
        initParam: {
          roomId: s.roomId,
          key: s.key,
        },
        onCreated: null,
      });
    }
  }
};
e.prototype.allotReward = function () {
  const t = $battleMgr.default.instance.getCurScene().cfg;
  const e = $unitMgr.UnitMgr.instance.queryUnit(
    $gridAreaDivisionMgr.E_AreaObjectType.SEARCH_POINT,
  );
  const n = e.filter(function (t) {
    return 12 != $cfg.default.instance.dataRoom.getById(t.roomId).openType;
  });
  const i = [];
  if ("" != t.rewardBase) {
    t.rewardBase.split("|").forEach(function (t) {
      const e = t.split("_");
      const n = e[0];
      const o = e[1];
      const r = Number(n);
      const a = o.split("&").map(Number);
      const s = a[0];
      const l = a[1];
      const u = $randomUtil.RandomUtil.randomInt(s, l + 1);
      i.push({
        id: r,
        total: u,
      });
    });
  }
  i.forEach(function (t) {
    for (; t.total > 0; ) {
      n[$randomUtil.RandomUtil.randomInt(0, n.length)].addReward(t.id);
      --t.total;
    }
  });
  const o = [];
  if ("" != t.rewardADBase) {
    t.rewardADBase.split("|").forEach(function (t) {
      const e = t.split("_");
      const n = e[0];
      const i = e[1];
      const r = Number(n);
      const a = i.split("&").map(Number);
      const s = a[0];
      const l = a[1];
      const u = $randomUtil.RandomUtil.randomInt(s, l + 1);
      o.push({
        id: r,
        total: u,
      });
    });
  }
  const r = e.filter(function (t) {
    return 12 == $cfg.default.instance.dataRoom.getById(t.roomId).openType;
  });
  o.forEach(function (t) {
    for (; t.total > 0; ) {
      r[$randomUtil.RandomUtil.randomInt(0, r.length)].addReward(t.id);
      --t.total;
    }
  });
  const s = [];
  if ("" != t.rewardRoom) {
    t.rewardRoom.split("|").forEach(function (t) {
      if ("" != t) {
        const e = t.split("_");
        const n = e[0];
        const i = e[1];
        const o = e[2];
        const r = Number(n);
        const a = Number(i);
        const c = o.split("&").map(Number);
        s.push({
          id: r,
          prob: a,
          roomIds: c,
        });
      }
    });
  }
  if ("" != t.baseRoom) {
    t.baseRoom.split("|").forEach(function (t) {
      if ("" != t) {
        const e = t.split("_");
        const n = e[0];
        const i = e[1];
        const o = e[2];
        const r = Number(n);
        const a = Number(i);
        const c = o.split("&").map(Number);
        s.push({
          id: r,
          prob: a,
          roomIds: c,
        });
      }
    });
  }
  s.forEach(function (t) {
    const n = e.filter(function (e) {
      const n = $cfg.default.instance.dataRoom.getById(e.roomId);
      return (
        (t.roomIds.includes(999) && 12 != n.openType) ||
        t.roomIds.includes(e.roomId)
      );
    });
    const i = n[$randomUtil.RandomUtil.randomInt(0, n.length)];
    if (i) {
      if (
        $itemDataProxy.itemDataProxy.checkCanDropReward(t.id) &&
        $randomUtil.RandomUtil.randomInt(0, 100) < 100 * t.prob
      ) {
        i.addReward(t.id);
      }
    } else {
      console.error("没有奖励找到房间：", t.roomIds);
    }
  });
  e.forEach(function (t) {
    if (0 == t.rewardNum) {
      t.remove();
    }
  });
};
e.prototype.init = function (t) {
  const e = this;
  this._exLevelData = t.json;
  cc.assetManager.releaseAsset(t);
  this._exLevelData.rooms.forEach(function (t) {
    const n = cc.instantiate(e.pLevelRoom);
    const i = n.getComponent($levelRoom.default);
    e.nRooms.addChild(n);
    i.init(t);
    e._roomMap.set(t.cfgId, i);
  });
  this._path = this.nPath.getComponent($levelPath.default);
  this._path.init(this._exLevelData.pathPoints, this._exLevelData.rooms);
  this._roomMap.forEach(function (t) {
    t.onPathInitComplete();
  });
  this._roomMap.forEach(function (t) {
    const n = t.getGroundY();
    if (e._layerPosYMap.has(t.layer)) {
      n = Math.min(n, e._layerPosYMap.get(t.layer));
    }
    e._layerPosYMap.set(t.layer, n);
  });
  this._roomMap.forEach(function (t) {
    t.resetGoundY(e._layerPosYMap.get(t.layer));
  });
  this.allotReward();
  this.allotSurvivor();
  this.createEvacuationExit();
  this.initGuideView();
};
e.prototype.onDestroy = function () {
  $eventManager.EventManager.instance.off(
    $guideMgr.EGuideEvent.GUIDE_CHANGE,
    this.onGuideChange,
    this,
  );
};
e.prototype.onLoad = function () {
  $eventManager.EventManager.instance.on(
    $guideMgr.EGuideEvent.GUIDE_CHANGE,
    this.onGuideChange,
    this,
  );
};
Object.defineProperty(e.prototype, "survivorTotalCount", {
  get: function () {
    return this._survivorTotalCount;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "playerExitPos", {
  get: function () {
    return cc.v2(
      this._exLevelData.playerExitPos.x,
      this._exLevelData.playerExitPos.y,
    );
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "playerCreatePos", {
  get: function () {
    return cc.v2(
      this._exLevelData.playerCreatePos.x,
      this._exLevelData.playerCreatePos.y,
    );
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "path", {
  get: function () {
    return this._path;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nActors = null;
  e.nRooms = null;
  e.nUnits = null;
  e.nBottom = null;
  e.nPath = null;
  e.pLevelRoom = null;
  e.nActorTops = null;
  e.nBgTop = null;
  e._exLevelData = null;
  e._path = null;
  e._roomMap = new Map();
  e._layerPosYMap = new Map();
  e._survivorTotalCount = 0;
  return e;
}
exports.default = E;
