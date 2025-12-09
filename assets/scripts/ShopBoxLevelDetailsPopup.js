import $cfg from './Cfg';
import $popupBase from './PopupBase';
import $playerDataProxy from './PlayerDataProxy';
let i;
const l = cc._decorator;
const u = l.ccclass;
const p = l.property;
e.prototype.updateBoxLv = function () {
  const t = this;
  this.mLvLab.string = "Lv." + this._boxLevel;
  this.mBtnLeft.active = this._boxLevel > 1;
  this.mBtnRight.active = this._boxLevel < this._maxLv;
  for (
    const e = $cfg.default.instance.dataShopBox.queryOne(function (e) {
              return e.level == t._boxLevel;
            }),
          n = 1;
    n < 3;
    ++n
  ) {
    const i = this.node
      .getChildByName("boxItem" + n)
      .getChildByName("cards").children;
    i.forEach(function (t) {
      t.active = !1;
    });
    for (
      const o = (1 == n ? e.reward : e.bigReward).split("|"), r = 0;
      r < o.length;
      ++r
    ) {
      const s = o[r].split("_").map(Number);
      const c = i[r];
      c.active = !0;
      c.getChildByName("num").getComponent(cc.Label).string = "" + s[1];
    }
  }
};
e.prototype.onBtnLeft = function () {
  this._boxLevel--;
  this.updateBoxLv();
};
e.prototype.onBtnRight = function () {
  this._boxLevel++;
  this.updateBoxLv();
};
e.prototype.init = function () {
  this._boxLevel = $playerDataProxy.playerDataProxy.getBoxLevel();
  const t = $cfg.default.instance.dataShopBox.sheet();
  const e = Object.keys(t);
  this._maxLv = t[e[e.length - 1]].level;
  this.updateBoxLv();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.mLvLab = null;
  e.mBtnLeft = null;
  e.mBtnRight = null;
  e._boxLevel = 0;
  e._maxLv = 0;
  return e;
}
exports.default = h;
