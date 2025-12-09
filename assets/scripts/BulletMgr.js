import $nodePoolManager from './NodePoolManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $battleMgr from './BattleMgr';
t._instance = null;
t.prototype.createBullet = function (t) {
  const e = this;
  const n = $nodePoolManager.default.instance.getPoolPrefab(t.prefabName);
  if (n) {
    const s = $nodePoolManager.default.instance.getNode(n);
    t.parent.addChild(s);
    s.setSiblingIndex(0);
    s.setPosition(t.initPos);
    const c = s.getComponent(t.bulletClass);
    c.init(t.iconPath);
    s.active = !1;
    if (t.onCreated) {
      t.onCreated(c);
    }
  } else {
    $resLoader.ResLoader.loadAsset({
      bundleName: $frameEnum.Frame.EBundleName.GAME,
      path: 'prefabs/battle/bullet/' + t.prefabName,
      type: cc.Prefab,
      success: function (n) {
        $nodePoolManager.default.instance.addPoolPrefab(n);
        $battleMgr.default.instance.addPoolNodePrefabName(n.name);
        e.createBullet(t);
      },
    });
  }
};
Object.defineProperty(t, 'instance', {
  get: function () {
    if (null == t._instance) {
      t._instance = new t();
    }
    return t._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {}
const s = t;
export default s;
