import $cfg from './Cfg';
import $proxyBase from './ProxyBase';
import $proxyDataBase from './ProxyDataBase';
import $eventManager from './EventManager';
import $timeUtil from './TimeUtil';
import $redPointMgr from './RedPointMgr';
import $redPointPathConfig from './RedPointPathConfig';
import $itemDataProxy from './ItemDataProxy';
import $localDataProxy from './LocalDataProxy';
import $playerDataProxy from './PlayerDataProxy';
let i;
exports.signDataProxy = exports.SignDataProxy = exports.SignData = exports.ESignDataEvent = void 0;
let r;
!(function (t) {
  t.UPDATE_SIGN_DATA = 'UPDATE_SIGN_DATA';
})((r = exports.ESignDataEvent || (exports.ESignDataEvent = {})));
e.prototype.createInitData = function () {
  return {
    sevenSignDay: 0,
    lastSevenSignTime: 0,
  };
};
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const y = e;
exports.SignData = y;
e.prototype.updateRedPoint = function () {
  const t = this.canSevenSign();
  $redPointMgr.default.instance.setRedPointNum(
    $redPointPathConfig.ERedPointPathName.GAME_BATTLE_SEVENSIGN,
    t ? 1 : 0,
  );
};
e.prototype.getSevenSignRewarad = function (t) {
  const e = this.curSevenSignDay;
  if (!(e > 7)) {
    this._data.localData.sevenSignDay = e;
    this._data.localData.lastSevenSignTime = $timeUtil.TimeUtil.getTime();
    const n = $cfg.default.instance.dataSign.getById(e).reward.split('_').map(Number);
    const i = n[0];
    const o = n[1];
    const s = [];
    const c = $cfg.default.instance.dataItem.getById(i);
    if (3 == c.type) {
      $itemDataProxy.itemDataProxy.randomChip(c.rare, o * (t ? 2 : 1)).forEach(function (t, e) {
        s.push({
          itemId: e,
          itemNum: t,
        });
      });
    } else {
      if (4 == c.type) {
        ($playerDataProxy.playerDataProxy.updateSkinRedPoint(),
          $localDataProxy.localDataProxy.saveData());
      } else {
        s = [
          {
            itemId: i,
            itemNum: o * (t ? 2 : 1),
          },
        ];
      }
    }
    $eventManager.EventManager.instance.emit(
      $itemDataProxy.EItemDataEvent.ITEM_ADD_COMMMON_UI_NOTICE,
      s,
    );
    $eventManager.EventManager.instance.emit(r.UPDATE_SIGN_DATA);
    this.updateRedPoint();
  }
};
e.prototype.canSevenSign = function () {
  return (
    this.curSevenSignDay <= 7 &&
    !$timeUtil.TimeUtil.isSameDay(
      this._data.localData.lastSevenSignTime,
      $timeUtil.TimeUtil.getTime(),
    )
  );
};
Object.defineProperty(e.prototype, 'curSevenSignDay', {
  get: function () {
    return this._data.localData.sevenSignDay + 1;
  },
  enumerable: !1,
  configurable: !0,
});
e.prototype.initData = function () {
  this.updateRedPoint();
};
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const _ = e;
exports.SignDataProxy = _;
exports.signDataProxy = new _(y);
