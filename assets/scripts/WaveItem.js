import $cfg from './Cfg';
import $randomUtil from './RandomUtil';
import $battleMgr from './BattleMgr';
import $levelBattleData from './LevelBattleData';
let i;
const u = cc._decorator;
const p = u.ccclass;
const h = u.property;
e.prototype.updateBar = function (t) {
  this.nBar.getChildByName('Bar').width = this._width + 100 * t;
};
e.prototype.update = function () {
  const t = $battleMgr.default.instance.getCurScene();
  if (t) {
    this.node.zIndex = this.node.x;
    if (this._wave < $levelBattleData.levelBattleData.curWave) {
      this.updateBar(1);
    } else {
      if (this._wave == $levelBattleData.levelBattleData.curWave) {
        if (0 == t.curWaveTimer) {
          this.updateBar(0);
        } else {
          this.updateBar((t.curWaveTimer - t.curWaveTime) / t.curWaveTimer);
        }
      } else {
        this.updateBar(0);
      }
    }
  }
};
e.prototype.updateData = function (t) {
  this._wave = t;
  const e = $levelBattleData.levelBattleData.getWaveId(this._wave);
  const n = $cfg.default.instance.dataWave.getById(e).spe > 0;
  const i = this.nState.getChildByName('Boss');
  const o = this.nState.getChildByName('Normal');
  i.active = n;
  o.active = !n;
  if (i.active) {
    i.children[1].active = $levelBattleData.levelBattleData.curWave == this._wave;
  }
  if (o.active) {
    o.children[1].active = $levelBattleData.levelBattleData.curWave == this._wave;
  }
};
e.prototype.onLoad = function () {
  const t = $randomUtil.RandomUtil.randomInt(100, 500);
  this._width = t - 100;
  this.nBar.children.forEach(function (e, n) {
    if (0 == n) {
      e.width = t;
    } else {
      e.width = t - 100;
    }
    e.x = -(t - 100);
  });
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nBar = null;
  e.nState = null;
  e._width = 0;
  e._wave = 0;
  return e;
}
export default f;
