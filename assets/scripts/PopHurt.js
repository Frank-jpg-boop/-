import $nodePoolManager from './NodePoolManager';
import $mathUtil from './MathUtil';
import $battleMgr from './BattleMgr';
import $actorEnum from './ActorEnum';
import $battleEnum from './BattleEnum';
let i;
const p = cc._decorator;
const h = p.ccclass;
const f = p.property;
e.prototype.onDestroy = function () {
  cc.Tween.stopAllByTarget(this.nPop);
};
e.prototype.remove = function () {
  cc.Tween.stopAllByTarget(this.nPop);
  if (this.isNeedCrush && !this.isBattleRemove) {
    const t = $battleMgr.default.instance.getCurScene();
    if (t) {
      t.removePopHurt(this.popId, this);
    }
  }
  $nodePoolManager.default.instance.putNode(this.node, !0);
};
e.prototype.playAnim = function (t) {
  const e = this;
  if (t != $battleEnum.EBattlePopHurtType.COMMON) {
    if (t != $battleEnum.EBattlePopHurtType.CRIT) {
      (t != $battleEnum.EBattlePopHurtType.RECOVER &&
        t != $battleEnum.EBattlePopHurtType.EVASION) ||
        cc
          .tween(this.nPop)
          .by(0.4, {
            y: 60,
          })
          .call(function () {
            e.remove();
          })
          .start();
    } else {
      cc.tween(this.nPop)
        .to(
          0.1,
          {
            scale: 1.6,
          },
          {
            easing: 'backOut',
          },
        )
        .to(0.05, {
          scale: 1,
        })
        .delay(0.05)
        .to(0.2, {
          y: 20,
        })
        .parallel(
          cc.tween().by(0.4, {
            y: 20,
          }),
          cc.tween().to(0.3, {
            opacity: 0,
          }),
        )
        .call(function () {
          e.remove();
        })
        .start();
    }
  } else {
    cc.tween(this.nPop)
      .to(
        0.1,
        {
          scale: 1.4,
        },
        {
          easing: 'backOut',
        },
      )
      .to(0.05, {
        scale: 1,
      })
      .delay(0.05)
      .to(0.2, {
        y: 20,
      })
      .parallel(
        cc.tween().by(0.4, {
          y: 20,
        }),
        cc.tween().to(0.3, {
          opacity: 0,
        }),
      )
      .call(function () {
        e.remove();
      })
      .start();
  }
};
e.prototype.update = function (t) {
  if (!this.isBattleRemove && this.isNeedCrush) {
    this.time += t;
    if (this.time > 1) {
      this.isBattleRemove = !0;
      $battleMgr.default.instance.getCurScene().removePopHurt(this.popId, this);
    }
  }
};
e.prototype.crush = function () {
  for (
    const t = $battleMgr.default.instance.getCurScene().getPopHurts(this.popId),
      e = 0,
      n = t.length - 1;
    e < n;
    ++e
  ) {
    t[e].node.y += 20;
  }
};
e.prototype.popup = function (t, e, n, i) {
  this.isBattleRemove = !1;
  this.time = 0;
  this.popId = i;
  this.nPop.y = 0;
  this.nPop.scale = 1;
  this.nPop.opacity = 255;
  if (n == $battleEnum.EBattlePopHurtType.CRIT) {
    this.lCirt.node.active = !0;
    this.lHurt.node.active = !1;
    this.lCirt.string = $mathUtil.MathUtil.formatValue(e);
    this.crush();
    this.isNeedCrush = !0;
  } else if (n == $battleEnum.EBattlePopHurtType.COMMON) {
    this.lCirt.node.active = !1;
    this.lHurt.node.active = !0;
    if (t == $actorEnum.EActorType.ENEMY) {
      this.lHurt.node.color = cc.Color.RED;
    } else {
      this.lHurt.node.color = cc.Color.WHITE;
    }
    const o = $mathUtil.MathUtil.formatValue(e);
    if (this.lHurt.node.active) {
      this.lHurt.string = o;
    }
    this.crush();
    this.isNeedCrush = !0;
  } else {
    if (n == $battleEnum.EBattlePopHurtType.RECOVER) {
      this.lCirt.node.active = !1;
      this.lHurt.node.active = !0;
      this.lHurt.node.color = cc.Color.GREEN;
      this.lHurt.string = '+' + $mathUtil.MathUtil.formatValue(e);
    } else {
      this.lCirt.node.active = !1;
      this.lHurt.node.active = !0;
    }
  }
  this.playAnim(n);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lHurt = null;
  e.lCirt = null;
  e.nPop = null;
  e.popId = '';
  e.isNeedCrush = !1;
  e.isBattleRemove = !1;
  e.time = 0;
  return e;
}
export default d;
