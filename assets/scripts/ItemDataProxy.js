var i;
exports.itemDataProxy = exports.ItemDataProxy = exports.ItemData = exports.EItemDataEvent = void 0;
var r;
var $cfg = require("./Cfg");
var $itemEnum = require("./ItemEnum");
var $taskEnum = require("./TaskEnum");
var $audioUtil = require("./AudioUtil");
var $proxyBase = require("./ProxyBase");
var $proxyDataBase = require("./ProxyDataBase");
var $eventManager = require("./EventManager");
var $randomUtil = require("./RandomUtil");
var $frameEnum = require("./FrameEnum");
var $campsiteView = require("./CampsiteView");
var $playerActionMgr = require("./PlayerActionMgr");
var $localDataProxy = require("./LocalDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
!(function (t) {
    t.ITEM_ONCE_UPDATE = "item_once_update";
    t.ITEM_ADD_COMMMON_UI_NOTICE = "item_add_common_ui_notice";
})((r = exports.EItemDataEvent || (exports.EItemDataEvent = {})));
var v = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.createInitData = function () {
        return {
            dict: {}
        };
    };
    return e;
})($proxyDataBase.ProxyDataBase);
exports.ItemData = v;
var b = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.initData = function () {};
    e.prototype.checkCanDropReward = function (t) {
        if (0 == t) {
            return !1;
        }
        var e = $cfg.default.instance.dataReward.getById(t);
        return !(e && 111 == e.type && this.getItemValue(e.changeID) > 0);
    };
    e.prototype.getItemValue = function (t) {
        return this._data.localData.dict[t] || 0;
    };
    e.prototype.updateItemValue = function (t, e, n) {
        if (void 0 === n) {
            n = !0;
        }
        if (0 != e) {
            var i = e;
            if (this._data.localData.dict[t]) {
                i += this._data.localData.dict[t];
            }
            if (i < 0) {
                i = 0;
            }
            this._data.localData.dict[t] = i;
            if (t == $itemEnum.E_ItemId.GOLD && e < 0) {
                $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_ConsumingMoney");
            }
            if (t == $itemEnum.E_ItemId.SURVIVOR) {
                if (e > 0) {
                    for (var o = e; o > 0; ) {
                        $playerActionMgr.PlayerActionMgr.instance.triggerAction(
                            $taskEnum.EPlayerActionType.RESCUE_HOSTAGE
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
    e.prototype.addItems = function (t) {
        var e = this;
        var n = t.length;
        t.forEach(function (t, i) {
            e.addItem(t, i == n - 1);
        });
    };
    e.prototype.addItem = function (t, e) {
        this.updateItemValue(t.itemId, t.itemNum, e);
    };
    e.prototype.setItemValue = function (t, e) {
        var n = e - (this._data.localData.dict[t] ? this._data.localData.dict[t] : 0);
        this._data.localData.dict[t] = e;
        if (t == $itemEnum.E_ItemId.SURVIVOR) {
            $playerActionMgr.PlayerActionMgr.instance.triggerAction($taskEnum.EPlayerActionType.RESCUE_HOSTAGE);
            $playerDataProxy.playerDataProxy.updateBuildRedPoint();
        }
        if (t == $itemEnum.E_ItemId.GOLD) {
            $playerDataProxy.playerDataProxy.updateBuildRedPoint();
        }
        $eventManager.EventManager.instance.emit(r.ITEM_ONCE_UPDATE + t, n);
    };
    e.prototype.getItemIconPath = function (t) {
        var e = $cfg.default.instance.dataItem.getById(t);
        if (111 == e.type) {
            return "textures/atlas/item_scene/" + e.icon;
        } else {
            return "textures/atlas/item/" + e.icon;
        }
    };
    e.prototype.getItemIconBundleName = function () {
        return $frameEnum.Frame.EBundleName.RES;
    };
    e.prototype.getItemIconScale = function (t) {
        if (3 === $cfg.default.instance.dataItem.getById(t).type) {
            return 0.6;
        } else {
            return 1;
        }
    };
    e.prototype.randomChip = function (t, e) {
        for (
            var n = new Map(),
                i = $cfg.default.instance.dataSkill
                    .queryAll(function (e) {
                        return $playerDataProxy.playerDataProxy.isUnlockSkill(e.id) && e.rare == t && !e.isInfo;
                    })
                    .map(function (t) {
                        return $playerDataProxy.playerDataProxy.getArtifactUpGreadNeeItemId(t.id);
                    });
            e > 0;

        ) {
            var o = i[$randomUtil.RandomUtil.randomInt(0, i.length)];
            var r = $cfg.default.instance.dataItem.getById(o);
            var s = n.get(r.id) || 0;
            n.set(r.id, s + 1);
            e--;
        }
        return n;
    };
    e.prototype.updateRedPoint = function () {
        $playerDataProxy.playerDataProxy.updateSkillRedPoint();
    };
    return e;
})($proxyBase.ProxyBase);
exports.ItemDataProxy = b;
exports.itemDataProxy = new b(v);
