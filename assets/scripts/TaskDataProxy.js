var i;
exports.taskDataProxy = exports.TaskDataProxy = exports.TaskData = exports.ETaskEvent = void 0;
var r;
var $cfg = require("./Cfg");
var $taskEnum = require("./TaskEnum");
var $proxyBase = require("./ProxyBase");
var $proxyDataBase = require("./ProxyDataBase");
var $eventManager = require("./EventManager");
var $redPointMgr = require("./RedPointMgr");
var $redPointPathConfig = require("./RedPointPathConfig");
var $playerActionMgr = require("./PlayerActionMgr");
var $itemDataProxy = require("./ItemDataProxy");
var $localDataProxy = require("./LocalDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var $stageDataProxy = require("./StageDataProxy");
!(function (t) {
    t.UPDATE_MAIN_TASK = "UPDATE_MAIN_TASK";
})((r = exports.ETaskEvent || (exports.ETaskEvent = {})));
var g = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.createInitData = function () {
        return {
            mainTaskData: {
                curTaskId: 1,
                curTaskCount: 0,
                curTaskMaxCount: 1,
                curTaskParam: null
            }
        };
    };
    return e;
})($proxyDataBase.ProxyDataBase);
exports.TaskData = g;
var v = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "curMainTaskData", {
        get: function () {
            return this._data.localData.mainTaskData;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "isCompleteMainTask", {
        get: function () {
            return null == this._data.localData.mainTaskData;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.initData = function () {
        this.updateRedPoint();
        $playerActionMgr.PlayerActionMgr.instance.registerEvent(
            $taskEnum.ETaskType.MAIN_LINE,
            this.onDailyTaskActionUpdate,
            this
        );
    };
    e.prototype.initMainTaskCount = function () {
        if (this._data.localData.mainTaskData) {
            var t = $cfg.default.instance.dataTask.getById(this._data.localData.mainTaskData.curTaskId);
            switch (t.condition) {
                case $taskEnum.EPlayerActionType.WEAPON_UP:
                    var e = t.parm.split("|").map(Number),
                        n = e[0],
                        i = e[1];
                    this._data.localData.mainTaskData.curTaskCount = $playerDataProxy.playerDataProxy.getArtifactLv(n);
                    this._data.localData.mainTaskData.curTaskMaxCount = i;
                    break;
                case $taskEnum.EPlayerActionType.BUILD_UP_LV:
                    var o = t.parm.split("|").map(Number),
                        r = o[0];
                    i = o[1];
                    this._data.localData.mainTaskData.curTaskCount = $playerDataProxy.playerDataProxy.getBuildLv(r);
                    this._data.localData.mainTaskData.curTaskMaxCount = i;
                    break;
                case $taskEnum.EPlayerActionType.BUILD_UP_STAR:
                    var c = t.parm.split("|").map(Number),
                        l = ((r = c[0]), c[1]);
                    this._data.localData.mainTaskData.curTaskCount =
                        $playerDataProxy.playerDataProxy.getBuildPeopleNum(r);
                    this._data.localData.mainTaskData.curTaskMaxCount = l;
                    break;
                case $taskEnum.EPlayerActionType.ARRIVE_LEVEL:
                    this._data.localData.mainTaskData.curTaskCount =
                        $stageDataProxy.stageDataProxy.passStageId + 1 >= Number(t.parm) ? 1 : 0;
                    this._data.localData.mainTaskData.curTaskMaxCount = 1;
                    break;
                default:
                    this._data.localData.mainTaskData.curTaskCount = 0;
                    this._data.localData.mainTaskData.curTaskMaxCount = Number(t.parm);
            }
        }
    };
    e.prototype.onDailyTaskActionUpdate = function (t) {
        for (var e = [], n = 1; n < arguments.length; n++) {
            e[n - 1] = arguments[n];
        }
        if (!this.isCompleteMainTask) {
            var i = $cfg.default.instance.dataTask.getById(this.curMainTaskData.curTaskId);
            if (t == i.condition) {
                switch (t) {
                    case $taskEnum.EPlayerActionType.WEAPON_UP:
                        var o = i.parm.split("|").map(Number),
                            c = o[0];
                        o[1];
                        this._data.localData.mainTaskData.curTaskCount =
                            $playerDataProxy.playerDataProxy.getArtifactLv(c);
                        break;
                    case $taskEnum.EPlayerActionType.BUILD_UP_LV:
                        var l = i.parm.split("|").map(Number),
                            p = l[0];
                        l[1];
                        this._data.localData.mainTaskData.curTaskCount = $playerDataProxy.playerDataProxy.getBuildLv(p);
                        break;
                    case $taskEnum.EPlayerActionType.BUILD_UP_STAR:
                        var h = i.parm.split("|").map(Number);
                        p = h[0];
                        h[1];
                        this._data.localData.mainTaskData.curTaskCount =
                            $playerDataProxy.playerDataProxy.getBuildPeopleNum(p);
                        break;
                    case $taskEnum.EPlayerActionType.ARRIVE_LEVEL:
                        this._data.localData.mainTaskData.curTaskCount =
                            $stageDataProxy.stageDataProxy.passStageId + 1 >= Number(i.parm) ? 1 : 0;
                        this._data.localData.mainTaskData.curTaskMaxCount = 1;
                        break;
                    default:
                        this._data.localData.mainTaskData.curTaskCount++;
                }
                this.updateRedPoint();
                $eventManager.EventManager.instance.emit(r.UPDATE_MAIN_TASK);
                $localDataProxy.localDataProxy.saveData();
            }
        }
    };
    e.prototype.getMainTaskReward = function (t) {
        if (!this.isCompleteMainTask) {
            var e = $cfg.default.instance.dataTask.getById(this.curMainTaskData.curTaskId);
            var n = e.reward.split("_").map(Number);
            var i = [
                {
                    itemId: n[0],
                    itemNum: n[1]
                }
            ];
            $itemDataProxy.itemDataProxy.addItems(i);
            var o = e.id + 1;
            if ($cfg.default.instance.dataTask.getById(o)) {
                this._data.localData.mainTaskData.curTaskId = o;
                this.initMainTaskCount();
            } else {
                this._data.localData.mainTaskData = null;
            }
            this.updateRedPoint();
            $localDataProxy.localDataProxy.saveData();
            if (t) {
                t(i);
            }
            $eventManager.EventManager.instance.emit(r.UPDATE_MAIN_TASK);
        }
    };
    e.prototype.updateRedPoint = function () {
        var t = !1;
        if (
            this._data.localData.mainTaskData &&
            this._data.localData.mainTaskData.curTaskCount >= this._data.localData.mainTaskData.curTaskMaxCount
        ) {
            t = !0;
        }
        $redPointMgr.default.instance.setRedPointNum($redPointPathConfig.ERedPointPathName.GAME_BATTLE_TASK, t ? 1 : 0);
    };
    return e;
})($proxyBase.ProxyBase);
exports.TaskDataProxy = v;
exports.taskDataProxy = new v(g);
