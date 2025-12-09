import $globalPopupMgr from './GlobalPopupMgr';
import $battleMgr from './BattleMgr';
import $state from './State';
import $actorEnum from './ActorEnum';
let i;
export const PlayerDeadState = void 0;
e.prototype.end = function () {
  this._context.spAnimCtrl.clearAnim();
};
e.prototype.update = function () {};
e.prototype.begin = function () {
  this._context.exitInvincible();
  if ($battleMgr.default.instance.getCurScene().isResult) {
    //
  } else {
    this._context.spAnimCtrl.playAnim('die', 1, !1, function () {
      $globalPopupMgr.default.instance.showLevelFail(
        $battleMgr.default.instance.getCurScene().isPlay,
      );
    });
  }
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.DEAD;
  return n;
}
const l = e;
export const PlayerDeadState = l;
