import $cfg from './Cfg';
import $eventManager from './EventManager';
import $mathUtil from './MathUtil';
import $randomUtil from './RandomUtil';
import $attrMgr from './AttrMgr';
import $localDataProxy from './LocalDataProxy';
import $playerDataProxy from './PlayerDataProxy';
import $gameEnum from './GameEnum';
import $attrEnum from './AttrEnum';
import $skillEnum from './SkillEnum';
import $levelBattleData from './LevelBattleData';
import $skill_101 from './Skill_101';
import $skill_11 from './Skill_11';
import $skill_111 from './Skill_111';
import $skill_121 from './Skill_121';
import $skill_21 from './Skill_21';
import $skill_31 from './Skill_31';
import $skill_41 from './Skill_41';
import $skill_51 from './Skill_51';
import $skill_61 from './Skill_61';
import $skill_71 from './Skill_71';
import $skill_81 from './Skill_81';
import $skill_91 from './Skill_91';
exports.SkillMgr = void 0;
t.prototype.hasSkillEx = function () {
  for (
    const t = function (t) {
              const n = $cfg.default.instance.dataSkill.getById(
                $levelBattleData.levelBattleData.skillIds[t],
              );
              const o = null;
              if ("" == n.chooseBase) {
                o = [];
              } else {
                o = n.chooseBase.split("|").map(Number);
              }
              const r = [];
              const a = $playerDataProxy.playerDataProxy.getArtifactLv(n.id);
              if ("" != n.chooseLv) {
                n.chooseLv.split("|").forEach(function (t) {
                  const e = t.split("_");
                  const n = e[0];
                  const i = e[1];
                  if (a >= Number(n)) {
                    r.push.apply(r, i.split("&").map(Number));
                  }
                });
              }
              o.push.apply(o, r);
              for (const s = 0; s < o.length; ++s) {
                if (e.checkSkillEx(o[s])) {
                  return {
                    value: !0,
                  };
                }
              }
            },
          e = this,
          n = 0;
    n < $levelBattleData.levelBattleData.skillIds.length;
    ++n
  ) {
    const o = t(n);
    if ("object" == typeof o) {
      return o.value;
    }
  }
  return !1;
};
t.prototype.selectSkillEx = function (t) {
  $levelBattleData.levelBattleData.addSkillEx(t);
  const e = $cfg.default.instance.dataChoose.getById(t);
  $eventManager.EventManager.instance.emit(
    $skillEnum.ESkillEvent.SELECT_SKILL_EX + e.withSkill,
    t,
  );
};
t.prototype.checkSkillEx = function (t) {
  for (
    const e = $cfg.default.instance.dataChoose.getById(t), n = "" == e.first ? [] : e.first.split("|").map(Number), o = !0, r = 0;
    r < n.length;
    ++r
  ) {
    if (!$levelBattleData.levelBattleData.getSkillExDataById(n[r])) {
      o = !1;
      break;
    }
  }
  if (!o) {
    return !1;
  }
  const a = $levelBattleData.levelBattleData.getSkillExDataById(t);
  return !(a && a.count >= e.boxNum);
};
t.prototype.refreshSkillExIds = function (t) {
  const e = this;
  const n = 0 == t;
  const o = $attrMgr.AttrMgr.instance.getPlayerAttrValue(
    $attrEnum.E_AttrType.PURPLE_ORANGE_RATE,
  );
  const c = [];
  const u = [];
  const h = [];
  $levelBattleData.levelBattleData.skillIds.forEach(function (t) {
    const n = $cfg.default.instance.dataSkill.getById(t);
    const o = null;
    if ("" == n.chooseBase) {
      o = [];
    } else {
      o = n.chooseBase.split("|").map(Number);
    }
    const r = [];
    const a = $playerDataProxy.playerDataProxy.getArtifactLv(t);
    if ("" != n.chooseLv) {
      n.chooseLv.split("|").forEach(function (t) {
        const e = t.split("_");
        const n = e[0];
        const i = e[1];
        if (a >= Number(n)) {
          r.push.apply(r, i.split("&").map(Number));
        }
      });
    }
    o.push.apply(o, r);
    o.forEach(function (t) {
      const n = $cfg.default.instance.dataChoose.getById(t);
      if (e.checkSkillEx(t)) {
        if (n.rare > 2) {
          u.push(t);
        }
        c.push(t);
      }
    });
  });
  for (const d = 3; u.length > 0 && t > 0; ) {
    const m = u.map(function (t) {
      const e = $cfg.default.instance.dataChoose.getById(t);
      if (e.rare > 2) {
        return Math.ceil(e.weight * o);
      } else {
        return e.weight;
      }
    });
    const y = $mathUtil.MathUtil.weightedRandom(m);
    const _ = u[y];
    h.push(_);
    u.splice(y, 1);
    const g = c.indexOf(_);
    if (-1 != g) {
      c.splice(g, 1);
    }
    --t;
    --d;
  }
  for (
    const v = n ? this.getCommonSkillExProbRate() : 1;
    c.length > 0 && d > 0;
  ) {
    m = c.map(function (t) {
      const r = $cfg.default.instance.dataChoose.getById(t);
      if (r.rare > 2) {
        const a = null;
        if (n) {
          a = e.getCommonSkillExProbRateByQuality(r.rare);
        } else {
          a = 1;
        }
        return Math.ceil(r.weight * o * v * a);
      }
      return r.weight;
    });
    y = $mathUtil.MathUtil.weightedRandom(m);
    h.push(c[y]);
    c.splice(y, 1);
    --d;
  }
  if (n) {
    if (
      h.some(function (t) {
        const e = $cfg.default.instance.dataChoose.getById(t);
        return !(!e || 3 != e.rare);
      })
    ) {
      $levelBattleData.levelBattleData.data.commonPurpleNotShowCount = 0;
    } else {
      $levelBattleData.levelBattleData.data.commonPurpleNotShowCount++;
    }
    if (
      h.some(function (t) {
        const e = $cfg.default.instance.dataChoose.getById(t);
        return !(!e || 4 != e.rare);
      })
    ) {
      $levelBattleData.levelBattleData.data.commonOrangeNotShowCount = 0;
    } else {
      $levelBattleData.levelBattleData.data.commonOrangeNotShowCount++;
    }
  }
  h.sort(function () {
    if ($randomUtil.RandomUtil.randomInt(0, 2)) {
      return 1;
    } else {
      return -1;
    }
  });
  return h;
};
t.prototype.selectSkill = function (t) {
  $levelBattleData.levelBattleData.addSkill(t);
};
t.prototype.refreshSkillIds = function () {
  const t = [];
  const e = [];
  const n = $levelBattleData.levelBattleData.skillIds;
  $cfg.default.instance.dataSkill.sheet().forEach(function (e) {
    if (e.isInfo) {
      //
    } else {
      if ($playerDataProxy.playerDataProxy.isUnlockSkill(e.id)) {
        if (
          n.some(function (t) {
            return (
              $cfg.default.instance.dataSkill.getById(t).mainType ==
              e.mainType
            );
          })
        ) {
          //
        } else {
          t.push(e.id);
        }
      }
    }
  });
  for (const o = 3; t.length > 0 && o > 0; ) {
    const s = t.map(function (t) {
      return $cfg.default.instance.dataSkill.getById(t).weight;
    });
    const c = $mathUtil.MathUtil.weightedRandom(s);
    e.push(t[c]);
    t.splice(c, 1);
    --o;
  }
  e.sort(function () {
    if ($randomUtil.RandomUtil.randomInt(0, 2)) {
      return 1;
    } else {
      return -1;
    }
  });
  return e;
};
t.prototype.createSkill = function (t, e) {
  const n = null;
  switch (t) {
    case 11:
      n = new $skill_11.Skill_11();
      break;
    case 21:
      n = new $skill_21.Skill_21();
      break;
    case 31:
      n = new $skill_31.Skill_31();
      break;
    case 41:
      n = new $skill_41.Skill_41();
      break;
    case 51:
      n = new $skill_51.Skill_51();
      break;
    case 61:
      n = new $skill_61.Skill_61();
      break;
    case 71:
      n = new $skill_71.Skill_71();
      break;
    case 81:
      n = new $skill_81.Skill_81();
      break;
    case 91:
      n = new $skill_91.Skill_91();
      break;
    case 101:
      n = new $skill_101.Skill_101();
      break;
    case 111:
      n = new $skill_111.Skill_111();
      break;
    case 121:
      n = new $skill_121.Skill_121();
  }
  n.init(e, t);
  return n;
};
t.prototype.getCommonSkillExProbRateByQuality = function (t) {
  if (1 == t) {
    return 1;
  }
  if (2 == t) {
    return 1;
  }
  if (3 == t) {
    const e = Number($cfg.default.instance.dataCons.getById(103).val);
    const n = Number($cfg.default.instance.dataCons.getById(104).val);
    return Math.min(
      Math.pow(
        e,
        $levelBattleData.levelBattleData.data.commonPurpleNotShowCount,
      ),
      n,
    );
  }
  if (4 == t) {
    return (
      (e = Number($cfg.default.instance.dataCons.getById(105).val)),
      (n = Number($cfg.default.instance.dataCons.getById(106).val)),
      Math.min(
        Math.pow(
          e,
          $levelBattleData.levelBattleData.data.commonOrangeNotShowCount,
        ),
        n,
      )
    );
  } else {
    return void 0;
  }
};
t.prototype.getCommonSkillExProbRate = function () {
  const t = Number($cfg.default.instance.dataCons.getById(101).val);
  t -= $localDataProxy.localDataProxy.getDailyRefreshValue(
    $gameEnum.Game.EDailyRefreshDataKey.WIN_SUB_HEIGHT_RATE,
  );
  t += $localDataProxy.localDataProxy.getDailyRefreshValue(
    $gameEnum.Game.EDailyRefreshDataKey.LOSE_ADD_HEIGHT_RATE,
  );
  const e = $cfg.default.instance.dataCons
    .getById(102)
    .val.split("|")
    .map(Number);
  const n = e[0];
  const o = e[1];
  t = Math.max(t, n);
  return Math.min(t, o);
};
Object.defineProperty(t, "instance", {
  get: function () {
    if (this._instance) {
      //
    } else {
      this._instance = new t();
    }
    return this._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {}
const C = t;
exports.SkillMgr = C;
