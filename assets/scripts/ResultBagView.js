import $cfg from './Cfg';
import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $bagConst from './BagConst';
import $resultBagEquipItem from './ResultBagEquipItem';
import $levelWinPopup from './LevelWinPopup';
let i;
const f = cc._decorator;
const d = f.ccclass;
const m = f.property;
e.prototype.setGirdsHight = function (t, e) {
  if (void 0 === e) {
    e = 0;
  }
};
e.prototype.bagItemSwitchReward = function () {
  const t = this;
  const e = 0;
  const n = this.nItem.childrenCount;
  this.nItem.children.forEach(function (i, o) {
    const r = i.getComponent($resultBagEquipItem.default);
    r.playSwitchRewardAnim(
      0.2 * o,
      function () {
        t.setGirdsHight(r.occupyRowCols, 0);
      },
      function () {
        if (++e == n) {
          $eventManager.EventManager.instance.emit(
            $levelWinPopup.ELevelWinPopupEvent.ON_REWARD_SWITCH_COMPLETED,
          );
        }
      },
    );
  });
};
e.prototype.init = function (t, e) {
  const n = this;
  this._gridMap.clear();
  this._gridMap.set('0&0', this.nGrids.children[0]);
  for (const i = $bagConst.BAG_ROW * $bagConst.BAG_COL, o = 1; o < i; ++o) {
    const r = cc.instantiate(this.nGrids.children[0]);
    this.nGrids.addChild(r);
    this._gridMap.set(Math.floor(o / $bagConst.BAG_COL) + '&' + (o % $bagConst.BAG_COL), r);
  }
  this.nGrids.getComponent(cc.Layout).updateLayout();
  const f = 0;
  const d = t.length;
  t.forEach(function (t, i) {
    const o = $cfg.default.instance.dataReward.getById(t.rewardId);
    $resLoader.ResLoader.loadAsset({
      bundleName: $frameEnum.Frame.EBundleName.GAME,
      path: 'prefabs/bag/Bag_Item_' + o.boxSet,
      type: cc.Prefab,
    })
      .then(function (o) {
        const r = cc.instantiate(o);
        r.parent = n.nItem;
        const a = r.addComponent($resultBagEquipItem.default);
        a.init(i, t.rewardId, t.rowCol);
        a.setPosByGrid(n._gridMap.get(t.rowCol).getPosition());
        if (e) {
          a.playShowAnim(0.4 * i, function () {
            ++f;
            n.setGirdsHight(a.occupyRowCols, a.cfgEquip.rare);
            if (f == d) {
              n.bagItemSwitchReward();
            }
          });
        } else {
          n.setGirdsHight(a.occupyRowCols, a.cfgEquip.rare);
        }
      })
      .catch(function () {
        if (++f == d) {
          n.bagItemSwitchReward();
        }
      });
  });
  if (0 == t.length) {
    $eventManager.EventManager.instance.emit(
      $levelWinPopup.ELevelWinPopupEvent.ON_REWARD_SWITCH_COMPLETED,
    );
  }
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nGrids = null;
  e.nItem = null;
  e._gridMap = new Map();
  return e;
}
export default y;
