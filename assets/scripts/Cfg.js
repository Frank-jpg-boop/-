import $c_DataWave from './C_DataWave';
import $c_DataCons from './C_DataCons';
import $c_VipConfig from './C_VipConfig';
import $c_DataRoom from './C_DataRoom';
import $c_DataStage from './C_DataStage';
import $c_DataEnemy from './C_DataEnemy';
import $c_DataMerchant from './C_DataMerchant';
import $c_DataBuild from './C_DataBuild';
import $c_DataSkill from './C_DataSkill';
import $c_DataStageUp from './C_DataStageUp';
import $c_DataSkin from './C_DataSkin';
import $c_DataChoose from './C_DataChoose';
import $c_DataSign from './C_DataSign';
import $c_DataTask from './C_DataTask';
import $c_DataShopBox from './C_DataShopBox';
import $c_DataShopDaily from './C_DataShopDaily';
import $c_DataAtt from './C_DataAtt';
import $c_DataItem from './C_DataItem';
import $c_DataReward from './C_DataReward';
import $c_DataSurvivor from './C_DataSurvivor';
import $c_DataGuide from './C_DataGuide';
import $lzstring from './lzstring';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
t._instance = null;
t.prototype.initBySingleJson = function () {};
t.prototype.initByMergeCompressConfig = function () {};
t.prototype.initByMergeJson = function () {};
Object.defineProperty(t.prototype, "dataGuide", {
  get: function () {
    return this._dataGuide;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataSurvivor", {
  get: function () {
    return this._dataSurvivor;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataReward", {
  get: function () {
    return this._dataReward;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataItem", {
  get: function () {
    return this._dataItem;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataAtt", {
  get: function () {
    return this._dataAtt;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataShopDaily", {
  get: function () {
    return this._dataShopDaily;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataShopBox", {
  get: function () {
    return this._dataShopBox;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataTask", {
  get: function () {
    return this._dataTask;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataSign", {
  get: function () {
    return this._dataSign;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataChoose", {
  get: function () {
    return this._dataChoose;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataSkin", {
  get: function () {
    return this._dataSkin;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataStageUp", {
  get: function () {
    return this._dataStageUp;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataSkill", {
  get: function () {
    return this._dataSkill;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataBuild", {
  get: function () {
    return this._dataBuild;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataMerchant", {
  get: function () {
    return this._dataMerchant;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataEnemy", {
  get: function () {
    return this._dataEnemy;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataStage", {
  get: function () {
    return this._dataStage;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataRoom", {
  get: function () {
    return this._dataRoom;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "vipConfig", {
  get: function () {
    return this._vipConfig;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataCons", {
  get: function () {
    return this._dataCons;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, "dataWave", {
  get: function () {
    return this._dataWave;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t, "instance", {
  get: function () {
    if (null == t._instance) {
      t._instance = new t();
    }
    return t._instance;
  },
  enumerable: !1,
  configurable: !0,
});
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
const R = t;
exports.default = R;
