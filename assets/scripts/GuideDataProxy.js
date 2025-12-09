var i;
exports.guideDataProxy = exports.GuideDataProxy = exports.GuideData = exports.EGuideStepId = void 0;
var r;
var $cfg = require("./Cfg");
var $itemEnum = require("./ItemEnum");
var $proxyBase = require("./ProxyBase");
var $proxyDataBase = require("./ProxyDataBase");
var $itemDataProxy = require("./ItemDataProxy");
var $localDataProxy = require("./LocalDataProxy");
var $stageDataProxy = require("./StageDataProxy");
!(function (t) {
    t[(t.NONE = -1)] = "NONE";
    t[(t.G_1 = 1)] = "G_1";
    t[(t.G_2 = 2)] = "G_2";
    t[(t.G_3 = 3)] = "G_3";
    t[(t.G_4 = 4)] = "G_4";
    t[(t.G_5 = 5)] = "G_5";
    t[(t.G_6 = 6)] = "G_6";
    t[(t.G_7 = 7)] = "G_7";
    t[(t.G_8 = 8)] = "G_8";
    t[(t.G_9 = 9)] = "G_9";
    t[(t.G_10 = 10)] = "G_10";
    t[(t.G_11 = 11)] = "G_11";
    t[(t.G_12 = 12)] = "G_12";
    t[(t.G_13 = 13)] = "G_13";
    t[(t.G_14 = 14)] = "G_14";
    t[(t.G_21 = 21)] = "G_21";
    t[(t.G_23 = 23)] = "G_23";
    t[(t.G_24 = 24)] = "G_24";
    t[(t.G_25 = 25)] = "G_25";
    t[(t.G_26 = 26)] = "G_26";
    t[(t.G_27 = 27)] = "G_27";
    t[(t.G_41 = 41)] = "G_41";
})((r = exports.EGuideStepId || (exports.EGuideStepId = {})));
var f = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.createInitData = function () {
        return {
            guideIds: [],
            curGuideId: 2
        };
    };
    return e;
})($proxyDataBase.ProxyDataBase);
exports.GuideData = f;
var d = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "isComplete", {
        get: function () {
            return -1 == this._data.localData.curGuideId;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "curGuideId", {
        get: function () {
            return this._data.localData.curGuideId;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.initData = function () {
        if (this._data.localData.guideIds.includes(r.G_41)) {
            this._data.localData.curGuideId = -1;
        }
        if ($stageDataProxy.stageDataProxy.passStageId > 0) {
            this._data.localData.curGuideId = -1;
        }
        if (this._data.localData.curGuideId == r.G_23 && $itemDataProxy.itemDataProxy.getItemValue(101) <= 0) {
            $itemDataProxy.itemDataProxy.updateItemValue($itemEnum.E_ItemId.E_101, 10);
        }
    };
    e.prototype.isCompleteFirstBattleGuide = function () {
        return -1 == this._data.localData.curGuideId || this._data.localData.guideIds.includes(r.G_14);
    };
    e.prototype.pushGuide = function (t) {
        var e = $cfg.default.instance.dataGuide.getById(t);
        if (e && 1 == e.memory) {
            if (this._data.localData.guideIds.includes(t)) {
                //
            } else {
                this._data.localData.guideIds.push(t);
            }
            var n = this._data.localData.curGuideId;
            var i = $cfg.default.instance.dataGuide.sheet();
            i.sort(function (t, e) {
                return t.id - e.id;
            });
            for (var o = 0; o < i.length; o++) {
                var r = i[o];
                if (r.id > t) {
                    this._data.localData.curGuideId = r.id;
                    break;
                }
            }
            if (n == this._data.localData.curGuideId) {
                this._data.localData.curGuideId = -1;
            }
            $localDataProxy.localDataProxy.saveData();
        }
    };
    return e;
})($proxyBase.ProxyBase);
exports.GuideDataProxy = d;
exports.guideDataProxy = new d(f);
