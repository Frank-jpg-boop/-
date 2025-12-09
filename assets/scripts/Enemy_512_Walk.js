import $mathUtil from './MathUtil';
import $battleMgr from './BattleMgr';
import $actorEnum from './ActorEnum';
import $enemyRefreshMgr from './EnemyRefreshMgr';
let i;
exports.Enemy_512_Walk = void 0;
e.prototype.end = function () {};
e.prototype.update = function (t) {
  if (this._context.node.getPosition().fuzzyEquals(this._exitPos, 10)) {
    this._context.remove();
  } else {
    this.updateFinderMove(t);
  }
};
e.prototype.updateFindTarget = function () {
  if (null == this._exitPos) {
    this._exitPos =
      $enemyRefreshMgr.EnemyRefreshMgr.instance.randomRefreshPoint().pos;
    for (
      const t = $mathUtil.MathUtil.vec2Fixed(this._exitPos), e = $battleMgr.default.instance.getCurScene().level.path;
      ;
    ) {
      const n = e.findPathPointByPos(t);
      if ("" != n) {
        this._findPathPointId = n;
        this._findPathLineId = "";
        break;
      }
      const i = e.findPathLineByPos(t);
      if ("" != i) {
        this._findPathLineId = i;
        this._findPathPointId = "";
      }
      break;
    }
  }
  this.updateFinder(
    this._exitPos,
    this._findPathLineId,
    this._findPathPointId,
  );
};
e.prototype.begin = function () {
  t.prototype.begin.call(this, null);
};
function e(e) {
  const n = t.call(this, e) || this;
  n._exitPos = null;
  n._findPathPointId = "";
  n._findPathLineId = "";
  n._stateType = $actorEnum.EActorStateType.WALK;
  return n;
}
const l = e;
exports.Enemy_512_Walk = l;
