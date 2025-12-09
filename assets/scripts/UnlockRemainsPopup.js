import $cfg from './Cfg';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $popupBase from './PopupBase';
import $nodeUtil from './NodeUtil';
import $spAnimCtrl from './SpAnimCtrl';
import $itemDataProxy from './ItemDataProxy';
import $playerDataProxy from './PlayerDataProxy';
let i;
const d = cc._decorator;
const m = d.ccclass;
const y = d.property;
e.prototype.onClickBtnClose = function () {
  this.removeUI();
  if (this._onComplete) {
    this._onComplete();
  }
};
e.prototype.onClickBtnHideRemain = function () {
  this.mRemainsDetails.active = !1;
};
e.prototype.onClickBtnRemain = function (t, e) {
  this.mRemainsDetails.active = !0;
  const n = e.skillExId;
  const i = this.mRemainsDetails.getChildByName('desBg');
  const o = i.getChildByName('des');
  const r = i.getChildByName('getTips');
  const s = $nodeUtil.default.nodeParentChangeLocalPos(e.item, this.mRemainsDetails);
  if (s.x < 0) {
    i.getChildByName('Bg').scaleX = 1;
    i.x = s.x + i.width / 2 - 50;
  } else {
    i.getChildByName('Bg').scaleX = -1;
    i.x = s.x - i.width / 2 + 50;
  }
  r.getComponent(cc.Label).string = '第' + e.cfgData.getStage + '章';
  const c = $cfg.default.instance.dataChoose.getById(n);
  o.getComponent(cc.Label).string = this.getEffectDes(c);
};
e.prototype.scrollToItem = function (t, e, n, i) {
  if (void 0 === n) {
    n = 'center';
  }
  if (void 0 === i) {
    i = 0.3;
  }
  if (t && e) {
    const o = t.content;
    if (o) {
      const r = t.node.height;
      const a = o.height;
      const s = -e.getPosition().y;
      const c = s - e.height / 2;
      const l = s - e.height;
      const u = 0;
      switch (n) {
        case 'top':
          u = s;
          break;
        case 'center':
        default:
          u = c - (r / 2 - e.height / 2);
          break;
        case 'bottom':
          u = l - r + e.height;
      }
      u = Math.max(0, Math.min(u, a - r));
      t.scrollToOffset(cc.v2(0, u), i, !0);
    }
  }
};
e.prototype.playItemUnlockAnim = function (t, e, n, i) {
  const o = n.speReward
    .split('|')
    .map(function (t) {
      return Number(t.split('_')[0]);
    })
    .findIndex(function (t) {
      return t == e;
    });
  const r = this.nRemains.children[o];
  const a = r.getChildByName('SpAnim');
  a.active = !0;
  const s = a.getComponent($spAnimCtrl.default);
  s.clearAnim();
  const c = r.getChildByName('Quality');
  const l = r.getChildByName('icon');
  $nodeUtil.default.setSpriteNormalMaterial(c);
  $nodeUtil.default.setSpriteNormalMaterial(l);
  const h = this.nRemainsInfo.children[t];
  cc.tween(h)
    .to(0.4, {
      x: 0,
    })
    .delay(0.3)
    .call(function () {
      if (i) {
        i();
      }
    })
    .start();
  if (t >= 2) {
    this.scrollToItem(
      this.nRemainsInfo.parent.parent.getComponent(cc.ScrollView),
      h,
      'center',
      0.4,
    );
  }
  s.playAnim('animation', 1, !1, function () {
    s.node.active = !1;
  });
};
e.prototype.playUnlockAnim = function (t) {
  const e = this;
  if (this._remainIds.length <= 0) {
    this.nBtnClose.active = !0;
  } else {
    const n = this.nRemainsInfo.childrenCount - this._remainIds.length;
    const i = this._remainIds.shift();
    this.playItemUnlockAnim(n, i, t, function () {
      e.playUnlockAnim(t);
    });
  }
};
e.prototype.initRemainsInfo = function (t) {
  for (const e = this, n = this._remainIds.length - this.nRemainsInfo.childrenCount; n > 0; ) {
    const i = cc.instantiate(this.nRemainsInfo.children[0]);
    this.nRemainsInfo.addChild(i);
    n--;
  }
  this.nRemainsInfo.children.forEach(function (n, i) {
    for (
      let o,
        r = e._remainIds[i],
        l = Number(
          t.speReward
            .split('|')
            .find(function (t) {
              return Number(t.split('_')[0]) == r;
            })
            .split('_')[1],
        ),
        u = $cfg.default.instance.dataChoose.getById(l),
        p = [],
        f = /\|([^|]+)\|/g;
      null != (o = f.exec(u.info));
    ) {
      p.push(o[1]);
    }
    const d = u.info;
    p.forEach(function (t) {
      const e = t.replace('%', '');
      d = d.replace('|' + t + '|', t.includes('%') ? 100 * Number(u[e]) + '%' : '' + u[e]);
    });
    n.getChildByName('des').getComponent(cc.Label).string = d;
    const m = $cfg.default.instance.dataItem.getById(r);
    $resLoader.ResLoader.setSpritFrame(
      n.getChildByName('Quality').getComponent(cc.Sprite),
      $frameEnum.Frame.EBundleName.RES,
      'textures/atlas/quality/quality_remain_' + u.rare,
    );
    $resLoader.ResLoader.setSpritFrame(
      n.getChildByName('item').getChildByName('Quality').getComponent(cc.Sprite),
      $frameEnum.Frame.EBundleName.HOME,
      'textures/public/pic_wuping_di_' + m.rare,
    );
    $resLoader.ResLoader.setSpritFrame(
      n.getChildByName('item').getChildByName('icon').getComponent(cc.Sprite),
      $frameEnum.Frame.EBundleName.RES,
      $itemDataProxy.itemDataProxy.getItemIconPath(r),
    );
    n.x = -1e3;
  });
};
e.prototype.initRemains = function (t) {
  for (
    const e = this,
      n = t.speReward.split('|').map(function (t) {
        return Number(t.split('_')[0]);
      }),
      i = t.speReward.split('|').map(function (t) {
        return Number(t.split('_')[1]);
      }),
      o = n.length - this.nRemains.childrenCount;
    o > 0;
  ) {
    const r = cc.instantiate(this.nRemains.children[0]);
    this.nRemains.addChild(r);
    o--;
  }
  this.nRemains.children.forEach(function (t, o) {
    const r = n[o];
    const l = $cfg.default.instance.dataReward.getById(r);
    const p = t.getChildByName('Quality');
    $resLoader.ResLoader.setSpritFrame(
      p.getComponent(cc.Sprite),
      $frameEnum.Frame.EBundleName.HOME,
      'textures/public/pic_wuping_di_' + l.rare,
    );
    const f = t.getChildByName('icon');
    $resLoader.ResLoader.setSpritFrame(
      f.getComponent(cc.Sprite),
      $frameEnum.Frame.EBundleName.RES,
      $itemDataProxy.itemDataProxy.getItemIconPath(r),
    );
    t.getChildByName('SpAnim').active = !1;
    if (e._remainIds.includes(r) || $itemDataProxy.itemDataProxy.getItemValue(r) <= 0) {
      $nodeUtil.default.setSpriteGrayMaterial(p);
      $nodeUtil.default.setSpriteGrayMaterial(f);
    } else {
      $nodeUtil.default.setSpriteNormalMaterial(p);
      $nodeUtil.default.setSpriteNormalMaterial(f);
    }
    $nodeUtil.default.addButtonListener(t, 'UnlockRemainsPopup', 'onClickBtnRemain', e.node, {
      item: t,
      cfgData: $cfg.default.instance.dataReward.getById(r),
      skillExId: i[o],
    });
  });
};
e.prototype.initSkillInfo = function (t) {
  const e = $playerDataProxy.playerDataProxy.getArtifactLv(t.id);
  const n = $playerDataProxy.playerDataProxy.getArtifactUpGreadNeedNum(t.id);
  const i = $playerDataProxy.playerDataProxy.getArtifactUpGreadNeeItemId(t.id);
  const o = $itemDataProxy.itemDataProxy.getItemValue(i);
  const r = this.nSkillInfo.getChildByName('Quality');
  $resLoader.ResLoader.setSpritFrame(
    r.getComponent(cc.Sprite),
    $frameEnum.Frame.EBundleName.HOME,
    'textures/public/pic_wuping_di_' + t.rare,
  );
  this.nSkillInfo.getChildByName('debrisNum').getComponent(cc.Label).string = o + '/' + n;
  this.nSkillInfo.getChildByName('bar').getComponent(cc.Sprite).fillRange = o / n;
  this.nSkillInfo.getChildByName('lv').getComponent(cc.Label).string = 'Lv.' + e;
  $resLoader.ResLoader.setSpritFrame(
    this.nSkillInfo.getChildByName('icon').getComponent(cc.Sprite),
    $frameEnum.Frame.EBundleName.GAME,
    'textures/skill/' + t.icon,
  );
};
e.prototype.initAttr = function (t) {
  const e = $playerDataProxy.playerDataProxy.getArtifactLv(t.id);
  const n = t.dmg.split('|').map(Number);
  const i = [
    '' + (n[e - 1] ? n[e - 1] : n[n.length - 1]),
    t.main2 + 's',
    '' + (t.edge >= 9999 ? '无限' : t.edge),
  ];
  this.nAttr.children.forEach(function (t, e) {
    (0 == e
      ? t.getChildByName('layout').getChildByName('num').getComponent(cc.Label)
      : t.getChildByName('num').getComponent(cc.Label)
    ).string = i[e];
  });
};
e.prototype.getEffectDes = function (t) {
  for (let e, n = [], i = /\|([^|]+)\|/g; null != (e = i.exec(t.info)); ) {
    n.push(e[1]);
  }
  const o = t.info;
  n.forEach(function (e) {
    const n = e.replace('%', '');
    o = o.replace('|' + e + '|', e.includes('%') ? 100 * Number(t[n]) + '%' : '' + t[n]);
  });
  return o;
};
e.prototype.onShow = function () {
  this.playUnlockAnim(this._cfgSKill);
};
e.prototype.init = function (t) {
  const e = this;
  this._remainIds = t.remainIds;
  this._onComplete = t.onComplete;
  const n = $cfg.default.instance.dataSkill.queryOne(function (t) {
    return (
      -1 !=
      t.speReward.split('|').findIndex(function (t) {
        return Number(t.split('_')[0]) == e._remainIds[0];
      })
    );
  });
  this._cfgSKill = n;
  this.lName.string = n.name;
  this.initAttr(n);
  this.initSkillInfo(n);
  this.initRemains(n);
  this.initRemainsInfo(n);
  this.nBtnClose.active = !1;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lName = null;
  e.nAttr = null;
  e.nSkillInfo = null;
  e.nRemains = null;
  e.nRemainsInfo = null;
  e.nBtnClose = null;
  e.mRemainsDetails = null;
  e._cfgSKill = null;
  e._remainIds = [];
  e._onComplete = null;
  return e;
}
export default _;
