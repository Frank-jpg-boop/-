import $battleMgr from './BattleMgr';
import $bullet111 from './Bullet111';
import $bulletMgr from './BulletMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
let i;
export const Skill_111 = void 0;
e.prototype.searchTarget = function () {
  for (
    const t = this,
      e = this._owner.node.getPosition(),
      n = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(e, this._cfg.edge),
      i = [],
      o = 0,
      r = n;
    o < r.length;
    o++
  ) {
    const a = r[o];
    const s = $gridAreaDivisionMgr.default.instance
      .getAreaObjectList(a, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
      .filter(function (t) {
        return !i.includes(t) && !t.isDead();
      });
    if (s) {
      i.push.apply(i, s);
    }
  }
  const l = [];
  i.forEach(function (e) {
    if (e.canBeSearch()) {
      const n = e.node.getPosition();
      const i = cc.Vec2.squaredDistance(n, t._owner.node.getPosition());
      if (i < t._cfg.edge * t._cfg.edge) {
        l.push({
          actor: e,
          sqrDis: i,
        });
      }
    }
  });
  l.sort(function () {
    if (Math.random() < 0.5) {
      return -1;
    } else {
      return 1;
    }
  });
  return l.map(function (t) {
    return t.actor;
  });
};
e.prototype.shootBullet = function (t, e) {
  const n = this;
  const i = $battleMgr.default.instance.getCurScene();
  const o = this._owner.node.getPosition();
  o.y += 0.5 * this._owner.rightHeight;
  const c = t.getBeHurtPos();
  const l = null;
  if (t.moveDir) {
    l = t.moveDir.clone();
  } else {
    l = null;
  }
  if (l) {
    const p = t.getAttribute($attrEnum.E_AttrType.SPEED).value;
    c.addSelf(l.mul(p * e));
  }
  c.y = i.level.getLayerPosY(i.level.findLayerByPos(c));
  $bulletMgr.default.instance.createBullet({
    parent: i.bulletParent,
    prefabName: 'Bullet111',
    initPos: o,
    iconPath: '',
    bulletClass: $bullet111.default,
    onCreated: function (t) {
      t.shoot(n._owner, n, c);
    },
  });
};
e.prototype.onUpdate = function (t) {
  if (this.skillCD > 0) {
    this.skillCD -= t;
    return void (this.skillCD < 0 && (this.skillCD = 0));
  }
  if (this._cfg.isStay > 0) {
    if (this._owner.curState != $actorEnum.EActorStateType.IDLE) {
      return void (this._waitCD = 0);
    }
    this._waitCD += t;
    if (this._waitCD < this._cfg.isStay) {
      return;
    }
  }
  const e = this.searchTarget();
  if (e.length > 0) {
    this.enterCD();
    for (
      const n = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value, i = 0;
      i < n && !(i >= e.length);
      i++
    ) {
      this.shootBullet(e[i], t);
    }
  }
};
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const p = e;
export const Skill_111 = p;
