import $randomUtil from './RandomUtil';
import $battleMgr from './BattleMgr';
import $state from './State';
import $eBoss_521Atk from './EBoss_521Atk';
import $effectMgr from './EffectMgr';
import $actorEnum from './ActorEnum';
let i;
exports.Boss_521_Atk = void 0;
e.prototype.end = function () {
  this._context.enterAttackCd();
};
e.prototype.createAtkEffect = function (t) {
  const e = this;
  const n = $battleMgr.default.instance.getCurScene();
  const i = n.level.getRoomById(this._context.roomId).layer;
  const o = n.level.getRoomsByLayer(i).filter(function (t) {
    return t.cfg.isBase;
  });
  const s = n.level.getLayerPosY(i);
  if (o.length > 0) {
    const p = [];
    const h = Number.MIN_SAFE_INTEGER;
    const f = Number.MAX_SAFE_INTEGER;
    o.forEach(function (t) {
      h = Math.max(h, t.node.x + t.node.width);
      f = Math.min(f, t.node.x);
    });
    const d = this._context.node.x;
    if (t > 0) {
      for (; d < h; ) {
        p.push(cc.v2(d, s));
        d += 60;
      }
    } else {
      for (; d > f; ) {
        p.push(cc.v2(d, s));
        d -= 60;
      }
    }
    for (const m = 3; m > 0; ) {
      m--;
      if (p.length > 0) {
        const y = $randomUtil.RandomUtil.randomInt(0, p.length);
        p.splice(y, 1);
      }
    }
    const _ = p.length;
    const g = 0;
    p.forEach(function (t) {
      $effectMgr.default.instance.createEffect({
        parent: n.lowEffectParent,
        prefabName: "EBoss_521Atk",
        initPos: t,
        effectClass: $eBoss_521Atk.default,
        onCreated: function (t) {
          t.play(e._context, function () {
            if (++g >= _) {
              e._context.changeState($actorEnum.EActorStateType.IDLE);
            }
          });
        },
      });
    });
  }
};
e.prototype.update = function () {};
e.prototype.begin = function () {
  const t = this;
  this._context.playAnimAttack(
    function () {
      t.createAtkEffect(1);
    },
    function () {
      t._context.playAnimIdle();
    },
  );
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.ATTACK;
  return n;
}
const p = e;
exports.Boss_521_Atk = p;
