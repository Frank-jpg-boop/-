import $state from './State';
import $actorEnum from './ActorEnum';
let i;
exports.Boss_122_Face = void 0;
e.prototype.end = function () {
  this._isEndFace = !1;
  this._context.node.opacity = 255;
};
e.prototype.update = function () {
  const t = this;
  if (this._context.isTrigger) {
    if (this._isEndFace || this._context.isFace()) {
      //
    } else {
      this._isEndFace = !0;
      this._context.playAnimHideFace(function () {
        t._context.changeState($actorEnum.EActorStateType.IDLE);
      });
    }
  }
};
e.prototype.begin = function () {
  this._context.node.opacity = 180;
  this._context.playAnimShowFace();
};
function e(e) {
  const n = t.call(this, e) || this;
  n._isEndFace = !1;
  n._stateType = $actorEnum.EActorStateType.EXTEND_1;
  return n;
}
const s = e;
exports.Boss_122_Face = s;
