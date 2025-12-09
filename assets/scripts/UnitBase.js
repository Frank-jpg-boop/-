import $mathUtil from './MathUtil';
import $battleMgr from './BattleMgr';
import $areaObject from './AreaObject';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $unitMgr from './UnitMgr';
let i;
const f = cc._decorator;
const d = f.ccclass;
const m =
  (f.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._isInit = !1;
      e._isRemove = !1;
      e._unitId = 0;
      e._pathPointId = "";
      e._pathLineId = "";
      e._initParam = null;
      e._roomId = 0;
      return e;
    }
    Object.defineProperty(e.prototype, "pathPointId", {
      get: function () {
        return this._pathPointId;
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, "pathLineId", {
      get: function () {
        return this._pathLineId;
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, "roomId", {
      get: function () {
        return this._roomId;
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, "unitId", {
      get: function () {
        return this._unitId;
      },
      enumerable: !1,
      configurable: !0,
    });
    e.prototype.init = function (t, e, n, i) {
      for (const o = [], r = 4; r < arguments.length; r++) {
        o[r - 4] = arguments[r];
      }
    };
    e.prototype.onInit = function () {};
    e.prototype.setPos = function (e, n) {
      if (void 0 === n) {
        n = !0;
      }
      t.prototype.setPos.call(this, e);
      if (n) {
        this.updatePathData();
      }
    };
    e.prototype.updateUnifyPos = function () {
      this._unifyPos = this.node.getPosition();
    };
    e.prototype.update = function (t) {
      const e = $battleMgr.default.instance.getCurScene();
      if (this._isInit && !this._isRemove && e && e.isInit && e.isPlay) {
        this.onUpdate(t);
      }
    };
    e.prototype.onUpdate = function () {};
    e.prototype.updatePathData = function (t) {
      if (void 0 === t) {
        t = !0;
      }
      for (
        const e = $mathUtil.MathUtil.vec2Fixed(this.node.getPosition()), n = $battleMgr.default.instance.getCurScene().level.path;
        ;
      ) {
        const i = n.findPathPointByPos(e);
        if ("" != i) {
          this._pathPointId = i;
          this._pathLineId = "";
          break;
        }
        const o = n.findPathLineByPos(e);
        if ("" != o) {
          this._pathLineId = o;
          this._pathPointId = "";
        }
        break;
      }
      if (t) {
        this.updateRoomId();
      }
    };
    e.prototype.updateRoomId = function (t) {
      if (t) {
        this._roomId = t;
      } else {
        const e = $battleMgr.default.instance.getCurScene().level.path;
        if ("" != this._pathPointId) {
          this._roomId = e.getPoint(this._pathPointId).roomId;
        }
        if ("" != this._pathLineId) {
          this._roomId = e.getLine(this._pathLineId).roomId;
        }
      }
    };
    e.prototype.remove = function () {
      if (this._isRemove) {
        //
      } else {
        this._isRemove = !0;
        this.onRemove();
        this.node.destroy();
      }
    };
    e.prototype.onRemove = function () {
      const t = this;
      this._areaKeys.forEach(function (e) {
        $gridAreaDivisionMgr.default.instance.removeAreaObject(t, e);
      });
      this._areaKeys = [];
      $unitMgr.UnitMgr.instance.removeUnit(this._unitId);
    };
  })($areaObject.default));
exports.default = m;
