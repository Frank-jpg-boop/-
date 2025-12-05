var $c_DataWave = require("./C_DataWave");
var $c_DataCons = require("./C_DataCons");
var $c_VipConfig = require("./C_VipConfig");
var $c_DataRoom = require("./C_DataRoom");
var $c_DataStage = require("./C_DataStage");
var $c_DataEnemy = require("./C_DataEnemy");
var $c_DataMerchant = require("./C_DataMerchant");
var $c_DataBuild = require("./C_DataBuild");
var $c_DataSkill = require("./C_DataSkill");
var $c_DataStageUp = require("./C_DataStageUp");
var $c_DataSkin = require("./C_DataSkin");
var $c_DataChoose = require("./C_DataChoose");
var $c_DataSign = require("./C_DataSign");
var $c_DataTask = require("./C_DataTask");
var $c_DataShopBox = require("./C_DataShopBox");
var $c_DataShopDaily = require("./C_DataShopDaily");
var $c_DataAtt = require("./C_DataAtt");
var $c_DataItem = require("./C_DataItem");
var $c_DataReward = require("./C_DataReward");
var $c_DataSurvivor = require("./C_DataSurvivor");
var $c_DataGuide = require("./C_DataGuide");
var $lzstring = require("./lzstring");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var R = (function () {
    function t() {
        this._dataWave = new $c_DataWave.C_DataWave();
        this._dataCons = new $c_DataCons.C_DataCons();
        this._vipConfig = new $c_VipConfig.C_VipConfig();
        this._dataRoom = new $c_DataRoom.C_DataRoom();
        this._dataStage = new $c_DataStage.C_DataStage();
        this._dataEnemy = new $c_DataEnemy.C_DataEnemy();
        this._dataMerchant = new $c_DataMerchant.C_DataMerchant();
        this._dataBuild = new $c_DataBuild.C_DataBuild();
        this._dataSkill = new $c_DataSkill.C_DataSkill();
        this._dataStageUp = new $c_DataStageUp.C_DataStageUp();
        this._dataSkin = new $c_DataSkin.C_DataSkin();
        this._dataChoose = new $c_DataChoose.C_DataChoose();
        this._dataSign = new $c_DataSign.C_DataSign();
        this._dataTask = new $c_DataTask.C_DataTask();
        this._dataShopBox = new $c_DataShopBox.C_DataShopBox();
        this._dataShopDaily = new $c_DataShopDaily.C_DataShopDaily();
        this._dataAtt = new $c_DataAtt.C_DataAtt();
        this._dataItem = new $c_DataItem.C_DataItem();
        this._dataReward = new $c_DataReward.C_DataReward();
        this._dataSurvivor = new $c_DataSurvivor.C_DataSurvivor();
        this._dataGuide = new $c_DataGuide.C_DataGuide();
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == t._instance) {
                t._instance = new t();
            }
            return t._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataWave", {
        get: function () {
            return this._dataWave;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataCons", {
        get: function () {
            return this._dataCons;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "vipConfig", {
        get: function () {
            return this._vipConfig;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataRoom", {
        get: function () {
            return this._dataRoom;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataStage", {
        get: function () {
            return this._dataStage;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataEnemy", {
        get: function () {
            return this._dataEnemy;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataMerchant", {
        get: function () {
            return this._dataMerchant;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataBuild", {
        get: function () {
            return this._dataBuild;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataSkill", {
        get: function () {
            return this._dataSkill;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataStageUp", {
        get: function () {
            return this._dataStageUp;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataSkin", {
        get: function () {
            return this._dataSkin;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataChoose", {
        get: function () {
            return this._dataChoose;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataSign", {
        get: function () {
            return this._dataSign;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataTask", {
        get: function () {
            return this._dataTask;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataShopBox", {
        get: function () {
            return this._dataShopBox;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataShopDaily", {
        get: function () {
            return this._dataShopDaily;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataAtt", {
        get: function () {
            return this._dataAtt;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataItem", {
        get: function () {
            return this._dataItem;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataReward", {
        get: function () {
            return this._dataReward;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataSurvivor", {
        get: function () {
            return this._dataSurvivor;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "dataGuide", {
        get: function () {
            return this._dataGuide;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.initByMergeJson = function () {
        return __awaiter(this, void 0, Promise, function () {
            var t;
            var e = this;
            return __generator(this, function () {
                t = new Date().getTime();
                return [
                    2,
                    new Promise(function (n, i) {
                        $resLoader.ResLoader.loadAsset({
                            bundleName: $frameEnum.Frame.EBundleName.CONFIG,
                            path: "GameJsonCfg",
                            type: cc.JsonAsset
                        })
                            .then(function (i) {
                                var o = i.json;
                                for (var r in o) {
                                    var a = "_" + r[0].toLowerCase() + r.slice(1);
                                    if (e.hasOwnProperty(a)) {
                                        e[a].initByMap(o[r]);
                                    } else {
                                        cc.warn("Cfg.initByMergeJson null, " + a);
                                    }
                                }
                                cc.assetManager.releaseAsset(i);
                                cc.log("Cfg.initByMergeJson complete, time:" + (new Date().getTime() - t));
                                n();
                            })
                            .catch(function (t) {
                                cc.error("Cfg.initByMergeJson error", t);
                                i();
                            });
                    })
                ];
            });
        });
    };
    t.prototype.initByMergeCompressConfig = function () {
        return __awaiter(this, void 0, Promise, function () {
            var t;
            var e = this;
            return __generator(this, function () {
                t = new Date().getTime();
                return [
                    2,
                    new Promise(function (n, i) {
                        $resLoader.ResLoader.loadAsset({
                            bundleName: $frameEnum.Frame.EBundleName.CONFIG,
                            path: "GameJsonCfg",
                            type: cc.TextAsset
                        })
                            .then(function (i) {
                                var o = JSON.parse($lzstring.decompressFromBase64(i.text));
                                for (var r in o) {
                                    var a = "_" + r[0].toLowerCase() + r.slice(1);
                                    if (e.hasOwnProperty(a)) {
                                        e[a].initByMap(o[r]);
                                    } else {
                                        cc.warn("Cfg.initByMergeCompressConfig null, " + a);
                                    }
                                }
                                cc.assetManager.releaseAsset(i);
                                cc.log(
                                    "Cfg.initByMergeCompressConfig complete, time:" + (new Date().getTime() - t) + "ms"
                                );
                                n();
                            })
                            .catch(function (t) {
                                cc.error("Cfg.initByMergeCompressConfig error", t);
                                i();
                            });
                    })
                ];
            });
        });
    };
    t.prototype.initBySingleJson = function () {
        return __awaiter(this, void 0, Promise, function () {
            var t;
            var e = this;
            return __generator(this, function () {
                t = new Date().getTime();
                return [
                    2,
                    new Promise(function (n, i) {
                        $resLoader.ResLoader.loadDir({
                            bundleName: $frameEnum.Frame.EBundleName.CONFIG,
                            dir: ""
                        })
                            .then(function (n) {
                                n.forEach(function (t) {
                                    var n = t.name;
                                    var i = "_" + n[0].toLowerCase() + n.slice(1);
                                    if (e.hasOwnProperty(i)) {
                                        e[i].initByMap(t.json);
                                        cc.assetManager.releaseAsset(t);
                                    } else {
                                        cc.warn("Cfg.initBySingleJson null, " + i);
                                    }
                                });
                                cc.log("Cfg.initBySingleJson complete, time:" + (new Date().getTime() - t));
                            })
                            .catch(function (t) {
                                cc.error("Cfg.initBySingleJson error", t);
                                i();
                            });
                    })
                ];
            });
        });
    };
    t._instance = null;
    return t;
})();
exports.default = R;
