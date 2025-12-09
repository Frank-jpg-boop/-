import $levelPathLine from './LevelPathLine';
import $levelPathPoint from './LevelPathPoint';
import $graph from './Graph';
import $battleMgr from './BattleMgr';
import $unitMgr from './UnitMgr';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
let i;
const h = cc._decorator;
const f = h.ccclass;
const d = h.property;
e.prototype.findCircleRangePoints = function (t, e) {
  const n = [];
  const i = $battleMgr.default.instance.getCurScene();
  this._pointMap.forEach(function (o) {
    const r = i.level.getRoomById(o.roomId);
    if (r && r.isUnlock && cc.Vec2.distance(o.pos, t) <= e) {
      n.push(o.pointId);
    }
  });
  return n;
};
e.prototype.findPathPoss = function (t, e) {
  const n = this;
  const i = [];
  if (t.pos.fuzzyEquals(e.pos, 5)) {
    return i;
  }
  if (
    '' != t.lineId &&
    '' != e.lineId &&
    (t.lineId === e.lineId || t.lineId.split('|').reverse().join('|') === e.lineId)
  ) {
    i.push(e.pos);
    return i;
  }
  if ('' != t.pointId && '' != e.pointId) {
    if (this._lineMap.has(t.pointId + '|' + e.pointId)) {
      i.push(e.pos);
      return i;
    }
    const o = this._dijstra.path(t.pointId, e.pointId, {
      cost: !0,
    });
    if (o && o.path) {
      o.path.forEach(function (t) {
        const e = n._pointMap.get(t);
        if (e) {
          i.push(e.pos);
        }
      });
    }
    i.shift();
    return i;
  }
  if ('' != t.pointId) {
    const r = this._lineMap.get(e.lineId);
    if (r && (r.startPoint.pointId === t.pointId || r.endPoint.pointId === t.pointId)) {
      i.push(e.pos);
      return i;
    }
  }
  if ('' != e.pointId) {
    const a = this._lineMap.get(t.lineId);
    if (a && (a.startPoint.pointId === e.pointId || a.endPoint.pointId === e.pointId)) {
      i.push(e.pos);
      return i;
    }
  }
  const s = this._lineMap.get(t.lineId);
  const c = this._lineMap.get(e.lineId);
  const l = this._pointMap.get(t.pointId);
  const u = this._pointMap.get(e.pointId);
  const p = null;
  if (s) {
    p = s.startPoint;
  } else {
    p = l;
  }
  const h = null;
  if (s) {
    h = s.endPoint;
  } else {
    h = l;
  }
  if (!p) {
    console.error('point1 is null');
    return i;
  }
  if (!h) {
    console.error('point2 is null');
    return i;
  }
  const f = null;
  if (p.pointId == h.pointId) {
    f = 0;
  } else {
    f = cc.Vec2.distance(p.pos, t.pos);
  }
  const d = null;
  if (p.pointId == h.pointId) {
    d = 0;
  } else {
    d = cc.Vec2.distance(h.pos, t.pos);
  }
  const m = null;
  if (c) {
    m = c.startPoint;
  } else {
    m = u;
  }
  const y = null;
  if (c) {
    y = c.endPoint;
  } else {
    y = u;
  }
  if (!m) {
    console.error('point3 is null');
    return i;
  }
  if (!y) {
    console.error('point4 is null');
    return i;
  }
  const _ = null;
  if (m.pointId == y.pointId) {
    _ = 0;
  } else {
    _ = cc.Vec2.distance(m.pos, e.pos);
  }
  const g = null;
  if (m.pointId == y.pointId) {
    g = 0;
  } else {
    g = cc.Vec2.distance(y.pos, e.pos);
  }
  const v = [];
  const b = function (t, e, i, o) {
    if (t.pointId == e.pointId) {
      v.push({
        path: [t.pointId],
        cost: i + o,
      });
    } else {
      const r = n._dijstra.path(t.pointId, e.pointId, {
        cost: !0,
      });
      if (r) {
        r.cost += i + o;
        v.push(r);
      }
    }
  };
  if (p.pointId == h.pointId) {
    b(p, m, f, _);
    b(p, y, f, g);
  } else {
    if (m.pointId == y.pointId) {
      (b(p, m, d, _), b(h, m, d, g));
    } else {
      (b(p, m, f, _), b(p, y, f, g), b(h, m, d, _), b(h, y, d, g));
    }
  }
  v.sort(function (t, e) {
    return t.cost - e.cost;
  });
  const E = v[0].path;
  if (E) {
    E.forEach(function (t) {
      i.push(n._pointMap.get(t).pos);
    });
  }
  if (E && E.length > 0 && !this._pointMap.get(E[E.length - 1]).isInPoint(e.pos)) {
    i.push(e.pos);
  }
  return i.slice();
};
e.prototype.findPointValidMinLine = function (t, e, n) {
  if (0 == t.x && 0 == t.y) {
    return null;
  }
  const i = [];
  const o = $battleMgr.default.instance.getCurScene();
  const r = o.level;
  const a = r.getRoomById(e.roomId).layer;
  const s = [];
  if (o.isTriggerBoss) {
    $unitMgr.UnitMgr.instance
      .queryUnit($gridAreaDivisionMgr.E_AreaObjectType.LADDER)
      .forEach(function (t) {
        if (t.isExitLadder) {
          s.push.apply(s, t.lineIds);
        }
      });
  }
  for (const c = 0; c < e.lineIds.length; c++) {
    const h = e.lineIds[c];
    const f = this._lineMap.get(h);
    const d = r.getRoomById(f.roomId).layer;
    if (!(s.includes(h) || (n && d !== a))) {
      const m = (180 * t.angle(f.dir)) / Math.PI;
      if (m >= 90) {
        //
      } else {
        if (1 == Math.abs(f.dir.y)) {
          m -= 15;
        }
        i.push({
          line: f,
          angle: m,
        });
      }
    }
  }
  if (0 == i.length) {
    return null;
  } else {
    return (
      i.sort(function (t, e) {
        return t.angle - e.angle;
      }),
      i[0].line
    );
  }
};
e.prototype.findPathLineByPos = function (t, e) {
  if (void 0 === e) {
    e = 8;
  }
  for (const n = Array.from(this._lineMap.keys()), i = [], o = 0; o < n.length; o++) {
    const r = n[o];
    const a = this._lineMap.get(r);
    if (!i.includes(a.reverseLineId)) {
      if (a.isPosInLineSegment(t, e)) {
        return r;
      }
      i.push(r);
    }
  }
  return '';
};
e.prototype.findPathPointByPos = function (t, e) {
  if (void 0 === e) {
    e = 2;
  }
  for (const n = Array.from(this._pointMap.keys()), i = 0; i < n.length; i++) {
    const o = n[i];
    const r = this._pointMap.get(o);
    if (r.isInPoint(t, e)) {
      return r.pointId;
    }
  }
  return '';
};
e.prototype.queryLine = function () {
  return Array.from(this._lineMap.values());
};
e.prototype.getLine = function (t) {
  return this._lineMap.get(t);
};
e.prototype.getPoint = function (t) {
  return this._pointMap.get(t);
};
e.prototype.drawPath = function () {
  const t = this;
  this.nDrawPoint.destroyAllChildren();
  this.nDrawLine.destroyAllChildren();
  this._pointMap.forEach(function (e) {
    const n = cc.instantiate(t.pDrawPoint);
    n.setPosition(e.pos);
    n.parent = t.nDrawPoint;
    n.getChildByName('EditNum').getComponent(cc.Label).string = e.pointId;
  });
  this._lineMap.forEach(function (e) {
    const n = cc.instantiate(t.pDrawLine);
    const i = e.startPos;
    const o = e.endPos;
    n.parent = t.nDrawLine;
    n.setPosition(i);
    const r = n.getComponent(cc.Graphics);
    r.clear();
    r.moveTo(0, 0);
    const a = o.sub(i);
    r.lineTo(a.x, a.y);
    r.stroke();
  });
};
e.prototype.createLine = function (t, e, n) {
  const i = new $levelPathLine.default();
  i.init(t, e, n);
  this._lineMap.set(t, i);
  return i;
};
e.prototype.findLadderByPoint = function (t) {
  for (
    const e = $unitMgr.UnitMgr.instance.queryUnit($gridAreaDivisionMgr.E_AreaObjectType.LADDER),
      n = 0;
    n < e.length;
    ++n
  ) {
    const i = e[n];
    if (i.bindPointIds.includes(t)) {
      return i;
    }
  }
  return null;
};
e.prototype.unlockPoint = function (t) {
  const e = this;
  const n = $battleMgr.default.instance.getCurScene().level;
  const i = this._pointMap.get(t);
  const o = this.findLadderByPoint(t);
  i.linkIds.forEach(function (t) {
    const r = e._pointMap.get(t);
    const a = Math.min(i.roomId, r.roomId);
    const s = i.pointId + '|' + r.pointId;
    if (
      !e._lineMap.has(s) &&
      n.getRoomById(a).isUnlock &&
      (!o || !o.bindPointIds.includes(t) || o.isUnlock)
    ) {
      const c = e.createLine(s, i, r);
      e._lineMap.set(s, c);
      i.addLine(s);
      i.addDijstraObj(r.pointId, c.len);
      const l = r.pointId + '|' + i.pointId;
      const u = e.createLine(l, r, i);
      e._lineMap.set(l, u);
      r.addLine(l);
      r.addDijstraObj(i.pointId, u.len);
      e._dijstra.addNode(r.pointId, r.dijstraObjMap);
    }
  });
  this._dijstra.addNode(t, i.dijstraObjMap);
  if (this.isDrawPath) {
    this.drawPath();
  }
};
e.prototype.isUnlockLadder = function (t, e) {
  for (const n = 0; n < e.ladders.length; ++n) {
    const i = e.ladders[n];
    if (0 != i.unlockMethod && i.bindPointIds.includes(t)) {
      return !1;
    }
  }
  return !0;
};
e.prototype.init = function (t) {
  const e = this;
  const n = $battleMgr.default.instance.getCurScene().level;
  this._dijstra = new $graph();
  this._pointMap.clear();
  this._lineMap.clear();
  t.forEach(function (t) {
    const n = new $levelPathPoint.default();
    n.init(t);
    e._pointMap.set(n.pointId, n);
  });
  this._pointMap.forEach(function (t) {
    const i = e.isUnlockLadder(t.pointId, n.getRoomById(t.roomId).exData);
    t.linkIds.forEach(function (o) {
      const r = e._pointMap.get(o);
      const a = Math.min(t.roomId, r.roomId);
      if (
        n.getRoomById(a).isUnlock &&
        i &&
        (t.roomId == r.roomId || e.isUnlockLadder(o, n.getRoomById(r.roomId).exData))
      ) {
        const s = t.pointId + '|' + r.pointId;
        const c = e.createLine(s, t, r);
        e._lineMap.set(s, c);
        t.addLine(s);
        t.addDijstraObj(r.pointId, c.len);
      }
    });
    e._dijstra.addNode(t.pointId, t.dijstraObjMap);
  });
  if (this.isDrawPath) {
    this.drawPath();
  }
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nDrawLine = null;
  e.nDrawPoint = null;
  e.pDrawPoint = null;
  e.pDrawLine = null;
  e.isDrawPath = !1;
  e._pointMap = new Map();
  e._lineMap = new Map();
  e._dijstra = null;
  return e;
}
export default m;
